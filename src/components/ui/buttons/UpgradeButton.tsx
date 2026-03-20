"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ToastDuration = 3000;

export default function UpgradeButton({
  plan,
  interval,
  label = "Get Started",
  className = "",
}: {
  plan: "NOMAD" | "GLOBETROTTER";
  interval: "monthly" | "annual";
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    const toastId = toast.loading("Preparing checkout...");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, interval }),
      });
      const data = await res.json();

      if (data.url) {
        toast.update(toastId, {
          render: "Redirecting to checkout...",
          type: "success",
          isLoading: false,
          autoClose: ToastDuration,
        });
        setLoading(false);
        setRedirecting(true);
        setTimeout(() => {
          router.push(data.url);
        }, ToastDuration);
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: ToastDuration,
      });
      setLoading(false);
      setRedirecting(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading || redirecting}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? "Loading..." : redirecting ? "Redirecting..." : label}
    </button>
  );
}