import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import TripPageClient from "@/components/ui/trip/TripPageClient";

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const trip = await prisma.trip.findUnique({
    where: { id }, // ← use destructured id
    include: {
      days: {
        orderBy: { dayNumber: "asc" },
        include: {
          activities: { orderBy: { order: "asc" } },
        },
      },
      hotel: true,
      transportation: true,
    },
  });

  if (!trip || trip.userId !== user.id) notFound();

  let aiTips: string[] = [];
  try {
    if (trip.aiPrompt) aiTips = JSON.parse(trip.aiPrompt);
  } catch {}

  return <TripPageClient trip={trip as any}/>;
}