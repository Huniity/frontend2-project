import HowItWorks from "@/app/components/howitworks/HowItWorks";
import Counters from "@/app/components/counter/Counters";
import DreamDestinations from "@/app/components/dreamdestinations/DreamDestinations";
import Pricing from "@/app/components/pricing/Pricing";
import UserReviews from "@/app/components/Reviews/UserReviews";
import Cta from "@/app/components/cta/Cta";
import Footer from "@/components/ui/footer/Footer";

export default function Nomadia() {
  return (
    <div>
      <HowItWorks />
      <Counters />
      <DreamDestinations />
      <Pricing />
      <UserReviews />
      <Cta />
      <Footer />
    </div>
  );
}