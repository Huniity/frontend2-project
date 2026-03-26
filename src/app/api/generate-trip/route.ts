import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { PLAN_LIMITS, PlanKey } from "@/lib/utils/plans";
import { buildTripGenerationPrompt } from "@/lib/prompts/tripPrompt";
import { checkAndAwardTrophies } from "@/lib/utils/trophies";
import type { TripType, BudgetLevel } from "@/generated/prisma/client";
import slugify from "slugify";
import { nanoid } from "nanoid";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });
    const plan = (dbUser?.plan ?? "FREE") as PlanKey;
    const limits = PLAN_LIMITS[plan];

    const body = await req.json();
    const { destination, numberOfDays, tripType, budgetLevel, numberOfPersons, departureCity } = body as {
      destination: string;
      numberOfDays: number;
      tripType: TripType;
      budgetLevel: BudgetLevel;
      numberOfPersons: number;
      departureCity: string;
    };

    if (!destination || !numberOfDays || !tripType || !budgetLevel || !numberOfPersons) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = buildTripGenerationPrompt({
      destination, numberOfDays, tripType, budgetLevel, numberOfPersons, departureCity,
    });

    const slug = slugify(`${destination}-${numberOfDays}-days-${tripType}`, { lower: true, strict: true})
      + `-` + nanoid(6);

    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        slug,
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

    let parsed: any;
    try {
      const clean = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (parseErr) {
      await prisma.trip.update({ where: { id: trip.id }, data: { status: "DRAFT" } });
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    await prisma.$transaction(async (tx) => {
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
        await tx.transportation.create({
          data: {
            tripId: trip.id,
            mode: parsed.transportation.mode ?? "OTHER",
            provider: parsed.transportation.provider ?? null,
            departureFrom: parsed.transportation.departureFrom ?? null,
            arrivalTo: parsed.transportation.arrivalTo ?? null,
            estimatedCost: parsed.transportation.estimatedCost ?? null,
            budgetNote: parsed.transportation.budgetNote ?? null,
            notes: parsed.transportation.dailyTransport
              ? JSON.stringify(parsed.transportation.dailyTransport)
              : null,
          },
        });
      }

      for (const day of parsed.days ?? []) {
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

    await checkAndAwardTrophies(user.id, { tripType, budgetLevel });

    return NextResponse.json({ tripId: trip.id, tripSlug: trip.slug });

  } catch (error: any) {

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI is busy, try again in a few seconds." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}