'use client'

import { useContext } from 'react';
import { subPlanContext } from '@/components/context/SubPlanContext';
import { ButtonProps } from './Button';

const PlanButton = ({ leftName, rightName, color, width, height, textSize }: ButtonProps) => {
    const context = useContext(subPlanContext);
    if (!context) return null;
    const { selectedPlanDuration, setSelectedPlanDuration } = context;
    
    // Log the selected plan duration whenever the button is clicked
    const handleClick = (plan: string) => {
        setSelectedPlanDuration(plan);
        console.log(`Selected Plan: ${plan}`);  // Log the selected plan (either "monthly" or "yearly")
    };

    return (
        <div style={{ display: 'flex' }}>
            <button
                onClick={() => handleClick('monthly')}  // Set to 'monthly' on click and log it
                style={{
                    backgroundColor: selectedPlanDuration === 'monthly' ? 'white' : color, // Highlight active button
                    width,
                    height,
                    fontSize: textSize,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="px-4 py-2 text-black font-bold rounded-l-full hover:bg-blue-600 transition-colors duration-300 border-r-black border-r-2"
            >
                {leftName}
            </button>
            <button
                onClick={() => handleClick('yearly')}  // Set to 'yearly' on click and log it
                style={{
                    backgroundColor: selectedPlanDuration === 'yearly' ? 'white' : color, // Highlight active button
                    width,
                    height,
                    fontSize: textSize,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className="px-4 py-2 text-black font-bold rounded-r-full hover:bg-blue-600 transition-colors duration-300 border-l-black border-l-2"
            >
                {rightName}
            </button>
        </div>
    );
}

export default PlanButton;
