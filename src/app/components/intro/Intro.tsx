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

  // --- Track window size ---
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
    window.visualViewport?.addEventListener("scroll", handleResize); // fires when browser bar shows/hides

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  // --- Update diamond image and SVG decorators ---
  useEffect(() => {
    const updateDiamond = () => {
      const cx = windowSize.width / 2;
      const cy = windowSize.height / 2;
      const size = diamondSize;

      // Update image clip-path
      if (imageRef.current) {
        imageRef.current.style.clipPath = `polygon(
          ${cx}px ${cy - size}px,
          ${cx + size}px ${cy}px,
          ${cx}px ${cy + size}px,
          ${cx - size}px ${cy}px
        )`;
      }

      // Update SVG decorators
      if (decoratorsRef.current) {
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
        const squarePoints = corners.map(c => `${c.x},${c.y}`).join(" ");

        const polygonEl = decoratorsRef.current.querySelector("polygon");
        const lines = decoratorsRef.current.querySelectorAll("line");

        if (polygonEl) polygonEl.setAttribute("points", squarePoints);
        if (lines[0]) {
          lines[0].setAttribute("x1", String(leftVertex.x));
          lines[0].setAttribute("y1", String(leftVertex.y));
          lines[0].setAttribute("x2", String(leftLineEnd.x));
          lines[0].setAttribute("y2", String(leftLineEnd.y));
        }
        if (lines[1]) {
          lines[1].setAttribute("x1", String(rightVertex.x));
          lines[1].setAttribute("y1", String(rightVertex.y));
          lines[1].setAttribute("x2", String(rightLineEnd.x));
          lines[1].setAttribute("y2", String(rightLineEnd.y));
        }
      }
    };

    updateDiamond();
  }, [windowSize, diamondSize]);

  // --- GSAP scroll animation ---
  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return;

    const cx = windowSize.width / 2;
    const cy = windowSize.height / 2;
    const expand = diamondSize * 12;

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
        },
      });

      // Animate text and decorators
      tl.to(decoratorsRef.current, { opacity: 0, duration: 0.2, ease: "power1.out" }, 0);
      tl.to(textLeftRef.current, { x: 250, opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
      tl.to(textRightRef.current, { x: -250, opacity: 0, duration: 0.25, ease: "power2.in" }, 0);

      // Animate diamond image
      tl.to(imageRef.current, {
        clipPath: `polygon(
          ${cx}px ${cy - expand}px,
          ${cx + expand}px ${cy}px,
          ${cx}px ${cy + expand}px,
          ${cx - expand}px ${cy}px
        )`,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.1);

      // Show next section
      tl.to(nextSectionRef.current, { opacity: 1, duration: 0.4, ease: "power1.in" }, 0.4);
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, [windowSize, diamondSize]);

  // --- Lazy load background image ---
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
    return () => observer.disconnect();
  }, []);

  // --- Calculate SVG decorator positions ---
  const squareCenter = { x: windowSize.width / 2, y: windowSize.height / 2 };
  const squareSize = diamondSize;
  const corners = [
    { x: squareCenter.x, y: squareCenter.y - squareSize },
    { x: squareCenter.x + squareSize, y: squareCenter.y },
    { x: squareCenter.x, y: squareCenter.y + squareSize },
    { x: squareCenter.x - squareSize, y: squareCenter.y },
  ];
  const leftVertex = corners[3];
  const rightVertex = corners[1];
  const leftLineEnd = { x: leftVertex.x - 600, y: leftVertex.y };
  const rightLineEnd = { x: rightVertex.x + 600, y: rightVertex.y };
  const squarePoints = corners.map(c => `${c.x},${c.y}`).join(",");

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Diamond Image */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/mountain.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: `polygon(
            ${squareCenter.x}px ${squareCenter.y - squareSize}px,
            ${squareCenter.x + squareSize}px ${squareCenter.y}px,
            ${squareCenter.x}px ${squareCenter.y + squareSize}px,
            ${squareCenter.x - squareSize}px ${squareCenter.y}px
          )`,
          filter:
            "brightness(1.1) contrast(1.1) saturate(1.5) sepia(0.2) grayscale(0.2) hue-rotate(10deg)",
        }}
      />

      {/* SVG decorators */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 3, pointerEvents: "none" }}
      >
        <g ref={decoratorsRef}>
          <polygon points={squarePoints} fill="none" stroke="white" strokeWidth="2" />
          <line x1={leftVertex.x} y1={leftVertex.y} x2={leftLineEnd.x} y2={leftLineEnd.y} stroke="white" strokeWidth="2" />
          <line x1={rightVertex.x} y1={rightVertex.y} x2={rightLineEnd.x} y2={rightLineEnd.y} stroke="white" strokeWidth="2" />
        </g>
      </svg>

      {/* Text left */}
      <h1
        ref={textLeftRef}
        className="ml-8 pb-45 text-4xl absolute text-white xl:text-6xl xl:pb-5 font-made-outer-alt pointer-events-none text-shadow-lg"
        style={{ left: "16%", top: "45%", transform: "translateY(-50%)", zIndex: -10, willChange: "transform, opacity" }}
      >
        ExplorE
      </h1>

      {/* Text right */}
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
        <AirportText words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 w-full flex justify-center z-30">
        <ScrollIndicator />
      </div>

      {/* Next Section */}
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