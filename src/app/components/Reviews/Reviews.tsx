

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimony from '@/assets/testimony.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const testimonials = testimony.testimony;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="snap-start w-full py-32">
      <div className="flex flex-col w-full justify-center items-center gap-20 px-4">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl md:text-5xl font-made-outer-alt font-black text-white text-center max-w-3xl">
            Rated by the Road
          </h1>
          <h2 className="text-xl md:text-3xl font-made-outer-alt font-semibold text-gray-400 text-center max-w-2xl">
            Loved by the Nomads
          </h2>
        </div>

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
                <p className="text-2xl md:text-3xl font-made-outer text-white italic leading-relaxed">
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
