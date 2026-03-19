import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: { trip: true },
  });
  if (!hotel || hotel.trip.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const updated = await prisma.hotel.update({
    where: { id },
    data: {
      name: body.name ?? hotel.name,
      address: body.address ?? hotel.address,
      pricePerNight: body.pricePerNight ?? hotel.pricePerNight,
      stars: body.stars ?? hotel.stars,
      notes: body.notes ?? hotel.notes,
      isCustomized: true,
    },
  });

  return NextResponse.json(updated);
}