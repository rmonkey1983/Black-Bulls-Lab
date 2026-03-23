"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-2 group"
                    aria-label="Torna in cima"
                >
                    <span className="font-outfit text-[11px] uppercase tracking-widest text-rama-accent/70 group-hover:text-rama-accent transition-colors">
                        Torna in cima
                    </span>
                    <div className="p-[14px] bg-rama-bg text-rama-accent rounded-sm border border-rama-accent/20 group-hover:border-rama-accent group-hover:bg-rama-accent/10 transition-all duration-300 shadow-[0_0_15px_rgba(200,164,78,0.1)] group-hover:shadow-[0_0_20px_rgba(200,164,78,0.3)]">
                        <ArrowUp size={22} strokeWidth={2.5} className="group-hover:animate-bounce" />
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
