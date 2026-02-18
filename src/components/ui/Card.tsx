'use client';

import { FaCheck } from "react-icons/fa";
import Button from "./Button";


interface CardProps {
    title: string;
    price: string;
    features: string[];
    width: string;
    height: string;
}

const Card = (
    {
        title,
        price,
        features = [],
        width,
        height,
    }: CardProps

) => {
    return (
        <div style={{ width, height}} className="rounded-lg shadow-lg p-6 flex flex-col justify-between bg-neutral-900">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-300 text-left mb-2">{title}</h2>
                <p className="text-4xl font-bold mb-6 text-gray-300 text-left mb-10">{price}</p>
                <div>
                    <ul className="mb-6 text-gray-300 text-left space-y-4">
                        {features.map((feature, index) => (
                            <li key={index} className="grid grid-cols-[auto_1fr] gap-3 items-center text-lg">
                                <FaCheck className="flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-6 ">
                <Button name="Get Started" color="white" width="100%" height="4rem" textSize="16px" />
            </div>
        </div>
    )
}


export default Card ;