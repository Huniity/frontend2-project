import DreamDestinations from "@/app/components/dreamdestinations/DreamDestinations";
import HomeShape from "@/app/components/intro/Intro";
import Footer from "@/components/ui/footer/Footer";
import Cta from "@/app/components/cta/Cta";
import Reviews from "./components/Reviews/Reviews";
import Pricing from "./components/pricing/Pricing";
import Counters from "./components/counter/Counters";
import HowItWorks from "./components/howitworks/HowItWorks";

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
      <DreamDestinations />
      <Counters />
      <Pricing />
      <Reviews />
      {/* <div className="h-48 bg-gradient-to-b from-transparent via-black to-transparent pointer-events-none -my-24 relative z-10" /> */}
      <Cta />
      <Footer /> 
      {/* 
      */}
    </div>
  );
}