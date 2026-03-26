import { ChevronRight, Edit, Plane, Star, Rss } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { UserWithRelations, Tab } from "../Dashboard";

const planLabel: Record<string, string> = {
  FREE: "Free",
  NOMAD: "Nomad",
  GLOBETROTTER: "Globetrotter",
};

export default function Overview({ user, setActiveTab }: { user: UserWithRelations; setActiveTab: (tab: Tab) => void }) {
  const firstName = user.first_name ?? "Traveler";
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  useEffect(() => {
    if (user.plan === "FREE") return;

    const fetchSubscription = async () => {
      try {
        const res = await fetch("/api/stripe/subscription");
        const data = await res.json();
        if (data.currentPeriodEnd) {
          setSubscriptionEnd(
            new Date(data.currentPeriodEnd * 1000).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscription();
  }, [user.plan]);

  return (
    <div>
      <div className="mb-18">
        <h1 className="text-3xl font-made-outer-alt font-bold mb-2">
          Welcome back, <span className="italic">{firstName}</span>
        </h1>
        <p className="text-gray-500 text-sm font-made-outer">
          Here&apos;s a summary of your Nomadia activity.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Total Trips", value: user._count.trips },
          { label: "Destinations", value: new Set(user.trips.map((t: any) => t.destination.split(",").pop()?.trim())).size },
          { label: "Trophies", value: user._count.trophies },
          { label: "Plan", value: planLabel[user.plan ?? "FREE"] ?? "Free", small: true },
        ].map(({ label, value, small }) => (
          <div key={label} className="h-36 border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-made-outer">{label}</p>
            <p className={`font-bold ${small ? "text-xl mt-1" : "text-3xl"}`}>{value}</p>
            {label === "Plan" && subscriptionEnd && (
              <p className="text-sm text-emerald-300 font-made-outer mt-1">
                Expires {subscriptionEnd}
              </p>
            )}
            {label === "Plan" && user.plan === "FREE" && (
              <button
                onClick={() => setActiveTab("pricing")}
                className="text-[11px] text-orange-400 font-made-outer mt-1 hover:text-orange-300 transition-colors bg-transparent border-none cursor-pointer p-0"
              >
                Upgrade →
              </button>
            )}
          </div>
        ))}
      </div>


      <div className="grid xl:grid-cols-2 gap-6">
        <div className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-made-outer-alt font-bold">Recent Trips</h2>
            <button onClick={() => setActiveTab("mytrips")} className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-made-outer bg-transparent border-none cursor-pointer">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-4">
            {user.trips.length === 0 && (
              <p className="text-gray-500 text-sm font-made-outer">No trips yet. Plan your first one!</p>
            )}
            {user.trips.slice(0, 3).map((trip: any) => (
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
            <button onClick={() => setActiveTab("trophies")} className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-made-outer bg-transparent border-none cursor-pointer">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-4">
            {user.trophies.length === 0 && (
              <p className="text-gray-500 text-sm font-made-outer">No trophies yet. Start exploring!</p>
            )}
            {user.trophies.slice(0, 3).map(({ trophy }: any) => (
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
        <div className="grid xl:grid-cols-4 gap-6">
          <button onClick={() => setActiveTab("mytrips")} className="text-left border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group">
            <Plane className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
            <p className="font-medium text-sm font-made-outer">Plan a New Trip</p>
            <p className="text-xs text-gray-500 mt-1 font-made-outer">Start building your next adventure</p>
          </button>
          <Link href="/blog" className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-white group cursor-pointer text-left">
            <Rss className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
            <p className="font-medium text-sm font-made-outer">Visit Community Blog</p>
            <p className="text-xs text-gray-500 mt-1 font-made-outer">Read the latest articles and updates</p>
          </Link>
          <Link href="/pricing" className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 no-underline text-white group">
            <Edit className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
            <p className="font-medium text-sm font-made-outer">Upgrade Plan</p>
            <p className="text-xs text-gray-500 mt-1 font-made-outer">Unlock more features and destinations</p>
          </Link>
          <button onClick={() => setActiveTab("settings")} className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-white group cursor-pointer text-left">
            <Star className="text-gray-400 group-hover:text-white transition-colors mb-3" size={24} />
            <p className="font-medium text-sm font-made-outer">Edit Preferences</p>
            <p className="text-xs text-gray-500 mt-1 font-made-outer">Customize your Nomadia experience</p>
          </button>
        </div>
      </div>
    </div>
  );
}