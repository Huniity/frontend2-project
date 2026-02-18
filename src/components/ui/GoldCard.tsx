import { FaCheck } from 'react-icons/fa';
import Button from './Button';
import './GoldCard.css';

type CardProps = {
    title: string;
    price: string;
    features: string[];
    width: string;
    height: string;
};

const GoldCard = ({
    title,
    price,
    features = [],
    width,
    height,
}: CardProps) => {
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
                <div className="mt-6">
                    <Button name="Get Started" color="white" width="100%" height="4rem" textSize="16px" />
                </div>
            </div>
        </div>
    );
};

export default GoldCard;
