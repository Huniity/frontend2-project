'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
            .to(
              subtitleRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.2"
            )
            .to(
              buttonRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              },
              "-=0.15"
            );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="snap-start relative w-full h-screen">
      <Image
        src="/dubai.webp"
        alt="Dubai"
        fill
        className="object-cover"
        priority={false}
        quality={70}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 1%, black 100%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 1%, black 100%, black 90%, transparent 100%)",
        }}
      />

      <div className="relative z-20 flex flex-col h-full w-full justify-center items-center gap-2">
        <h1
          ref={titleRef}
          className="text-4xl xl:text-5xl font-made-outer-alt font-black text-white text-shadow-lg"
        >
          Plan Today
        </h1>

        <h2
          ref={subtitleRef}
          className="text-center text-4xl xl:text-5xl font-made-outer-alt font-semibold mb-4 text-white text-shadow-lg"
        >
          Explore Tomorrow
        </h2>

        <Link
          ref={buttonRef}
          href="/signin"
          className="mt-68 rounded-full bg-white px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition shadow-black/50 shadow-xs"
          style={{ willChange: "transform, opacity" }}
        >
          sign Up now
        </Link>
      </div>
    </section>
  );
};

export default Cta;
