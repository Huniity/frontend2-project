import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { PLAN_LIMITS, PlanKey } from "@/lib/utils/plans";
import { TRAVEL_AGENT_SYSTEM_PROMPT } from "@/lib/prompts/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get user plan → model + token limits
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });

    const plan = (dbUser?.plan ?? "FREE") as PlanKey;
    const limits = PLAN_LIMITS[plan];

    // 3. Parse body
    const body = await req.json();
    const { messages } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // 4. Drop any leading assistant messages — Gemini requires history to start with "user"
    const trimmed = [...messages];
    while (trimmed.length > 0 && trimmed[0].role === "assistant") {
      trimmed.shift();
    }

    // 5. Separate history from the last user message
    const history = trimmed.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = trimmed[trimmed.length - 1].content;

    // 6. Call Gemini with new @google/genai SDK
    const chat = ai.chats.create({
      model: limits.model,
      config: {
        systemInstruction: TRAVEL_AGENT_SYSTEM_PROMPT,
        maxOutputTokens: limits.max_tokens,
      },
      history,
    });

    const result = await chat.sendMessage({ message: lastMessage });
    const assistantMessage = result.text ?? "";

    // 7. Check if AI finished collecting all answers
    let tripData = null;
    const jsonMatch = assistantMessage.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.ready === true) {
          tripData = parsed;
        }
      } catch {
      }
    }

    return NextResponse.json({ message: assistantMessage, tripData });

  } catch (error: any) {
    console.error("[/api/chat] error:", error);

    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI is a bit busy right now, please try again in a few seconds." },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}