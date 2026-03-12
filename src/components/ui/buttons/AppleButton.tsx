'use client'

import { FaApple } from "react-icons/fa";

interface AppleButtonProps {
    name: string;
    showName?: boolean;
    isLoading: boolean;
}

const AppleButton = ({ name, showName = true, isLoading }: AppleButtonProps) => {
    return (
        <button
            type="button"
            disabled={isLoading}
            className="group border border-white/50 w-full py-3 px-7 rounded-md bg-black/90 font-made-outer text-white font-bold hover:bg-white hover:text-black transition-colors text-shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 perspective-1000"
        >
            <FaApple
                size={24}
                className="transition-transform duration-500 ease-in-out group-hover:rotate-y-360"
            />

            {showName && name}
        </button>
    );
}

export default AppleButton;