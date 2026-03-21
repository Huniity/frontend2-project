import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import TripPageClient from "@/components/ui/trip/TripPageClient";

export const metadata = {
  title: "Trip Details",
  robots: { index: false, follow: false },
};

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const trip = await prisma.trip.findUnique({
    where: { id },
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


  return <TripPageClient trip={trip as any}/>;
}