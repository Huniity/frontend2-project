import { prisma } from "@/lib/prisma/prisma";
import { TripStatus } from "../../generated/prisma/client";


type TrophyKey =
  | "FIRST_TRIP" | "THIRD_TRIP" | "TEN_TRIPS"
  | "FIRST_REVIEW" | "ADVENTURER" | "ROMANTIC"
  | "CONTINENT_HOPPER" | "WORLD_EXPLORER" | "BUDGET_MASTER" | "LUXURY_TRAVELER"
  | "TRIP_EDITOR";

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

  const countries = new Set(
    trips
      .map((trip) => trip.destination.split(",").pop()?.trim().toLowerCase())
      .filter((country): country is string => !!country)
  );

  if (countries.size >= 3) keys.push("CONTINENT_HOPPER");
  if (countries.size >= 5) keys.push("WORLD_EXPLORER");

  if (!keys.length) return;

  const trophies = await prisma.trophy.findMany({
    where: { key: { in: keys } },
    select: { id: true },
  });

  if (!trophies.length) return;

  await prisma.userTrophy.createMany({
    data: trophies.map((trophy) => ({
      userId,
      trophyId: trophy.id,
    })),
    skipDuplicates: true,
  });
}