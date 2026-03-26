import { prisma } from "@/lib/prisma/prisma";
import { TripStatus } from "../../generated/prisma/client";


type TrophyKey =
  | "FIRST_TRIP" | "THIRD_TRIP" | "TEN_TRIPS"
  | "FIRST_REVIEW" | "ADVENTURER" | "ROMANTIC"
  | "CONTINENT_HOPPER" | "WORLD_EXPLORER" | "BUDGET_MASTER" | "LUXURY_TRAVELER"
  | "TRIP_EDITOR" | "THE_INFLUENCER";

type TrophyContext = {
  tripType?: string;
  budgetLevel?: string;
};

export async function awardTrophy(userId: string, key: TrophyKey) {
  const trophy = await prisma.trophy.findUnique({
    where: { key },
    select: { id: true },
  });

  if (!trophy) return;

  await prisma.userTrophy.createMany({
    data: [{ userId, trophyId: trophy.id }],
    skipDuplicates: true,
  });
}

export async function checkAndAwardTrophies(
  userId: string,
  context: TrophyContext
) {
  try {
    const tripWhere = {
      userId,
      status: {
        in: [TripStatus.DRAFT, TripStatus.CONFIRMED, TripStatus.COMPLETED],
      },
    };

    const [tripCount, trips] = await Promise.all([
      prisma.trip.count({ where: tripWhere }),
      prisma.trip.findMany({
        where: tripWhere,
        select: { destination: true },
      }),
    ]);

    const keys: TrophyKey[] = [];

    if (tripCount >= 1) keys.push("FIRST_TRIP");
    if (tripCount >= 3) keys.push("THIRD_TRIP");
    if (tripCount >= 10) keys.push("TEN_TRIPS");

    if (context.tripType === "ADVENTUROUS") keys.push("ADVENTURER");
    if (context.tripType === "ROMANTIC") keys.push("ROMANTIC");

    if (context.budgetLevel === "LOW") keys.push("BUDGET_MASTER");
    if (context.budgetLevel === "HIGH") keys.push("LUXURY_TRAVELER");

    // Extract unique countries from destination strings
    const countries = new Set<string>();
    trips.forEach((trip) => {
      if (trip.destination) {
        const country = trip.destination.split(",").pop()?.trim().toLowerCase();
        if (country) {
          countries.add(country);
        }
      }
    });

    console.log(`[Trophy Check] User ${userId}: ${trips.length} trips, ${countries.size} unique countries`, Array.from(countries));

    if (countries.size > 3) {
      console.log(`[Trophy Award] WORLD_EXPLORER awarded to ${userId}`);
      keys.push("WORLD_EXPLORER");
    }
    if (countries.size >= 5) {
      console.log(`[Trophy Award] WORLD_EXPLORER awarded to ${userId}`);
      keys.push("WORLD_EXPLORER");
    }

    if (!keys.length) {
      console.log(`[Trophy Check] No new trophies for ${userId}`);
      return;
    }

    const trophies = await prisma.trophy.findMany({
      where: { key: { in: keys } },
      select: { id: true, key: true },
    });

    if (!trophies.length) {
      console.log(`[Trophy Error] Trophy records not found for keys: ${keys}`);
      return;
    }

    console.log(`[Trophy Award] Awarding trophies to ${userId}:`, trophies.map(t => t.key));

    await prisma.userTrophy.createMany({
      data: trophies.map((trophy) => ({
        userId,
        trophyId: trophy.id,
      })),
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(`[Trophy Error] Failed to check/award trophies for ${userId}:`, error);
  }
}