'use client'

import Footer from "@/components/ui/footer/Footer";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useState } from "react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the NomadIA team.",
  alternates: { canonical: "https://be-nomadia.vercel.app/contact" },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero */}
      <div className="w-full pt-32 pb-20 px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg">
            gEt In tOUch
          </h1>
          <p className="text-lg font-made-outer text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="w-full px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-12 mb-24">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <MdEmail className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-made-outer-alt font-black text-white mb-2">
                  EmaiL
                </h3>
                <p className="text-gray-400 font-made-outer">
                  support@nomadia.com
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <IoMdArrowRoundDown className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-made-outer-alt font-black text-white mb-2">
                  Contact Us
                </h3>
                <p className="text-gray-400 font-made-outer">
                  Send us a message below!
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <MdLocationOn className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-made-outer-alt font-black text-white mb-2">
                  lOcatiOn
                </h3>
                <p className="text-gray-400 font-made-outer">
                  Portugal, FARO
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-12">
            <h2 className="text-5xl font-made-outer-alt font-black text-white text-shadow-lg mb-12 text-center">
              sEnd a mEssagE
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-white font-made-outer-alt font-bold mb-2">
                    namE
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-white font-made-outer-alt font-bold mb-2">
                    EmaiL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-white font-made-outer-alt font-bold mb-2">
                  sUbjEct
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white font-made-outer-alt font-bold mb-2">
                  mEssagE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're thinking..."
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-made-outer-alt font-bold py-3 rounded-lg hover:bg-gray-100 transition"
              >
                sEnd mEssagE
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}