import AirportText from "@/components/ui/cyclingtext/AirportText";
import ScrollIndicator from "@/components/ui/scrollindicator/ScrollIndicator";
import Counter from "@/components/ui/counter/Counter";
import BackgroundCycle from "@/components/ui/bgcycle/BackgroundCycle";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Link from "next/link";
import Card from "@/components/ui/cards/subcard/SubCard";
import GoldCard from "@/components/ui/cards/goldcard/GoldCard";
import PlanButton from "@/components/ui/buttons/PlanButton";
import { Button } from "@/components/ui/buttons/Button";
import { PiNumberCircleSevenBold } from "react-icons/pi";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { TbCancel } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdOutlineHourglassDisabled } from "react-icons/md";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        
        <section className="snap-start">
          <div className="flex h-screen w-full items-center justify-center relative overflow-hidden">
            <BackgroundCycle 
              images={[
                '/city2.avif',
                // '/fuji2.png',
                // '/fuji4.jpg',
                // '/fuji5.jpg',
                // '/fuji6.jpg'

              ]}
              interval={10000}
              backgroundSizes={[
                'auto 110%'
                // 'auto 150%',
                // 'auto 145%',
                // 'auto 150%',
                // 'auto 150%'
              ]}
              backgroundPositions={[
                'center -100px',
                'center -70px',
                'center -200px',
                'center -150px'
              ]}
            />
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <main className="fixed w-full h-screen flex flex-col items-center px-24 py-4 text-center z-10 top-[-40] left-0 pointer-events-none">
              <div className="text-center h-50vh flex flex-col items-center justify-center py-32 flex-1">
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                  ExplorE
                </h1>
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                  ThE BEst
                </h1>
                <h1 className="text-7xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                  <AirportText  words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]}
                  />
                </h1>
              </div>
            </main>
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-10 pointer-events-auto" style={{ top: 'calc(100vh - 180px)' }}>
              <Link href="/signin" className="rounded-full bg-white px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition shadow-black/50 shadow-xs">
                Start Exploring
              </Link>
              <ScrollIndicator />
            </div>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen relative">
          {<div className="absolute inset-0" style={{ backgroundImage: 'url(/counters2.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0) contrast(0.9) saturate(1.5) sepia(0.15)' }}></div>}
          <div className="relative z-10 h-full">
            <h1 className="text-5xl font-made-outer font-normal ml-39 mb-4 text-white text-left absolute top-30 left-0 right-0 z-20 text-shadow-lg">
              Trusted by modern travelers worldwide.
            </h1>
            <div className="flex flex-row h-full w-full justify-center items-center px-24 gap-24 text-shadow-lg">
              <div className="relative p-12 h-64 flex flex-col justify-center items-center">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="Trips" value={86} description="Planned with Nomadia"/>
              </div>
              <div className="relative p-12 h-64 flex flex-col justify-center items-center">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="CoUntriEs" value={37} description="Explored by our users"/>
              </div>
              <div className="relative p-12 h-64 flex flex-col justify-center items-center">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
                <Counter name="Nomads" value={3274} description="Growing community"/>
              </div>
            </div>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-medel font-black mb-4 text-black ml-48 mr-48 text-center leading-20">
              NOMADIA 
            </h1>
          </div>
        </section>
        <section className="snap-start w-full bg-black h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/smoke.png)' }}>
          <div className="flex flex-col h-full w-full justify-center items-center mt-22 gap-0">
            <h1 className="text-6xl font-black text-white ml-48 mr-48 text-center">
              Start your journey
            </h1>
            <h2 className="text-5xl font-black font-semibold text-gray-400 ml-48 mr-48 text-center leading-22">
              Be Nomad
            </h2>
            <div className="mt-4">
              <PlanButton leftName="Monthly" rightName="Save 20%" color="#0f0f0f" textColor="#ffffff" width="125px" height="45px" textSize="16px" />
            </div>
            <div className="flex flex-row gap-18 justify-center mt-12">
              <Card subtype="monthly" title="Backpacker" priceMonth="Free" priceYear="Free" features={["Essential features", "One time access", "Basic support", "Limitated on trips"]} width="300px" height="400px" buttonName="Get Started"></Card>
              <GoldCard subtype="monthly" title="Globetrotter" priceMonth="$7,99" priceYear="$79,99" features={["Premium features", "Access everywhere", "Priority support", "5 trips limitation", "Offline access"]} width="325px" height="450px" buttonName="Subscribe Now"></GoldCard>
              <Card subtype="monthly" title="Nomad" priceMonth="$11,99" priceYear="$109,99" features={["All features available", "Access everywhere", "Unlimited trips", "Save to device"]} width="300px" height="400px" buttonName="Go Nomad"></Card>
            </div>
            <div className="mt-12 flex flex-row gap-2">
              <div>
                <Button name="7 Days Free Trial" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                  <PiNumberCircleSevenBold size="18px"/>
                </Button>
              </div>
              <div>
                <Button name="VAT Included" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                  <HiOutlineReceiptTax size="18px"/>
                </Button>
              </div>
              <div>
                <Button name="Cancel Anytime" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                  <TbCancel size="18px"/>
                </Button>
              </div>
              <div>
                <Button name="Secure Payment" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                  <RiSecurePaymentFill size="18px"/>
                </Button>
              </div>
              <div>
                <Button name="Instant Access" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                  <MdOutlineHourglassDisabled size="18px"/>
                </Button>
              </div>
            </div>
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
        <section className="snap-start w-full bg-black h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12" style={{ backgroundImage: 'url(/dubai.jpg)', backgroundSize: 'auto', backgroundPosition: 'center', filter: 'grayscale(0) contrast(0.9) saturate(1.5) sepia(0.15)' }}>
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
                Plan Today
            </h1>
            <h2 className="text-5xl font-made-outer-alt font-semibold mb-4 text-white text-shadow-lg">
                Explore Tomorrow
            </h2>
            <Link href="/signin" className="mt-48 rounded-full bg-white px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition shadow-black/50 shadow-xs">
                Explore Now
              </Link>
          </div>
        </section>
        <Footer />
      </SmoothScroll>
    </>
  );
}
