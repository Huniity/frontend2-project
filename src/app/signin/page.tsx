import SigninCard from "@/components/ui/cards/signin/SigninCard";

const Signin = () => {
    return (
        <section className="snap-start w-full min-h-screen overflow-clip flex items-center justify-center">
            <div className="absolute inset-0" style={{ backgroundImage: 'url(/smoke.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15) blur(0px)' }}></div>
            <div className="flex flex-col grid grid-cols-5 w-2/4 h-130 items-center justify-center border border-white/15 backdrop-blur-xl shadow-xl rounded-lg" >
                <div className="flex flex-col col-span-3 w-full h-full items-center justify-center" >
                    <h1 className="mb-6 text-5xl font-bold text-white text-shadow-lg font-made-outer text-center">Become a Nomad</h1>
                    <p className="mb-12 text-lg text-white text-shadow-lg font-made-outer text-center">Let{"'"}s plan your next adventure.</p>
                    <SigninCard name="Grab Your Backpack" mutatedName="Backpacking your stuff" />
                </div>
                <div className="flex flex-col col-span-2 w-full h-full items-center justify-center"  style={{ backgroundImage: 'url(/mountain1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }} >
                    <h1 className="text-5xl font-bold text-white text-shadow-lg font-made-outer"></h1>
                </div>
            </div>
        </section>
    )
}

export default Signin;