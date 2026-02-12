'use client';

import { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
  smoothness?: number;
}

export default function SmoothScroll({ 
  children, 
  smoothness = 0.08 
}: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafIdRef = useRef(1);
  const snapTimeoutRef = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const setHeight = () => {
      container.style.height = '100vh';
      container.style.overflow = 'hidden';
      // Remove footer calculation since it's now inside
      document.body.style.height = `${content.offsetHeight}px`;
    };

    setHeight();
    window.addEventListener('resize', setHeight);

    const snapToSection = () => {
      const sections = content.querySelectorAll('.snap-start');
      const viewportHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      
      // Find the last section's bottom position
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        const lastSectionRect = lastSection.getBoundingClientRect();
        const lastSectionBottom = lastSectionRect.bottom + currentScrollRef.current;
        
        // Don't snap if we've scrolled past the last section (we're in footer area)
        if (currentScroll > lastSectionBottom - viewportHeight) {
          return;
        }
      }
      
      let closestSection = 0;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + currentScrollRef.current;
        const distance = Math.abs(window.scrollY - sectionTop);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = sectionTop;
        }
      });

      scrollTargetRef.current = closestSection;
      window.scrollTo({ top: closestSection, behavior: 'auto' });
    };

    const handleScroll = () => {
      scrollTargetRef.current = window.scrollY;
      
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      
      snapTimeoutRef.current = window.setTimeout(snapToSection, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      currentScrollRef.current += 
        (scrollTargetRef.current - currentScrollRef.current) * smoothness;

      if (content) {
        content.style.transform = `translateY(-${currentScrollRef.current}px)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setHeight);
      document.body.style.height = '';
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [smoothness]);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full">
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}