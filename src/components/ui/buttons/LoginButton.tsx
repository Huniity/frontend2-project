"use client"

import { toast } from "react-toastify";
import { forwardRef } from "react";

interface LoginButtonProps {
    name: string;
    mutatedName: string;
    isLoading: boolean;
    isDisabled?: boolean;
}

const LoginButton = forwardRef<HTMLButtonElement, LoginButtonProps>(({ name, mutatedName, isLoading, isDisabled }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            (e.currentTarget as HTMLButtonElement).click();
        }
    };

    return (
        <button 
            ref={ref}
            type="submit"
            name="login"
            disabled={isLoading || isDisabled} 
            onClick={() => toast.success("Logged in successfully")}
            onKeyDown={handleKeyDown}
            className="border border-white/50 w-full py-3 rounded-md bg-white/90 font-made-outer text-xl text-black font-bold hover:from-stone-500 hover:to-black/50 transition-colors text-shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {mutatedName}
                </>
            ) : (
                name
            )}
        </button>
    );
});

LoginButton.displayName = "LoginButton";

export default LoginButton;
