'use client';

import { useScramble } from 'use-scramble';
import { useEffect, useState } from 'react';

interface AirportTextProps {
  words: string[];
  intervalMs?: number;
}

const AirportText = ({ words, intervalMs = 5000 }: AirportTextProps) => {
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [words.length, intervalMs, mounted]);

  if (!mounted) return null;

  return (
    <span ref={ref} className="font-made-outer-alt font-black text-shadow-lg" />
  );
};

export default AirportText;