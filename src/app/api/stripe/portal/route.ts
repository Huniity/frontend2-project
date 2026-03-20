import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true },
    });
    if (!dbUser?.email) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const customers = await stripe.customers.list({ email: dbUser.email, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/portal] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}