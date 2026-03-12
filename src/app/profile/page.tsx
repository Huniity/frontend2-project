"use client";

import { useState } from "react";
import { RiUserLine } from "react-icons/ri";
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
import { FiEdit2, FiLogOut, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

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

const recentTrips = [
  { destination: "Tokyo, Japan", date: "Feb 2026", status: "Completed" },
  { destination: "Lisbon, Portugal", date: "Jan 2026", status: "Completed" },
  { destination: "Bali, Indonesia", date: "Mar 2026", status: "Upcoming" },
];

const trophies = [
  { name: "First Trip", description: "Planned your first trip with Nomadia" },
  { name: "Globe Trotter", description: "Visited 5 different countries" },
  { name: "Early Adopter", description: "Joined during the beta period" },
];

type Tab = "overview" | "settings";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar + Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-72 border-r border-white/15 bg-white/5 backdrop-blur-xl pt-32 px-8 flex flex-col justify-between pb-8">
          {/* User info */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
                <RiUserLine className="text-white" size={28} />
              </div>
              <div>
                <p className="font-bold text-lg">Adrien Dejonc</p>
                <p className="text-xs text-gray-500">Globetrotter Plan</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                  activeTab === "overview"
                    ? "bg-white/10 backdrop-blur-md text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MdOutlineFlightTakeoff size={18} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-transparent border-none text-left ${
                  activeTab === "settings"
                    ? "bg-white/10 backdrop-blur-md text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <AiOutlineStar size={18} />
                Settings
              </button>
              <Link
                href="/trips"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors no-underline"
              >
                <MdOutlineFlightTakeoff size={18} />
                My Trips
              </Link>
              <Link
                href="/trophies"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors no-underline"
              >
                <MdOutlineEmojiEvents size={18} />
                Trophies
              </Link>
            </nav>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer bg-transparent border-none">
            <FiLogOut size={18} />
            Log out
          </button>
        </aside>

        {/* Main Content */}
        <main className="ml-72 flex-1 pt-32 px-16 pb-24 min-h-screen">
          {activeTab === "overview" && (
            <div>
              {/* Welcome Header */}
              <div className="mb-12">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, <span className="italic">Adrien</span>
                </h1>
                <p className="text-gray-500 text-sm">
                  Here&apos;s a summary of your Nomadia activity.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6 mb-14">
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Total Trips
                  </p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Countries
                  </p>
                  <p className="text-3xl font-bold">7</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Trophies
                  </p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Plan
                  </p>
                  <p className="text-xl font-bold mt-1">Globetrotter</p>
                </div>
              </div>

              {/* Two-column: Recent Trips + Trophies */}
              <div className="grid grid-cols-2 gap-8">
                {/* Recent Trips */}
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Recent Trips</h2>
                    <Link
                      href="/trips"
                      className="text-xs text-gray-500 hover:text-white transition-colors no-underline flex items-center gap-1"
                    >
                      View all <FiChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentTrips.map((trip) => (
                      <div
                        key={trip.destination}
                        className="flex items-center justify-between py-3 border-b border-white/5 last:border-none"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {trip.destination}
                          </p>
                          <p className="text-xs text-gray-500">{trip.date}</p>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            trip.status === "Upcoming"
                              ? "bg-white/10 backdrop-blur-sm text-white border border-white/15"
                              : "bg-white/5 text-gray-500"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trophies */}
                <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Trophies</h2>
                    <Link
                      href="/trophies"
                      className="text-xs text-gray-500 hover:text-white transition-colors no-underline flex items-center gap-1"
                    >
                      View all <FiChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {trophies.map((trophy) => (
                      <div
                        key={trophy.name}
                        className="flex items-center gap-4 py-3 border-b border-white/5 last:border-none"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0">
                          <MdOutlineEmojiEvents
                            className="text-gray-400"
                            size={20}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{trophy.name}</p>
                          <p className="text-xs text-gray-500">
                            {trophy.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-14">
                <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-3 gap-6">
                  <Link
                    href="/trips"
                    className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group"
                  >
                    <MdOutlineFlightTakeoff
                      className="text-gray-400 group-hover:text-white transition-colors mb-3"
                      size={24}
                    />
                    <p className="font-medium text-sm">Plan a New Trip</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Start building your next adventure
                    </p>
                  </Link>
                  <Link
                    href="/pricing"
                    className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group"
                  >
                    <FiEdit2
                      className="text-gray-400 group-hover:text-white transition-colors mb-3"
                      size={24}
                    />
                    <p className="font-medium text-sm">Upgrade Plan</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Unlock more features and destinations
                    </p>
                  </Link>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-white group cursor-pointer text-left"
                  >
                    <AiOutlineStar
                      className="text-gray-400 group-hover:text-white transition-colors mb-3"
                      size={24}
                    />
                    <p className="font-medium text-sm">Edit Preferences</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Customize your Nomadia experience
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-12">
                <h1 className="text-2xl font-bold italic mb-4">
                  Profile Settings
                </h1>
                <div className="space-y-4 text-sm text-gray-400 leading-relaxed max-w-xl">
                  <p>
                    Manage your profile details and account preferences in a
                    simple, user-friendly way.
                  </p>
                  <p>
                    Update your name, email, or password securely. Changes are
                    saved instantly so you&apos;re always up to date.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-y-14 gap-x-10 max-w-4xl">
                {settingsItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex flex-col items-center gap-3 group cursor-pointer border border-white/15 rounded-2xl py-8 px-4 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <item.icon
                      className="text-gray-400 group-hover:text-white transition-colors duration-200"
                      size={32}
                    />
                    <span className="text-sm font-bold text-white">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}