import ScrollIndicator from "@/components/ui/scrollindicator/ScrollIndicator";
import Counter from "@/components/ui/counter/Counter";
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
import HowItWorks from "@/app/components/howitworks/HowItWorks";
import DreamDestinations from "@/app/components/dreamdestinations/DreamDestinations";
import HomeShape from "@/app/components/intro/Intro";
import Footer from "@/components/ui/footer/Footer";
import Cta from "@/app/components/cta/Cta";
import Reviews from "./components/Reviews/Reviews";
import Pricing from "./components/pricing/Pricing";
import Counters from "./components/counter/Counters";

// export default function Home() {
//   return (
//     <>
//       <HomeShape />

//       {/* Counters Section */}
//       <section className="snap-start w-full bg-black h-screen relative">
//         <div className="absolute inset-0"></div>
//         <div className="relative z-10 h-full">
//           <h1 className="text-4xl font-made-outer-alt font-normal ml-60 mb-4 text-white text-left absolute top-50 left-0 right-0 z-20 text-shadow-lg">
//             Trusted by modern travelers worldwide.
//           </h1>
//           <div className="flex flex-row h-full w-full justify-center items-center px-24 gap-24 text-shadow-lg">
//             <div className="relative p-12 h-64 flex flex-col justify-center items-center">
//               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
//               <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
//               <Counter name="Trips" value={86} description="PlannEd with Nomadia" />
//             </div>
//             <div className="relative p-12 h-64 flex flex-col justify-center items-center">
//               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
//               <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
//               <Counter name="CoUntriEs" value={37} description="ExplorEd by oUr UsErs" />
//             </div>
//             <div className="relative p-12 h-64 flex flex-col justify-center items-center">
//               <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
//               <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
//               <Counter name="Nomads" value={3274} description="growing CommUnity" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Dream Destinations Section */}
//       <section className="snap-start w-full bg-black h-screen">
//         <DreamDestinations />
//       </section>

//       {/* Pricing Section */}
//       <section className="snap-start w-full bg-black h-screen bg-cover bg-center">
//         <div className="flex flex-col h-full w-full justify-center items-center mt-22 gap-0">
//           <h1 className="font-made-outer-alt text-6xl font-black text-white ml-48 mr-48 text-center">
//             Start yoUr joUrnEy
//           </h1>
//           <h2 className="font-made-outer-alt text-5xl font-black font-semibold text-gray-400 ml-48 mr-48 text-center leading-22">
//             bE Nomad
//           </h2>
//           <div className="mt-4">
//             <PlanButton leftName="Monthly" rightName="Save 20%" color="#0f0f0f" textColor="#ffffff" width="125px" height="45px" textSize="16px" />
//           </div>
//           <div className="flex flex-row gap-18 justify-center mt-12">
//             <Card subtype="monthly" title="BackpackEr" priceMonth="FrEE" priceYear="FrEE" features={["Essential features", "One time access", "Basic support", "Limitated on trips"]} width="300px" height="400px" buttonName="gEt StartEd" />
//             <GoldCard subtype="monthly" title="globEtrottEr" priceMonth="$7,99" priceYear="$79,99" features={["Premium features", "Access everywhere", "Priority support", "5 trips limitation", "Offline access"]} width="325px" height="450px" buttonName="SUbsCribE Now" />
//             <Card subtype="monthly" title="Nomad" priceMonth="$11,99" priceYear="$109,99" features={["All features available", "Access everywhere", "Unlimited trips", "Save to device"]} width="300px" height="400px" buttonName="Go Nomad" />
//           </div>
//           <div className="mt-12 flex flex-row gap-2">
//             <Button name="7 Days Free Trial" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
//               <PiNumberCircleSevenBold size="18px" />
//             </Button>
//             <Button name="VAT Included" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
//               <HiOutlineReceiptTax size="18px" />
//             </Button>
//             <Button name="Cancel Anytime" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
//               <TbCancel size="18px" />
//             </Button>
//             <Button name="Secure Payment" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
//               <RiSecurePaymentFill size="18px" />
//             </Button>
//             <Button name="Instant Access" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
//               <MdOutlineHourglassDisabled size="18px" />
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section className="snap-start w-full bg-black h-screen">
//         <div className="flex flex-col h-full w-full justify-center items-center gap-6">
//           <h1 className="text-5xl font-made-outer-alt font-black text-white ml-48 mr-48 text-center">
//             Rated by the Road
//           </h1>
//           <h2 className="text-5xl font-made-outer-alt font-semibold text-gray-400 ml-48 mr-48 text-center">
//             Loved by the Nomads
//           </h2>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="snap-start w-full bg-black h-screen">
//         <div className="flex flex-col h-full w-full justify-center items-center gap-12">
//           <h1 className="text-5xl font-made-outer-alt font-black mb-4 text-white text-shadow-lg">
//             Plan Today
//           </h1>
//           <h2 className="text-5xl font-made-outer-alt font-semibold mb-4 text-white text-shadow-lg">
//             Explore Tomorrow
//           </h2>
//           <Link
//             href="/signin"
//             className="mt-48 rounded-full bg-white px-10 py-4 font-made-outer-alt font-semibold text-black no-underline hover:bg-white transition shadow-black/50 shadow-xs"
//           >
//             sign Up now
//           </Link>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }

