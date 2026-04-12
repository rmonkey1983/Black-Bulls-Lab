"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAPInitializer — Handles ScrollTrigger lifecycle in the Next.js App Router.
 * This component ensures triggers are killed and refreshed correctly on navigation.
 */
export function GSAPInitializer() {
    const pathname = usePathname();

    useEffect(() => {
        // Kill all active ScrollTriggers on route change to prevent memory leaks
        // and ensure the new page starts with a clean slate.
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        // Refresh GSAP after a short delay to allow the DOM to update
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [pathname]);

    useEffect(() => {
        // Re-calculate positions once all assets (images, fonts) are fully loaded
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', handleLoad);
        
        // Also refresh on resize for responsive safety
        window.addEventListener('resize', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', handleLoad);
        };
    }, []);

    return null;
}
