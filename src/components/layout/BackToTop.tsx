"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useGSAP(() => {
        if (isVisible) {
            gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 20, display: "none" },
                { opacity: 1, y: 0, display: "flex", duration: 0.3, ease: "power2.out" }
            );
        } else {
            gsap.to(buttonRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (buttonRef.current) buttonRef.current.style.display = "none";
                }
            });
        }
    }, { dependencies: [isVisible], scope: buttonRef });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={scrollToTop}
            className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 hidden flex-col items-center gap-2 group transition-transform active:scale-95 sm:hover:scale-110"
            aria-label="Torna in cima"
        >
            <span className="font-outfit text-[11px] uppercase tracking-widest text-rama-accent/70 group-hover:text-rama-accent transition-colors">
                Torna in cima
            </span>
            <div className="p-[14px] bg-rama-bg text-rama-accent rounded-sm border border-rama-accent/20 group-hover:border-rama-accent group-hover:bg-rama-accent/10 transition-all duration-300 shadow-[0_0_15px_rgba(200,164,78,0.1)] group-hover:shadow-[0_0_20px_rgba(200,164,78,0.3)]">
                <ArrowUp size={22} strokeWidth={2.5} className="group-hover:animate-bounce" />
            </div>
        </button>
    );
}
