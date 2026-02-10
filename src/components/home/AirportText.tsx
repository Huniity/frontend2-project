'use client';

import { useEffect, useRef, useState } from 'react';

export default function AirportText({ words }: { words: string[] }) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const animateText = (text: string) => {
      if (!h1Ref.current) return;

      const element = h1Ref.current;
      let interactions = 0;

      const interval = setInterval(() => {
        element.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < interactions) {
              return text[index];
            } else {
              return abc[Math.floor(Math.random() * abc.length)];
            }
          })
          .join("");

        interactions += 1 / 3;

        if (interactions > text.length) {
          clearInterval(interval);
        }
      }, 30);
    };

    animateText(currentWord);

    const repeatInterval = setInterval(() => {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
      setCurrentWord(words[wordIndexRef.current]);
    }, 5000);

    return () => clearInterval(repeatInterval);
  }, [currentWord, words, abc]);

  return <span ref={h1Ref} className="font-mono">{currentWord}</span>;
}