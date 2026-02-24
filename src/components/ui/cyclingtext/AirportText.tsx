'use client';

import { useScramble } from 'use-scramble';
import { useEffect, useEffectEvent, useState } from 'react';

interface AirportTextProps {
  words: string[];
  intervalMs?: number;
}

export default function AirportText({ 
  words, 
  intervalMs = 5000,
}: AirportTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { ref } = useScramble({
    text: words[currentIndex],
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  const handleMount = useEffectEvent(() => {
    setMounted(true);
  });

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [words.length, intervalMs, mounted]);

  if (!mounted) {
    return <span className="font-made-outer-alt font-black text-shadow-lg">{words[0]}</span>;
  }

  return <span ref={ref} className="font-made-outer-alt font-black text-shadow-lg" />;
}