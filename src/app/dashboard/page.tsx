import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Profile from "./Profile";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [dbUser, allTrophies] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      include: {
        trips: {
          orderBy: { createdAt: "desc" },
          take: 3,
        },
        trophies: {
          include: { trophy: true },
          orderBy: { awardedAt: "desc" },
          take: 3,
        },
        _count: {
          select: { trips: true, trophies: true }
        }
      }
    }),
    prisma.trophy.findMany({ orderBy: { xp: "asc" } }),
  ]);

  if (!dbUser) redirect("/login");

  return <Profile user={dbUser} allTrophies={allTrophies} />;
}