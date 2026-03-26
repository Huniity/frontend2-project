"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const INACTIVITY_LIMIT = 60 * 60 * 1000;
const WARNING_BEFORE = 60 * 1000;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/login");
        }
        if (event === "TOKEN_REFRESHED" && !session) {
          router.push("/login");
        }
      }
    );

    const doLogout = async () => {
      setShowWarning(false);
      await supabase.auth.signOut();
      router.push("/login");
    };

    const startCountdown = () => {
      setCountdown(60);
      setShowWarning(true);
      let secs = 60;
      countdownRef.current = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(countdownRef.current!);
          doLogout();
        }
      }, 1000);
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setShowWarning(false);

      warningRef.current = setTimeout(() => {
        startCountdown();
      }, INACTIVITY_LIMIT - WARNING_BEFORE);

      timerRef.current = setTimeout(() => {
        doLogout();
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [router]);

  const handleStayLoggedIn = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setShowWarning(false);
    const supabase = createClient();
    supabase.auth.refreshSession();
  };

  return (
    <>
      {children}

      {showWarning && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl mx-auto mb-4">
              ⏱️
            </div>

            <h3 className="text-lg font-bold text-center mb-2">
              Still there?
            </h3>
            <p className="text-sm text-gray-400 text-center mb-1">
              You've been inactive for a while.
            </p>
            <p className="text-sm text-gray-400 text-center mb-6">
              You'll be logged out in{" "}
              <span className="text-orange-400 font-bold text-base">
                {countdown}s
              </span>
            </p>

            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / 60) * 100}%` }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  if (countdownRef.current) clearInterval(countdownRef.current);
                  setShowWarning(false);
                  const supabase = createClient();
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors"
              >
                Log out
              </button>
              <button
                onClick={handleStayLoggedIn}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
              >
                Stay logged in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}