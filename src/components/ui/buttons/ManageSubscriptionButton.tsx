"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManage = async () => {
    setLoading(true);
    const toastId = toast.loading("Opening billing portal...");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        toast.update(toastId, {
          render: "Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.push(data.url);
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-colors disabled:opacity-50"
    >
      {loading ? "Loading..." : "Manage Subscription"}
    </button>
  );
}