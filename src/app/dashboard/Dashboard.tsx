"use client";

import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineFlightTakeoff, MdOutlineEmojiEvents } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { RiUserLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/app/auth/actions";
import type { User, Trip, UserTrophy, Trophy } from "@/generated/prisma/client";
import { useSearchParams, useRouter } from "next/navigation";

import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Trophies from "./components/Trophies";
import MyTrips from "./components/MyTrips";
import ChatBox from "@/components/ui/chat/ChatBox";
import Pricing from "@/components/ui/pricing/Pricing";

export type UserWithRelations = User & {
  trips: (Trip & { _count: { days: number } })[];
  trophies: (UserTrophy & { trophy: Trophy })[];
  _count: { trips: number; trophies: number };
};

export type Tab = "overview" | "settings" | "trophies" | "mytrips" | "chat" | "pricing";

export default function Dashboard({ user, allTrophies }: { user: UserWithRelations; allTrophies: Trophy[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tab = searchParams.get("tab") as Tab | null;
    if (tab) setActiveTab(tab);

    if (tab) {
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams]);


  const navItems = [
    { tab: "overview" as Tab, icon: MdOutlineFlightTakeoff, label: "Overview" },
    { tab: "settings" as Tab, icon: AiOutlineStar, label: "Settings" },
    { tab: "trophies" as Tab, icon: MdOutlineEmojiEvents, label: "Trophies" },
    { tab: "mytrips" as Tab, icon: MdOutlineFlightTakeoff, label: "My Trips" },
    { tab: "chat" as Tab, icon: MdOutlineFlightTakeoff, label: "Chat" },
    { tab: "pricing" as Tab, icon: GiMoneyStack, label: "Pricing" },
  ];

  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-72 border-r border-white/15 bg-white/5 backdrop-blur-xl pt-18 px-8 flex flex-col justify-between pb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition mb-28 font-made-outer-alt font-bold">
              <IoArrowBack size={20} />
              Back
            </Link>

            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center overflow-hidden">
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
                  <RiUserLine className="text-white" size={28} />
                )}
              </div>
              <div className="text-center">
                <p className="font-made-outer-alt font-bold text-lg">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-500 font-made-outer">{user.email}</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map(({ tab, icon: Icon, label }) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                    activeTab === tab ? "bg-white/10 backdrop-blur-md text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <form action={signOut}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium font-made-outer text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none w-full">
              <FiLogOut size={18} />
              Log out
            </button>
          </form>
        </aside>

        {/* Background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: "url(/hawaii.jpg)",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(0.3) contrast(1) saturate(2) sepia(0.15)",
          }}
        />

        {/* Main content */}
        <main className="ml-72 flex-1 pt-16 px-16 pb-12 min-h-screen">
          {activeTab === "overview"  && <Overview  user={user} setActiveTab={setActiveTab} />}
          {activeTab === "settings" && <Settings user={user} />}
          {activeTab === "trophies" && <Trophies  user={user} allTrophies={allTrophies} />}
          {activeTab === "mytrips"  && <MyTrips   user={user} />}
          {activeTab === "chat"     && <ChatBox />}
          {activeTab === "pricing" && <Pricing userPlan={user.plan} />}
        </main>
      </div>
    </div>
  );
}