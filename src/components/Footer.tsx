'use client'

import Image from "next/image";
import Link from "next/link";
import FullYear from "./FullYear";

const Footer = () => {
    return (
        <footer className='bg-black relative z-50'>
            <div className='absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-white to-transparent opacity-50 animate-pulse' />
            <div className='flex items-center justify-between text-xs text-white py-8 px-24'>
                <div className='flex items-center gap-5'>
                    <Image src="/nomadiaW.png" alt="Logo" width={100} height={250} />
                    <p className='font-medel font-bold text-4xl tracking-widest'>NOMADIA</p>
                </div>
                    <div className='flex gap-16'>
                        <div className='flex flex-col gap-2'>
                            <p className='font-made-outer-alt font-bold text-2xl tracking-widest pb-4'>ExplorE</p>
                            <Link href="/" className="text-lg">Home</Link>
                            <Link href="/about" className="text-lg">About</Link>
                            <Link href="/contact" className="text-lg">Contact</Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-made-outer-alt font-bold text-2xl tracking-widest pb-4'>rEsourCEs</p>
                            <Link href="/pricing" className="text-lg">Pricing</Link>
                            <Link href="/blog" className="text-lg">Blog</Link>
                            <Link href="/FAQ" className="text-lg">FAQ</Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-made-outer-alt font-bold text-2xl tracking-widest pb-4'>sUpport</p>
                            <Link href="/support" className="text-lg">Support</Link>
                            <Link href="/help-center" className="text-lg">Help Center</Link>
                            <Link href="/terms" className="text-lg">Terms</Link>
                            <Link href="/privacy" className="text-lg">Privacy</Link>
                        </div>
                    </div>
            </div>
            <div className='py-4'>
                <p className='text-m text-gray-400 text-center'>© <FullYear /> Nomadia. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
