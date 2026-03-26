'use client';

import { motion } from 'framer-motion';
import Footer from "@/components/ui/footer/Footer";
import { Compass, Globe, Heart, MapPin, Users, Lock } from 'lucide-react';

export default function About() {
  return (
      <>
      <motion.div 
        className="w-full flex flex-col justify-center items-center gap-8 px-12 mb-24 mt-48"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-6 max-w-4xl">
          <motion.h1 
            className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            aboUt
          </motion.h1>
          <motion.h2 
            className="text-6xl font-made-outer-alt font-black text-gray-500 text-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Us
          </motion.h2>
          <motion.p 
            className="text-lg font-made-outer text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Born from a passion for discovery, we&apos;re redefining how the world travels with smart tools, curated destinations, and a vibrant community.
          </motion.p>
        </div>
      </motion.div>
      
      <div className="my-8 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="w-full flex flex-col justify-center items-center gap-12 px-24 mb-24 mt-24">
        <div className="text-center">
          <motion.h1 
            className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            oUr
          </motion.h1>
          <motion.h1 
            className="text-6xl font-made-outer-alt font-black text-gray-400 text-shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            mIssion
          </motion.h1>
          <motion.p 
            className="text-xl font-made-outer text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everyone deserves to explore the world without the hassle of complex planning. We empower modern travelers with smart tools, curated destinations, and a vibrant community — so you can focus on what matters most: the experience.
          </motion.p>
        </div>
      </div>

      <div className="my-8 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>


      <div className="w-full flex flex-col justify-center items-center gap-16 px-24 mb-24 mt-24">
        <motion.h1 
          className="text-6xl font-made-outer-alt font-black text-white text-shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          what wE offEr
        </motion.h1>
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 flex flex-col items-center gap-6 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center">
              <Compass className="text-white" size={48} />
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
              <Globe className="text-white" size={48} />
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
              <Heart className="text-white" size={48} />
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
      
      <div className="my-8 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="w-full flex flex-col justify-center items-center gap-16 px-24 mb-64 mt-24">
        <motion.h1 
          className="text-6xl font-made-outer-alt font-black text-white text-shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          what wE stand for
        </motion.h1>
        <div className="xl:grid xl:grid-cols-3 flex flex-col gap-12 max-w-5xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <MapPin className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              advEntUrE first
            </h3>
            <p className="text-gray-400 font-made-outer text-sm">
              Exploration at the heart of everything. Every trip is a new chapter.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <Users className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              COmmUnity
            </h3>
            <p className="text-gray-400 font-made-outer text-sm">
              Growing nomads sharing tips, stories, and inspiration together.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <Lock className="text-white" size={44} />
            <h3 className="text-xl font-made-outer-alt font-black text-white">
              trUst & sAfEty
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
