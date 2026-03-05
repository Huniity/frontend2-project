"use client"

interface LoginButtonProps {
    name: string;
    mutatedName: string;
    isLoading: boolean;
}

const LoginButton = ({ name, mutatedName, isLoading }: LoginButtonProps) => {
    return (
        <button 
            type="submit" 
            disabled={isLoading} 
            className="border border-white/50 w-full py-3 rounded-md bg-gradient-to-r from-black/50 to-stone-500/50 font-made-outer text-white font-bold hover:from-stone-500 hover:to-black/50 transition-colors text-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
};

export default LoginButton;
