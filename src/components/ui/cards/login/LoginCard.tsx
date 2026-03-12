'use client'
import { FaUserAstronaut } from "react-icons/fa";
import { MdOutlineKey } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/ui/buttons/LoginButton";
import ForgotPasswordButton from "@/components/ui/buttons/ForgotPasswordButoon";


interface LoginCardProps {
    name: string;
    mutatedName: string;
    namePassword: string;
    mutatedNamePassword: string;
}

const LoginCard = ({ name, mutatedName, namePassword, mutatedNamePassword }: LoginCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const isLoginDisabled = !username.trim() || !password.trim() || isLoading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        
        if (submitter?.name === 'login') {
            setIsLoading(true);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } else if (submitter?.name === 'forgotPassword') {
            setIsLoadingPassword(true);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
    };

    return (
                    <>
                    <form className="flex flex-col w-3/4 gap-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUserAstronaut className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading || isLoadingPassword}
                                className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg" 
                            />
                        </div>
                        <div className="relative ">
                            <MdOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isLoadingPassword}
                                className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50" 
                            />
                        </div>
                        <ForgotPasswordButton isLoadingPassword={isLoadingPassword} namePassword={namePassword} mutatedNamePassword={mutatedNamePassword} />
                        <LoginButton isLoading={isLoading} isDisabled={isLoginDisabled} name={name} mutatedName={mutatedName} />
                    </form>
            </>
    );
}

export default LoginCard;