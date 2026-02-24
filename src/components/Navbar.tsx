'use client';

import { useEffect, useState, useRef } from 'react';
import { FaBars } from "react-icons/fa";
import Link from 'next/link';

const Navbar = () => {
    const [isLightBackground, setIsLightBackground] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('up');
    const [isShrunken, setIsShrunken] = useState(false);
    const [forceShowNavbar, setForceShowNavbar] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const prevScrollY = useRef(0);
    const forceShowTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        let lastScrollTime = 0;
        const isWheeling = () => Date.now() - lastScrollTime < 150;

        const handleWheel = () => {
            lastScrollTime = Date.now();
        };

        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const navbarHeight = 20;
            const currentScrollY = window.scrollY;
            const firstSectionHeight = sections[0]?.offsetHeight || window.innerHeight;
            const shrinkThreshold = firstSectionHeight / 2;

            // Check if at top of page
            setIsAtTop(currentScrollY < 100);

            setIsShrunken(currentScrollY > shrinkThreshold);

            if (isWheeling()) {
                if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                    setScrollDirection('down');
                } else if (currentScrollY < prevScrollY.current) {
                    setScrollDirection('up');
                }
            }
            prevScrollY.current = currentScrollY;
            

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
        window.addEventListener('wheel', handleWheel);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleShowNavbar = () => {
        setForceShowNavbar(true);
        clearTimeout(forceShowTimeoutRef.current);
        forceShowTimeoutRef.current = setTimeout(() => {
            setForceShowNavbar(false);
        }, 10000);
    };

    const textColor = isLightBackground ? 'text-black' : 'text-white';
    const isNavbarHidden = scrollDirection === 'down' && !forceShowNavbar && !isAtTop;

    return (
        <>
            <div 
                className={`fixed top-0 left-0 z-1000 flex w-screen justify-between items-center py-8 px-8 transition-all duration-300 ${
                    isAtTop ? 'translate-y-0' : (forceShowNavbar ? 'translate-y-0' : (scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'))
                } ${isShrunken ? 'pl-124 pr-104' : 'pl-12 pr-12'}`}
            >
                <div className={`flex items-center gap-5 text-xs transition-colors duration-300 ${textColor}`}>
                    <p className='font-made-outer-alt font-bold text-xl tracking-widest text-shadow-lg'>ExplorE</p>
                </div>
                <div className='absolute left-1/2 transform -translate-x-1/2'>
                    <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`font-medel font-black text-5xl tracking-wider transition-colors duration-300 ${textColor} text-shadow-lg`}>NOMADIA</Link>
                </div>
                <nav className='flex items-center gap-5 text-md'>
                    <Link
                      href="/signin"
                      className={`rounded-full px-10 py-3 font-made-outer-alt font-semibold no-underline transition-all duration-300 shadow-black/25 shadow-md ${
                        isLightBackground 
                          ? 'bg-black text-white hover:bg-black' 
                          : 'bg-white text-black hover:bg-white'
                      }`}
                    >
                      gEt startEd
                    </Link>
                </nav>
            </div>
            
            {isNavbarHidden && (
                <button
                    onClick={handleShowNavbar}
                    className={`fixed top-4 right-4 z-999 w-12 h-12 rounded-full transition-all duration-300 ${
                        isLightBackground ? 'bg-black text-white' : 'bg-white text-black'
                    } flex items-center justify-center font-bold text-lg hover:scale-110`}
                    title="Show navigation"
                >
                    <FaBars />
                </button>
            )}
        </>
    )
}

export default Navbar;

