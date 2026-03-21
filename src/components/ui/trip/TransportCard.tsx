import { FaTrain } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaFerry } from "react-icons/fa6";
import { FaTruckPlane } from "react-icons/fa6";


const MODE_EMOJI: Record<string, JSX.Element> = {
  FLIGHT: <MdFlight />,
  TRAIN: <FaTrain />,
  BUS: <FaBusAlt />,
  CAR: <FaCar />,
  FERRY: <FaFerry />,
  OTHER: <FaTruckPlane />,
};

type Transportation = {
  id: string;
  mode: string;
  provider: string | null;
  departureFrom: string | null;
  arrivalTo: string | null;
  estimatedCost: number | null;
  budgetNote: string | null;
  notes: string | null;
};

export default function TransportCard({ transportation }: { transportation: Transportation }) {

  let dailyTransport: { mode: string; estimatedCostPerDay: number; tips: string } | null = null;
  try {
    if (transportation.notes) {
      dailyTransport = JSON.parse(transportation.notes);
    }
  } catch {}

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{MODE_EMOJI[transportation.mode] ?? "🚀"}</span>
          <h3 className="font-bold text-white text-base">Getting There</h3>
        </div>

        <p className="font-semibold text-white capitalize">
          {transportation.mode.toLowerCase()}
          {transportation.provider && ` · ${transportation.provider}`}
        </p>

        {(transportation.departureFrom || transportation.arrivalTo) && (
          <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-1">
            <span>{transportation.departureFrom}</span>
            <span>→</span>
            <span>{transportation.arrivalTo}</span>
          </p>
        )}

        {transportation.estimatedCost != null && (
          <div className="flex justify-between text-sm mt-3 border-t border-white/8 pt-3">
            <span className="text-gray-500">Est. cost/person</span>
            <span className="text-amber-400 font-semibold">${transportation.estimatedCost}</span>
          </div>
        )}

        {transportation.budgetNote && (
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {transportation.budgetNote}
          </p>
        )}
      </div>

      {/* Daily local transport */}
      {dailyTransport && (
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-white text-base">Getting Around Daily</h3>
          </div>

          <p className="font-semibold text-white capitalize text-sm">
            {dailyTransport.mode}
          </p>

          {dailyTransport.estimatedCostPerDay != null && (
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Est. cost/day/person</span>
              <span className="text-amber-400 font-semibold">${dailyTransport.estimatedCostPerDay}</span>
            </div>
          )}

          {dailyTransport.tips && (
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {dailyTransport.tips}
            </p>
          )}
        </div>
      )}
    </div>
  );
}