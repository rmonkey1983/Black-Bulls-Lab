"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const bar = progressRef.current;
        if (!bar) return;

        // Reset width on mount/navigation
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === document.body) st.kill();
            });
        };
    }, [pathname]);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
            <div 
                ref={progressRef}
                className="w-full h-full bg-rama-accent shadow-[0_0_10px_rgba(200,164,78,0.5)]"
            />
        </div>
    );
}
