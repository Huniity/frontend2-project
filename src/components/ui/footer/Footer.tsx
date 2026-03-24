'use client'

import Image from "next/image";
import Link from "next/link";
import FullYear from "../../utils/FullYear";

const Footer = () => {
    return (
        <footer className='bg-black relative z-50'>
            <div className='absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-white to-transparent opacity-50 animate-pulse' />
            
            <div className='flex flex-col xl:flex-row items-center xl:items-start justify-between text-xs text-white py-8 px-8 xl:px-24 gap-10 xl:gap-0'>
                
                {/* Logo */}
                <div className='flex items-center gap-5'>
                    <Image src="/nomadiaW.png" alt="Logo" width={100} height={250} />
                    <p className='font-medel font-bold text-4xl tracking-widest'>NOMADIA</p>
                </div>

                {/* Links */}
                <div className='flex flex-row gap-10 xl:gap-16 flex-wrap justify-center xl:justify-end text-center xl:text-left'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-made-outer-alt font-bold text-xl xl:text-2xl tracking-widest pb-4'>ExplorE</p>
                        <Link href="/" className="text-base xl:text-lg">Home</Link>
                        <Link href="/about" className="text-base xl:text-lg">About</Link>
                        <Link href="/contact" className="text-base xl:text-lg">Contact</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-made-outer-alt font-bold text-xl xl:text-2xl tracking-widest pb-4'>rEsourCEs</p>
                        <Link href="/pricing" className="text-base xl:text-lg">Pricing</Link>
                        <Link href="/blog" className="text-base xl:text-lg">Blog</Link>
                        <Link href="/FAQ" className="text-base xl:text-lg">FAQ</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-made-outer-alt font-bold text-xl xl:text-2xl tracking-widest pb-4'>sUpport</p>
                        <Link href="/help" className="text-base xl:text-lg">Help Center</Link>
                        <Link href="/terms" className="text-base xl:text-lg">Terms</Link>
                        <Link href="/privacy-policy" className="text-base xl:text-lg">Privacy</Link>
                    </div>
                </div>
            </div>

            <div className='py-4'>
                <p className='text-m text-gray-400 text-center'>© <FullYear /> NomadIA. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer