'use client';

import { useState, useEffect } from 'react';
import { RiUserLine, RiShieldKeyholeLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdOutlineContactMail, MdOutlineLanguage } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLink } from "react-icons/bi";
import ChangePassword from './Modal/ChangePassword';
import ProfilePhoto from './Modal/ProfilePhoto';
import ContactInfo from './Modal/ContactInfo';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import type { UserWithRelations } from "../Dashboard";

const ToastDuration = 3000;

const settingsItems = [
  { icon: RiUserLine, label: "Profile Photo", description: "" },
  { icon: TbPasswordFingerprint, label: "Change Password", description: "" },
  { icon: MdOutlineContactMail, label: "Contact Info", description: "" },
  { icon: GiTakeMyMoney, label: "Manage Sub Plan", description: "" },
  { icon: IoNotificationsOutline, label: "Notifications", description: "Coming Soon" },
  { icon: RiShieldKeyholeLine, label: "Privacy", description: "Coming Soon" },
  { icon: MdOutlineLanguage, label: "Language", description: "Coming Soon" },
  { icon: BiLink, label: "Connect Accounts", description: "Coming Soon" },
];

export default function Settings({ user }: { user: UserWithRelations }) {
  const router = useRouter();
  const [isProfilePhotoModalOpen, setIsProfilePhotoModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isContactInfoModalOpen, setIsContactInfoModalOpen] = useState(false);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  useEffect(() => {
    if (user.plan === "FREE") return;

    const fetchSubscription = async () => {
      try {
        const res = await fetch("/api/stripe/subscription");
        const data = await res.json();
        if (data.currentPeriodEnd) {
          setSubscriptionEnd(
            new Date(data.currentPeriodEnd * 1000).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscription();
  }, [user.plan]);

  const handleSubscription = async () => {
    if (user.plan === "FREE") {
      router.push("/dashboard?tab=pricing");
      return;
    }

    setIsSubscriptionLoading(true);
    const toastId = toast.loading("Opening billing portal...");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        toast.update(toastId, {
          render: "Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: ToastDuration,
        });
        setTimeout(() => router.push(data.url), ToastDuration);
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Something went wrong. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: ToastDuration,
      });
      setIsSubscriptionLoading(false);
    }
  };

  const handleSettingClick = (label: string) => {
    if (label === "Profile Photo") setIsProfilePhotoModalOpen(true);
    if (label === "Change Password") setIsPasswordModalOpen(true);
    if (label === "Contact Info") setIsContactInfoModalOpen(true);
    if (label === "Manage Sub Plan") handleSubscription();
  };

  const disableButtonIfComingSoon = (description: string) => {
    return description === "Coming Soon";
  };

  const planLabel = user.plan.charAt(0) + user.plan.slice(1).toLowerCase();

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-2xl font-made-outer-alt font-bold italic mb-4">Profile Settings</h1>
        <div className="space-y-4 text-sm text-gray-400 leading-relaxed max-w-xl font-made-outer">
          <p>Manage your profile details and account preferences in a simple, user-friendly way.</p>
          <p>Update your name, email, or password securely. Changes are saved instantly so you&apos;re always up to date.</p>
        </div>
      </div>

      {/* Settings grid */}
      <div className="grid grid-cols-4 gap-y-14 gap-x-10 w-225">
        {settingsItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSettingClick(item.label)}
            disabled={
              disableButtonIfComingSoon(item.description) ||
              (item.label === "Manage Sub Plan" && isSubscriptionLoading)
            }
            className={`flex flex-col items-center gap-3 group cursor-pointer border border-white/15 rounded-2xl py-8 px-4 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 ${
              item.description === "Coming Soon" ? "cursor-not-allowed opacity-50 pointer-events-none" : ""
            } ${item.label === "Manage Sub Plan" && isSubscriptionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <item.icon
              className="text-gray-400 group-hover:text-white transition-colors duration-200"
              size={32}
            />

            {/* Label */}
            {/* Label — always "Manage Sub Plan" */}
            <span className="text-sm font-bold text-white font-made-outer">
              {item.label === "Manage Sub Plan" && isSubscriptionLoading
                ? "Loading..."
                : item.label}
            </span>

            {/* Subscription info below */}
            {item.label === "Manage Sub Plan" && user.plan !== "FREE" ? (
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-sm text-emerald-300 font-made-outer font-semibold">
                  {planLabel}
                </p>
                {subscriptionEnd ? (
                  <p className="text-[11px] text-emerald-300 font-made-outer text-center">
                    Expires {subscriptionEnd}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 font-made-outer">Loading...</p>
                )}
              </div>
            ) : item.label === "Manage Sub Plan" && user.plan === "FREE" ? (
              <p className="text-xs text-gray-500 font-made-outer">Free Plan</p>
            ) : item.description ? (
              <p className="text-xs text-gray-500 font-made-outer">{item.description}</p>
            ) : null}
          </button>
        ))}
      </div>

      <ProfilePhoto isOpen={isProfilePhotoModalOpen} onClose={() => setIsProfilePhotoModalOpen(false)} />
      <ChangePassword isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <ContactInfo isOpen={isContactInfoModalOpen} onClose={() => setIsContactInfoModalOpen(false)} />
    </div>
  );
}