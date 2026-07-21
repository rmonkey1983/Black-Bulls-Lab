"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAPInitializer — Handles ScrollTrigger lifecycle in the Next.js App Router.
 * This component ensures triggers are refreshed correctly on window events.
 */
export function GSAPInitializer() {
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

