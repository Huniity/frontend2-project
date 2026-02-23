'use client'

import { useContext } from 'react';
import { subPlanContext } from '@/components/context/SubPlanContext';
import { ButtonProps } from './Button';

const PlanButton = ({ leftName, rightName, color, width, height, textSize, textColor }: ButtonProps) => {
    const context = useContext(subPlanContext);
    if (!context) return null;
    const { selectedPlanDuration, setSelectedPlanDuration } = context;
    
    
    const handleClick = (plan: string) => {
        setSelectedPlanDuration(plan);
        console.log(`Selected Plan: ${plan}`);
    };

    return (
        <div className="flex gap-18">
            <button
                onClick={() => handleClick('monthly')} 
                style={{
                    backgroundColor: selectedPlanDuration === 'monthly' ? 'white' : color, 
                    color: selectedPlanDuration === 'monthly' ? '#0f0f0f' : textColor, 
                    width,
                    height,
                    fontSize: textSize,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="px-4 py-2 text-black font-bold rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
                {leftName}
            </button>
            <button
                onClick={() => handleClick('yearly')}
                style={{
                    backgroundColor: selectedPlanDuration === 'yearly' ? 'white' : color,
                    color: selectedPlanDuration === 'yearly' ? '#0f0f0f' : textColor, 
                    width,
                    height,
                    fontSize: textSize,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="px-4 py-2 text-black font-bold rounded-full hover:bg-blue-600 transition-colors duration-300 "
            >
                {rightName}
            </button>
        </div>
    );
}

export default PlanButton;
