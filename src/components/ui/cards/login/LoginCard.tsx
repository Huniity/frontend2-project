'use client'
import { MdEmail } from "react-icons/md";
import { MdOutlineKey } from "react-icons/md";
import { useState } from "react";
import LoginButton from "@/components/ui/buttons/LoginButton";
import ForgotPasswordButton from "@/components/ui/buttons/ForgotPasswordButoon";
import { signInWithEmail } from "@/app/auth/actions";

interface LoginCardProps {
    name: string;
    mutatedName: string;
    namePassword: string;
    mutatedNamePassword: string;
}

const LoginCard = ({ name, mutatedName, namePassword, mutatedNamePassword }: LoginCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isLoginDisabled = !email.trim() || !password.trim() || isLoading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        if (submitter?.name === 'login') {
            setIsLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const result = await signInWithEmail(formData);
            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } else if (submitter?.name === 'forgotPassword') {
            setIsLoadingPassword(true);
            // TODO: implement forgot password
            setIsLoadingPassword(false);
        }
    };

    return (
        <>
            <form className="flex flex-col w-3/4 gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isLoadingPassword}
                        className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg"
                    />
                </div>
                <div className="relative">
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
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <ForgotPasswordButton isLoadingPassword={isLoadingPassword} namePassword={namePassword} mutatedNamePassword={mutatedNamePassword} />
                <LoginButton isLoading={isLoading} isDisabled={isLoginDisabled} name={name} mutatedName={mutatedName} />
            </form>
        </>
    );
}

export default LoginCard;