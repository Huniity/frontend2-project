import { createClient as createServerClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 10MB limit" }, { status: 400 });
    }

    const fileExtension = file.name.split(".").pop();
    const fileName = `avatars/${user.id}/${Date.now()}.${fileExtension}`;

    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await adminClient.storage
      .from("User_Avatar")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload avatar" }, { status: 500 });
    }

    // Get permanent public URL
    const { data: publicUrlData } = adminClient.storage
      .from("User_Avatar")
      .getPublicUrl(fileName);

    const avatarUrl = publicUrlData.publicUrl;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl },
    });

    return NextResponse.json(
      { success: true, avatarUrl: updatedUser.avatarUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json({ error: "Failed to update avatar" }, { status: 500 });
  }
}