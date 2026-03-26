"use client";

export default function DaySidebar({ days, selectedDay, onSelect, destination }: {
  days: any[];
  selectedDay: number | null;
  onSelect: (day: number | null) => void;
  destination: string;
}) {
  return (
    <aside className="w-52 shrink-0 border-r border-white/10 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-5 px-2 font-made-outer font-semibold">
          📍 {destination}
        </p>

        <button
          onClick={() => onSelect(null)}
          className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl mb-2 transition-all text-left border font-made-outer ${
            selectedDay === null
              ? "bg-linear-to-br from-white/15 to-white/8 border-white/25 text-white backdrop-blur-md"
              : "bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/15"
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
            selectedDay === null ? "bg-white/20" : "bg-white/10"
          }`}>
            📅
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Overall Overview</p>
            <p className="text-xs text-gray-400 mt-0.5">All days</p>
          </div>
        </button>


        <div className="space-y-2 mt-4">
          {days.map((day: any) => (
            <button
              key={day.id}
              onClick={() => onSelect(day.dayNumber)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-left border font-made-outer ${
                selectedDay === day.dayNumber
                  ? "bg-linear-to-br from-orange-500/40 to-red-500/30 border-orange-500/40 text-white backdrop-blur-md shadow-lg shadow-orange-500/10"
                  : "bg-transparent border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/15"
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                selectedDay === day.dayNumber ? "bg-white/25" : "bg-white/10"
              }`}>
                {day.dayNumber}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Day {day.dayNumber}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{day.summary ?? "—"}</p>
              </div>
              <span className="text-xs text-gray-500 shrink-0 font-semibold">{day.activities.length}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}