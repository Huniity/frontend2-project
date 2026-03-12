import DiscordButton from "@/components/ui/buttons/DiscordButton";
import GoogleButton from "@/components/ui/buttons/GoogleButton";
import AppleButton from "@/components/ui/buttons/AppleButton";

import LoginCard from "@/components/ui/cards/login/LoginCard";
import Link from "next/link";


const Login = () => {
    return (
        <section className="snap-start w-full min-h-screen overflow-clip flex items-center justify-center">
            <div className="absolute inset-0" ></div>
            {/* style={{ backgroundImage: 'url(/smoke.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15) blur(0px)' }} */}
            <div 
              className="grid grid-cols-5 w-3/5 h-146 rounded-lg overflow-hidden relative p-0.5 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(-30deg, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05))',
              }}
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

              <div className="grid grid-cols-5 w-full h-full relative z-10 col-span-5" >
                <div className="flex flex-col col-span-2 w-full h-full items-center justify-center"  style={{ backgroundImage: 'url(/mountain1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }} >
                    <h1 className="text-5xl font-bold text-white text-shadow-lg font-made-outer"></h1>
                </div>
                <div className="flex flex-col col-span-3 w-full h-full items-center justify-center" >
                    <h1 className="mb-3 text-4xl font-bold text-white text-shadow-lg font-made-outer-alt text-center">WElComE baCk <span className="font-made-outer-alt">Nomad</span></h1>
                    <p className="mb-6 text-lg text-white text-shadow-lg font-made-outer-alt text-center">LEt{"'"}s ContinUE yoUr joUrnEy.</p>
                    <LoginCard name="Grab Your Backpack" mutatedName="Backpacking your stuff" namePassword="Forgot Password?" mutatedNamePassword="Processing..." />
                    <div className="flex flex-row gap-4 mt-12">
                        <DiscordButton name="Discord" showName={true} isLoading={false} />
                        <GoogleButton name="Google" showName={true} isLoading={false} />
                        <AppleButton name="Apple" showName={true} isLoading={false} />
                    </div>
                    <p className="mt-6 text-md text-gray-400 text-center font-made-outer">Don{"'"}t have an account? <Link href="/signin" className="text-white font-made-outer cursor-pointer">Sign up</Link></p>
                </div>
              </div>
            </div>
        </section>
)
}

export default Login;