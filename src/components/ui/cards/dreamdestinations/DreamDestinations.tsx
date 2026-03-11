'use client';

import { HiOutlineEye, HiOutlineCloud, HiOutlineSparkles, HiOutlineRectangleStack, HiOutlineSun, HiOutlineMapPin, HiOutlineMapPin as HiOutlineMap, HiOutlineSparkles as HiOutlineLights } from 'react-icons/hi2';
import { GiCampfire } from 'react-icons/gi';

interface Feature {
  icon: React.ReactNode;
  title: string;
  bgGradient: string;
}

const DreamDestinations = () => {
  const features: Feature[] = [
    {
      icon: <HiOutlineEye size={32} />,
      title: "Vast peaks",
      bgGradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4))'
    },
    {
      icon: <HiOutlineCloud size={32} />,
      title: "Rolling sky",
      bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4), rgba(236, 72, 153, 0.4))'
    },
    {
      icon: <HiOutlineSparkles size={32} />,
      title: "Lush forests",
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4))'
    },
    {
      icon: <HiOutlineRectangleStack size={32} />,
      title: "Night skyline",
      bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))'
    },
    {
      icon: <HiOutlineMap size={32} />,
      title: "Night skyline",
      bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))'
    },
    {
      icon: <HiOutlineSun size={32} />,
      title: "Golden light",
      bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4), rgba(251, 191, 36, 0.4))'
    },
    {
      icon: <GiCampfire size={32} />,
      title: "Outdoor life",
      bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(249, 115, 22, 0.4))'
    },
    {
      icon: <HiOutlineMapPin size={32} />,
      title: "Unique spots",
      bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))'
    },
    {
      icon: <HiOutlineMapPin size={32} />,
      title: "Bustling streets",
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4))'
    },
    {
      icon: <HiOutlineLights size={32} />,
      title: "City lights",
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.4))'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white font-made-outer-alt mb-4 text-shadow-lg">
          Dream Destinations
        </h1>
        <p className="text-lg text-gray-300 font-made-outer-alt">
          Features we know you'll love about our trips
        </p>
      </div>

      <div 
        className="grid gap-6 w-full max-w-6xl place-items-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
        }}
      >
        {features.map((feature, index) => (
          <div key={index} className="w-full h-48">
            <div 
              className="p-0.5 rounded-2xl relative h-full w-full backdrop-blur-md flex flex-col justify-end overflow-hidden group"
              style={{
                background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05))'
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

              <div className="relative z-10 flex flex-col items-center justify-end pb-6 h-full gap-3 group-hover:gap-4 transition-all duration-300">
                <div className="text-white/80 group-hover:text-white group-hover:scale-110 transform transition-transform duration-300">
                  {feature.icon}
                </div>
                <p className="text-white font-bold text-center font-made-outer-alt text-sm md:text-base">
                  {feature.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamDestinations;
