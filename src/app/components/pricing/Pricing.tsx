
import PricingComponent from "@/components/ui/pricing/Pricing";

export const revalidate = 3600;

export default async function PricingPage() {

  return (
    <section className="relative snap-start w-full min-h-screen">
        <PricingComponent />
    </section>
  );
}