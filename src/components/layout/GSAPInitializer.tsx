"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

/**
 * GSAPInitializer — Handles ScrollTrigger lifecycle in the Next.js App Router.
 * This component ensures triggers are killed and refreshed correctly on navigation.
 */
export function GSAPInitializer() {
    const pathname = usePathname();

    useEffect(() => {
        // Find all sections marked for reveal
        const sections = document.querySelectorAll('.reveal-section');
        
        sections.forEach(section => {
          gsap.fromTo(section, 
            { opacity: 0, y: 30 },
            {
              opacity: 1, 
              y: 0, 
              duration: 1.2, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [pathname]);

    useEffect(() => {
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);
        window.addEventListener('resize', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', handleLoad);
        };
    }, []);

    return null;
}
