'use client';

import { FaCheck } from 'react-icons/fa';
import { GoldSubButton } from './Button';
import './GoldCard.css';
import { useContext } from "react";
import { subPlanContext } from "@/components/context/SubPlanContext";

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
                    <h2 className="text-2xl font-bold mb-4 text-gray-300 text-left mb-2">{title}</h2>
                    <p className="text-3xl font-bold mb-6 text-white text-left mb-10">{selectedPlanDuration === 'monthly' ? priceMonth : priceYear}{selectedPlanDuration === 'monthly' ? ' /month' : ' /year'}</p>
                    <div>
                        <ul className="mb-6 text-gray-400 text-left space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="grid grid-cols-[auto_1fr] gap-3 items-center text-md">
                                    <FaCheck className="flex-shrink-0" />
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
