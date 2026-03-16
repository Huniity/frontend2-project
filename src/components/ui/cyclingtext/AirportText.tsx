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

  // ✅ Always render the same element type — never swap between
  // a <span> with children and a <span> with ref, as React sees
  // these as different nodes and crashes on navigation
  return (
    <span
      ref={mounted ? ref : undefined}
      className="font-made-outer-alt font-black text-shadow-lg"
    >
      {!mounted ? words[0] : undefined}
    </span>
  );
};

export default AirportText;