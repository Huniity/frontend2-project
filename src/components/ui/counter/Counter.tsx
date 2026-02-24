'use client';

import { useState, useEffect, useRef } from "react";

interface CounterProps {
    name: string;
    value: number;
    description?: string;
}

const Counter = ({ name, value, description }: CounterProps) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = counterRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        
                        const targetValue = value;
                        const duration = 3000;
                        const stepTime = 10;
                        const steps = duration / stepTime;
                        const increment = targetValue / steps;

                        let currentStep = 0;
                        const interval = setInterval(() => {
                            currentStep++;
                            setCount((prev) => Math.min(prev + increment, targetValue));
                            if (currentStep >= steps) {
                                clearInterval(interval);
                            }
                        }, stepTime);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasAnimated, value]);

    return (
        <div ref={counterRef} className="flex flex-col items-center gap-4 h-64 w-75 relative justify-center">
            <div className="flex flex-row items-center gap-4 relative">
                <p className="font-made-outer-alt font-bold text-white text-8xl tracking-widest">{Math.floor(count)}</p>
            </div>
            <p className="absolute right-[-60] top-35 -translate-y-1/2 text-xl font-made-outer-alt text-white" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}>{name}</p>
            <p className="absolute top-40 text-xl font-made-outer font-normal text-white text-center w-full">{description}</p>
        </div>
    )
}

export default Counter;