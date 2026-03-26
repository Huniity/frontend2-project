import HowItWorks from "@/app/components/howitworks/HowItWorks";
import Counters from "@/app/components/counter/Counters";
import DreamDestinations from "@/app/components/dreamdestinations/DreamDestinations";
import Pricing from "@/app/components/pricing/Pricing";
import Reviews from "@/app/components/Reviews/Reviews";
import Cta from "@/app/components/cta/Cta";
import Footer from "@/components/ui/footer/Footer";

export default function HomePage() {
  return (
    <div>
      <HowItWorks />
      <Counters />
      <DreamDestinations />
      <Pricing />
      <Reviews />
      <Cta />
      <Footer />
    </div>
  );
}