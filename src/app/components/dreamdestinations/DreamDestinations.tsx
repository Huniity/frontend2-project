'use client';

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
} from 'lucide-react';
import { useEffect, useRef } from 'react';
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
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const features: Feature[] = [
    { icon: <Eye size={32} />, title: "Vast pEaks", image: "/anapurna.avif" },
    { icon: <Waves size={32} />, title: "MEsmErizing Sand", image: "/blacksand.avif" },
    { icon: <Trees size={32} />, title: "LUsh forEsts", image: "/forest.avif" },
    { icon: <Cloud size={32} />, title: "Night skylinE", image: "/new_york2.avif" },
    { icon: <MapPin size={32} />, title: "paradisE Island", image: "/hawaii2.avif" },
    { icon: <Sun size={32} />, title: "goldEn light", image: "/rome.avif" },
    { icon: <Flame size={32} />, title: "OUtdoor lifE", image: "/backpack.avif" },
    { icon: <MapPin size={32} />, title: "UniqUE spots", image: "/cappadocia.avif" },
    { icon: <Navigation size={32} />, title: "bUstling strEEts", image: "/tokyo5.avif" },
    { icon: <Sparkles size={32} />, title: "City lights", image: "/tokyo3.avif" },
  ];

  const loopFeatures = [...features, ...features];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const title = titleRef.current;
      const container = containerRef.current;

      if (!track || !title || !container) return;

      gsap.set(title, {
        opacity: 0,
        y: 30,
      });

      const init = () => {
      const totalWidth = track.scrollWidth / 2;
      const cards = imagesRef.current;


      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 25 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 150%",
          end: "bottom top",
          scrub: 2,
        },
      });


      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      }, 0);

      tl.call(() => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          overwrite: "auto",
        });
      }, [], 0.05);

      tl.to(track, {
        x: -totalWidth,
        ease: "none",
        duration: 1,
      }, 0);
    };

      requestAnimationFrame(() => requestAnimationFrame(init));
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
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
      { rootMargin: '50px' }
    );

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={titleRef} className="mb-16 mt-54">
        <h1
          className="px-4.5 font-black font-made-outer-alt"
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
          <span className="font-made-outer-alt block text-[2.5rem] xl:text-[10rem] mb-80 ml-1 leading-35">
            dEstinations
          </span>
        </h1>
      </div>

      <div
        ref={containerRef}
        className="w-full overflow-hidden mb-48"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 w-max px-5"
        >
          {loopFeatures.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              className="relative rounded-2xl border border-white/15 w-48 h-28 shrink-0"
              data-bg-image={feature.image}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex flex-col items-center justify-end h-full pb-6 gap-3">
                <div className="text-white/80">{feature.icon}</div>
                <p className="text-white text-sm text-center font-bold font-made-outer-alt">
                  {feature.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamDestinations;