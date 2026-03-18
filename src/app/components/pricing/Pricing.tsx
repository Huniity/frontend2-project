
'use client'

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { pricing } from "@/lib/pricing";
import { Button } from "@/components/ui/buttons/Button";
import { PiNumberCircleSevenBold } from "react-icons/pi";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { TbCancel } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdOutlineHourglassDisabled } from "react-icons/md";


const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    return (
        <section className="snap-start w-full bg-black h-screen">
            <div className="min-h-screen bg-black text-white mt-48">
                <div className="max-w-7xl mx-auto pt-24 px-12 pb-24">
                    <div className="text-center mb-18">
                        <h1 className="font-made-outer-alt text-5xl font-black text-white ml-48 mr-48 text-center">
                            Start yoUr joUrnEy
                        </h1>
                        <h2 className="font-made-outer-alt text-5xl font-black text-gray-400 ml-48 mr-48 text-center leading-22">
                            bE Nomad
                        </h2>

                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center gap-4 mt-12 mb-2 mr-4">
                                <span
                                    className={`font-made-outer font-bold ${!isAnnual ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    monthly
                                </span>
                                <button
                                    onClick={() => setIsAnnual(!isAnnual)}
                                    className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/10 border border-white/15 transition-colors hover:bg-white/15"
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-7" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                                <span
                                    className={`font-made-outer font-bold ${isAnnual ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    annual
                                </span>
                            </div>
                            <span className={`px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs font-made-outer text-green-400 transition-opacity ${isAnnual ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                save 17%
                            </span>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-36 h-130">
                        {pricing.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${plan.highlighted
                                        ? "border-2 border-white/30 bg-white/10 backdrop-blur-xl scale-105 md:scale-110"
                                        : "border border-white/15 bg-white/5 backdrop-blur-lg hover:bg-white/8 hover:border-white/25"
                                    }`}
                            >

                                <div className="p-8">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <h3 className="text-2xl font-made-outer-alt font-bold text-white">
                                            {plan.name}
                                        </h3>
                                        {plan.highlighted && (
                                            <div className="shrink-0">
                                                <ImFire size="20" color="rgba(221, 132, 72, 0.92)" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 font-made-outer mb-6">
                                        {plan.description}
                                    </p>

                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black font-made-outer-alt text-white">
                                                {plan.monthlyPrice === 0 ? "frEE" : isAnnual ? `$${plan.annualPrice}` : `${plan.price}`}
                                            </span>
                                            {plan.monthlyPrice > 0 && (
                                                <span className="text-gray-400 font-made-outer">
                                                    {isAnnual ? "/year" : "/month"}
                                                </span>
                                            )}
                                        </div>
                                        {isAnnual && plan.monthlyPrice > 0 && (
                                            <p className="text-xs text-gray-500 font-made-outer mt-2">
                                                ${(plan.annualPrice / 12).toFixed(2)} per month
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        className={`w-full py-3 rounded-lg font-made-outer font-bold mb-8 transition-all duration-300 ${plan.highlighted
                                                ? "bg-white text-black hover:bg-gray-100"
                                                : "border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                                            }`}
                                    >
                                        Get Started
                                    </button>

                                    <div className="text-xs space-y-4 border-t border-white/10 pt-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-3">
                                                <FiCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                                <span className="text-gray-300 font-made-outer text-sm">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        <div className="flex flex-row gap-2 w-full justify-center flex-wrap mt-[-100]">
                            <Button name="7 Days Free Trial" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                            <PiNumberCircleSevenBold size="18px" />
                            </Button>
                            <Button name="VAT Included" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                            <HiOutlineReceiptTax size="18px" />
                            </Button>
                            <Button name="Cancel Anytime" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                            <TbCancel size="18px" />
                            </Button>
                            <Button name="Secure Payment" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                            <RiSecurePaymentFill size="18px" />
                            </Button>
                            <Button name="Instant Access" textColor="#8890a1" color="#0f0f0f" width="180px" height="40px" textSize="14px">
                            <MdOutlineHourglassDisabled size="18px" />
                            </Button>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing;