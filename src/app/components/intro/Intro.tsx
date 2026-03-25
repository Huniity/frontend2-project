"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AirportText from "../../../components/ui/cyclingtext/AirportText";
import HowItWorks from "../howitworks/HowItWorks";
import ScrollIndicator from "../../../components/ui/scrollindicator/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const HomeShape = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decoratorsRef = useRef<SVGGElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [diamondSize, setDiamondSize] = useState(0);

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

  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return;

    const cx = windowSize.width / 2;
    const cy = windowSize.height / 2;
    const expand = diamondSize * 12;
    const revealPoint = 0.42;

    const ctx = gsap.context(() => {
      gsap.set(nextSectionRef.current, {
        opacity: 0,
        x: -20,
      });

      const showHowItWorks = () => {
        if (!nextSectionRef.current) return;
        gsap.to(nextSectionRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const hideHowItWorks = () => {
        if (!nextSectionRef.current) return;
        gsap.to(nextSectionRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=750%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            if (self.progress < revealPoint) {
              hideHowItWorks();
            }
          },
        },
      });

      tl.to(
        decoratorsRef.current,
        { opacity: 0, duration: 0.2, ease: "power1.out" },
        0
      );

      tl.to(
        textLeftRef.current,
        { x: 250, opacity: 0, duration: 0.25, ease: "power2.in" },
        0
      );

      tl.to(
        textRightRef.current,
        { x: -250, opacity: 0, duration: 0.25, ease: "power2.in" },
        0
      );

      tl.to(
        imageRef.current,
        {
          clipPath: `polygon(
            ${cx}px ${cy - expand}px,
            ${cx + expand}px ${cy}px,
            ${cx}px ${cy + expand}px,
            ${cx - expand}px ${cy}px
          )`,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.1
      );

      tl.call(() => {
        showHowItWorks();
      }, [], revealPoint);
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [windowSize, diamondSize]);

  const cx = windowSize.width / 2;
  const cy = windowSize.height / 2;
  const size = diamondSize;

  const corners = [
    { x: cx, y: cy - size },
    { x: cx + size, y: cy },
    { x: cx, y: cy + size },
    { x: cx - size, y: cy },
  ];

  const leftVertex = corners[3];
  const rightVertex = corners[1];
  const leftLineEnd = { x: leftVertex.x - 600, y: leftVertex.y };
  const rightLineEnd = { x: rightVertex.x + 600, y: rightVertex.y };
  const squarePoints = corners.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: windowSize.height || "100vh" }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0"
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
        }}
      />

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <g ref={decoratorsRef}>
          <polygon
            points={squarePoints}
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1={leftVertex.x}
            y1={leftVertex.y}
            x2={leftLineEnd.x}
            y2={leftLineEnd.y}
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1={rightVertex.x}
            y1={rightVertex.y}
            x2={rightLineEnd.x}
            y2={rightLineEnd.y}
            stroke="white"
            strokeWidth="2"
          />
        </g>
      </svg>

      <h1
        ref={textLeftRef}
        className="ml-8 pb-45 text-4xl absolute text-white xl:text-6xl xl:pb-5 font-made-outer-alt pointer-events-none text-shadow-lg"
        style={{
          left: "16%",
          top: "45%",
          transform: "translateY(-50%)",
          zIndex: -10,
          willChange: "transform, opacity",
        }}
      >
        ExplorE
      </h1>

      <div
        ref={textRightRef}
        className="mr-25 pt-60 text-4xl absolute text-white xl:mt-[-90] xl:mr-[-10] xl:text-6xl font-made-outer-alt pointer-events-none text-center"
        style={{
          right: "27%",
          top: "51.5%",
          transform: "translateX(50%) translateY(-50%)",
          width: "500px",
          zIndex: -10,
          willChange: "transform, opacity",
        }}
      >
        <AirportText
          words={[
            "LandsCapEs",
            "CitIEs",
            "CUltuREs",
            "With Us",
            "Any TimE",
            "AnywHErE",
          ]}
        />
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-30">
        <ScrollIndicator />
      </div>

      <div
        ref={nextSectionRef}
        className="absolute inset-0 flex flex-col h-full w-full justify-start items-center gap-2 pt-10 opacity-0"
        style={{ zIndex: 10, willChange: "transform, opacity" }}
      >
        <HowItWorks />
      </div>
    </div>
  );
};

export default HomeShape;