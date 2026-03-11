'use client';

import { HiOutlineCalendar, HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi';
import { HiOutlineMapPin } from 'react-icons/hi2';

interface Step {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const HowItWorks = () => {
  const steps: Step[] = [
    {
      icon: <HiOutlineMapPin size={24} />,
      number: 1,
      title: "Choose Your Destination",
      description: "Browse thousands of amazing destinations and pick the perfect place for your next adventure."
    },
    {
      icon: <HiOutlineCalendar size={24} />,
      number: 2,
      title: "Plan Your Trip",
      description: "Create a custom itinerary with our AI-powered planning tools and local insider tips."
    },
    {
      icon: <HiOutlineSparkles size={24} />,
      number: 3,
      title: "Book & Explore",
      description: "Reserve your accommodations and activities with exclusive nomad deals and discounts."
    },
    {
      icon: <HiOutlineCheckCircle size={24} />,
      number: 4,
      title: "Share & Earn",
      description: "Share your experiences with other nomads and earn rewards with every trip completed."
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6">
      <div 
        className="grid gap-12 w-full max-w-5xl place-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
        }}
      >
        {steps.map((step) => (
          <div key={step.number} className="w-full h-70">
            <div 
              className="p-0.5 rounded-2xl relative h-full w-full backdrop-blur-md flex flex-col shrink-0"
              style={{
                background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05))',
                backgroundColor: 'rgba(15, 15, 15, 0.6)'
              }}
            >
              <div 
                className="border-2 rounded-2xl absolute inset-0 pointer-events-none"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              ></div>
              <div 
                className="border-2 rounded-2xl absolute inset-0 pointer-events-none"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  filter: 'blur(1px)'
                }}
              ></div>
              <div 
                className="border-2 rounded-2xl absolute inset-0 pointer-events-none"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  filter: 'blur(4px)'
                }}
              ></div>
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
                style={{
                  background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.1), transparent 30%, transparent 70%, rgba(255, 255, 255, 0.05))',
                  mixBlendMode: 'overlay',
                  transform: 'scale(1.1)',
                  filter: 'blur(16px)'
                }}
              ></div>
              
              <div className="relative z-10 p-6 flex flex-col justify-start items-center text-center w-full h-full gap-2">
                <div className="mt-2 flex items-center justify-center shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-md shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                      borderColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    <span className="text-xl font-black text-white font-made-outer-alt">{step.number}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center shrink-0 group">
                  <div className="text-white/80 transition-all duration-300 flex items-center justify-center h-6 shrink-0 group-hover:scale-110 group-hover:text-white">
                    {step.icon}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center shrink-0">
                  <h3 className="text-base font-bold text-white font-made-outer-alt">{step.title}</h3>
                </div>

                <div className="mt-2 flex items-start justify-center grow">
                  <p className="text-xs text-white/70">{step.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
