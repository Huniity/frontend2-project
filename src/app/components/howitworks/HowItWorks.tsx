'use client';

import { MapPin, Calendar, Sparkles, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      title: "Choose Your Destination",
      description: "Browse thousands of amazing destinations and pick the perfect place for your next adventure."
    },
    {
      icon: <Calendar size={24} />,
      number: 2,
      title: "Plan Your Trip",
      description: "Create a custom itinerary with our AI-powered planning tools and local insider tips."
    },
    {
      icon: <Sparkles size={24} />,
      number: 3,
      title: "Book & Explore",
      description: "Reserve your accommodations and activities with exclusive nomad deals and discounts."
    },
    {
      icon: <CheckCircle size={24} />,
      number: 4,
      title: "Share & Earn",
      description: "Share your experiences with other nomads and earn rewards with every trip completed."
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-gradient-to-b from-black to-white bg-clip-text text-transparent drop-shadow-lg">
        <h1 className=" text-center xl:text-left text-6xl xl:text-[12rem] font-made-outer-alt font-black leading-10 xl:mb-12 xl:leading-24 pt-4">how</h1>
        <h1 className="text-center xl:text-left text-6xl xl:text-[10rem] font-made-outer-alt font-black xl:mb-12 xl:leading-17">it</h1>
        <h1 className="text-center xl:text-left text-6xl xl:text-[8rem] font-made-outer-alt font-black mb-10 leading-10 xl:mb-10 xl:leading-12">works</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl place-items-center px-4 mt-10">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25 transition-all duration-300 w-full h-70"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;