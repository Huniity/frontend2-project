import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("[webhook] event:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const plan = session.metadata?.plan as "NOMAD" | "GLOBETROTTER";
        const userId = session.metadata?.userId;
        if (!plan || !userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: { plan },
        });
        console.log("[webhook] upgraded:", userId, "→", plan);
        break;
      }

case "invoice.payment_succeeded": {
  const invoice = event.data.object;
  const subscriptionId = invoice.parent?.subscription_details?.subscription;
  if (!subscriptionId) break;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
  const plan = subscription.metadata?.plan as "NOMAD" | "GLOBETROTTER";
  const userId = subscription.metadata?.userId;
  if (!plan || !userId) break;

  await prisma.user.update({
    where: { id: userId },
    data: { plan },
  });
  console.log("[webhook] renewed:", userId, "→", plan);
  break;
}

    case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = invoice.parent?.subscription_details?.subscription;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
            where: { id: userId },
            data: { plan: "FREE" },
        });
        console.log("[webhook] payment failed → FREE:", userId);
        break;
    }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: { plan: "FREE" },
        });
        console.log("[webhook] cancelled → FREE:", userId);
        break;
    }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = invoice.parent?.subscription_details?.subscription;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
        where: { id: userId },
        data: { plan: "FREE" },
        });
        console.log("[webhook] payment failed → FREE:", userId);
        break;
    }

      default:
        console.log("[webhook] unhandled event:", event.type);
    }
  } catch (err) {
    console.error("[webhook] handler error:", err);
  }

  return NextResponse.json({ received: true });
}