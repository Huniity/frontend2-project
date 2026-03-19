import Footer from "@/components/ui/footer/Footer";
import { GiCompass, GiEarthAmerica, GiHearts } from "react-icons/gi";
import { MdGroups, MdTravelExplore, MdSecurity } from "react-icons/md";

export default function About() {
  return (
      <>
      <div className="snap-start w-full bg-black h-screen flex flex-col justify-center items-center gap-8 px-12">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg">
            aboUt
          </h1>
          <h2 className="text-6xl font-made-outer-alt font-black text-white text-shadow-lg leading-tight">
            nomaDia
          </h2>
          <p className="text-lg font-made-outer text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Born from a passion for discovery, we're redefining how the world travels with smart tools, curated destinations, and a vibrant community.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="snap-start w-full bg-black h-screen flex flex-col justify-center items-center gap-12 px-24">
        <div className="text-center">
          <h1 className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg mb-8 leading-tight">
            oUr
          </h1>
          <h1 className="text-6xl font-made-outer-alt font-black text-gray-400 text-shadow-lg mb-12">
            mIssion
          </h1>
          <p className="text-xl font-made-outer text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everyone deserves to explore the world without the hassle of complex planning. We empower modern travelers with smart tools, curated destinations, and a vibrant community — so you can focus on what matters most: the experience.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="snap-start w-full bg-black h-screen flex flex-col justify-center items-center gap-16 px-24">
        <h1 className="text-6xl font-made-outer-alt font-black text-white text-shadow-lg text-center">
          what wE offEr
        </h1>
        <div className="flex flex-row gap-12">
          <div className="flex-1 flex flex-col items-center gap-6 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
              <GiCompass className="text-white" size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-made-outer-alt font-black text-white mb-3">
                pErsOnalizEd
              </h3>
              <p className="text-gray-400 font-made-outer">
                Smart recommendations tailored to your travel style and dreams.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-6 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
              <GiEarthAmerica className="text-white" size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-made-outer-alt font-black text-white mb-3">
                glObal
              </h3>
              <p className="text-gray-400 font-made-outer">
                Access destinations across every continent, iconic to hidden.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-6 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
              <GiHearts className="text-white" size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-made-outer-alt font-black text-white mb-3">
                passiOn
              </h3>
              <p className="text-gray-400 font-made-outer">
                Built by travelers, for travelers. Crafted with love for adventure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="snap-start w-full bg-black h-screen flex flex-col justify-center items-center gap-16 px-24">
        <h1 className="text-6xl font-made-outer-alt font-black text-white text-shadow-lg text-center">
          what wE stand for
        </h1>
        <div className="grid grid-cols-3 gap-12 max-w-5xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <MdTravelExplore className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              advEntUrE first
            </h3>
            <p className="text-gray-400 font-made-outer text-sm">
              Exploration at the heart of everything. Every trip is a new chapter.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <MdGroups className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              cOmmUnity
            </h3>
            <p className="text-gray-400 font-made-outer text-sm">
              Growing nomads sharing tips, stories, and inspiration together.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <MdSecurity className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              trust & sAfEty
            </h3>
            <p className="text-gray-400 font-made-outer text-sm">
              Secure, verified, transparent. Travel with peace of mind.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
