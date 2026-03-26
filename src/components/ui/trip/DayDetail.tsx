"use client";


function getTimeOfDay(time: string | null): "morning" | "afternoon" | "evening" {
  if (!time) return "morning";
  const hour = parseInt(time.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

const TIME_LABELS = {
  morning: { label: "Morning", color: "text-amber-400" },
  afternoon: { label: "Afternoon", color: "text-orange-400" },
  evening: { label: "Evening", color: "text-indigo-400" },
};

export default function DayDetail({ day }: { day: any }) {
  const grouped: Record<string, any[]> = { morning: [], afternoon: [], evening: [] };
  for (const activity of day.activities) {
    grouped[getTimeOfDay(activity.startTime)].push(activity);
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10 ">
        <div>
          <h2 className="text-3xl font-made-outer-alt font-bold text-white">Day {day.dayNumber}</h2>
          {day.summary && <p className="text-sm text-gray-400 mt-2 font-made-outer">{day.summary}</p>}
        </div>
      </div>

      {(["morning", "afternoon", "evening"] as const).map((period) => {
        const acts = grouped[period];
        if (acts.length === 0) return null;
        const { label, color } = TIME_LABELS[period];

        return (
          <div key={period} className="mb-8">
            <div className={`flex items-center gap-3 mb-4 ${color}`}>
              <span className="font-made-outer-alt font-bold text-base">{label}</span>
            </div>

            <div className="space-y-3">
              {acts.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/15 transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-made-outer-alt font-semibold text-white text-base">{activity.title}</p>
                      {activity.startTime && (
                        <span className="text-xs text-gray-400 shrink-0 font-made-outer">{activity.startTime}</span>
                      )}
                    </div>
                    {activity.description && (
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed font-made-outer">{activity.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {activity.location && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 font-made-outer">
                          📍 {activity.location}
                        </span>
                      )}
                      {activity.startTime && activity.endTime && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 font-made-outer">
                          ⏱ {activity.startTime} – {activity.endTime}
                        </span>
                      )}
                      {activity.estimatedCost != null && (
                        <span className="text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-md px-3 py-1 font-made-outer font-semibold">
                          € {activity.estimatedCost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}