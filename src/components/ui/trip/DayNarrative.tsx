export default function DayNarrative({ day }: { day: any }) {
  if (!day.notes) return null;

  return (
    <div className="mt-8 bg-linear-to-br from-white/8 to-white/4 backdrop-blur-md border border-white/15 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-base font-made-outer-alt font-bold text-white">Day {day.dayNumber} Overview</h4>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed font-made-outer">{day.notes}</p>
    </div>
  );
}