"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Atom, Dna, Microscope, TestTube } from "lucide-react";

const ICONS = [FlaskConical, Dna, Atom, Microscope, TestTube];

export function Preloader() {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [iconIndex, setIconIndex] = useState(0);
    const [particles, setParticles] = useState<Array<{id: number, left: number, size: number, delay: number, dur: number, x1: number, x2: number}>>([]);

    // Swap icons every 400ms
    useEffect(() => {
        // FCP optimization: skip preloader on subsequent same-session visits
        if (typeof window !== "undefined" && sessionStorage.getItem("bbl_preloader_shown")) {
            setIsLoading(false);
            return;
        }

        const iconInterval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % ICONS.length);
        }, 400);

        // Generate lab particles on mount — reduced to 18 for lower main-thread cost
        const generated = Array.from({ length: 18 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 6 + 2,
            delay: Math.random() * 5,
            dur: Math.random() * 6 + 4,
            x1: Math.random() * 100 - 50,
            x2: Math.random() * 100 - 50,
        }));
        setParticles(generated);

        return () => clearInterval(iconInterval);
    }, []);

    useEffect(() => {
        let mounted = true;

        const interval = setInterval(() => {
            setCount((prev) => {
                // Larger increments, interval runs less frequently to save main thread
                const next = prev + Math.floor(Math.random() * 8) + 5;
                if (next >= 100) {
                    clearInterval(interval);
                    if (mounted) {
                        setTimeout(() => {
                            setIsLoading(false);
                            // Mark as shown so subsequent in-session visits skip the preloader
                            if (typeof window !== "undefined") {
                                sessionStorage.setItem("bbl_preloader_shown", "1");
                            }
                        }, 300);
                    }
                    return 100;
                }
                return next;
            });
        }, 100);

        // Fallback: forcefully finish after 1.2s max (target FCP < 1.5s)
        const fallback = setTimeout(() => {
            if (mounted && count < 100) {
                setCount(100);
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                    if (typeof window !== "undefined") {
                        sessionStorage.setItem("bbl_preloader_shown", "1");
                    }
                }, 200);
            }
        }, 1200);

        return () => {
            mounted = false;
            clearInterval(interval);
            clearTimeout(fallback);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const CurrentIcon = ICONS[iconIndex];

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-dark text-white cursor-wait py-12 px-6 overflow-hidden"
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background Grid Pattern (Subtle) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    {/* Glowing Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]"></div>

                    {/* Lab Scanner Line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.5)] z-0"
                        style={{ top: 0 }}
                        animate={{ y: ["0vh", "100vh", "0vh"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Floating Lab Bubbles/Particles */}
                    {particles.length > 0 && (
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    className="absolute rounded-full bg-gold/60 shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                                    style={{
                                        left: `${p.left}%`,
                                        bottom: "-5%",
                                        width: p.size,
                                        height: p.size,
                                    }}
                                    animate={{
                                        y: ["0vh", "-110vh"],
                                        x: [0, p.x1, p.x2],
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1.2, 0.5]
                                    }}
                                    transition={{
                                        duration: p.dur,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: p.delay
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Central Icon Container */}
                    <div className="relative mb-12">
                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gold/20 blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <motion.div
                            key={iconIndex}
                            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 text-gold"
                        >
                            <CurrentIcon size={56} strokeWidth={1.5} />
                        </motion.div>

                        {/* Spin rings */}
                        <motion.div
                            className="absolute -inset-6 rounded-full border border-gold/30 border-t-transparent border-b-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -inset-10 rounded-full border border-white/10 border-l-transparent border-r-transparent"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-64 md:w-80 border border-white/20 p-1 rounded-full relative overflow-hidden backdrop-blur-sm z-10">
                        <motion.div
                            className="h-1.5 bg-gold rounded-full relative"
                            initial={{ width: 0 }}
                            animate={{ width: `${count}%` }}
                            transition={{ ease: "easeOut", duration: 0.1 }}
                        >
                            {/* Inner glow of the bar */}
                            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                        </motion.div>
                    </div>

                    {/* Metrics / Text */}
                    <div className="mt-8 flex flex-col items-center gap-2 font-mono z-10">
                        <div className="text-gold text-2xl md:text-3xl font-light tracking-wider">
                            {count.toString().padStart(3, '0')}<span className="text-white/50 text-xl">%</span>
                        </div>

                        <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-gray-500 mt-2">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                Synthesizing Experience
                            </span>
                        </div>

                        {/* Fake terminal output */}
                        <div className="mt-4 text-[10px] md:text-xs text-gray-400 tracking-widest uppercase h-4 overflow-hidden opacity-70">
                            <motion.div
                                animate={{ y: count === 100 ? -20 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {count < 25 && "> INITIALIZING CORE MODULES..."}
                                {count >= 25 && count < 50 && "> CALIBRATING SENSORY INPUTS..."}
                                {count >= 50 && count < 75 && "> EXTRACTING FLAVOR PROFILES..."}
                                {count >= 75 && count < 100 && "> STABILIZING REACTIONS..."}
                                {count === 100 && "> LAB READY."}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
