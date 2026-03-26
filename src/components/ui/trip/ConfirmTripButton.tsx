"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function ConfirmTripButton({ tripSlug, status }: { tripSlug: string; status: string }) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(status === "CONFIRMED");
  const router = useRouter();

  if (confirmed) {
    return (
      <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 font-made-outer-alt font-semibold">
        <CheckCircle className="w-5 h-5" />
        Trip Confirmed
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trips/${tripSlug}/confirm`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to confirm");
      setConfirmed(true);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="font-made-outer-alt px-6 py-3 rounded-xl bg-linear-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border border-orange-500/30 text-orange-300 hover:bg-linear-to-r hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-500/50 text-sm font-semibold transition-all duration-200 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
    >
      {loading ? "Confirming..." : "Confirm Trip"}
    </button>
  );
}