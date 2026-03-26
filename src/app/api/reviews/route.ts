import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { awardTrophy } from "@/lib/utils/trophies";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tripId, rating, title, body: reviewBody, imageUrl, isPublic } = body;

    if (!tripId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields: tripId and rating" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }


    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip || trip.userId !== user.id) {
      return NextResponse.json(
        { error: "Trip not found or unauthorized" },
        { status: 404 }
      );
    }


    const existingReview = await prisma.review.findUnique({
      where: { tripId },
    });

    if (existingReview) {
      const updatedReview = await prisma.review.update({
        where: { tripId },
        data: {
          rating,
          title: title || null,
          body: reviewBody || null,
          imageUrl: imageUrl || null,
          isPublic: isPublic !== undefined ? isPublic : true,
        },
      });
      return NextResponse.json(updatedReview, { status: 200 });
    }

    const newReview = await prisma.review.create({
      data: {
        userId: user.id,
        tripId,
        rating,
        title: title || null,
        body: reviewBody || null,
        imageUrl: imageUrl || null,
        isPublic: isPublic !== undefined ? isPublic : true,
      },
    });

    // Award FIRST_REVIEW trophy if this is user's first review
    const reviewCount = await prisma.review.count({
      where: { userId: user.id },
    });

    if (reviewCount === 1) {
      try {
        await awardTrophy(user.id, "FIRST_REVIEW");
      } catch (trophyError) {
        console.error("Error awarding FIRST_REVIEW trophy:", trophyError);
      }
    }

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating review:", error);
    return NextResponse.json(
      { error: "Failed to create/update review" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: user.id },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
            destination: true,
            numberOfDays: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review || review.userId !== user.id) {
      return NextResponse.json(
        { error: "Review not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
