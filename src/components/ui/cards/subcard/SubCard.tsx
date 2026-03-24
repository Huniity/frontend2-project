'use client';

import { Check } from "lucide-react";
import { SubButton } from "../../buttons/Button";
import "./SubCard.css";
import { useContext } from "react";
import { subPlanContext } from "@/components/context/SubPlanContext";

interface CardProps {
    title: string;
    priceMonth: string;
    priceYear: string;
    features: string[];
    width: string;
    height: string;
    buttonName: string;
    subtype?: string;
}

const Card = (
    {
        title,
        priceMonth,
        priceYear,
        features = [],
        width,
        height,
        buttonName,
        subtype,
    }: CardProps

) => {
    const context = useContext(subPlanContext);
    if (!context) return null;
    const { selectedPlanDuration } = context;

    return (
        <div className="white-card-container " style={{ width, height }}>
            <div className="relative w-full h-full ">
                <div className="white-card-border w-full h-full"></div>
                <div className="white-card-glow-1"></div>
                <div className="white-card-glow-2"></div>
            </div>

            <div className="white-card-overlay-1"></div>
            <div className="white-card-overlay-2"></div>

            <div className="absolute inset-0 rounded-xl p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-made-outer-alt mb-4 text-gray-300 text-left">{title}</h2>
                    <p className="text-3xl font-bold font-made-outer-alt text-white text-left mb-10">
                        {selectedPlanDuration === 'monthly' ? priceMonth : priceYear}
                        
                        {(selectedPlanDuration === 'monthly' ? priceMonth : priceYear) !== "FrEE" && (
                            <span className="text-xl font-made-outer-alt">
                            {selectedPlanDuration === 'monthly' ? ' /month' : ' /yEar'}
                            </span>
                        )}
                    </p>
                    <div>
                        <ul className="mb-6 text-gray-400 text-left space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="grid grid-cols-[auto_1fr] gap-3 items-center text-md">
                                    <Check className="shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-3">
                    <SubButton name={buttonName} color="lightgray" width="100%" height="3rem" textSize="18px"/>
                </div>
            </div>
        </div>
    );
}


export default Card ;