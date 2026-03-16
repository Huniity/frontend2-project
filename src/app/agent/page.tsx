'use client';

import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Agent = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-8 px-8 mb-8">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition font-made-outer-alt font-bold">
                    <IoArrowBack size={20} />
                    Back
                </Link>
            </div>
            <div className="px-8">
                <h1 className="text-4xl font-made-outer-alt font-black mb-4">Agent</h1>
                <p className="text-lg text-gray-400">
                    This is the Agent Page.
                </p>
            </div>
        </div>
    )
}

export default Agent;