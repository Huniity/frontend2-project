'use client'

import Footer from "@/components/ui/footer/Footer";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { pricing } from "../../lib/utils/pricing";


export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white mt-48">
      <div className="max-w-6xl mx-auto pt-24 px-12 pb-24">
        {/* Header */}
        <div className="text-center mb-18">
          <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
            simplE, trAnspArEnt priCing
          </h1>
          <p className="text-gray-400 font-made-outer text-lg mb-24">
            Choose the perfect plan for your travel style
          </p>

          {/* Toggle */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span
                className={`font-made-outer font-bold ${
                  !isAnnual ? "text-white" : "text-gray-400"
                }`}
              >
                monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/10 border border-white/15 transition-colors hover:bg-white/15"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`font-made-outer font-bold ${
                  isAnnual ? "text-white" : "text-gray-400"
                }`}
              >
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
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-white/30 bg-white/10 backdrop-blur-xl scale-105 md:scale-110"
                  : "border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25"
              }`}
            >
              {/* Popular Badge - Removed, icon moved to plan name */}

              <div className="p-8">
                {/* Plan Name */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-2xl font-made-outer-alt font-bold text-white">
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <div className="shrink-0">
                      <ImFire size="20" color="rgba(221, 132, 72, 0.92)" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 font-made-outer mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black font-made-outer-alt text-white">
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

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-lg font-made-outer font-bold mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-white text-black hover:bg-gray-100"
                      : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  Get Started
                </button>

                {/* Features */}
                <div className="space-y-4 border-t border-white/10 pt-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
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

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-made-outer-alt font-bold mb-8 text-center">
            dEtailEd COmparisOn
          </h2>
          <div className="overflow-x-auto border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="text-left p-6 font-made-outer font-bold text-white">
                    Feature
                  </th>
                  <th className="text-center p-6 font-made-outer font-bold text-white">
                    Backpacker
                  </th>
                  <th className="text-center p-6 font-made-outer font-bold text-white bg-white/5">
                    Globetrotter
                  </th>
                  <th className="text-center p-6 font-made-outer font-bold text-white">
                    Nomad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Trips per year
                  </td>
                  <td className="text-center p-6 font-made-outer text-gray-300">
                    5
                  </td>
                  <td className="text-center p-6 font-made-outer text-gray-300 bg-white/5">
                    Unlimited
                  </td>
                  <td className="text-center p-6 font-made-outer text-gray-300">
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Itinerary planning
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6 bg-white/5">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Offline map downloads
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    AI trip recommendations
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Collaboration with friends
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Photo gallery storage
                  </td>
                  <td className="text-center p-6 font-made-outer text-gray-400">
                    2 gb
                  </td>
                  <td className="text-center p-6 bg-white/5 font-made-outer text-gray-400">
                    5 gb
                  </td>
                  <td className="text-center p-6 font-made-outer text-gray-400">
                    100 gb
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Travel budget tracking
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5">
                    <span className="text-white">✓</span>
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Offline access
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Live chat support
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Custom trip templates
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Travel insurance quotes
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    VIP community access
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-made-outer text-gray-300">
                    Exclusive travel deals
                  </td>
                  <td className="text-center p-6 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6 bg-white/5 text-gray-500">
                    —
                  </td>
                  <td className="text-center p-6">
                    <span className="text-white">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl p-12 mb-16">
          <h2 className="text-3xl font-made-outer-alt font-bold mb-8 text-center">
            frEqUEntly askEd qUEstiOns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                The Backpacker plan is completely free with core features. Upgrade anytime to unlock premium features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                We offer a 7-day money-back guarantee if you're not satisfied with your subscription.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                We accept all major credit cards, PayPal, and Apple Pay. All payments are secure and encrypted.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                Can I share my account?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Each subscription is for individual use. For family sharing, reach out to our support team for options.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-3">
                Do you offer discounts for groups?
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Yes! Contact our sales team for bulk discounts and special group pricing options.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl p-12 text-center">
          <h2 className="text-3xl font-made-outer-alt font-bold mb-4">
            rEady tO start yOUr advEntUrE?
          </h2>
          <p className="text-gray-400 font-made-outer text-lg mb-8">
            Join thousands of travelers exploring the world with Nomadia
          </p>
          <button className="px-8 py-4 bg-white text-black rounded-lg font-made-outer font-bold text-lg hover:bg-gray-100 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}