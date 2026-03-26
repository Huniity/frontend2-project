"use client";

import { useEffect, useState } from "react";
import {HandCoins, Target, ArrowLeft, Plane, Trophy as TrophyIcon, Star, User as UserIcon, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/app/auth/actions";
import type { User, Trip, UserTrophy, Trophy } from "@/generated/prisma/client";
import { useSearchParams, useRouter } from "next/navigation";

import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Trophies from "./components/Trophies";
import MyTrips from "./components/MyTrips";
import LeaveReview from "./components/LeaveReview";
import ChatBox from "./components/ChatBox";
import Pricing from "@/components/ui/pricing/Pricing";

export type UserWithRelations = User & {
  trips: (Trip & { _count: { days: number } })[];
  trophies: (UserTrophy & { trophy: Trophy })[];
  _count: { trips: number; trophies: number };
};

export type Tab = "overview" | "settings" | "trophies" | "mytrips" | "review" | "chat" | "pricing";

export default function Dashboard({ user, allTrophies }: { user: UserWithRelations; allTrophies: Trophy[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab") as Tab | null;
    if (tab) setActiveTab(tab);

    if (tab) {
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, router]);

  const navItems = [
    { tab: "overview" as Tab, icon: Target, label: "Overview" },
    { tab: "settings" as Tab, icon: Star, label: "Settings" },
    { tab: "trophies" as Tab, icon: TrophyIcon, label: "Trophies" },
    { tab: "mytrips" as Tab, icon: Plane, label: "My Trips" },
    { tab: "review" as Tab, icon: Star, label: "Leave a Review" },
    { tab: "chat" as Tab, icon: Plane, label: "Chat" },
    { tab: "pricing" as Tab, icon: HandCoins, label: "Pricing" },
  ];

  return (
    <div className="min-h-screen text-white ">
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/15 bg-black/80 backdrop-blur-xl px-4 flex items-center justify-between z-40">
          <Link href="/nomadia" className="flex items-center gap-2 text-white hover:text-gray-300 transition font-made-outer-alt font-bold text-sm">
            <ArrowLeft size={18} />
            Back
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 mt-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen w-64 lg:w-72 border-r border-white/15 bg-black/95 lg:bg-white/5 backdrop-blur-xl px-4 lg:px-8 flex flex-col justify-between pb-8 pt-4 lg:pt-8 transition-transform duration-300 z-40 lg:z-auto overflow-y-auto lg:overflow-y-hidden`}>
          <div>
            <Link href="/nomadia" className="hidden lg:flex items-center gap-2 text-white hover:text-gray-300 transition mb-20 lg:mb-28 font-made-outer-alt font-bold text-sm lg:text-base">
              <ArrowLeft size={20} />
              Back
            </Link>

            <div className="flex flex-col items-center gap-3 lg:gap-4 mb-8 lg:mb-10">
              <div className="w-20 lg:w-32 h-20 lg:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center overflow-hidden shrink-0">
                {user.avatarUrl && !avatarError ? (
                  <Image 
                    src={user.avatarUrl} 
                    alt={user.username ?? ""} 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                    unoptimized
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <UserIcon className="text-white" size={24} />
                )}
              </div>
              <div className="text-center">
                <p className="font-made-outer-alt font-bold text-xs lg:text-lg leading-tight">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-500 font-made-outer line-clamp-2">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map(({ tab, icon: Icon, label }) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                    activeTab === tab ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <form action={signOut}>
            <button type="submit" className="flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-xs lg:text-sm font-medium font-made-outer text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none w-full">
              <LogOut size={18} className="shrink-0" />
              Log out
            </button>
          </form>
        </aside>

        <main className="flex-1 w-full mt-16 lg:mt-0 overflow-y-auto h-[calc(100vh-4rem)] lg:h-screen">
          <div className="px-4 lg:px-16 py-6 lg:py-8 pb-12 min-h-full">
            {activeTab === "overview"  && <Overview  user={user} setActiveTab={setActiveTab} />}
            {activeTab === "settings" && <Settings user={user} />}
            {activeTab === "trophies" && <Trophies  user={user} allTrophies={allTrophies} />}
            {activeTab === "mytrips"  && <MyTrips   user={user} setActiveTab={setActiveTab} />}
            {activeTab === "review"   && <LeaveReview user={user} />}
            {activeTab === "chat"     && <ChatBox />}
            {activeTab === "pricing" && <Pricing />}
          </div>
        </main>
      </div>
    </div>
  );
}