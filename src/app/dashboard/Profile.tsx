"use client";

import { useState } from "react";
import { RiUserLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { TbPasswordFingerprint } from "react-icons/tb";
import {
  MdOutlineContactMail,
  MdOutlineLanguage,
  MdOutlineFlightTakeoff,
  MdOutlineEmojiEvents,
} from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import { FiLogOut, FiChevronRight, FiLock, FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import type { User, Trip, UserTrophy, Trophy } from "@/generated/prisma/client";

const trophyConfig: Record<string, { icon: string; color: string; gradient: string }> = {
  FIRST_TRIP: { icon: "✈️", color: "from-blue-400 to-blue-600", gradient: "from-blue-500/20 to-blue-600/20" },
  THIRD_TRIP: { icon: "🗺️", color: "from-purple-400 to-purple-600", gradient: "from-purple-500/20 to-purple-600/20" },
  TEN_TRIPS: { icon: "🌍", color: "from-green-400 to-green-600", gradient: "from-green-500/20 to-green-600/20" },
  FIRST_REVIEW: { icon: "⭐", color: "from-yellow-400 to-yellow-600", gradient: "from-yellow-500/20 to-yellow-600/20" },
  ADVENTURER: { icon: "🏔️", color: "from-red-400 to-red-600", gradient: "from-red-500/20 to-red-600/20" },
  ROMANTIC: { icon: "💕", color: "from-pink-400 to-pink-600", gradient: "from-pink-500/20 to-pink-600/20" },
  WORLD_EXPLORER: { icon: "🧭", color: "from-indigo-400 to-indigo-600", gradient: "from-indigo-500/20 to-indigo-600/20" },
  BUDGET_MASTER: { icon: "💰", color: "from-emerald-400 to-emerald-600", gradient: "from-emerald-500/20 to-emerald-600/20" },
  LUXURY_TRAVELER: { icon: "💎", color: "from-cyan-400 to-cyan-600", gradient: "from-cyan-500/20 to-cyan-600/20" },
  TRIP_EDITOR: { icon: "✏️", color: "from-orange-400 to-orange-600", gradient: "from-orange-500/20 to-orange-600/20" },
};

type UserWithRelations = User & {
  trips: Trip[];
  trophies: (UserTrophy & { trophy: Trophy })[];
  _count: { trips: number; trophies: number };
};

const planLabel: Record<string, string> = {
  FREE: "Free",
  EXPLORER: "Explorer",
  GLOBETROTTER: "Globetrotter",
};

const settingsItems = [
  { icon: RiUserLine, label: "Profile Photo" },
  { icon: TbPasswordFingerprint, label: "Change Password" },
  { icon: MdOutlineContactMail, label: "Contact Info" },
  { icon: AiOutlineStar, label: "Preferences" },
  { icon: IoNotificationsOutline, label: "Notifications" },
  { icon: RiShieldKeyholeLine, label: "Privacy" },
  { icon: MdOutlineLanguage, label: "Language" },
  { icon: BiLink, label: "Connect Accounts" },
];

type Tab = "overview" | "settings" | "trophies" | "mytrips";
type Filter = "all" | "earned" | "locked";

export default function Profile({ user, allTrophies }: { user: UserWithRelations; allTrophies: Trophy[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [trophyFilter, setTrophyFilter] = useState<Filter>("all");

  const firstName = user.name?.split(" ")[0] ?? "Traveler";
  const earnedIds = new Set(user.trophies.map((ut) => ut.trophyId));

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <aside className="fixed top-0 left-0 h-screen w-72 border-r border-white/15 bg-white/5 backdrop-blur-xl pt-18 px-8 flex flex-col justify-between pb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition mb-28 font-made-outer-alt font-bold">
              <IoArrowBack size={20} />
              Back
            </Link>
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name ?? ""} className="w-full h-full object-cover" />
                ) : (
                  <RiUserLine className="text-white" size={28} />
                )}
              </div>
              <div className="text-center">
                <p className="font-made-outer-alt font-bold text-lg">{user.name ?? "Traveler"}</p>
                <p className="text-xs text-gray-500 font-made-outer">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                  activeTab === "overview" ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MdOutlineFlightTakeoff size={18} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                  activeTab === "settings" ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <AiOutlineStar size={18} />
                Settings
              </button>
                <button
                    onClick={() => setActiveTab("trophies")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                    activeTab === "trophies" ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                <MdOutlineEmojiEvents size={18} />
                Trophies
              </button>
              <button
                onClick={() => setActiveTab("mytrips")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                  activeTab === "mytrips" ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MdOutlineFlightTakeoff size={18} />
                My Trips
              </button>
            </nav>
          </div>

          <form action={signOut}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium font-made-outer text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none w-full">
              <FiLogOut size={18} />
              Log out
            </button>
          </form>
        </aside>

        <main className="ml-72 flex-1 pt-16 px-16 pb-12 min-h-screen"
            style={{ backgroundImage: 'url(/hawaii.jpg)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)' }}>
          {activeTab === "overview" && (
            <div>
              <div className="mb-18">
                <h1 className="text-3xl font-made-outer-alt font-bold mb-2">
                  Welcome back, <span className="italic">{firstName}</span>
                </h1>
                <p className="text-gray-500 text-sm font-made-outer">
                  Here&apos;s a summary of your Nomadia activity.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-14">
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">Total Trips</p>
                  <p className="text-3xl font-bold">{user._count.trips}</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">Countries</p>
                  <p className="text-3xl font-bold">
                    {new Set(user.trips.map(t => t.destination.split(",").pop()?.trim())).size}
                  </p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">Trophies</p>
                  <p className="text-3xl font-bold">{user._count.trophies}</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">Plan</p>
                    <p className="text-xl font-bold mt-1">
                        {planLabel[user.plan ?? "FREE"] ?? "Free"}
                    </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-made-outer-alt font-bold">Recent Trips</h2>
                    <Link href="/trips" className="text-xs text-gray-500 hover:text-white transition-colors no-underline flex items-center gap-1 font-made-outer">
                      View all <FiChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {user.trips.length === 0 && (
                      <p className="text-gray-500 text-sm font-made-outer">No trips yet. Plan your first one!</p>
                    )}
                    {user.trips.map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-none">
                        <div>
                          <p className="font-medium text-sm font-made-outer">{trip.destination}</p>
                          <p className="text-xs text-gray-500 font-made-outer">
                            {trip.startDate ? new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "TBD"}
                          </p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-made-outer ${
                          trip.status === "CONFIRMED" ? "bg-white/10 backdrop-blur-sm text-white border border-white/15" : "bg-white/5 text-gray-500"
                        }`}>
                          {trip.status.charAt(0) + trip.status.slice(1).toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-made-outer-alt font-bold">Trophies</h2>
                    <Link href="/trophies" className="text-xs text-gray-500 hover:text-white transition-colors no-underline flex items-center gap-1 font-made-outer">
                      View all <FiChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {user.trophies.length === 0 && (
                      <p className="text-gray-500 text-sm font-made-outer">No trophies yet. Start exploring!</p>
                    )}
                    {user.trophies.map(({ trophy, awardedAt }) => (
                      <div key={trophy.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-none">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 text-xl">
                          {trophy.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm font-made-outer">{trophy.name}</p>
                          <p className="text-xs text-gray-500 font-made-outer">{trophy.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <h2 className="text-lg font-made-outer-alt font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-3 gap-6">
                  <Link href="/trips" className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group">
                    <MdOutlineFlightTakeoff className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
                    <p className="font-medium text-sm font-made-outer">Plan a New Trip</p>
                    <p className="text-xs text-gray-500 mt-1 font-made-outer">Start building your next adventure</p>
                  </Link>
                  <Link href="/pricing" className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group">
                    <FiEdit2 className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
                    <p className="font-medium text-sm font-made-outer">Upgrade Plan</p>
                    <p className="text-xs text-gray-500 mt-1 font-made-outer">Unlock more features and destinations</p>
                  </Link>
                  <button onClick={() => setActiveTab("settings")} className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-white group cursor-pointer text-left">
                    <AiOutlineStar className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
                    <p className="font-medium text-sm font-made-outer">Edit Preferences</p>
                    <p className="text-xs text-gray-500 mt-1 font-made-outer">Customize your Nomadia experience</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-12">
                <h1 className="text-2xl font-made-outer-alt font-bold italic mb-4">Profile Settings</h1>
                <div className="space-y-4 text-sm text-gray-400 leading-relaxed max-w-xl font-made-outer">
                  <p>Manage your profile details and account preferences in a simple, user-friendly way.</p>
                  <p>Update your name, email, or password securely. Changes are saved instantly so you&apos;re always up to date.</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-y-14 gap-x-10 max-w-4xl">
                {settingsItems.map((item) => (
                  <button key={item.label} className="flex flex-col items-center gap-3 group cursor-pointer border border-white/15 rounded-2xl py-8 px-4 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300">
                    <item.icon className="text-gray-400 group-hover:text-white transition-colors duration-200" size={32} />
                    <span className="text-sm font-bold text-white font-made-outer">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "trophies" && (
            <div>
              <div className="mb-18">
                <h1 className="text-3xl font-made-outer-alt font-bold mb-2">
                  Trophies
                </h1>
                <p className="text-gray-500 text-sm font-made-outer">
                  Track your achievements and earn XP as you explore the world.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-14">
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">
                    Earned
                  </p>
                  <p className="text-3xl font-bold">{user._count.trophies}</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">
                    Total Available
                  </p>
                  <p className="text-3xl font-bold">{allTrophies.length}</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">
                    Total XP
                  </p>
                  <p className="text-3xl font-bold">
                    {user.trophies.reduce((sum, ut) => sum + ut.trophy.xp, 0)}
                  </p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">
                    Completion
                  </p>
                  <p className="text-3xl font-bold">
                    {allTrophies.length > 0
                      ? Math.round(
                          (user._count.trophies / allTrophies.length) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>

              <div className="mb-14">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-made-outer text-gray-400">
                    Progress
                  </p>
                  <p className="text-sm font-made-outer text-gray-400">
                    {user._count.trophies} / {allTrophies.length}
                  </p>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all duration-500"
                    style={{
                      width: `${
                        allTrophies.length > 0
                          ? (user._count.trophies / allTrophies.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                {["all", "earned", "locked"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTrophyFilter(f as Filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium font-made-outer transition-colors cursor-pointer border-none ${
                      trophyFilter === f
                        ? "bg-white/10 backdrop-blur-md text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5 bg-transparent"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-8">
                {allTrophies
                  .filter((t) => {
                    if (trophyFilter === "earned") return earnedIds.has(t.id);
                    if (trophyFilter === "locked") return !earnedIds.has(t.id);
                    return true;
                  })
                  .map((trophy) => {
                    const isEarned = earnedIds.has(trophy.id);
                    const userTrophy = user.trophies.find((ut) => ut.trophyId === trophy.id);
                    const config = trophyConfig[trophy.key] || { icon: "🏆", color: "from-gray-400 to-gray-600", gradient: "from-gray-500/20 to-gray-600/20" };

                    return (
                      <div
                        key={trophy.id}
                        className={`
                          relative group rounded-2xl overflow-hidden backdrop-blur-lg 
                          transition-all duration-300 transform hover:scale-105 cursor-pointer
                          ${isEarned 
                            ? `border border-white/20 bg-linear-to-br ${config.gradient} hover:border-white/40 hover:shadow-lg` 
                            : "border border-white/10 bg-white/5 hover:border-white/20"
                          }
                        `}
                      >
                        {/* Glow effect for earned trophies */}
                        {isEarned && (
                          <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl`} />
                        )}
                        
                        <div className="relative p-8 flex flex-col items-center text-center gap-4">
                          {/* Medal Icon */}
                          <div className={`
                            relative w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-5xl
                            transition-all duration-300 transform group-hover:scale-110
                            ${isEarned 
                              ? `bg-linear-to-br from-yellow-300 to-yellow-600 border-4 border-yellow-400 drop-shadow-lg group-hover:drop-shadow-2xl shadow-yellow-500/50` 
                              : "bg-white/5 border-2 border-white/15 opacity-50 group-hover:opacity-70"
                            }
                          `}>
                            {isEarned ? config.icon : <FiLock size={24} className="text-gray-500" />}
                          </div>

                          {/* Trophy Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm font-made-outer-alt mb-1 ${
                              isEarned ? "text-white" : "text-gray-300"
                            }`}>
                              {trophy.name}
                            </p>
                            <p className={`text-xs font-made-outer leading-relaxed ${
                              isEarned ? "text-gray-300" : "text-gray-500"
                            }`}>
                              {trophy.description}
                            </p>
                          </div>

                          {/* XP Badge */}
                          <div className={`
                            px-3 py-1 rounded-full text-xs font-bold font-made-outer
                            ${isEarned
                              ? `bg-linear-to-r from-yellow-300 to-yellow-500 border border-yellow-400 text-yellow-900 shadow-lg shadow-yellow-500/50`
                              : "bg-white/5 border border-white/10 text-gray-500"
                            }
                          `}>
                            {trophy.xp} XP
                          </div>

                          {/* Award Date */}
                          {isEarned && userTrophy && (
                            <p className="text-xs text-gray-400 font-made-outer pt-3 border-t border-white/10 w-full">
                              🎉 Earned {new Date(userTrophy.awardedAt).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric", year: "numeric" }
                              )}
                            </p>
                          )}

                          {/* Locked hint */}
                          {!isEarned && (
                            <p className="text-xs text-gray-500 font-made-outer pt-2 italic">
                              Keep exploring to unlock!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {activeTab === "mytrips" && (
            <div>
              <h1 className="text-2xl font-made-outer-alt font-bold mb-4">My Trips</h1>
              <p className="text-gray-500 text-sm font-made-outer mb-6">
                View and manage all your planned adventures in one place.
              </p>
              {/* Trip list would go here */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}