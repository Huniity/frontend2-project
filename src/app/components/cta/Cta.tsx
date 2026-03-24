
import Link from "next/link";

const Cta = () => {
    return(
        <section className="snap-start relative w-full h-screen">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url(./dubai.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    maskImage: "linear-gradient(to bottom, transparent 1%, black 100%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 1%, black 100%, black 90%, transparent 100%)",
                }}
            />
            <div className="relative z-20 flex flex-col h-full w-full justify-center items-center gap-12">
                <h1 className="text-4xl xl:text-5xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                    Plan Today
                </h1>
                <h2 className="text-center text-4xl xl:text-5xl font-made-outer-alt font-semibold mb-4 text-white text-shadow-lg">
                    Explore Tomorrow
                </h2>
                <Link
                    href="/signin"
                    className="mt-48 rounded-full bg-white px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition shadow-black/50 shadow-xs"
                >
                    sign Up now
                </Link>
            </div>
        </section>
    );
}

export default Cta;


        