export default function Home() {
  return (
    <div>
      <HomeShape />
      {/* /// COUNTER /// */}
      <Counters />
      {/* <Counter name="Trips" value={86} description="PlannEd with Nomadia" />
      <Counter name="CoUntriEs" value={37} description="ExplorEd by oUr UsErs" />
      <Counter name="Nomads" value={3274} description="growing CommUnity" /> */}
      {/* /// Dream Destination /// */}
      <DreamDestinations />
      {/* /// SUB PLANS /// */}
      <Pricing />
      {/* <section className="snap-start w-full bg-black h-screen bg-cover bg-center">
        <div className="flex flex-col h-full w-full justify-center items-center mt-22 gap-0">
          <h1 className="font-made-outer-alt text-6xl font-black text-white ml-48 mr-48 text-center">
            Start yoUr joUrnEy
          </h1>
          <h2 className="font-made-outer-alt text-5xl font-black text-gray-400 ml-48 mr-48 text-center leading-22">
            bE Nomad
          </h2>
          <div className="mt-4">
            <PlanButton leftName="Monthly" rightName="Save 20%" color="#0f0f0f" textColor="#ffffff" width="125px" height="45px" textSize="16px" />
          </div>
          <div className="flex flex-row gap-18 justify-center mt-12">
            <Card subtype="monthly" title="BackpackEr" priceMonth="FrEE" priceYear="FrEE" features={["Essential features", "One time access", "Basic support", "Limitated on trips"]} width="300px" height="400px" buttonName="gEt StartEd" />
            <GoldCard subtype="monthly" title="globEtrottEr" priceMonth="$7,99" priceYear="$79,99" features={["Premium features", "Access everywhere", "Priority support", "5 trips limitation", "Offline access"]} width="325px" height="450px" buttonName="SUbsCribE Now" />
            <Card subtype="monthly" title="Nomad" priceMonth="$11,99" priceYear="$109,99" features={["All features available", "Access everywhere", "Unlimited trips", "Save to device"]} width="300px" height="400px" buttonName="Go Nomad" />
          </div>
          <div className="mt-12 flex flex-row gap-2">
            <Button name="7 Days Free Trial" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
              <PiNumberCircleSevenBold size="18px" />
            </Button>
            <Button name="VAT Included" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
              <HiOutlineReceiptTax size="18px" />
            </Button>
            <Button name="Cancel Anytime" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
              <TbCancel size="18px" />
            </Button>
            <Button name="Secure Payment" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
              <RiSecurePaymentFill size="18px" />
            </Button>
            <Button name="Instant Access" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
              <MdOutlineHourglassDisabled size="18px" />
            </Button>
          </div>
        </div>
      </section> */}
      {/* /// REVIEWS /// */}
      <Reviews />
      {/* <section className="snap-start w-full bg-black h-screen">
        <div className="flex flex-col h-full w-full justify-center items-center gap-6">
          <h1 className="text-5xl font-made-outer-alt font-black text-white ml-48 mr-48 text-center">
            Rated by the Road
          </h1>
          <h2 className="text-5xl font-made-outer-alt font-semibold text-gray-400 ml-48 mr-48 text-center">
            Loved by the Nomads
          </h2>
        </div>
      </section> */}
      {/* /// CTA /// */}
      <Cta />
      {/* <section className="snap-start w-full bg-black h-screen">
        
      </section> */}
      {/* /// Footer /// */}
      <Footer />
    </div>
  );
}