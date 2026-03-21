import PricingCompleteComponent from "@/components/ui/pricing/PricingComplete";
import Footer from "@/components/ui/footer/Footer";

export const metadata = {
  title: "Pricing",
  description: "Choose a plan that fits your travel style. Start free, upgrade when ready.",
  alternates: { canonical: "https://be-nomadia.vercel.app/pricing" },
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white mt-48">
      <PricingCompleteComponent />
      <Footer />
    </div>
  );
}