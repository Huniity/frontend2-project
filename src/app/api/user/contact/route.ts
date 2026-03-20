import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, password } = await req.json();

    if (!firstName && !lastName) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    // Verify password before allowing changes
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password,
    });

    if (signInError) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Update in Prisma
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("[api/user/contact] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}