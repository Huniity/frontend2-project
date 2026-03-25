"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/ui/counter/Counter";

gsap.registerPlugin(ScrollTrigger);

const Counters = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(itemsRef.current, {
        opacity: 0,
        y: 30,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 45%", // fires later, when section is actually reached
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          })
            .to(
              subtitleRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              "-=0.2"
            )
            .to(
              itemsRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.15,
              },
              "-=0.1"
            );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="snap-start w-full min-h-screen relative flex flex-col justify-center items-center px-6 xl:px-24 py-24 gap-6 mt-10"
    >
      <h1
        ref={titleRef}
        className="text-3xl xl:text-6xl font-made-outer-alt font-black text-white text-center xl:text-center w-full text-shadow-lg"
      >
        TrUstEd by modErn travElErs
      </h1>

      <h1
        ref={subtitleRef}
        className="mb-36 text-3xl xl:text-6xl font-made-outer-alt font-black text-gray-400 text-center xl:text-center w-full text-shadow-lg"
      >
        worlwidE
      </h1>

      <div className="grid grid-cols-1 xl:flex xl:flex-row w-full justify-center items-center xl:gap-24 text-shadow-lg">
        {[
          { name: "Trips", value: 86, description: "PlannEd with Nomadia" },
          { name: "CoUntriEs", value: 37, description: "ExplorEd by oUr UsErs" },
          { name: "Nomads", value: 3274, description: "growing CommUnity" },
        ].map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className="relative p-12 h-64 flex flex-col justify-center items-center"
          >
            <div className="absolute top-15 left-5 xl:top-0 xl:left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
            <div className="absolute bottom-15 right-5 xl:bottom-0 xl:right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>

            <Counter
              name={item.name}
              value={item.value}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Counters;