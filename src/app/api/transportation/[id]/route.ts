import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transport = await prisma.transportation.findUnique({
    where: { id },
    include: { trip: true },
  });
  if (!transport || transport.trip.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const updated = await prisma.transportation.update({
    where: { id },
    data: {
      provider: body.provider ?? transport.provider,
      mode: body.mode ?? transport.mode,
      estimatedCost: body.estimatedCost ?? transport.estimatedCost,
      budgetNote: body.budgetNote ?? transport.budgetNote,
      notes: body.notes ?? transport.notes,
      isCustomized: true,
    },
  });

  return NextResponse.json(updated);
}