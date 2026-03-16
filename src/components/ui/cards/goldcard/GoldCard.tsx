'use client';

import { FaCheck } from 'react-icons/fa';
import { GoldSubButton } from '../../buttons/Button';
import './GoldCard.css';
import { useContext } from "react";
import { subPlanContext } from "@/components/context/SubPlanContext";
import { ImFire } from "react-icons/im";

type CardProps = {
    title: string;
    priceMonth: string;
    priceYear: string;
    features: string[];
    width: string;
    height: string;
    buttonName: string;
    subtype?: string;
};

const GoldCard = ({
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
        <div className="gold-card-container " style={{ width, height }}>
            <div className="relative w-full h-full ">
                <div className="gold-card-border w-full h-full"></div>
                <div className="gold-card-glow-1"></div>
                <div className="gold-card-glow-2"></div>
            </div>

            <div className="gold-card-overlay-1"></div>
            <div className="gold-card-overlay-2"></div>
            <div className="gold-card-background-glow"></div>

            <div className="absolute inset-0 rounded-xl p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold font-made-outer-alt mb-4 text-gray-300 text-left flex items-center justify-between">{title}<ImFire size="24px" color="rgba(221, 132, 72, 0.92)"/></h2>
                    <p className="text-3xl font-bold font-made-outer-alt mb-10 text-white text-left">{selectedPlanDuration === 'monthly' ? priceMonth : priceYear}<span className="text-xl font-made-outer-alt">{selectedPlanDuration === 'monthly' ? ' /month' : ' /yEar'}</span></p>
                    <div>
                        <ul className="mb-6 text-gray-400 text-left space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="grid grid-cols-[auto_1fr] gap-3 items-center text-md">
                                    <FaCheck className="shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6">
                    <GoldSubButton name={buttonName} color="white" width="100%" height="3rem" textSize="18px"/>
                </div>
            </div>
        </div>
    );
};

export default GoldCard;
