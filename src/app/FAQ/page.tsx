'use client';

import { useState } from "react";
import Footer from "@/components/ui/footer/Footer";
import { Airplane, CreditCard, Shield, Download, HelpCircle, Users } from 'lucide-react';

const tabs = [
  { id: "nomadia", label: "Nomadia", icon: Airplane },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data", icon: Download },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "accessibility", label: "Accessibility", icon: Users },
];

const faqData: Record<string, { question: string; answer: string }[]> = {
  nomadia: [
    { question: "How does the AI travel planner work?", answer: "Nomadia asks a few questions about your destination, dates, budget, and travel style. Using that context, it generates a personalized day-by-day itinerary with suggested places, routes, and activities." },
    { question: "Can I edit the itinerary after it's generated?", answer: "Yes. You can swap activities, regenerate days, adjust the pace, and refine preferences anytime. The plan updates based on your changes." },
    { question: "Do I need to know everything before I start?", answer: "Not at all. You can start with something simple like '5 days in Rome on a budget,' and Nomadia will ask the right questions to fill in the missing details." },
    { question: "Is there a free plan?", answer: "Yes. The Backpacker plan is free and lets you generate a trip and try the core planning experience. Premium plans unlock unlimited trips and advanced customization." },
    { question: "Can I use Nomadia on mobile?", answer: "Yes. Nomadia is responsive and works across desktop, tablet, and mobile so you can access your itinerary anywhere during your trip." },
    { question: "Can I share my trip with others?", answer: "Yes. You can share your itinerary with friends or travel companions so everyone stays aligned on the plan. You can share a link or export it as a PDF depending on your subscription plan." },
  ],
  payments: [
    { question: "How are payments handled?", answer: "All payments are processed securely through our payment provider. Nomadia does not store your full credit card details on our servers. Transactions are encrypted and handled by certified payment infrastructure." },
    { question: "Is my payment information secure?", answer: "Yes. Payment processing is handled by a PCI-compliant provider and protected with industry-standard encryption. Nomadia never stores complete card numbers." },
    { question: "Can I cancel my subscription anytime?", answer: "Yes. You can cancel anytime from your account settings. Your plan stays active until the end of your current billing period and you won't be charged again after cancellation." },
    { question: "Do you offer refunds?", answer: "If you experience an issue or were charged by mistake, contact support and we'll review your request. Our goal is to be fair and transparent." },
    { question: "Will I be charged automatically?", answer: "For paid plans, billing renews automatically each period unless you cancel. You can manage your subscription and view invoices from your account settings." },
  ],
  security: [
    { question: "Is my personal data secure?", answer: "Yes. We take data security seriously. Your information is protected with industry-standard security measures, including encryption and strict access controls." },
    { question: "Do you store my full credit card details?", answer: "No. Your card details are handled by our payment provider. Nomadia only receives payment status and billing identifiers needed to manage your subscription." },
    { question: "Who can access my trips and itineraries?", answer: "By default, only you can access your saved trips. If you choose to share a trip link or export it, you control who sees it." },
    { question: "Do you sell my data?", answer: "No. We never sell your personal data. Any third-party processing is limited to trusted providers needed to operate the platform." },
    { question: "What should I do if I notice suspicious activity?", answer: "Contact support as soon as possible. We can help investigate and secure your account. We also recommend using a strong, unique password for your Nomadia account." },
  ],
  data: [
    { question: "Is Nomadia GDPR compliant?", answer: "Yes. Nomadia follows GDPR requirements. You can access, correct, export, or request deletion of your personal data at any time." },
    { question: "What personal data does Nomadia collect?", answer: "We collect only what's needed to provide the service, such as your account details, travel preferences, and generated itineraries." },
    { question: "Can I request access or deletion of my data?", answer: "Yes. You can request a copy of the personal data we store, request corrections, or ask for deletion via account settings or by contacting support." },
    { question: "What happens to my data if I delete my account?", answer: "When you delete your account, your personal data and saved trips are permanently removed from our systems in accordance with applicable data protection regulations." },
    { question: "Where is my data stored?", answer: "Your data is stored on trusted infrastructure providers that follow strict security and privacy standards. We use appropriate safeguards to protect your data." },
    { question: "Do you share my data with third parties?", answer: "We don't sell your personal data. Some data may be processed by trusted service providers (like payments or hosting) only to operate and improve the platform." },
  ],
  support: [
    { question: "How can I contact support?", answer: "You can reach our support team from the Contact page or directly from your dashboard. We'll respond as quickly as possible." },
    { question: "What if the itinerary doesn't match what I want?", answer: "You can adjust your preferences and regenerate parts of the plan. If something still feels off, contact support and we'll help you troubleshoot." },
    { question: "Are bookings included?", answer: "Nomadia can suggest places to stay, eat, and visit, and can link to booking platforms. You stay in control of where and how you book." },
    { question: "Can I export or download my itinerary?", answer: "Yes. Depending on your plan, you can export your itinerary as a PDF for offline access, sharing, and easy reference during your trip." },
    { question: "Can I change my plan later?", answer: "Yes. You can upgrade or downgrade your subscription anytime. Changes take effect according to your billing period." },
  ],
  accessibility: [
    { question: "Is Nomadia accessible for keyboard users?", answer: "Yes. Nomadia is designed to be usable with a keyboard, including navigating tabs, accordions, and interactive elements." },
    { question: "Does Nomadia support screen readers?", answer: "We aim to support screen readers by using semantic UI components and accessible labels for interactive controls." },
    { question: "Can I reduce animations and motion effects?", answer: "Yes. Nomadia respects your device accessibility settings like 'Reduce Motion' where possible, and we keep animations subtle to avoid distraction." },
    { question: "Is the interface optimized for mobile?", answer: "Yes. The layout is responsive and optimized for mobile screens so you can plan and access your itinerary on the go." },
    { question: "How can I report an accessibility issue?", answer: "If you encounter an accessibility issue, contact support with details (device, browser, and what happened). We'll prioritize improvements." },
  ],
};

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("nomadia");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const currentFaqs = faqData[activeTab] ?? [];
  const ActiveIcon = tabs.find((t) => t.id === activeTab)?.icon;

  return (
    <div className="min-h-screen bg-black text-white mt-48">
      <div className="max-w-4xl mx-auto pt-24 px-12 pb-24 border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl my-8">


        <div className="mb-16">
          <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
            frEqUEntly askEd qUEstiOns
          </h1>
          <p className="text-gray-400 font-made-outer text-lg">
            Learn how Nomadia works, how we handle payments, and how your data stays protected.
          </p>
        </div>


        <section className="mb-10">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-6">
            brOwsE by tOpiC
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setExpandedFaq(null); }}
                className={`border rounded-lg p-5 backdrop-blur-md transition-colors cursor-pointer text-left flex items-center gap-3 ${
                  activeTab === id
                    ? "border-white/40 bg-white/15 text-white"
                    : "border-white/15 bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <div>
                  <h3 className="font-made-outer font-bold text-sm">{label}</h3>
                  <p className="text-gray-500 font-made-outer text-xs mt-0.5">
                    {faqData[id].length} questions
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-8 flex items-center gap-3">
            {ActiveIcon && <ActiveIcon size={22} />}
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <div className="space-y-4">
            {currentFaqs.map((item, index) => (
              <div
                key={index}
                className="border border-white/15 rounded-lg overflow-hidden bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-white/10 transition-colors flex items-center justify-between font-made-outer"
                >
                  <h3 className="text-white font-made-outer font-bold pr-4">
                    {item.question}
                  </h3>
                  <span className={`text-gray-400 transition-transform duration-300 shrink-0 ${expandedFaq === index ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-white/10 pt-4">
                    <p className="text-gray-300 font-made-outer leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-6">
            still nEEd hElp?
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-4">
                Email Support
              </h3>
              <p className="text-gray-400 font-made-outer mb-2">
                Get in touch with our support team
              </p>
              <a
                href="mailto:support@nomadia.com"
                className="text-white font-made-outer font-bold hover:text-gray-300 transition-colors no-underline"
              >
                support@nomadia.com
              </a>
              <p className="text-xs text-gray-500 font-made-outer mt-2">
                Response time: within 24 hours
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-6">
            COmmUnity blOg
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-6">
            Join our community where nomads share tips, trip recommendations, and ask questions. Our community members and team regularly share travel insights.
          </p>
          <button
            onClick={() => window.location.href = "/blog"}
            className="border border-white/15 rounded-lg px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors font-made-outer font-bold text-white"
          >
            Visit Blog
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
}