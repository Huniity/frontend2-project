import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};


export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [dbUser, allTrophies] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      include: {
        trips: {
          orderBy: { createdAt: "desc" },
          include: {
            _count: { select: { days: true } },
          },
        },
        trophies: {
          include: { trophy: true },
          orderBy: { awardedAt: "desc" },
        },
        _count: { select: { trips: true, trophies: true } },
      },
    }),
    prisma.trophy.findMany({ orderBy: { xp: "asc" } }),
  ]);

  if (!dbUser) redirect("/login");

  return <Dashboard user={dbUser} allTrophies={allTrophies} />;
}