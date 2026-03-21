'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars } from "react-icons/fa";
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const Navbar = () => {
    const pathname = usePathname();
    const [isShrunken, setIsShrunken] = useState(false);
    const [isLightBackground, setIsLightBackground] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [forceShowNavbar, setForceShowNavbar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const prevScrollY = useRef(0);
    const forceShowTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const hideNavbar = pathname.includes('/dashboard') || pathname.includes('/trophies');

    useEffect(() => {
        setIsMounted(true);
        
        // Check if user is logged in
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };
        
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isMounted || hideNavbar) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const sections = document.querySelectorAll('section');
            const firstSectionHeight = sections[0]?.offsetHeight || window.innerHeight;
            const shrinkThreshold = firstSectionHeight / 2;

            setIsShrunken(currentScrollY > shrinkThreshold);

            if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            prevScrollY.current = currentScrollY;

            const navbarHeight = 20;
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
                    const bgColor = window.getComputedStyle(section).backgroundColor;
                    const isLight = bgColor.includes('255, 255, 255');
                    setIsLightBackground(isLight);
                }
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted, hideNavbar]);

    // Reset state on route change
    useEffect(() => {
        setIsHidden(false);
        setForceShowNavbar(false);
        setIsShrunken(false);
        prevScrollY.current = 0;
    }, [pathname]);

    const handleShowNavbar = () => {
        setForceShowNavbar(true);
        clearTimeout(forceShowTimeoutRef.current);
        forceShowTimeoutRef.current = setTimeout(() => {
            setForceShowNavbar(false);
        }, 5000);
    };

    const textColor = isLightBackground ? 'text-black' : 'text-white';
    const shouldHideNavbar = isHidden && !forceShowNavbar;

    return (
        <>
            <div
                className={`fixed top-0 left-1/2 z-1000 flex justify-between items-center px-8 py-8 transition-all duration-700`}
                style={{
                    // ✅ Always rendered — visibility controlled via transform + opacity
                    transform: `translateX(-50%) translateY(${!isMounted || shouldHideNavbar || hideNavbar ? '-150%' : '0'})`,
                    width: isShrunken ? '90%' : '100%',
                    maxWidth: isShrunken ? '80rem' : 'none',
                    background: isShrunken ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    backdropFilter: isShrunken ? 'blur(10px)' : 'none',
                    border: isShrunken ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                    borderRadius: isShrunken ? '1rem' : '0px',
                    marginTop: isShrunken ? '1rem' : '0px',
                }}
            >
                <div className={`flex items-center gap-5 text-xs transition-colors duration-300 ${textColor}`}>
                    <p className='font-made-outer-alt font-bold text-xl tracking-widest text-shadow-lg'>ExplorE</p>
                </div>
                <div className='absolute left-1/2 transform -translate-x-1/2'>
                    <Link
                        href="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`font-medel font-black text-5xl tracking-wider transition-colors duration-300 ${textColor} text-shadow-lg`}
                    >
                        NOMADIA
                    </Link>
                </div>
                <nav className='flex items-center gap-5 text-md'>
                    <Link
                        href={isLoggedIn ? "/dashboard" : "/signin"}
                        className={`rounded-full px-10 py-3 font-made-outer-alt font-semibold no-underline transition-all duration-300 shadow-black/25 shadow-md ${
                            isLightBackground
                                ? 'bg-black text-white hover:bg-black'
                                : 'bg-white text-black hover:bg-white'
                        }`}
                    >
                        {isLoggedIn ? 'dashboard' : 'gEt startEd'}
                    </Link>
                </nav>
            </div>

            <button
                onClick={handleShowNavbar}
                className={`fixed top-4 right-4 z-1001 w-12 h-12 rounded-full transition-all duration-300 ${
                    isLightBackground ? 'bg-black text-white' : 'bg-white text-black'
                } flex items-center justify-center font-bold text-lg hover:scale-110`}
                title="Show navigation"
                aria-label="Show navigation menu"
                style={{
                    opacity: isMounted && isHidden && !hideNavbar ? 1 : 0,
                    pointerEvents: isMounted && isHidden && !hideNavbar ? 'auto' : 'none'
                }}
            >
                <FaBars />
            </button>
        </>
    );
};

export default Navbar;