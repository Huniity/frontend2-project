import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";

const PRICE_IDS: Record<string, Record<string, string>> = {
  NOMAD: {
    monthly: process.env.STRIPE_NOMAD_MONTHLY_PRICE_ID!,
    annual:  process.env.STRIPE_NOMAD_ANNUAL_PRICE_ID!,
  },
  GLOBETROTTER: {
    monthly: process.env.STRIPE_GLOBETROTTER_MONTHLY_PRICE_ID!,
    annual:  process.env.STRIPE_GLOBETROTTER_ANNUAL_PRICE_ID!,
  },
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true },
    });
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { plan, interval } = await req.json() as {
      plan: "NOMAD" | "GLOBETROTTER";
      interval: "monthly" | "annual";
    };

    const priceId = PRICE_IDS[plan]?.[interval];
    if (!priceId) return NextResponse.json({ error: "Invalid plan or interval" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: dbUser.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan, interval, userId: user.id },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });


    if (process.env.NODE_ENV === "development") {
      await prisma.user.update({
        where: { id: user.id },
        data: { plan },
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}