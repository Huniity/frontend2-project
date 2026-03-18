"use client";

import dynamic from "next/dynamic";

const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

const DAY_COLORS = [
  "#f97316", "#10b981", "#3b82f6", "#ef4444",
  "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899",
];

export default function TripMap({ activities, selectedDay }: {
  activities: any[];
  selectedDay: number | null;
}) {
  const valid = activities.filter((a) => a.lat && a.lng);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: "calc(100vh - 120px)" }}>
      {valid.length > 0 ? (
        <MapInner activities={valid} selectedDay={selectedDay} dayColors={DAY_COLORS} />
      ) : (
        <div className="h-full flex items-center justify-center bg-white/5 text-gray-600 text-sm">
          No location data available
        </div>
      )}
    </div>
  );
}