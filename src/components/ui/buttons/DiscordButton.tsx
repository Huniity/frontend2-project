'use client'

import { FaDiscord } from "react-icons/fa";

interface DiscordButtonProps {
    name: string;
    showName?: boolean;
    isLoading: boolean;
}

const DiscordButton = ({ name, showName = true, isLoading }: DiscordButtonProps) => {
    return (
        <button
            type="button"
            disabled={true}
            aria-label={showName ? undefined : "Sign up with Discord"}
            className="group border border-white/50 w-full py-3 px-7 rounded-md bg-[#5865F2] font-made-outer text-white font-bold hover:bg-white hover:text-[#5865F2] transition-colors text-shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 perspective-1000"
        >
            <FaDiscord
                size={24}
                className="transition-transform duration-500 ease-in-out group-hover:rotate-y-360"
            />
            {showName && name}
        </button>
    );
}

export default DiscordButton;