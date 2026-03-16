import SigninCard from "@/components/ui/cards/signin/SigninCard";
import Link from "next/link";
import DiscordButton from "@/components/ui/buttons/DiscordButton";
import GoogleButton from "@/components/ui/buttons/GoogleButton";
import AppleButton from "@/components/ui/buttons/AppleButton";


const Signin = () => {
    return (
        <section className="snap-start w-full min-h-screen overflow-clip flex items-center justify-center">
            <div className="absolute inset-0" ></div>
            <div 
              className="w-full max-w-md rounded-lg overflow-hidden relative p-0.5 backdrop-blur-xl"
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

              <div className="relative z-10 p-8 flex flex-col items-center justify-center gap-6">
                <div className="text-center space-y-2 mb-2">
                    <h1 className="text-3xl font-bold text-white text-shadow-lg font-made-outer-alt">bEComE a Nomad</h1>
                    <p className="text-sm text-white text-shadow-lg font-made-outer">LEt{"'"}s plan yoUr nExt advEntUrE.</p>
                </div>
                
                <SigninCard name="Grab Your Backpack" mutatedName="Backpacking your stuff" />
                
                <div className="flex flex-row gap-3 w-full justify-center">
                    <DiscordButton name="Discord" showName={false} isLoading={false} />
                    <GoogleButton name="Google" showName={false} isLoading={false} />
                    <AppleButton name="Apple" showName={false} isLoading={false} />
                </div>
                
                <p className="text-sm text-gray-400 text-center font-made-outer">Already have an account? <Link href="/login" className="text-white font-made-outer cursor-pointer hover:underline">Login</Link></p>
              </div>
            </div>
        </section>
    )
}

export default Signin;