import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Counter from "@/components/ui/counter/Counter";
import Link from "next/link";
import { GiCompass, GiEarthAmerica, GiHearts } from "react-icons/gi";
import { MdGroups, MdTravelExplore, MdSecurity } from "react-icons/md";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="snap-start w-full bg-black h-screen">
        <div className="flex flex-col h-full w-full justify-center items-center gap-6 px-12">
          <h1 className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg text-center">
            OUr Story
          </h1>
          <p className="text-xl font-made-outer-alt text-gray-400 text-center max-w-2xl mt-4">
            Born from a passion for discovEry, Nomadia was crEatEd to makE travEl
            planning EfFortless, pErsonalizEd, and Unforgettable.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="snap-start w-full bg-black h-screen">
        <div className="flex flex-col h-full w-full justify-center items-center gap-16 px-24">
          <div className="text-center">
            <h2 className="text-5xl font-made-outer-alt font-black text-white text-shadow-lg mb-6">
              OUr Mission
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We believe everyone deserves to explore the world without the hassle of
              complex planning. Nomadia empowers modern travelers with smart tools,
              curated destinations, and a vibrant community — so you can focus on what
              matters most: the experience.
            </p>
          </div>
          <div className="flex flex-row gap-24">
            <div className="flex flex-col items-center gap-4 max-w-xs text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <GiCompass className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-made-outer-alt font-bold text-white">
                GUidancE
              </h3>
              <p className="text-gray-400 text-sm">
                Personalized recommendations tailored to your travel style, budget, and
                dream destinations.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 max-w-xs text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <GiEarthAmerica className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-made-outer-alt font-bold text-white">
                Global REach
              </h3>
              <p className="text-gray-400 text-sm">
                Access destinations across every continent, from iconic cities to hidden
                gems off the beaten path.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 max-w-xs text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                <GiHearts className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-made-outer-alt font-bold text-white">
                Passion
              </h3>
              <p className="text-gray-400 text-sm">
                Built by travelers, for travelers. Every feature is crafted with love
                for exploration and adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="snap-start w-full bg-black h-screen">
        <div className="flex flex-col h-full w-full justify-center items-center gap-16 px-24">
          <h2 className="text-5xl font-made-outer-alt font-black text-white text-shadow-lg">
            What WE Stand For
          </h2>
          <div className="grid grid-cols-3 gap-12 max-w-5xl">
            <div className="relative p-10 flex flex-col items-center gap-4 text-center">
              <MdTravelExplore className="text-white" size={40} />
              <h3 className="text-lg font-made-outer-alt font-bold text-white">
                AdVEntUrE First
              </h3>
              <p className="text-gray-400 text-sm">
                We put exploration at the heart of everything we build. Every trip
                should feel like a new chapter.
              </p>
            </div>
            <div className="relative p-10 flex flex-col items-center gap-4 text-center">
              <MdGroups className="text-white" size={40} />
              <h3 className="text-lg font-made-outer-alt font-bold text-white">
                CommUnity DriVEn
              </h3>
              <p className="text-gray-400 text-sm">
                Our growing community of nomads shares tips, stories, and inspiration
                to help each other travel better.
              </p>
            </div>
            <div className="relative p-10 flex flex-col items-center gap-4 text-center">
              <MdSecurity className="text-white" size={40} />
              <h3 className="text-lg font-made-outer-alt font-bold text-white">
                TrUst & SafEty
              </h3>
              <p className="text-gray-400 text-sm">
                Secure payments, verified destinations, and transparent pricing — so you
                travel with peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}
