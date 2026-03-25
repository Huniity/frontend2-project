'use client'

import { useState, useEffect, useRef } from "react";
import { Check, Flame, TimerOff, ShieldCheck, Calendar1, ReceiptText, BookmarkX } from "lucide-react";
import UpgradeButton from "@/components/ui/buttons/UpgradeButton";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { pricing } from "@/lib/utils/pricing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingComponent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const perksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        const res = await fetch("/api/user/plan");
        const data = await res.json();
        setUserPlan(data.plan ?? "FREE");
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, {
        opacity: 0,
        y: 24,
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 28,
      });

      gsap.set(perksRef.current, {
        opacity: 0,
        y: 18,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
            .to(
              cardsRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                stagger: 0.12,
              },
              "-=0.15"
            )
            .to(
              perksRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              "-=0.15"
            );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderButton = (plan: typeof pricing[number]) => {
    if (loading) {
      return (
        <button disabled className="w-full py-3 rounded-lg font-made-outer font-bold mb-8 border border-white/10 text-gray-600 cursor-not-allowed">
          Loading your current plan...
        </button>
      );
    }

    if (!isLoggedIn) {
      return (
        <button
          onClick={() => router.push("/signin")}
          className={`w-full py-3 rounded-lg font-made-outer font-bold mb-8 transition-all duration-300 ${
            plan.highlighted
              ? "bg-white text-black hover:bg-gray-100"
              : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
          }`}
        >
          Get Started
        </button>
      );
    }

    if (!plan.stripePlan) {
      return (
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-3 rounded-lg font-made-outer font-bold mb-8 transition-all duration-300 border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
        >
          {userPlan === "FREE" ? "Current Plan ✓" : "Go to Dashboard"}
        </button>
      );
    }

    if (userPlan === plan.stripePlan) {
      return (
        <button
          disabled
          className="w-full py-3 rounded-lg font-made-outer font-bold mb-8 border border-green-500/40 text-green-400 bg-green-500/10 cursor-default"
        >
          Current Plan ✓
        </button>
      );
    }

    if (userPlan && userPlan !== "FREE" && userPlan !== plan.stripePlan) {
      return (
        <button
          disabled
          className="w-full py-3 rounded-lg font-made-outer font-bold mb-8 border border-white/10 text-gray-500 cursor-not-allowed"
          title="Manage your subscription in dashboard settings."
        >
          Already Subscribed
        </button>
      );
    }

    return (
      <UpgradeButton
        plan={plan.stripePlan}
        interval={isAnnual ? "annual" : "monthly"}
        label="Get Started"
        className={`w-full py-3 rounded-lg font-made-outer font-bold mb-8 transition-all duration-300 ${
          plan.highlighted
            ? "bg-white text-black hover:bg-gray-100"
            : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
        }`}
      />
    );
  };

  return (
    <div ref={sectionRef} className="text-white">
      <div className="max-w-7xl mx-auto xl:pt-24 px-7 xl:px-12 pb-24">
        <div ref={headerRef} className="text-center mb-12 xl:mb-18">
          <h1 className="font-made-outer-alt text-5xl xl:text-5xl font-black text-white xl:ml-48 xl:mr-48 text-center">
            Start yoUr joUrnEy
          </h1>
          <h2 className="font-made-outer-alt text-5xl xl:text-5xl font-black text-gray-400 xl:ml-48 xl:mr-48 text-center leading-22">
            bE Nomad
          </h2>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-4 mt-12 mb-2 mr-4">
              <span className={`font-made-outer font-bold ${!isAnnual ? "text-white" : "text-gray-400"}`}>
                monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                role="switch"
                aria-checked={isAnnual}
                aria-label="Toggle between monthly and annual billing"
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/10 border border-white/15 transition-colors hover:bg-white/15"
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-7" : "translate-x-1"}`} />
              </button>
              <span className={`font-made-outer font-bold ${isAnnual ? "text-white" : "text-gray-400"}`}>
                annual
              </span>
            </div>
            <span className={`px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs font-made-outer text-green-400 transition-opacity ${isAnnual ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              save 17%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-36 min-h-130">
          {pricing.map((plan, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-white/30 bg-white/10 backdrop-blur-xl scale-105 md:scale-110"
                  : "border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25"
              }`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="p-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-2xl font-made-outer-alt font-bold text-white">
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <div className="shrink-0">
                      <Flame size="20" color="rgba(221, 132, 72, 0.92)" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 font-made-outer mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-made-outer-alt text-white">
                      {plan.monthlyPrice === 0 ? "frEE" : isAnnual ? `$${plan.annualPrice}` : `${plan.price}`}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-400 font-made-outer">
                        {isAnnual ? "/year" : "/month"}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.monthlyPrice > 0 && (
                    <p className="text-xs text-gray-500 font-made-outer mt-2">
                      ${(plan.annualPrice / 12).toFixed(2)} per month
                    </p>
                  )}
                </div>

                {renderButton(plan)}

                <div className="text-xs space-y-4 border-t border-white/10 pt-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-made-outer text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={perksRef}
          className="flex flex-row gap-2 w-full justify-center flex-wrap mt-[-100]"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400 font-made-outer font-bold">
            <p className="flex items-center gap-1 px-2 py-1 text-gray-400 font-black font-made-outer text-sm ">
              <Calendar1 size={18} />
              7 Days Free Trial
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400 font-made-outer font-bold">
            <p className="flex items-center gap-1 px-2 py-1 text-gray-400 font-black font-made-outer text-sm ">
              <ReceiptText size={18} />
              VAT Included
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400 font-made-outer font-bold">
            <p className="flex items-center gap-1 px-2 py-1 text-gray-400 font-black font-made-outer text-sm ">
              <BookmarkX size={18} />
              Cancel Anytime
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400 font-made-outer font-bold">
            <p className="flex items-center gap-1 px-2 py-1 text-gray-400 font-black font-made-outer text-sm ">
              <ShieldCheck size={18} />
              Secure Payment
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-400 font-made-outer font-bold">
            <p className="flex items-center gap-1 px-2 py-1 text-gray-400 font-black font-made-outer text-sm ">
              <TimerOff size={18} />
              Instant Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;