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
  const [dynamicSquareSize, setDynamicSquareSize] = useState(67);
  
  useEffect(() => {
    ScrollTrigger.refresh();
    
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.15;

    const polygonEl = document.getElementById("diamond-polygon");
    if (polygonEl) {
      polygonEl.setAttribute(
        "points",
        `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`
      );
    }

    const expand = size * 12;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=750%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          onKill: () => {
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

      tl.to(
        "#diamond-polygon",
        {
          attr: {
            points: `${cx},${cy - expand} ${cx + expand},${cy} ${cx},${cy + expand} ${cx - expand},${cy}`,
          },
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.1
      );

      tl.to(nextSectionRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, 0.4);
      tl.to(nextSectionRef.current, { duration: 0.5 }, 0.75);
    }, sectionRef);
    
    const updateSquareSize = () => {
    const w = window.innerWidth;
      if (w < 768) {
        setDynamicSquareSize(105);        // mobile
      } else if (w < 1280) {
        setDynamicSquareSize(50);     // tablet
      } else {
        setDynamicSquareSize(67);    // desktop
      }
  };
  updateSquareSize();
  window.addEventListener("resize", updateSquareSize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
      window.removeEventListener("resize", updateSquareSize);
    };
  }, []);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bgImageUrl = imageElement.getAttribute("data-bg-image");
            if (bgImageUrl) {
              imageElement.style.backgroundImage = `url(${bgImageUrl})`;
              observer.unobserve(imageElement);
            }
          }
        });
      },
      { rootMargin: "50px" }
    );

    observer.observe(imageElement);

    return () => {
      observer.disconnect();
    };
  }, []);



  const squareCenter = { x: 500, y: 425 };
  const squareSize = dynamicSquareSize;
  const corners = [
    { x: squareCenter.x,              y: squareCenter.y - squareSize },
    { x: squareCenter.x + squareSize, y: squareCenter.y },
    { x: squareCenter.x,              y: squareCenter.y + squareSize },
    { x: squareCenter.x - squareSize, y: squareCenter.y },
  ];
  const leftVertex = corners[3];
  const rightVertex = corners[1];
  const leftLineEnd  = { x: leftVertex.x  - 345, y: leftVertex.y };
  const rightLineEnd = { x: rightVertex.x + 345, y: rightVertex.y };
  const squarePoints = corners.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <div style={{ position: "absolute", inset: 0, zIndex: 2, filter: "drop-shadow(0px 0px 20px rgba(0,0,0,0.95))" }}>
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="diamond-clip" clipPathUnits="userSpaceOnUse">
              {/* Points are set dynamically in useEffect */}
              <polygon id="diamond-polygon" points="0,0" />
            </clipPath>
          </defs>
        </svg>

        <div
          ref={imageRef}
          className="absolute inset-0"
          // data-bg-image="/bali5.avif"
          style={{
            backgroundImage: "url(/anapurna.webp)",
            backgroundSize: "cover", 
            backgroundPosition: "center",
            clipPath: "url(#diamond-clip)",
            filter: "brightness(1.1) contrast(1.1) saturate(1.5) sepia(0.2) grayscale(0.2) hue-rotate(10deg)",
            maskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 1%, black 50%, black 90%, transparent 100%)",
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
        className="ml-8 pb-45 text-4xl absolute text-white xl:text-6xl xl:pb-5 font-made-outer-alt pointer-events-none text-shadow-lg"
        style={{ left: "16%", top: "45%", transform: "translateY(-50%)", zIndex: 1, willChange: "transform, opacity" }}
      >
        ExplorE
      </h1>

      {/* Text right */}
      <div
        ref={textRightRef}
        className="mr-25 pt-60 text-4xl absolute text-white xl:text-6xl font-made-outer-alt pointer-events-none text-center"
        style={{ 
          right: "27%", 
          top: "51.5%", 
          transform: "translateX(50%) translateY(-50%)", // ← center the div itself too
          width: "500px",
          zIndex: 1, 
          willChange: "transform, opacity",
        }}
      >
        <AirportText words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]} />
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-30">
        <ScrollIndicator />
      </div>

      <div
        ref={nextSectionRef}
        className="absolute inset-0 flex flex-col h-full w-full justify-start items-center gap-2 pt-10 opacity-0"
        style={{ zIndex: 10 }}
      >
        <HowItWorks />
      </div>
    </div>
  );
};

export default HomeShape;