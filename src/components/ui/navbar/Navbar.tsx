'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const prevScrollY = useRef(0);
    const forceShowTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const hideNavbar = pathname.includes('/dashboard') || pathname.includes('/trophies');

    useEffect(() => {
        setIsMounted(true);
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isMounted || hideNavbar) return;

        const navbarHeight = 20;
        let animationFrameId: number;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const sections = document.querySelectorAll('section');
            
            // Batch all reads first to avoid layout thrashing
            let firstSectionHeight = 0;
            let activeSection: Element | null = null;

            if (sections.length > 0) {
                firstSectionHeight = sections[0].clientHeight;
                
                // Find active section by batching reads
                for (const section of sections) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
                        activeSection = section;
                        break;
                    }
                }
            }

            const shrinkThreshold = firstSectionHeight / 2;

            // Batch all state updates
            setIsShrunken(currentScrollY > shrinkThreshold);

            if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            prevScrollY.current = currentScrollY;

            // Only compute style if we have an active section
            if (activeSection) {
                const bgColor = window.getComputedStyle(activeSection).backgroundColor;
                const isLight = bgColor.includes('255, 255, 255');
                setIsLightBackground(isLight);
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(handleScroll);
        };

        handleScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMounted, hideNavbar]);

    useEffect(() => {
        setIsHidden(false);
        setForceShowNavbar(false);
        setIsShrunken(false);
        setMobileMenuOpen(false);
        prevScrollY.current = 0;
    }, [pathname]);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            {/* ── Desktop Navbar ── */}
            <div
                className={`fixed top-0 left-1/2 z-1000 hidden md:flex justify-between items-center px-8 py-8 transition-all duration-700`}
                style={{
                    transform: `translateX(-50%) translateY(${!isMounted || shouldHideNavbar || hideNavbar ? '-150%' : '0'})`,
                    width: isShrunken ? '90%' : '100%',
                    maxWidth: isShrunken ? '80rem' : 'none',
                    background: isShrunken ? 'rgba(255,255,255,0.1)' : 'transparent',
                    backdropFilter: isShrunken ? 'blur(10px)' : 'none',
                    border: isShrunken ? '1px solid rgba(255,255,255,0.2)' : 'none',
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
                <nav className='flex items-center gap-5'>
                    <Link
                        href={isLoggedIn ? "/dashboard" : "/signin"}
                        className={`rounded-full px-10 py-3 font-made-outer-alt font-semibold no-underline transition-all duration-300 shadow-black/25 shadow-md ${
                            isLightBackground
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        {isLoggedIn ? 'dashboard' : 'gEt startEd'}
                    </Link>
                </nav>
            </div>

            {/* ── Mobile Navbar ── */}
            <div
                className={`fixed top-0 left-0 right-0 z-1000 md:hidden flex items-center justify-between px-5 py-4 transition-all duration-500 ${
                    !isMounted || hideNavbar ? '-translate-y-full' : 'translate-y-0'
                }`}
                style={{
                    background: isShrunken || mobileMenuOpen ? 'rgba(0,0,0,0.85)' : 'transparent',
                    backdropFilter: isShrunken || mobileMenuOpen ? 'blur(12px)' : 'none',
                    borderBottom: mobileMenuOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                    className={`font-medel font-black text-2xl tracking-wider transition-colors duration-300 ${textColor} text-shadow-lg`}
                >
                    NOMADIA
                </Link>

                {/* Burger button */}
                <button
                    onClick={() => setMobileMenuOpen((o) => !o)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isLightBackground ? 'bg-black text-white' : 'bg-white/10 border border-white/20 text-white'
                    }`}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
            </div>

            {/* ── Mobile Dropdown Menu ── */}
            <div
                className={`fixed top-15 left-0 right-0 z-999 md:hidden transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
                style={{
                    background: 'rgba(0,0,0,0.92)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <div className="flex flex-col gap-1 px-5 py-6">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/pricing", label: "Pricing" },
                        { href: "/about", label: "About" },
                        { href: "/blog", label: "Blog" },
                        { href: "/FAQ", label: "FAQ" },
                        { href: "/contact", label: "Contact" },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-300 hover:text-white font-made-outer font-medium text-sm py-3 px-4 rounded-xl hover:bg-white/5 transition-colors no-underline border-b border-white/5 last:border-none"
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="pt-4 mt-2 border-t border-white/10">
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/signin"}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-center rounded-xl px-6 py-3 font-made-outer-alt font-semibold no-underline transition-all duration-300 bg-white text-black hover:bg-gray-100"
                        >
                            {isLoggedIn ? 'Dashboard' : 'Get Started'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Backdrop overlay when menu open ── */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-998 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* ── Show navbar button (desktop only) ── */}
            <button
                onClick={handleShowNavbar}
                className={`fixed top-4 right-4 z-1001 w-12 h-12 rounded-full transition-all duration-300 hidden md:flex ${
                    isLightBackground ? 'bg-black text-white' : 'bg-white text-black'
                } items-center justify-center font-bold text-lg hover:scale-110`}
                title="Show navigation"
                aria-label="Show navigation menu"
                style={{
                    opacity: isMounted && isHidden && !hideNavbar ? 1 : 0,
                    pointerEvents: isMounted && isHidden && !hideNavbar ? 'auto' : 'none',
                }}
            >
                <Menu />
            </button>
        </>
    );
};

export default Navbar;