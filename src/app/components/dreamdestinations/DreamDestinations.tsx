"use client";

import {
  Eye,
  Sparkles,
  Trees,
  Sun,
  MapPin,
  Flame,
  Waves,
  Cloud,
  Navigation,
} from "lucide-react";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  title: string;
  image?: string;
}


const DreamDestinations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef2 = useRef<(HTMLDivElement | null)[]>([]);
  const titleSpansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const features: Feature[] = [
    { icon: <Eye size={32} />, title: "Vast pEaks", image: "/anapurna.avif" },
    {
      icon: <Waves size={32} />,
      title: "MEsmErizing Sand",
      image: "/blacksand.avif",
    },
    { icon: <Trees size={32} />, title: "LUsh forEsts", image: "/forest.avif" },
    {
      icon: <Cloud size={32} />,
      title: "Night skylinE",
      image: "/new_york2.avif",
    },
    {
      icon: <MapPin size={32} />,
      title: "paradisE Island",
      image: "/hawaii2.avif",
    },
    { icon: <Sun size={32} />, title: "goldEn light", image: "/rome.avif" },
    {
      icon: <Flame size={32} />,
      title: "OUtdoor lifE",
      image: "/backpack.avif",
    },
    {
      icon: <MapPin size={32} />,
      title: "UniqUE spots",
      image: "/cappadocia.avif",
    },
    {
      icon: <Navigation size={32} />,
      title: "bUstling strEEts",
      image: "/tokyo5.avif",
    },
    {
      icon: <Sparkles size={32} />,
      title: "City lights",
      image: "/tokyo3.avif",
    },
  ];
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const row1Features = useMemo(() => {
    const shuffled = shuffleArray(features);
    return [...shuffled, ...shuffled];
  }, []);

  const row2Features = useMemo(() => {
    const shuffled = shuffleArray(features);
    return [...shuffled, ...shuffled];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const track2 = trackRef2.current;
      const container = containerRef.current;

      if (!track || !track2 || !container) return;

      const init = () => {
        const totalWidth = track.scrollWidth / 2;
        const totalWidth2 = track2.scrollWidth / 2;
        const cards = imagesRef.current;
        const cards2 = imagesRef2.current;

        gsap.set(cards, { opacity: 0, y: 25 });
        gsap.set(cards2, { opacity: 0, y: 25 });
        gsap.set(track, { x: 0 * 0.2});
        gsap.set(track2, { x: -totalWidth2 * 0.2 });

        gsap.to([...cards, ...cards2], {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: container,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(track, {
          x: -totalWidth * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(track2, {
          x: 0 * 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      };

      requestAnimationFrame(() => requestAnimationFrame(init));
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const allImages = [...imagesRef.current, ...imagesRef2.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLDivElement;
            const bgImage = img.dataset.bgImage;
            if (bgImage) {
              img.style.backgroundImage = `url(${bgImage})`;
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: "50px" },
    );

    allImages.forEach((img) => {
      if (img) observer.observe(img);
    });
    return () => observer.disconnect();
  }, []);

  const renderCard = (
    feature: Feature,
    index: number,
    ref: React.MutableRefObject<(HTMLDivElement | null)[]>,
  ) => (
    <div
      key={index}
      ref={(el) => {
        ref.current[index] = el;
      }}
      className="relative rounded-2xl border border-white/15 w-48 h-28 shrink-0"
      data-bg-image={feature.image}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-2xl" />
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-4 gap-2">
        <div className="text-white/80">{feature.icon}</div>
        <p className="text-white text-sm text-center font-bold font-made-outer-alt">
          {feature.title}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-16 mt-54">
        <h1
          className="parallax-text px-4.5 font-black font-made-outer-alt"
          style={{
            backgroundImage: "url(/hawaii2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "0.65",
          }}
        >
          <span className="font-made-outer-alt block text-[5rem] xl:text-[16rem]">
            drEam
          </span>
          <span className="font-made-outer-alt block text-[2.5rem] xl:text-[10rem] mb-40 ml-1 leading-35">
            dEstinations
          </span>
        </h1>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden mb-48 flex flex-col gap-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex gap-6 w-max px-5">
          {row1Features.map((feature, index) =>
            renderCard(feature, index, imagesRef),
          )}
        </div>

        <div ref={trackRef2} className="flex gap-6 w-max px-5">
          {row2Features.map((feature, index) =>
            renderCard(feature, index, imagesRef2),
          )}
        </div>
      </div>
    </div>
  );
};

export default DreamDestinations;
