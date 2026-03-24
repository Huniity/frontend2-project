'use client';

import { Eye, Sparkles, Trees, Sun, MapPin, Flame, Waves, Cloud, Navigation } from 'lucide-react';
import { useEffect, useRef } from 'react';


interface Feature {
  icon: React.ReactNode;
  title: string;
  image?: string;
}

const DreamDestinations = () => {
  const features: Feature[] = [
    { icon: <Eye size={32} />, title: "Vast pEaks", image: "/anapurna.webp" },
    { icon: <Waves size={32} />, title: "MEsmErizing Sand", image: "/blacksand.webp" },
    { icon: <Trees size={32} />, title: "LUsh forEsts", image: "/forest.avif" },
    { icon: <Cloud size={32} />, title: "Night skylinE", image: "/new_york2.webp" },
    { icon: <MapPin size={32} />, title: "paradisE Island", image: "/hawaii2.webp" },
    { icon: <Sun size={32} />, title: "goldEn light", image: "/rome.webp" },
    { icon: <Flame size={32} />, title: "OUtdoor lifE", image: "/backpack.webp" },
    { icon: <MapPin size={32} />, title: "UniqUE spots", image: "/cappadocia.webp" },
    { icon: <Navigation size={32} />, title: "bUstling strEEts", image: "/tokyo5.webp" },
    { icon: <Sparkles size={32} />, title: "City lights", image: "/tokyo3.webp" },
  ];

  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Lazy load background images with Intersection Observer
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
    <div className="w-full h-full flex flex-col xl:justify-start xl:items-center">
      <div className="mb-16">
        <div className="flex flex-col mt-54">
        <h1
          className="px-4.5 text-left font-black font-made-outer-alt"
          style={{
            backgroundImage: "url(/hawaii1.avif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "scroll",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            overflow: "visible",
            lineHeight: "0.75",
          }}
        >
          <span className="block text-[5rem] xl:text-[16rem] pb-2 xl:pb-0 font-made-outer-alt">drEam</span>
          <span className="block text-[2.5rem] xl:text-[10rem] ml-1 font-made-outer-alt">dEstinations</span>
        </h1>
      </div>
        {/* <div className="flex flex-col mt-54">
          <h1
            className="px-4.5 text-left text-[5rem] xl:text-[16rem] font-black font-made-outer-alt"
            style={{
              backgroundImage: "url(/hawaii1.avif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "scroll",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "0",
              paddingTop: "0.30em",
              paddingBottom: "0.40em",
              overflow: "visible",
            }}
          >
            drEam
          </h1>
          <h1
            className="px-5 text-left text-[2.5rem] xl:text-[10rem] font-black font-made-outer-alt"
            style={{
              backgroundImage: "url(/hawaii1.avif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "scroll",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "0",
              paddingTop: "0.35em",
              paddingBottom: "0.5em",
              overflow: "visible",
            }}
          >
            dEstinations
          </h1>
        </div> */}
      </div>

      <div className="px-5 grid grid-cols-2 md:grid-cols-5 gap-6 w-full max-w-6xl place-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              imagesRef.current[index] = el;
            }}
            className="relative rounded-2xl overflow-hidden border border-white/15 hover:border-white/25 transition-all duration-300 w-full h-48"
            data-bg-image={feature.image}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Dark overlay */}
            <div className="relative z-10 flex flex-col items-center justify-end pb-6 h-full gap-3 group hover:gap-4 transition-all duration-300">
              <div className="text-white/80 group-hover:text-white group-hover:scale-110 transform transition-all duration-300">
                {feature.icon}
              </div>
              <p className="text-white font-bold text-center font-made-outer-alt text-sm md:text-base">
                {feature.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamDestinations;