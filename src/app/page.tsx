import AirportText from "@/components/home/AirportText";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import Counter from "@/components/home/Counter";
import BackgroundCycle from "@/components/home/BackgroundCycle";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <section className="snap-start">
          <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
            <BackgroundCycle 
              images={[
                '/fuji2.png',
                '/fuji4.jpg',
                '/fuji5.jpg',
                '/fuji6.jpg'

              ]}
              interval={10000}
              backgroundSizes={[
                'auto 150%',
                'auto 145%',
                'auto 150%',
                'auto 150%'
              ]}
              backgroundPositions={[
                'center -100px',
                'center -70px',
                'center -200px',
                'center -150px'
              ]}
            />
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <main className="flex w-full flex-1 flex-col items-center justify-between px-24 py-4 text-center relative z-10">
              <div className="text-center h-50vh flex flex-col items-center justify-center py-32">
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white">
                  ExplorE
                </h1>
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white">
                  ThE BEst
                </h1>
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white">
                  <AirportText
                    words={[
                      "LandsCapEs",
                      "CitIEs",
                      "CUltuREs",
                      "With Us",
                      "Any TimE",
                    ]}
                  />
                </h1>
              </div>
              <div className="flex flex-col items-center gap-8">
                <Link
                  href="/signin"
                  className="rounded-full bg-white/90 px-10 py-3 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition"
                >
                  Start Exploring
                </Link>
              <ScrollIndicator />
              </div>
            </main>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center px-24 gap-">
            <div className="flex justify-start ml-88">
              <div className="relative p-12">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="Trips" value={86} />
              </div>
            </div>
            <div className="flex justify-end mr-48">
              <div className="relative p-12">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="CoUntriEs" value={37} />
              </div>
            </div>
            <div className="flex justify-start ml-48">
              <div className="relative p-12">
               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="Nomads" value={3274} />
              </div>
            </div>
          </div>
        </section>
        <section className="snap-start w-full bg-white h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-black ml-48 mr-48 text-center leading-20">
              WE ARE THE BEST TRAVEL AGENCY IN THE WORLD BECAUSE WE HAVE A TREMENDOUS AI 
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white ml-48 mr-48 text-center leading-20">
                SUBS PLANS BECAUSE MONEY IS THE ONLY THING THAT MATTERS IN THIS LIFE
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-white h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-black ml-48 mr-48 text-center leading-20">
               MORE IMAGES BECAUSE AI GENERATED IMAGES THAT WE DIDN'T  PAY FOR
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white ml-48 mr-48 text-center leading-20">
                    DAMN MORE ANIMATIONS, BECAUSE WE LOVE CRAZY ANIMATIONS, AND WE LOVE MONEY
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-white h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-black ml-48 mr-48 text-center leading-20">
                ANOTHER FUCKING CTA BECAUSE WE LOVE FUCKING MONEY
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white ml-48 mr-48 text-center leading-20">
                TESTIMONIES BECAUSE WE WANT TO FLEX ON OUR COMPETITORS
            </h1>
            <p className="text-lg font-made-outer-alt font-semi-bold mb-4 text-white">(AND GET MONEY)</p>
          </div>
        </section>  
        <Footer />
      </SmoothScroll>
    </>
  );
}
