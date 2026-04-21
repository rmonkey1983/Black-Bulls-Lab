"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        setIsVisible(true);

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Initial state
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 1.5, opacity: 1, duration: 0.3 });
            gsap.to(follower, { scale: 2, opacity: 0.2, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, opacity: 0.5, duration: 0.3 });
            gsap.to(follower, { scale: 1, opacity: 0.5, duration: 0.3 });
        };

        window.addEventListener("mousemove", moveCursor);

        // Track interactive elements
        const addListeners = () => {
            const targets = document.querySelectorAll('a, button, .gsap-card, input, select, textarea, [role="button"]');
            targets.forEach(target => {
                target.addEventListener("mouseenter", handleMouseEnter);
                target.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        addListeners();

        // Re-add on path change
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
            const targets = document.querySelectorAll('a, button, .gsap-card, input, select, textarea, [role="button"]');
            targets.forEach(target => {
                target.removeEventListener("mouseenter", handleMouseEnter);
                target.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    // Hide if not on desktop/pointer device
    if (!isVisible) return null;

    return (
        <>
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-rama-accent rounded-full pointer-events-none z-[9999] opacity-50 mix-blend-difference hidden lg:block"
            />
            <div 
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-rama-accent/30 rounded-full pointer-events-none z-[9998] opacity-50 hidden lg:block"
            />
        </>
    );
}
