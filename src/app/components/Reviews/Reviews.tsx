

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
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl md:text-7xl font-made-outer-alt font-black text-white text-center max-w-3xl">
            Rated by the Road
          </h1>
          <h2 className="text-xl md:text-2xl font-made-outer-alt font-semibold text-gray-400 text-center max-w-2xl">
            Loved by the Nomads
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-8"
            >
              {/* Quote */}
              <div className="space-y-4">
                <p className="text-2xl md:text-4xl font-made-outer text-white italic leading-relaxed">
                  "{testimonials[current].description}"
                </p>
              </div>

              {/* Author */}
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

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border-2 border-white hover:bg-white hover:text-black text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            {/* <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === current
                      ? 'w-8 h-3 bg-white'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div> */}

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
