'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isLightBackground, setIsLightBackground] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const navbarHeight = 20;
            const currentScrollY = window.scrollY;
            
            // Determine scroll direction
            if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                setScrollDirection('down');
            } else if (currentScrollY < prevScrollY.current) {
                setScrollDirection('up');
            }
            prevScrollY.current = currentScrollY;
            
            // Check background color
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
                    const bgColor = window.getComputedStyle(section).backgroundColor;
                    const isLight = bgColor.includes('255, 255, 255') || bgColor.includes('rgb(255, 255, 255)');
                    setIsLightBackground(isLight);
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const textColor = isLightBackground ? 'text-black' : 'text-white';

    return (
        <div 
            className={`fixed top-0 left-0 z-1000 flex w-screen justify-between items-center pl-12 pr-12 py-8 px-8 transition-transform duration-300 ${
                scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className={`flex items-center gap-5 text-xs transition-colors duration-300 ${textColor}`}>
                <p className='font-made-outer-alt font-bold text-xl tracking-widest'>ExplorE</p>
            </div>
            <div className='absolute left-1/2 transform -translate-x-1/2'>
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`font-medel font-black text-5xl tracking-wider transition-colors duration-300 ${textColor}`}>NOMADIA</Link>
            </div>
            <nav className='flex items-center gap-5 text-md'>
                <Link
                  href="/signin"
                  className={`rounded-full px-10 py-3 font-made-outer-alt font-semibold no-underline transition-all duration-300 ${
                    isLightBackground 
                      ? 'bg-black text-white hover:bg-black' 
                      : 'bg-white text-black hover:bg-white'
                  }`}
                >
                  gEt startEd
                </Link>
            </nav>
        </div>
    )
}

export default Navbar;

