'use client'

import { IoLogoGoogle } from "react-icons/io5";

interface GoogleButtonProps {
    name: string;
    showName?: boolean;
    isLoading: boolean;
}

const GoogleButton = ({ name, showName = true, isLoading }: GoogleButtonProps) => {
    return (
        <button
            type="button"
            disabled={isLoading}
            className="group border border-white/50 w-full py-3 px-7 rounded-md bg-[#DB4437] font-made-outer text-white font-bold hover:bg-white hover:text-[#DB4437] transition-colors text-shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 perspective-1000"
        >
            <IoLogoGoogle
                size={24}
                className="transition-transform duration-500 ease-in-out group-hover:rotate-y-360"
            />
            {showName && name}
        </button>
    );
}

export default GoogleButton;