"use client";

import { useState } from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import DaySidebar from "./DaySidebar";
import DayDetail from "./DayDetail";
import TripMap from "./TripMap";
import DayNarrative from "./DayNarrative";
import ConfirmTripButton from "./ConfirmTripButton";

const TRIP_TYPE_EMOJI: Record<string, string> = {
  ROMANTIC: "💑", ADVENTUROUS: "🧗", FAMILY: "👨‍👩‍👧",
  CULTURAL: "🏛️", RELAXATION: "🧘", BUSINESS: "💼", SOLO: "🎒",
};

export default function TripPageClient({ trip, aiTips }: { trip: any; aiTips: string[] }) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const activeDays = trip.days ?? [];
  const currentDay = selectedDay
    ? activeDays.find((d: any) => d.dayNumber === selectedDay)
    : null;

  // All activities flat (for overview map)
  const allActivities = activeDays.flatMap((d: any) =>
    d.activities.map((a: any) => {
      let coords = null;
      try { if (a.notes) coords = JSON.parse(a.notes); } catch {}
      return { ...a, day: d.dayNumber, lat: coords?.lat, lng: coords?.lng };
    })
  );

  // Activities for current day (for filtered map)
  const mapActivities = currentDay
    ? currentDay.activities.map((a: any) => {
        let coords = null;
        try { if (a.notes) coords = JSON.parse(a.notes); } catch {}
        return { ...a, day: currentDay.dayNumber, lat: coords?.lat, lng: coords?.lng };
      })
    : allActivities;

  return (
    <div className="min-h-screen bg-black text-white " style={{ backgroundImage: 'url(/city.jpg)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)' }}>
      {/* Content */}
      <div className="pt-64 max-w-7xl mx-auto px-8 py-8 ">
        {/* Day Navigation */}
      <div className="py-8 px-8 bg-black/50 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
            <button
              onClick={() => setSelectedDay(null)}
              className={`px-6 py-3 rounded-xl font-made-outer font-semibold transition-all whitespace-nowrap ${
                selectedDay === null
                    ? "bg-linear-to-r from-black/20 to-black/40 border border-white/30 text-emerald-300 shadow-md shadow-black/20"
                    : "bg-white/8 border border-white/15 text-gray-300 hover:bg-white/12"
              }`}
            >
              Overview
            </button>
            {trip.days.map((day: any) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`px-6 py-3 rounded-xl font-made-outer font-semibold transition-all whitespace-nowrap ${
                  selectedDay === day.dayNumber
                    ? "bg-linear-to-r from-black/20 to-black/40 border border-white/30 text-emerald-300 shadow-md shadow-black/20"
                    : "bg-white/8 border border-white/15 text-gray-300 hover:bg-white/12"
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>
          <div className="shrink-0 ml-4">
            <ConfirmTripButton tripId={trip.id} status={trip.status} />
          </div>
        </div>

        {/* Main Content */}
        {currentDay ? (
          <div className="grid grid-cols-3 gap-8">
            {/* Left: Day Details */}
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-4xl font-made-outer-alt font-bold mb-2">Day {currentDay.dayNumber}</h2>
                {currentDay.summary && <p className="text-gray-400 font-made-outer">{currentDay.summary}</p>}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-made-outer mb-2">Activities</p>
                  <p className="text-3xl font-bold font-made-outer-alt">{currentDay.activities.length}</p>
                </div>
                {currentDay.dailyCost != null && (
                  <div className="bg-linear-to-br bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 backdrop-blur-md rounded-2xl p-6">
                    <p className="text-xs text-emerald-300 uppercase tracking-wider font-made-outer mb-2">Est. Cost</p>
                    <p className="text-3xl font-bold font-made-outer-alt text-emerald-200">${currentDay.dailyCost}</p>
                  </div>
                )}
              </div>

              {/* Activities */}
              <DayDetail day={currentDay} />
              <DayNarrative day={currentDay} />
            </div>

            {/* Right: Map */}
            <div className="col-span-1">
              <div className="sticky mt-32 top-24 rounded-2xl overflow-hidden border border-white/15 bg-black/40" style={{ height: "500px" }}>
                <TripMap activities={mapActivities} selectedDay={selectedDay} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Left: Overview */}
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-4xl font-made-outer-alt font-bold mb-2">Trip Overview</h2>
                <p className="text-gray-400 font-made-outer">Summary of your {trip.destination} adventure</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-made-outer mb-2">Total Days</p>
                  <p className="text-3xl font-bold font-made-outer-alt">{trip.numberOfDays}</p>
                </div>
                <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-made-outer mb-2">Activities</p>
                  <p className="text-3xl font-bold font-made-outer-alt">{trip.days.reduce((sum: number, d: any) => sum + d.activities.length, 0)}</p>
                </div>
                <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-made-outer mb-2">Budget Level</p>
                  <p className="text-lg font-bold font-made-outer-alt">
                    {trip.budgetLevel === "LOW" ? "Budget" : trip.budgetLevel === "MEDIUM" ? "Standard" : "Luxury"}
                  </p>
                </div>
                {trip.totalBudget && (
                  <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 backdrop-blur-md rounded-2xl p-6">
                    <p className="text-xs text-emerald-300 uppercase tracking-wider font-made-outer mb-2">Total Budget</p>
                    <p className="text-3xl font-bold font-made-outer-alt text-emerald-300">${trip.totalBudget}</p>
                  </div>
                )}
              </div>

              {/* Days Grid */}
              <div className="space-y-3">
                {activeDays.map((day: any) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.dayNumber)}
                    className="w-full text-left bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/12 hover:border-white/25 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-made-outer-alt font-bold shrink-0">
                          {day.dayNumber}
                        </div>
                        <div>
                          <h3 className="font-made-outer-alt font-bold text-white text-lg">Day {day.dayNumber}</h3>
                          {day.summary && <p className="text-sm text-gray-400 font-made-outer mt-0.5">{day.summary}</p>}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-made-outer shrink-0">{day.activities.length} activities</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.activities.slice(0, 3).map((a: any) => (
                        <span key={a.id} className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-gray-300 font-made-outer">
                          {a.title}
                        </span>
                      ))}
                      {day.activities.length > 3 && (
                        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-500 font-made-outer">
                          +{day.activities.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Map */}
            <div className="col-span-1">
              <div className=" mt-25 top-24 rounded-2xl overflow-hidden border border-white/15 bg-black/40" style={{ height: "500px" }}>
                <TripMap activities={mapActivities} selectedDay={selectedDay} />
              </div>
            </div>
          </div>
        )}
        </div>  
      </div>
    </div>
  );
}