'use client';

import { useState, useEffect } from 'react';

interface BackgroundCycleProps {
  images: string[];
  interval?: number;
  backgroundSizes?: string[];
  backgroundPositions?: string[];
}

const BackgroundCycle = ({ 
  images, 
  interval = 10000,
  backgroundSizes = [],
  backgroundPositions = []
}: BackgroundCycleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <>
      {images.map((image, index) => (
        <div
          key={index}
          // className="absolute inset-0 transition-opacity duration-1000 grayscale contrast-175 sepia-5 brightness-100"
          className="absolute inset-0 transition-opacity duration-1000 contrast-125 sepia-30 brightness-95 grayscale-0 hue-rotate-5"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: backgroundSizes[index] || "auto 150%",
            backgroundPosition: backgroundPositions[index] || "center -100px",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            opacity: currentIndex === index ? 1 : 0,
            zIndex: currentIndex === index ? 1 : 0,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundCycle;
