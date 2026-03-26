'use client';

import { MapPin, Calendar, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const HowItWorks = () => {
  const steps: Step[] = [
    {
      icon: <MapPin size={24} />,
      number: 1,
      title: "Choose yoUr dEstination",
      description: "Browse thousands of amazing destinations and pick the perfect place for your next adventure."
    },
    {
      icon: <Calendar size={24} />,
      number: 2,
      title: "plan yoUr trip",
      description: "Create a custom itinerary with our AI-powered planning tools and local insider tips."
    },
    {
      icon: <Sparkles size={24} />,
      number: 3,
      title: "book & ExplorE",
      description: "Reserve your accommodations and activities with exclusive nomad deals and discounts."
    },
    {
      icon: <CheckCircle size={24} />,
      number: 4,
      title: "sharE & Earn",
      description: "Share your experiences with other nomads and earn rewards with every trip completed."
    }
  ];

  return (
    <div className="mt-36 w-full h-full flex flex-col justify-center items-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/tokyo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.1) contrast(1.1) saturate(1.5) sepia(0.2) grayscale(0.2) hue-rotate(10deg)",
          maskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
        }}
      />

      <div className="relative z-10 text-white drop-shadow-lg text-shadow-lg overflow-hidden">
        {["how", "it", "works"].map((word, i) => (
          <motion.h1
            key={word}
            className="text-center text-6xl xl:text-[8rem] font-made-outer-alt font-black leading-10 xl:mb-6 xl:leading-14 pt-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
          >
            {word}
          </motion.h1>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl place-items-center px-4 mt-10">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25 transition-all duration-300 w-full h-70"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 + index * 0.1, ease: "easeOut" }}
          >
            <div className="p-6 flex flex-col items-center text-center h-full gap-3">
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                  borderColor: 'rgba(255,255,255,0.4)'
                }}
              >
                <span className="text-xl font-black text-white font-made-outer-alt">{step.number}</span>
              </div>
              <div className="text-white/80 flex items-center justify-center h-6 shrink-0">
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-white font-made-outer-alt">{step.title}</h3>
              <p className="text-xs text-gray-300 font-made-outer">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;