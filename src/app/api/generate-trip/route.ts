import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { PLAN_LIMITS, PlanKey } from "@/lib/utils/plans";
import { buildTripGenerationPrompt } from "@/lib/prompts/tripPrompt";
import { checkAndAwardTrophies } from "@/lib/utils/trophies";
import type { TripType, BudgetLevel } from "@/generated/prisma/client";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  console.log("🔥 [generate-trip] START");
  try {
    console.log("🔥 [generate-trip] checking auth...");
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.log("🔥 [generate-trip] unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("🔥 [generate-trip] user ok:", user.id);

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });
    const plan = (dbUser?.plan ?? "FREE") as PlanKey;
    const limits = PLAN_LIMITS[plan];
    console.log("🔥 [generate-trip] plan:", plan, "model:", limits.model);

    const body = await req.json();
    const { destination, numberOfDays, tripType, budgetLevel, numberOfPersons, departureCity } = body as {
      destination: string;
      numberOfDays: number;
      tripType: TripType;
      budgetLevel: BudgetLevel;
      numberOfPersons: number;
      departureCity: string;
    };
    console.log("🔥 [generate-trip] body:", { destination, numberOfDays, tripType, budgetLevel, numberOfPersons, departureCity });

    if (!destination || !numberOfDays || !tripType || !budgetLevel || !numberOfPersons) {
      console.log("🔥 [generate-trip] missing fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = buildTripGenerationPrompt({
      destination, numberOfDays, tripType, budgetLevel, numberOfPersons, departureCity,
    });

    console.log("🔥 [generate-trip] creating trip in DB...");
    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        title: `${numberOfDays} Days in ${destination}`,
        destination,
        tripType,
        budgetLevel,
        numberOfDays,
        status: "GENERATING",
        aiModel: limits.model,
        aiPrompt: prompt,
      },
    });
    console.log("🔥 [generate-trip] trip created:", trip.id);

    console.log("🔥 [generate-trip] calling Gemini...");
    const response = await ai.models.generateContent({
      model: limits.model,
      contents: prompt,
      config: {
        maxOutputTokens: 8192,
        temperature: 1,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });
    const raw = response.text ?? "";
    console.log("🔥 [generate-trip] Gemini responded, length:", raw.length);
    console.log("🔥 [generate-trip] preview:", raw.substring(0, 300));

    let parsed: any;
    try {
      const clean = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(clean);
      console.log("🔥 [generate-trip] parsed ok — title:", parsed.title, "days:", parsed.days?.length);
    } catch (parseErr) {
      console.error("🔥 [generate-trip] JSON PARSE FAILED:", parseErr);
      console.error("🔥 [generate-trip] raw:", raw.substring(0, 500));
      await prisma.trip.update({ where: { id: trip.id }, data: { status: "DRAFT" } });
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    console.log("🔥 [generate-trip] starting transaction...");
    await prisma.$transaction(async (tx) => {
      console.log("🔥 [generate-trip] updating trip...");
      await tx.trip.update({
        where: { id: trip.id },
        data: {
          title: parsed.title ?? `${numberOfDays} Days in ${destination}`,
          totalBudget: parsed.totalBudget ?? null,
          budgetPerDay: parsed.budgetPerDay ?? null,
          aiPrompt: JSON.stringify(parsed.aiTips ?? []),
          status: "DRAFT",
          generatedAt: new Date(),
        },
      });

      if (parsed.hotel) {
        console.log("🔥 [generate-trip] saving hotel...");
        await tx.hotel.create({
          data: {
            tripId: trip.id,
            name: parsed.hotel.name,
            address: parsed.hotel.address ?? null,
            pricePerNight: parsed.hotel.pricePerNight ?? null,
            totalCost: parsed.hotel.totalCost ?? null,
            stars: parsed.hotel.stars ?? null,
            notes: parsed.hotel.notes ?? null,
          },
        });
      }

      if (parsed.transportation) {
        console.log("🔥 [generate-trip] saving transportation...");
        await tx.transportation.create({
          data: {
            tripId: trip.id,
            mode: parsed.transportation.mode ?? "OTHER",
            provider: parsed.transportation.provider ?? null,
            departureFrom: parsed.transportation.departureFrom ?? null,
            arrivalTo: parsed.transportation.arrivalTo ?? null,
            estimatedCost: parsed.transportation.estimatedCost ?? null,
            budgetNote: parsed.transportation.budgetNote ?? null,
            // Store dailyTransport as JSON in notes field
            notes: parsed.transportation.dailyTransport
              ? JSON.stringify(parsed.transportation.dailyTransport)
              : null,
          },
        });
      }

      for (const day of parsed.days ?? []) {
        console.log("🔥 [generate-trip] saving day:", day.dayNumber);
        const savedDay = await tx.day.create({
          data: {
            tripId: trip.id,
            dayNumber: day.dayNumber,
            summary: day.summary ?? null,
            dailyCost: day.dailyCost ?? null,
            notes: day.narrative ?? null,
          },
        });

        for (const activity of day.activities ?? []) {
          console.log("🔥 [generate-trip] saving activity:", activity.title);
          await tx.activity.create({
            data: {
              dayId: savedDay.id,
              order: activity.order,
              title: activity.title,
              description: activity.description ?? null,
              location: activity.location ?? null,
              category: activity.category ?? "OTHER",
              startTime: activity.startTime ?? null,
              endTime: activity.endTime ?? null,
              estimatedCost: activity.estimatedCost ?? null,
              notes: activity.lat
                ? JSON.stringify({ lat: activity.lat, lng: activity.lng })
                : null,
            },
          });
        }
      }
    });

    // Award trophies
    console.log("🔥 [generate-trip] checking trophies...");
    await checkAndAwardTrophies(user.id, { tripType, budgetLevel });

    console.log("🔥 [generate-trip] ALL DONE, tripId:", trip.id);
    return NextResponse.json({ tripId: trip.id });

  } catch (error: any) {
    console.error("🔥 [generate-trip] CAUGHT ERROR:", error?.message ?? String(error));
    console.error("🔥 [generate-trip] code:", error?.code);
    console.error("🔥 [generate-trip] status:", error?.status);

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI is busy, try again in a few seconds." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}