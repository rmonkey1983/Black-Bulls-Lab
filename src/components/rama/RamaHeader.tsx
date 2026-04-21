"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RamaMenuOverlay } from "./RamaMenuOverlay";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { LOGO_PATH } from "@/lib/constants";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const experiments = [
    { name: "A Cena Con Il Bugiardo", href: "/format/a-cena-con-il-bugiardo" },
    { name: "Il PalQo", href: "/format/il-palqo" },
    { name: "Cena Con Delitto", href: "/format/cena-con-delitto" },
    { name: "THE GOLDEN VOICE", href: "/format/the-golden-voice" },
];

export function RamaHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [experimentsOpen, setExperimentsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        if (experimentsOpen) {
            gsap.fromTo(dropdownRef.current,
                { opacity: 0, y: 10, display: "none" },
                { opacity: 1, y: 0, display: "flex", duration: 0.2, ease: "power2.out" }
            );
        } else {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    if (dropdownRef.current) dropdownRef.current.style.display = "none";
                }
            });
        }
    }, { dependencies: [experimentsOpen], scope: dropdownRef });
    
    // GSAP: Logo Entrance Animation
    useGSAP(() => {
        gsap.fromTo(logoRef.current,
            { opacity: 0, scale: 0.95, filter: "brightness(0)" },
            { 
                opacity: 1, 
                scale: 1, 
                filter: "brightness(1)", 
                duration: 0.8, 
                ease: "power2.out",
                delay: 0.3
            }
        );
    }, { scope: logoRef });

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header suppressHydrationWarning className="fixed top-0 left-0 right-0 z-50 px-6 py-2 md:px-12 transition-all duration-300 h-20 bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    {/* 1. LOGO (Left) */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" suppressHydrationWarning className="relative z-50 flex items-center shrink-0 group/logo" aria-label="Black Bulls Lab — Home">
                            <div 
                                ref={logoRef}
                                className="h-8 md:h-10 w-[90px] md:w-[110px] relative transition-all duration-300 group-hover/logo:brightness-125 group-hover/logo:drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                            >
                                    <Image
                                        src={LOGO_PATH}
                                        alt="Black Bulls Lab"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 640px) 90px, 110px"
                                        priority
                                        fetchPriority="high"
                                    />
                            </div>
                        </Link>
                    </div>

                    {/* 2. NAVIGATION (Center) */}
                    <nav className="hidden xl:flex items-center gap-6 relative z-50">
                        <Link href="/" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname === "/" ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Home
                        </Link>
                        
                        <div 
                            className="relative group py-4"
                            onMouseEnter={() => setExperimentsOpen(true)}
                            onMouseLeave={() => setExperimentsOpen(false)}
                        >
                            <Link href="/format" suppressHydrationWarning className={`flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname.startsWith("/format") ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                                Le Nostre Serate <ChevronDown size={10} className={`transition-transform duration-300 ${experimentsOpen ? 'rotate-180' : ''}`} />
                            </Link>
                            
                            <div
                                ref={dropdownRef}
                                className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-zinc-950 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hidden flex-col overflow-hidden"
                            >
                                {experiments.map(exp => (
                                    <Link 
                                        key={exp.name} 
                                        href={exp.href}
                                        suppressHydrationWarning
                                        className="px-6 py-4 font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-300 hover:text-rama-accent hover:bg-white/5 transition-all border-b border-white/5 last:border-0 font-bold"
                                    >
                                        {exp.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/talents" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname.startsWith("/talents") ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Artisti
                        </Link>
                        <Link href="/eventi-aziendali" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname === "/eventi-aziendali" ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Corporate
                        </Link>
                        <Link href="/gallery" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname === "/gallery" ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Gallery
                        </Link>
                        <Link href="/chi-siamo" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname === "/chi-siamo" ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Chi Siamo
                        </Link>
                        <Link href="/blog" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname.startsWith("/blog") ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Blog
                        </Link>
                        <Link href="/contact" suppressHydrationWarning className={`font-heading text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${pathname === "/contact" ? "text-rama-accent" : "text-zinc-300 hover:text-rama-accent"}`}>
                            Contatti
                        </Link>
                    </nav>

                    {/* 3. CTA (Right) */}
                    <div className="flex-1 flex justify-end items-center gap-6">
                        <div className="hidden lg:block">
                            <PrimaryButton href="/contact" size="sm">
                                PRENOTA ORA
                            </PrimaryButton>
                        </div>

                        {/* Hamburger Icon (Visible on lg and below) */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="flex xl:hidden flex-col gap-1.5 p-2 group"
                            aria-label="Apri menu di navigazione"
                        >
                            <div className="w-8 h-[2px] bg-rama-accent group-hover:scale-x-110 transition-transform origin-right" />
                            <div className="w-6 h-[2px] bg-rama-accent group-hover:scale-x-125 transition-transform origin-right" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            <RamaMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
