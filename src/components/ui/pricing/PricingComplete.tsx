'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { pricing } from "@/lib/utils/pricing";
import UpgradeButton from "@/components/ui/buttons/UpgradeButton";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const PricingCompleteComponent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const renderButton = (plan: any) => {
    if (loading) {
      return (
        <button disabled className="w-full py-3 rounded-lg font-made-outer font-bold mb-8 border border-white/10 text-gray-600 cursor-not-allowed">
          Loading your current plan...
        </button>
      );
    }

    // Not logged in → redirect to signin
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

    // FREE plan card
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

    // Already on this plan
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

    // Already on a different paid plan
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

    // Normal upgrade
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
    <div className="max-w-6xl mx-auto pt-24 px-12 pb-24">
      {/* Header */}
      <div className="text-center mb-18">
        <motion.h1 
          className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          simplE, trAnspArEnt priCing
        </motion.h1>
        <motion.p 
          className="text-gray-400 font-made-outer text-lg mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Choose the perfect plan for your travel style
        </motion.p>

        {/* Toggle */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className={`font-made-outer font-bold ${!isAnnual ? "text-white" : "text-gray-400"}`}>
              monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
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

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-36">
        {pricing.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
              plan.highlighted
                ? "border-2 border-white/30 bg-white/10 backdrop-blur-xl scale-105 md:scale-110"
                : "border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25"
            }`}
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
                  <span className="text-4xl font-black font-made-outer-alt text-white">
                    {plan.monthlyPrice === 0 ? "frEE" : isAnnual ? `€${plan.annualPrice}` : `${plan.price}`}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-gray-400 font-made-outer">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  )}
                </div>
                {isAnnual && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-gray-500 font-made-outer mt-2">
                    €{(plan.annualPrice / 12).toFixed(2)} per month
                  </p>
                )}
              </div>

              {renderButton(plan)}

              <div className="space-y-4 border-t border-white/10 pt-8">
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
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mb-16">
        <motion.h2 
          className="text-3xl font-made-outer-alt font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          dEtailEd COmparisOn
        </motion.h2>
        <div className="overflow-x-auto border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15">
                <th className="text-left p-6 font-made-outer font-bold text-white">Feature</th>
                <th className="text-center p-6 font-made-outer font-bold text-white">Backpacker</th>
                <th className="text-center p-6 font-made-outer font-bold text-white bg-white/5">Globetrotter</th>
                <th className="text-center p-6 font-made-outer font-bold text-white">Nomad</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Trips per year", values: ["5", "Unlimited", "Unlimited"] },
                { label: "Itinerary planning", values: ["✓", "✓", "✓"] },
                { label: "Offline map downloads", values: ["—", "✓", "✓"] },
                { label: "AI trip recommendations", values: ["—", "✓", "✓"] },
                { label: "Collaboration with friends", values: ["—", "✓", "✓"] },
                { label: "Photo gallery storage", values: ["2 gb", "5 gb", "100 gb"] },
                { label: "Travel budget tracking", values: ["—", "✓", "✓"] },
                { label: "Offline access", values: ["—", "—", "✓"] },
                { label: "Live chat support", values: ["—", "—", "✓"] },
                { label: "Custom trip templates", values: ["—", "—", "✓"] },
                { label: "Travel insurance quotes", values: ["—", "—", "✓"] },
                { label: "VIP community access", values: ["—", "—", "✓"] },
                { label: "Exclusive travel deals", values: ["—", "—", "✓"] },
              ].map((row, i, arr) => (
                <tr key={row.label} className={`${i < arr.length - 1 ? "border-b border-white/10" : ""} hover:bg-white/5 transition-colors`}>
                  <td className="p-6 font-made-outer text-gray-300">{row.label}</td>
                  {row.values.map((val, vi) => (
                    <td key={vi} className={`text-center p-6 font-made-outer ${vi === 1 ? "bg-white/5" : ""} ${val === "✓" ? "text-white" : "text-gray-400"}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl p-12 mb-16">
        <motion.h2 
          className="text-3xl font-made-outer-alt font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          frEqUEntly askEd qUEstiOns
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: "Can I change plans anytime?", a: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately." },
            { q: "Is there a free trial?", a: "The Backpacker plan is completely free with core features. Upgrade anytime to unlock premium features." },
            { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee if you're not satisfied with your subscription." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Apple Pay. All payments are secure and encrypted." },
            { q: "Can I share my account?", a: "Each subscription is for individual use. For family sharing, reach out to our support team for options." },
            { q: "Do you offer discounts for groups?", a: "Yes! Contact our sales team for bulk discounts and special group pricing options." },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">{faq.q}</h3>
              <p className="text-gray-400 font-made-outer text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl p-12 text-center">
        <motion.h2 
          className="text-3xl font-made-outer-alt font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          rEady tO start yOUr advEntUrE?
        </motion.h2>
        <motion.p 
          className="text-gray-400 font-made-outer text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join thousands of travelers exploring the world with Nomadia
        </motion.p>
        <button
          onClick={() => router.push(isLoggedIn ? "/dashboard" : "/signin")}
          className="px-8 py-4 bg-white text-black rounded-lg font-made-outer font-bold text-lg hover:bg-gray-100 transition-colors"
        >
          {isLoggedIn ? "Go to Dashboard" : "Get Started Free"}
        </button>
      </div>
    </div>
  );
};

export default PricingCompleteComponent;