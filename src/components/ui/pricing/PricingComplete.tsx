'use client';

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { pricing } from "@/lib/utils/pricing";
import UpgradeButton from "@/components/ui/buttons/UpgradeButton";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

const PricingCompleteComponent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-24 px-12 pb-24">
      {/* rest of your existing JSX */}
    </div>
  );
};

export default PricingCompleteComponent;