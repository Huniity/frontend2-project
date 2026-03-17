import type { UserWithRelations } from "../Dashboard";

export default function MyTrips({ user }: { user: UserWithRelations }) {
  return (
    <div>
      <h1 className="text-2xl font-made-outer-alt font-bold mb-4">My Trips</h1>
      <p className="text-gray-500 text-sm font-made-outer mb-6">
        View and manage all your planned adventures in one place.
      </p>
      {user.trips.length === 0 && (
        <p className="text-gray-500 text-sm font-made-outer">No trips yet. Plan your first one!</p>
      )}
      <div className="grid grid-cols-3 gap-6">
        {user.trips.map((trip) => (
          <div key={trip.id} className="border border-white/15 rounded-2xl p-6 bg-white/5 backdrop-blur-lg">
            <p className="font-medium font-made-outer">{trip.destination}</p>
            <p className="text-xs text-gray-500 font-made-outer mt-1">
              {trip.startDate ? new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "TBD"}
            </p>
            <span className={`mt-3 inline-block text-xs px-3 py-1 rounded-full font-made-outer ${
              trip.status === "CONFIRMED" ? "bg-white/10 text-white border border-white/15" : "bg-white/5 text-gray-500"
            }`}>
              {trip.status.charAt(0) + trip.status.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}