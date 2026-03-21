'use client'
import { MdEmail } from "react-icons/md";
import { MdOutlineKey } from "react-icons/md";
import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import SigninButton from "@/components/ui/buttons/SigninButton";
import { signUpWithEmail } from "@/app/auth/actions";

interface SigninCardProps {
    name: string;
    mutatedName: string;
}

const SigninCard = ({ name, mutatedName }: SigninCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailInvalid = email && !emailRegex.test(email);
    const isPasswordMismatch = confirmPassword && password !== confirmPassword;
    const isSigninDisabled = !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !!isPasswordMismatch || !!isEmailInvalid || isLoading;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', username);

        const result = await signUpWithEmail(formData);
        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
                <div className="relative">
                    <FaUserAstronaut className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg"
                    />
                </div>
                <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className={`w-full pl-10 px-3 py-2 rounded-md bg-black/50 border font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg ${
                            isEmailInvalid ? 'border-red-500 focus:ring-red-500' : 'border-white/50 focus:ring-ring'
                        }`}
                    />
                    {isEmailInvalid && <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>}
                </div>
                <div className="relative">
                    <MdOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 px-3 py-2 rounded-md bg-black/50 border border-white/50 font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg"
                    />
                </div>
                <div className="relative">
                    <MdOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className={`w-full pl-10 px-3 py-2 rounded-md bg-black/50 border font-made-outer text-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 text-shadow-lg ${
                            isPasswordMismatch ? 'border-red-500 focus:ring-red-500' : 'border-white/50 focus:ring-ring'
                        }`}
                    />
                    {isPasswordMismatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <SigninButton isLoading={isLoading} isDisabled={isSigninDisabled} name={name} mutatedName={mutatedName} />
            </form>
        </>
    );
}

export default SigninCard;