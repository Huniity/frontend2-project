'use client';

import { motion } from "framer-motion";
import DiscordButton from "@/components/ui/buttons/DiscordButton";
import GoogleButton from "@/components/ui/buttons/GoogleButton";
import AppleButton from "@/components/ui/buttons/AppleButton";

import LoginCard from "@/components/ui/cards/login/LoginCard";
import Link from "next/link";


const Login = () => {

  return (

        <section className="snap-start w-full min-h-screen overflow-clip flex items-center justify-center">
            <div className="absolute inset-0" ></div>
            <motion.div 
              className="w-9/10 xl:w-full max-w-md rounded-lg overflow-hidden relative p-0.5 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05))',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="border-2 rounded-lg absolute inset-0 pointer-events-none"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              ></div>
              <div 
                className="border-2 rounded-lg absolute inset-0 pointer-events-none"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  filter: 'blur(1px)'
                }}
              ></div>
              <div 
                className="border-2 rounded-lg absolute inset-0 pointer-events-none"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  filter: 'blur(4px)'
                }}
              ></div>
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none opacity-40"
                style={{
                  background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.1), transparent 30%, transparent 70%, rgba(255, 255, 255, 0.05))',
                  mixBlendMode: 'overlay',
                  transform: 'scale(1.1)',
                  filter: 'blur(16px)'
                }}
              ></div>

              <div className="relative z-10 p-8 flex flex-col items-center justify-center gap-6">
                <motion.div 
                  className="text-center space-y-2 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-white text-shadow-lg font-made-outer-alt">WElComE baCk</h1>
                    <p className="text-sm text-gray-400 text-shadow-lg font-made-outer">Let{"'"}s Continue your journey.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <LoginCard name="Grab Your Backpack" mutatedName="Backpacking your stuff" namePassword="Forgot Password?" mutatedNamePassword="Processing..." />
                </motion.div>
                
                <motion.div 
                  className="flex flex-row gap-3 w-full justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <DiscordButton name="Discord" showName={false} isLoading={false} />
                    <GoogleButton name="Google" showName={false} isLoading={false} />
                    <AppleButton name="Apple" showName={false} isLoading={false} />
                </motion.div>
                
                <motion.p 
                  className="text-sm text-gray-400 text-center font-made-outer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Don{"'"}t have an account? <Link href="/signin" className="text-white font-made-outer cursor-pointer hover:underline">Sign up</Link>
                </motion.p>
              </div>
            </motion.div>
        </section>
)
}

export default Login;