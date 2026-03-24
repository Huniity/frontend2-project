import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/prisma";
import PricingComponent from "@/components/ui/pricing/Pricing";

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userPlan: string | undefined;
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });
    userPlan = dbUser?.plan;
  }

  return (
    <section className="relative snap-start w-full min-h-screen">
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(./smoke.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      /> 
      <div className="absolute inset-0 z-10 bg-black/50" />
        */}
        <PricingComponent />
      {/* <div className="relative z-20 mt-48">
      </div> */}
    </section>
  );
}