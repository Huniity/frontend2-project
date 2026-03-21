
import { MdHotel } from "react-icons/md";

type Hotel = {
  id: string;
  name: string;
  address: string | null;
  pricePerNight: number | null;
  totalCost: number | null;
  stars: number | null;
  notes: string | null;
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl"><MdHotel /></span>
        <h3 className="font-bold text-white text-base">Hotel</h3>
      </div>

      <p className="font-semibold text-white text-lg">{hotel.name}</p>

      {hotel.stars && (
        <p className="text-amber-400 text-sm mt-1">
          {"★".repeat(hotel.stars)}{"☆".repeat(5 - hotel.stars)}
        </p>
      )}

      {hotel.address && (
        <p className="text-sm text-gray-500 mt-2 flex items-start gap-1">
          <span>📍</span> {hotel.address}
        </p>
      )}

      <div className="mt-4 space-y-2 border-t border-white/8 pt-4">
        {hotel.pricePerNight != null && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Per night</span>
            <span className="text-white font-medium">${hotel.pricePerNight}</span>
          </div>
        )}
        {hotel.totalCost != null && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total stay</span>
            <span className="text-amber-400 font-semibold">${hotel.totalCost}</span>
          </div>
        )}
      </div>

      {hotel.notes && (
        <p className="text-sm text-gray-600 mt-4 leading-relaxed border-t border-white/8 pt-4">
          {hotel.notes}
        </p>
      )}
    </div>
  );
}