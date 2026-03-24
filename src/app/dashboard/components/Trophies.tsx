"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import type { Trophy } from "@/generated/prisma/client";
import type { UserWithRelations } from "../Dashboard";

const trophyConfig: Record<string, { icon: string; color: string; gradient: string }> = {
  FIRST_TRIP:      { icon: "✈️", color: "from-blue-400 to-blue-600",     gradient: "from-blue-500/20 to-blue-600/20" },
  THIRD_TRIP:      { icon: "🗺️", color: "from-purple-400 to-purple-600", gradient: "from-purple-500/20 to-purple-600/20" },
  TEN_TRIPS:       { icon: "🌍", color: "from-green-400 to-green-600",   gradient: "from-green-500/20 to-green-600/20" },
  FIRST_REVIEW:    { icon: "⭐", color: "from-yellow-400 to-yellow-600", gradient: "from-yellow-500/20 to-yellow-600/20" },
  ADVENTURER:      { icon: "🏔️", color: "from-red-400 to-red-600",       gradient: "from-red-500/20 to-red-600/20" },
  ROMANTIC:        { icon: "💕", color: "from-pink-400 to-pink-600",     gradient: "from-pink-500/20 to-pink-600/20" },
  WORLD_EXPLORER:  { icon: "🧭", color: "from-indigo-400 to-indigo-600", gradient: "from-indigo-500/20 to-indigo-600/20" },
  BUDGET_MASTER:   { icon: "💰", color: "from-emerald-400 to-emerald-600", gradient: "from-emerald-500/20 to-emerald-600/20" },
  LUXURY_TRAVELER: { icon: "💎", color: "from-cyan-400 to-cyan-600",     gradient: "from-cyan-500/20 to-cyan-600/20" },
  TRIP_EDITOR:     { icon: "✏️", color: "from-orange-400 to-orange-600", gradient: "from-orange-500/20 to-orange-600/20" },
};

type Filter = "all" | "earned" | "locked";

export default function Trophies({ user, allTrophies }: { user: UserWithRelations; allTrophies: Trophy[] }) {
  const [trophyFilter, setTrophyFilter] = useState<Filter>("all");
  const earnedIds = new Set(user.trophies.map((ut: any) => ut.trophyId));
  const totalXP = user.trophies.reduce((sum: any, ut: any) => sum + ut.trophy.xp, 0);
  const completion = allTrophies.length > 0 ? Math.round((user._count.trophies / allTrophies.length) * 100) : 0;

  return (
    <div>
      <div className="mb-18">
        <h1 className="text-3xl font-made-outer-alt font-bold mb-2">Trophies</h1>
        <p className="text-gray-500 text-sm font-made-outer">
          Track your achievements and earn XP as you explore the world.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-14">
        {[
          { label: "Earned",          value: user._count.trophies },
          { label: "Total Available", value: allTrophies.length },
          { label: "Total XP",        value: totalXP },
          { label: "Completion",      value: `${completion}%` },
        ].map(({ label, value }) => (
          <div key={label} className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-made-outer text-gray-400">Progress</p>
          <p className="text-sm font-made-outer text-gray-400">{user._count.trophies} / {allTrophies.length}</p>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-white/80 transition-all duration-500" style={{ width: `${completion}%` }} />
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8">
        {(["all", "earned", "locked"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setTrophyFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-made-outer transition-colors cursor-pointer border-none ${
              trophyFilter === f ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5 bg-transparent"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8">
        {allTrophies
          .filter((t) => {
            if (trophyFilter === "earned") return earnedIds.has(t.id);
            if (trophyFilter === "locked") return !earnedIds.has(t.id);
            return true;
          })
          .map((trophy: any) => {
            const isEarned = earnedIds.has(trophy.id);
            const userTrophy = user.trophies.find((ut: any) => ut.trophyId === trophy.id);
            const config = trophyConfig[trophy.key] ?? { icon: "🏆", color: "from-gray-400 to-gray-600", gradient: "from-gray-500/20 to-gray-600/20" };

            return (
              <button
                key={trophy.id}
                aria-label={`Trophy: ${trophy.name} - ${trophy.description}`}
                className={`relative group rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-left ${
                  isEarned
                    ? `border border-white/20 bg-linear-to-br ${config.gradient} hover:border-white/40 hover:shadow-lg`
                    : "border border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {isEarned && (
                  <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl`} />
                )}
                <div className="relative p-8 flex flex-col items-center text-center gap-4">
                  <div className={`relative w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-5xl transition-all duration-300 transform group-hover:scale-110 ${
                    isEarned
                      ? "bg-linear-to-br from-yellow-300 to-yellow-600 border-4 border-yellow-400 drop-shadow-lg group-hover:drop-shadow-2xl shadow-yellow-500/50"
                      : "bg-white/5 border-2 border-white/15 opacity-50 group-hover:opacity-70"
                  }`}>
                    {isEarned ? config.icon : <Lock size={24} className="text-gray-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm font-made-outer-alt mb-1 ${isEarned ? "text-white" : "text-gray-300"}`}>
                      {trophy.name}
                    </p>
                    <p className={`text-xs font-made-outer leading-relaxed ${isEarned ? "text-gray-300" : "text-gray-500"}`}>
                      {trophy.description}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold font-made-outer ${
                    isEarned
                      ? "bg-linear-to-r from-yellow-300 to-yellow-500 border border-yellow-400 text-yellow-900 shadow-lg shadow-yellow-500/50"
                      : "bg-white/5 border border-white/10 text-gray-500"
                  }`}>
                    {trophy.xp} XP
                  </div>
                  {isEarned && userTrophy && (
                    <p className="text-xs text-gray-400 font-made-outer pt-3 border-t border-white/10 w-full">
                      🎉 Earned {new Date(userTrophy.awardedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                  {!isEarned && (
                    <p className="text-xs text-gray-500 font-made-outer pt-2 italic">Keep exploring to unlock!</p>
                  )}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}