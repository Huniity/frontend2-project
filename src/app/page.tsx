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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NomadIA",
    "author": {
      "@type": "Person",
      "name": "Adrien Dejonc"
    },
    "datePublished": "2026-03-26",
    "dateModified": "2026-03-26",
    "publisher": {
      "@type": "Organization",
      "name": "NomadIA"
    },
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web",
    "description": "AI-powered travel planner that generates personalized day-by-day itineraries, budget breakdowns, and travel tips.",
    "url": "https://be-nomadia.vercel.app",
    "offers": [
      { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Nomad Monthly", "price": "11.99", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Globetrotter Monthly", "price": "7.99", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Nomad Annual", "price": "119.99", "priceCurrency": "EUR" },
      { "@type": "Offer", "name": "Globetrotter Annual", "price": "79.99", "priceCurrency": "EUR" },
    ],
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeShape />
      <Counters />
      <DreamDestinations />
      <Pricing />
      <Reviews />
      <Cta />
      <Footer />
    </div>
  );
}