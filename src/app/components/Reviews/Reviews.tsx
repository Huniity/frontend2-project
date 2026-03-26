'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimony from '@/assets/testimony.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const testimonials = testimony.testimony;
  const [current, setCurrent] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // GSAP heading animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 25,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1,
            ease: "power2.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="snap-start w-full py-32">
      <div className="flex flex-col w-full justify-center items-center gap-20 px-4">

        {/* Titles */}
        <div className="flex flex-col items-center gap-3">
          <h1
            ref={titleRef}
            className="text-5xl md:text-5xl font-made-outer-alt font-black text-white text-center max-w-3xl"
          >
            ratEd by thE road
          </h1>

          <h2
            ref={subtitleRef}
            className="text-xl md:text-5xl font-made-outer-alt font-black text-gray-400 text-center max-w-2xl"
          >
            lovEd by thE nomads
          </h2>
        </div>

        {/* Testimonial */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="space-y-4">
                <p className="text-2xl md:text-2xl font-made-outer text-white italic leading-relaxed">
                  &quot;{testimonials[current].description}&quot;
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-black text-white">
                    {testimonials[current].person_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-white font-made-outer-alt text-lg">
                    {testimonials[current].person_name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(testimonials[current].date).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border-2 border-white hover:bg-white hover:text-black text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="p-2 rounded-full border-2 border-white hover:bg-white hover:text-black text-white transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;