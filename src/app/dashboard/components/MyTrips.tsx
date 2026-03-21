"use client";

import Link from "next/link";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import type { UserWithRelations } from "../Dashboard";


const STATUS_STYLES: Record<string, string> = {
  GENERATING: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  DRAFT:      "bg-blue-500/10 text-blue-300 border-blue-500/30",
  CONFIRMED:  "bg-green-500/10 text-green-300 border-green-500/30",
  COMPLETED:  "bg-gray-500/10 text-gray-300 border-gray-500/30",
};


type Filter = "ALL" | "DRAFT" | "CONFIRMED" | "COMPLETED";

type Trip = {
  id: string;
  title: string;
  destination: string;
  numberOfDays: number;
  budgetLevel: string;
  totalBudget?: number | null;
  status: string;
  createdAt: Date | string;
};

export default function MyTrips({ user }: { user: UserWithRelations }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [trips, setTrips] = useState<Trip[]>(user.trips);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = trips.filter((t) =>
    filter === "ALL" ? true : t.status === filter
  );

  const handleDelete = async (tripId: string) => {
    setDeletingId(tripId);
    try {
      const res = await fetch(`/api/trips/${tripId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-made-outer-alt font-bold mb-2">My Trips</h1>
        <p className="text-gray-500 text-sm font-made-outer">
          View and manage all your planned adventures in one place.
        </p>
      </div>

      {/* Filters + New Trip */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {(["ALL", "DRAFT", "CONFIRMED", "COMPLETED"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-made-outer transition-colors cursor-pointer border-none ${
                filter === f
                  ? "bg-white/10 backdrop-blur-md text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5 bg-transparent"
              }`}
            >
              {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
              <span className="ml-2 text-xs text-gray-500">
                {f === "ALL"
                  ? trips.length
                  : trips.filter((t) => t.status === f).length}
              </span>
            </button>
          ))}
        </div>

        <Link
          href="/agent"
          className="px-4 py-2 rounded-xl border border-gray-400 text-gray-400 hover:text-white hover:bg-white/5 bg-transparent text-sm font-semibold font-made-outer transition-colors no-underline"
        >
          + New Trip
        </Link>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
          <p className="text-4xl mb-4">✈️</p>
          <p className="text-white font-made-outer-alt font-bold text-lg mb-2">No trips yet</p>
          <p className="text-gray-500 text-sm font-made-outer mb-6">
            {filter === "ALL"
              ? "Start planning your first adventure!"
              : `No ${filter.toLowerCase()} trips found.`}
          </p>
          <Link
            href="/agent"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold font-made-outer transition-colors no-underline inline-block"
          >
            Plan a Trip
          </Link>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-6">
        {filtered.map((trip) => (
          <div key={trip.id} className="relative group">
            <Link href={`/trips/${trip.id}`} className="no-underline">
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">

                {/* Color banner */}
                <div className={`h-2 w-full ${
                  trip.status === "CONFIRMED"
                    ? "bg-linear-to-r from-black/10 to-emerald-500"
                    : trip.status === "DRAFT"
                    ? "bg-linear-to-r from-black/10 to-indigo-500"
                    : trip.status === "GENERATING"
                    ? "bg-linear-to-r from-black/10 to-amber-500"
                    : "bg-linear-to-r from-black/10 to-gray-600"
                }`} />

                <div className="p-5 flex flex-col flex-1 gap-3">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium font-made-outer ${STATUS_STYLES[trip.status]}`}>
                      {trip.status.charAt(0) + trip.status.slice(1).toLowerCase()}
                    </span>
                  </div>

                  {/* Title + destination */}
                  <div>
                    <p className="font-bold text-white font-made-outer-alt leading-tight line-clamp-2">
                      {trip.title}
                    </p>
                    <p className="text-xs text-gray-500 font-made-outer mt-1">
                      📍 {trip.destination}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 flex-wrap mt-auto pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-400 font-made-outer">
                      📅 {trip.numberOfDays} days
                    </span>
                    <span className="text-xs text-gray-400 font-made-outer">
                      Budget Type: {trip.budgetLevel}
                    </span>
                    {trip.totalBudget && (
                      <span className="text-xs text-gray-400 font-made-outer">
                        💰 ${trip.totalBudget.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <p className="text-[11px] text-gray-600 font-made-outer">
                    Created {new Date(trip.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>

            {/* Delete button — shown on hover */}
            {confirmDeleteId !== trip.id ? (
                <button
                    onClick={(e) => {
                    e.preventDefault();
                    setConfirmDeleteId(trip.id);
                    }}
                    aria-label={`Delete trip ${trip.title}`}
                    className="absolute bottom-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"
                >
                    <FiTrash2 size={14} />
                </button>
                ) : (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/90 border border-red-500/30 rounded-xl px-3 py-2 shadow-lg">
                    <span className="text-xs text-gray-300 font-made-outer mr-1">Delete?</span>
                    <button
                    onClick={() => handleDelete(trip.id)}
                    disabled={deletingId === trip.id}
                    aria-label="Confirm delete trip"
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg font-medium disabled:opacity-50 transition-colors"
                    >
                    {deletingId === trip.id ? "..." : "Yes"}
                    </button>
                    <button
                    onClick={() => setConfirmDeleteId(null)}
                    aria-label="Cancel delete"
                    className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-lg transition-colors"
                    >
                    No
                    </button>
                </div>
                )}
          </div>
        ))}
      </div>
    </div>
  );
}