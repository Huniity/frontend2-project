import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { awardTrophy } from "@/lib/utils/trophies";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const activity = await prisma.activity.findUnique({
    where: { id },
    include: { day: { include: { trip: true } } },
  });
  if (!activity || activity.day.trip.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const updated = await prisma.activity.update({
    where: { id },
    data: {
      title: body.title ?? activity.title,
      description: body.description ?? activity.description,
      location: body.location ?? activity.location,
      startTime: body.startTime ?? activity.startTime,
      endTime: body.endTime ?? activity.endTime,
      estimatedCost: body.estimatedCost ?? activity.estimatedCost,
      isCustomized: true,
    },
  });

  // Award TRIP_EDITOR trophy
  await awardTrophy(user.id, "TRIP_EDITOR");

  return NextResponse.json(updated);
}