'use client'
import { MdEmail } from "react-icons/md";
import { MdOutlineKey } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/ui/buttons/LoginButton";

interface LoginCardProps {
    name: string;
    mutatedName: string;
}

const LoginCard = ({ name, mutatedName }: LoginCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            router.push("/");
        }, 3000);
    };

    return (
                    <>
                    <form className="flex flex-col w-3/4 gap-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <input type="email" placeholder="Email" disabled={isLoading} className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg" />
                        </div>
                        <div className="relative ">
                            <MdOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <input type="password" placeholder="Password" aria-label="Password" disabled={isLoading} className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50" />
                        </div>
                        <LoginButton isLoading={isLoading} name={name} mutatedName={mutatedName} />
                    </form>
            </>
    );
}

export default LoginCard;