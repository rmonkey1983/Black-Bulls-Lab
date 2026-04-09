"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Entrance animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "expo.out",
                clearProps: "transform" // Critical to prevent issues with fixed positioning or other transforms
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="will-change-transform">
            {children}
        </div>
    );
}
