"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import AirportText from "@/components/ui/cyclingtext/AirportText";
import ScrollIndicator from "@/components/ui/scrollindicator/ScrollIndicator";

const IntroPage = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decoratorsRef = useRef<SVGGElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [diamondSize, setDiamondSize] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      setWindowSize({ width, height });
      setDiamondSize(Math.min(width, height) * 0.15);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  useEffect(() => {
    const cx = windowSize.width / 2;
    const cy = windowSize.height / 2;
    const size = diamondSize;

    if (imageRef.current) {
      imageRef.current.style.clipPath = `polygon(
        ${cx}px ${cy - size}px,
        ${cx + size}px ${cy}px,
        ${cx}px ${cy + size}px,
        ${cx - size}px ${cy}px
      )`;
    }
  }, [windowSize, diamondSize]);

  const handleDiamondClick = () => {
    if (animating) return;
    setAnimating(true);

    const cx = windowSize.width / 2;
    const cy = windowSize.height / 2;
    const expand = diamondSize * 12;

    gsap.to(decoratorsRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(textLeftRef.current,   { x: 250, opacity: 0, duration: 0.8, ease: "power2.in" });
    gsap.to(textRightRef.current,  { x: -150, opacity: 0, duration: 0.8, ease: "power2.in" });
    gsap.to(clickRef.current,     { opacity: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(scrollRef.current,    { opacity: 0, duration: 0.3, ease: "power2.out" });

    gsap.to(imageRef.current, {
      clipPath: `polygon(
        ${cx}px ${cy - expand}px,
        ${cx + expand}px ${cy}px,
        ${cx}px ${cy + expand}px,
        ${cx - expand}px ${cy}px
      )`,
      duration: 1.8,
      ease: "power2.inOut",
      delay: 0.15,
    });

    setTimeout(() => {
      router.push("/nomadia");
    }, 1200);
  };

  const cx = windowSize.width / 2;
  const cy = windowSize.height / 2;
  const size = diamondSize;

  const corners = [
    { x: cx,        y: cy - size },
    { x: cx + size, y: cy        },
    { x: cx,        y: cy + size },
    { x: cx - size, y: cy        },
  ];
  const leftVertex   = corners[3];
  const rightVertex  = corners[1];
  const leftLineEnd  = { x: leftVertex.x  - 600, y: leftVertex.y  };
  const rightLineEnd = { x: rightVertex.x + 600, y: rightVertex.y };
  const squarePoints = corners.map(c => `${c.x},${c.y}`).join(" ");

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: windowSize.height || "100vh" }}
    >
      <div
        ref={imageRef}
        onClick={handleDiamondClick}
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundImage: "url(/tokyo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: `polygon(
            ${cx}px ${cy - size}px,
            ${cx + size}px ${cy}px,
            ${cx}px ${cy + size}px,
            ${cx - size}px ${cy}px
          )`,
          filter: "brightness(1.1) contrast(1.1) saturate(1.5) sepia(0.2) grayscale(0.2) hue-rotate(10deg)",
          maskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
          zIndex: 4,
        }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <motion.g 
          ref={decoratorsRef}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points={squarePoints} fill="none" stroke="white" strokeWidth="2" />
          <line x1={leftVertex.x}  y1={leftVertex.y}  x2={leftLineEnd.x}  y2={leftLineEnd.y}  stroke="white" strokeWidth="2" />
          <line x1={rightVertex.x} y1={rightVertex.y} x2={rightLineEnd.x} y2={rightLineEnd.y} stroke="white" strokeWidth="2" />
        </motion.g>
      </svg>

      <h1
        ref={textLeftRef}
        className="text-4xl absolute text-white xl:text-7xl font-made-outer-alt pointer-events-none text-shadow-lg
                  left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2
                  xl:left-[10%] xl:top-[43%] xl:translate-x-0"
        style={{ zIndex: 1, willChange: "transform, opacity" }}
      >
        ExplorE
      </h1>

      <div
        ref={textRightRef}
        className="text-4xl absolute text-white xl:text-6xl font-made-outer-alt pointer-events-none text-center
                  left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2
                  xl:left-auto xl:right-[24%] xl:top-[56%] xl:translate-x-1/2"
        style={{
          width: "600px",
          zIndex: 1,
          willChange: "transform, opacity",
        }}
      >
        <AirportText words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]} />
      </div>

      <motion.div 
        ref={clickRef} 
        className="absolute bottom-10 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-white/40 text-xs font-made-outer tracking-widest uppercase">
          click the square
        </p>
        <p className="text-white/40 text-xs font-made-outer tracking-widest uppercase">
          to gain access
        </p>
        <div ref={scrollRef}>
        <ScrollIndicator />
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPage;