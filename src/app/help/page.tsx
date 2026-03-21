'use client'

import Footer from "@/components/ui/footer/Footer";
import { useState } from "react";

export const metadata = {
  title: "Help",
  description: "Get help with NomadIA — guides, tutorials and support.",
  alternates: { canonical: "https://be-nomadia.vercel.app/help" },
};

export default function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click 'Get Started' on the homepage and fill in your email, password, and basic information. Verify your email address and you're ready to start planning trips!",
    },
    {
      question: "What subscription plan is right for me?",
      answer:
        "We offer three plans: Backpacker (free), Globetrotter ($7.99/month), and Nomad ($11.99/month). Compare features on our pricing page to find the best fit for your travel needs.",
    },
    {
      question: "Can I change or cancel my subscription?",
      answer:
        "Yes! You can upgrade, downgrade, or cancel your subscription anytime from your profile settings. Changes take effect on your next billing date.",
    },
    {
      question: "How secure is my personal information?",
      answer:
        "We use industry-standard encryption and secure servers to protect your data. All payments are processed securely, and we never store sensitive payment information directly.",
    },
    {
      question: "Can I book trips for other people?",
      answer:
        "Yes! Once you're logged in, you can add multiple travelers to your trip and manage bookings for your entire group from one account.",
    },
    {
      question: "What happens if I need to refund or modify a trip?",
      answer:
        "Modifications depend on your booking terms. Most trips can be modified up to 48 hours before departure. For refunds, check your booking confirmation for the cancellation policy.",
    },
    {
      question: "How do I report a problem with a booking?",
      answer:
        "Contact our support team via the 'Contact Us' page or email support@nomadia.com. Include your booking reference and a description of the issue. We typically respond within 24 hours.",
    },
    {
      question: "Can I download my trip offline?",
      answer:
        "The Nomad plan includes offline access. Download your trip itinerary and maps from your trip details page to access them without internet.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white mt-48">
      <div className="max-w-4xl mx-auto pt-24 px-12 pb-24 border border-white/15 rounded-2xl bg-white/5 backdrop-blur-xl my-8">
        <div className="mb-16">
          <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-shadow-lg">
            hElp CEntEr
          </h1>
          <p className="text-gray-400 font-made-outer text-lg">
            Find answers to common questions and get support when you need it.
          </p>
        </div>

        {/* Quick Links Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-6">
            gEt hElp fast
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="border border-white/15 rounded-lg p-6 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-left">
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Account & Login
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Help with creating accounts, passwords, and profile settings
              </p>
            </button>
            <button className="border border-white/15 rounded-lg p-6 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-left">
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Bookings & Trips
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Questions about booking, modifying, or canceling trips
              </p>
            </button>
            <button className="border border-white/15 rounded-lg p-6 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-left">
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Payments & Billing
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                Payment methods, invoices, and subscription management
              </p>
            </button>
            <button className="border border-white/15 rounded-lg p-6 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-left">
              <h3 className="text-lg font-made-outer font-bold text-white mb-2">
                Technical Issues
              </h3>
              <p className="text-gray-400 font-made-outer text-sm">
                App crashes, bugs, and technical troubleshooting
              </p>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-8">
            frEqUEntly askEd qUEstiOns
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-white/15 rounded-lg overflow-hidden bg-white/5 backdrop-blur-md"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full text-left p-6 hover:bg-white/10 transition-colors flex items-center justify-between font-made-outer"
                >
                  <h3 className="text-white font-made-outer font-bold">
                    {item.question}
                  </h3>
                  <span
                    className={`text-gray-400 transition-transform duration-300 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  >
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

        {/* Contact Support Section */}
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
            <div>
              <h3 className="text-lg font-made-outer font-bold text-white mb-4">
                Live Chat
              </h3>
              <p className="text-gray-400 font-made-outer mb-2">
                Chat with our support team in real-time
              </p>
              <button className="text-white font-made-outer font-bold hover:text-gray-300 transition-colors cursor-pointer">
                Start Chat
              </button>
              <p className="text-xs text-gray-500 font-made-outer mt-2">
                Available 9 AM - 10 PM UTC
              </p>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-made-outer-alt font-bold mb-6">
            COmmUnity fOrUm
          </h2>
          <p className="text-gray-300 font-made-outer leading-relaxed mb-6">
            Join our community forum where nomads share tips, trip recommendations,
            and ask questions. Our community members and team regularly answer
            questions and share travel insights.
          </p>
          <button className="border border-white/15 rounded-lg px-6 py-3 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors font-made-outer font-bold text-white">
            Visit Forum
          </button>
        </section>
      </div>

      <Footer />
    </div>
  );
}
