import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true },
    });

    console.log("[subscription] email:", dbUser?.email);

    if (!dbUser?.email) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const customers = await stripe.customers.list({ email: dbUser.email, limit: 1 });
    console.log("[subscription] customers found:", customers.data.length);

    if (customers.data.length === 0) return NextResponse.json({ error: "No customer" }, { status: 404 });

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: "active",
      limit: 1,
    });
    console.log("[subscription] subscriptions found:", subscriptions.data.length);

    if (subscriptions.data.length === 0) return NextResponse.json({ error: "No subscription" }, { status: 404 });

    const subscription = subscriptions.data[0] as any;
    const currentPeriodEnd = subscription.items?.data?.[0]?.current_period_end;
    console.log("[subscription] currentPeriodEnd:", currentPeriodEnd);

    return NextResponse.json({
      currentPeriodEnd,
    });
  } catch (error) {
    console.error("[stripe/subscription] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}