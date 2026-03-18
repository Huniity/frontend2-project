
import Link from "next/link";

const Cta = () => {
    return(
        <section className="snap-start w-full bg-black h-screen">
            <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                Plan Today
            </h1>
            <h2 className="text-5xl font-made-outer-alt font-semibold mb-4 text-white text-shadow-lg">
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


        
