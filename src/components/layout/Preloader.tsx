"use client";

import { useEffect, useState, useRef } from "react";
import { FlaskConical, Atom, Dna, Microscope, TestTube } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

const ICONS = [FlaskConical, Dna, Atom, Microscope, TestTube];

export function Preloader() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [iconIndex, setIconIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<Array<{id: number, left: number, size: number, delay: number, dur: number, x1: number, x2: number}>>([]);

    // Swap icons every 200ms
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Skip condition: Mobile or Session storage
        const hasSeenSplash = sessionStorage.getItem("splash-seen");
        if (isMobile || hasSeenSplash) {
            setIsLoading(false);
            return;
        }

        const iconInterval = setInterval(() => {
            setIconIndex((prev) => (prev + 1) % ICONS.length);
        }, 200);

        setParticles(Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 2,
            dur: Math.random() * 3 + 2,
            x1: Math.random() * 60 - 30,
            x2: Math.random() * 60 - 30,
        })));

        let mounted = true;
        const countInterval = setInterval(() => {
            setCount((prev) => {
                const next = prev + Math.floor(Math.random() * 15) + 10;
                if (next >= 100) {
                    clearInterval(countInterval);
                    if (mounted) finishPreloader();
                    return 100;
                }
                return next;
            });
        }, 60);

        const finishPreloader = () => {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    y: "-100%",
                    duration: 0.6,
                    ease: "expo.inOut",
                    onComplete: () => {
                        setIsLoading(false);
                        sessionStorage.setItem("splash-seen", "true");
                    }
                });
            } else {
                setIsLoading(false);
                sessionStorage.setItem("splash-seen", "true");
            }
        };

        const fallback = setTimeout(() => {
            if (mounted && count < 100) {
                setCount(100);
                clearInterval(countInterval);
                finishPreloader();
            }
        }, 1500); // 1500ms hard cap for desktop

        return () => {
            mounted = false;
            clearInterval(iconInterval);
            clearInterval(countInterval);
            clearTimeout(fallback);
        };
    }, [isMobile]);

    useGSAP(() => {
        if (!isLoading) return;

        // Scanner line animation
        if (scannerRef.current) {
            gsap.to(scannerRef.current, {
                y: "100vh",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }

        // Particle animations
        const bubbles = particlesRef.current?.querySelectorAll(".bubble");
        bubbles?.forEach((bubble, i) => {
            const p = particles[i];
            if (!p) return;
            gsap.to(bubble, {
                y: "-110vh",
                x: `+=${p.x1}`,
                opacity: 0,
                duration: p.dur,
                repeat: -1,
                ease: "none",
                delay: p.delay
            });
        });
    }, { scope: containerRef, dependencies: [isLoading, particles] });

    useGSAP(() => {
        if (iconRef.current) {
            gsap.fromTo(iconRef.current, 
                { opacity: 0, scale: 0.5, rotate: -45 },
                { opacity: 1, scale: 1, rotate: 0, duration: 0.3 }
            );
        }
    }, { dependencies: [iconIndex] });

    if (!isLoading) return null;

    const CurrentIcon = ICONS[iconIndex];

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-dark text-white cursor-wait py-12 px-6 overflow-hidden"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Glowing Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]"></div>

            {/* Lab Scanner Line effect */}
            <div
                ref={scannerRef}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.5)] z-0 top-0"
            />

            {/* Floating Lab Bubbles/Particles */}
            <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="bubble absolute rounded-full bg-gold/60 shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                        style={{
                            left: `${p.left}%`,
                            bottom: "-5%",
                            width: p.size,
                            height: p.size,
                        }}
                    />
                ))}
            </div>

            {/* Central Icon Container */}
            <div className="relative mb-12">
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse" />

                <div
                    ref={iconRef}
                    className="relative z-10 text-gold"
                >
                    <CurrentIcon size={56} strokeWidth={1.5} />
                </div>

                {/* Spin rings */}
                <div className="absolute -inset-6 rounded-full border border-gold/30 border-t-transparent border-b-transparent animate-[spin_3s_linear_infinite]" />
                <div className="absolute -inset-10 rounded-full border border-white/10 border-l-transparent border-r-transparent animate-[spin_4s_linear_infinite_reverse]" />
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-80 border border-white/20 p-1 rounded-full relative overflow-hidden backdrop-blur-sm z-10">
                <div
                    className="h-1.5 bg-gold rounded-full relative transition-all duration-100 ease-out"
                    style={{ width: `${count}%` }}
                >
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 blur-[2px]" />
                </div>
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

                <div className="mt-4 text-[10px] md:text-xs text-gray-400 tracking-widest uppercase h-4 overflow-hidden opacity-70">
                    <div>
                        {count < 25 && "> INITIALIZING CORE MODULES..."}
                        {count >= 25 && count < 50 && "> CALIBRATING SENSORY INPUTS..."}
                        {count >= 50 && count < 75 && "> EXTRACTING FLAVOR PROFILES..."}
                        {count >= 75 && count < 100 && "> STABILIZING REACTIONS..."}
                        {count === 100 && "> LAB READY."}
                    </div>
                </div>
            </div>
        </div>
    );
}
