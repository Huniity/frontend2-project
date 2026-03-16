"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AirportText from "../cyclingtext/AirportText";
import HowItWorks from "../cards/howitworks/HowItWorks";
import ScrollIndicator from "../scrollindicator/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const HomeShape = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decoratorsRef = useRef<SVGGElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure ScrollTrigger is refreshed on mount
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=750%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          // ✅ This ensures the pin spacer is cleaned up properly
          pinSpacing: true,
          onKill: () => {
            // Reset inline styles GSAP applied when the trigger is killed
            if (sectionRef.current) {
              sectionRef.current.style.transform = "";
              sectionRef.current.style.position = "";
              sectionRef.current.style.top = "";
              sectionRef.current.style.left = "";
              sectionRef.current.style.width = "";
            }
          },
        },
      });

      tl.to(decoratorsRef.current, { opacity: 0, duration: 0.2, ease: "power1.out" }, 0);
      tl.to(textLeftRef.current, { x: 250, opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
      tl.to(textRightRef.current, { x: -250, opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
      tl.to(imageRef.current, { clipPath: "polygon(50% -150%, 160% 50%, 50% 250%, -60% 50%)", duration: 0.8, ease: "power2.inOut" }, 0.1);
      tl.to(nextSectionRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, 0.75);
      tl.to(nextSectionRef.current, { duration: 0.5 }, 1.05);
    }, sectionRef);

    return () => {
      // ✅ Kill ALL ScrollTriggers first, THEN revert the context
      // Order matters — revert() alone doesn't fully unpin
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  const squareCenter = { x: 500, y: 400 };
  const squareSize = 65;
  const corners = [
    { x: squareCenter.x,              y: squareCenter.y - squareSize },
    { x: squareCenter.x + squareSize, y: squareCenter.y },
    { x: squareCenter.x,              y: squareCenter.y + squareSize },
    { x: squareCenter.x - squareSize, y: squareCenter.y },
  ];
  const leftVertex = corners[3];
  const rightVertex = corners[1];
  const leftLineEnd  = { x: leftVertex.x  - 280, y: leftVertex.y };
  const rightLineEnd = { x: rightVertex.x + 280, y: rightVertex.y };
  const squarePoints = corners.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url(/hawaii2.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(1.1) contrast(1.1) saturate(1.5) sepia(0.2) grayscale(0.2) hue-rotate(10deg)",
        }}
      />

      {/* Diamond shadow wrapper */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "drop-shadow(0px 0px 20px rgba(0,0,0,0.95))" }}>
        <div
          ref={imageRef}
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(/hawaii3.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
            clipPath: "polygon(50% 30%, 56.5% 44.5%, 50% 59%, 43.5% 44.5%)",
          }}
        />
      </div>

      {/* SVG decorators */}
      <svg
        width="100%" height="100%"
        viewBox="150 200 700 450"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <g ref={decoratorsRef}>
          <polygon points={squarePoints} fill="none" stroke="white" strokeWidth="2" />
          <line x1={leftVertex.x}  y1={leftVertex.y}  x2={leftLineEnd.x}  y2={leftLineEnd.y}  stroke="white" strokeWidth="2" />
          <line x1={rightVertex.x} y1={rightVertex.y} x2={rightLineEnd.x} y2={rightLineEnd.y} stroke="white" strokeWidth="2" />
        </g>
      </svg>

      {/* Text left */}
      <h1
        ref={textLeftRef}
        className="absolute text-white text-6xl font-made-outer-alt pointer-events-none text-shadow-lg"
        style={{ left: "17.5%", top: "38%", transform: "translateY(-50%)", zIndex: 1, willChange: "transform, opacity" }}
      >
        ExplorE
      </h1>

      {/* Text right */}
      <div
        ref={textRightRef}
        className="absolute text-white text-6xl font-made-outer-alt pointer-events-none"
        style={{ right: "15%", top: "50%", transform: "translateY(-50%)", zIndex: 1, willChange: "transform, opacity" }}
      >
        <AirportText words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]} />
      </div>

      {/* Black fade gradient at bottom */}
      <div
        className="absolute bottom-0 w-full h-64 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 15%, rgba(0, 0, 0, 0.8) 50%)",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 w-full flex justify-center z-30">
        <ScrollIndicator />
      </div>

      {/* Next section overlay */}
      <div
        ref={nextSectionRef}
        className="absolute inset-0 flex flex-col h-full w-full justify-start items-center gap-2 pt-40 opacity-0"
        style={{ zIndex: 10 }}
      >
        <div className="text-center gap-12 flex flex-col items-center justify-center">
          <div>
            <h1 className="text-[12rem] font-made-outer-alt font-black text-white mb-12 leading-24 text-shadow-lg">how</h1>
            <h1 className="text-[10rem] font-made-outer-alt font-black text-white mb-12 leading-17 text-shadow-lg">it</h1>
            <h1 className="text-[8rem] font-made-outer-alt font-black text-white mb-12 leading-12 text-shadow-lg">works</h1>
          </div>
          <HowItWorks />
        </div>
      </div>
    </div>
  );
};

export default HomeShape;