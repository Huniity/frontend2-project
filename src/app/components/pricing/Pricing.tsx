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
    <section className="snap-start w-full bg-black min-h-screen">
      <div className="mt-48">
        <PricingComponent userPlan={userPlan} />
      </div>
    </section>
  );
}