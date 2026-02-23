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
              <div className="flex flex-col items-center gap-8 mt-4">
                <Link
                  href="/signin"
                  className="rounded-full bg-white/90 px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition"
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
        <section className="snap-start w-full bg-black h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/smoke.png)' }}>
          <div className="flex flex-col h-full w-full justify-center items-center">
            <h1 className="text-7xl font-black text-white ml-48 mr-48 text-center">
              Start your journey
            </h1>
            <h2 className="text-6xl font-black font-semibold text-gray-400 ml-48 mr-48 text-center leading-28">
              Be Nomad
            </h2>
            <div className="mt-12">
              <PlanButton leftName="Monthly" rightName="Save 20%" color="#0f0f0f" textColor="#ffffff" width="150px" height="50px" textSize="18px" />
            </div>
            <div className="flex flex-row gap-18 justify-center mt-12">
              <Card subtype="monthly" title="Backpacker" priceMonth="Free" priceYear="Free" features={["Essential features", "One time access", "Basic support", "Limitation on trips (days, number of booked trips)"]} width="325px" height="450px" buttonName="Get Started"></Card>
              <GoldCard subtype="monthly" title="Globetrotter" priceMonth="$7,99" priceYear="$79,99" features={["Premium features", "Access everywhere", "Priority support", "5 trips limitation", "Offline access"]} width="350px" height="500px" buttonName="Subscribe Now"></GoldCard>
              <Card subtype="monthly" title="Nomad" priceMonth="$11,99" priceYear="$109,99" features={["All features available", "Access everywhere", "Priority support", "Unlimited trips", "Save to device"]} width="325px" height="450px" buttonName="Go Nomad"></Card>
            </div>
            <div className="mt-8 flex flex-row gap-2">
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
        <section className="snap-start w-full bg-white h-screen">
          <div className="flex flex-col h-full w-full justify-center items-center gap-12">
            <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-black ml-48 mr-48 text-center leading-20">
                ANOTHER FUCKING CTA BECAUSE WE LOVE FUCKING MONEY
            </h1>
          </div>
        </section>
        <Footer />
      </SmoothScroll>
    </>
  );
}
