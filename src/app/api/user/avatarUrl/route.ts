import { createClient as createServerClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create admin client with service role to bypass RLS
    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the avatar file from FormData
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `avatars/${user.id}/${Date.now()}.${fileExtension}`;

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload to Supabase storage using admin client (bypasses RLS)
    const { error: uploadError } = await adminClient.storage
      .from("User_Avatar")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload avatar" },
        { status: 500 }
      );
    }

    // Get the signed URL (valid for 24 hours)
    const { data: signedURLData, error: signedUrlError } = await adminClient.storage
      .from("User_Avatar")
      .createSignedUrl(fileName, 86400); // 24 hours in seconds

    if (signedUrlError) {
      console.error("Signed URL error:", signedUrlError);
      return NextResponse.json(
        { error: "Failed to generate signed URL" },
        { status: 500 }
      );
    }

    const avatarUrl = signedURLData.signedUrl;

    // Update user in database with new avatar URL
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl },
    });

    return NextResponse.json(
      {
        success: true,
        avatarUrl: updatedUser.avatarUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json(
      { error: "Failed to update avatar" },
      { status: 500 }
    );
  }
}
