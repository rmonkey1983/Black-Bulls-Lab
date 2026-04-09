"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { RamaMenuOverlay } from "./RamaMenuOverlay";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

const experiments = [
    { name: "Il PalQo", href: "/format/il-palqo" },
    { name: "The Golden Voice", href: "/format/the-golden-voice" },
    { name: "A Cena Con Il Bugiardo", href: "/format/a-cena-con-il-bugiardo" },
];

export function RamaHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [experimentsOpen, setExperimentsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 md:px-12 md:py-4 flex justify-between items-center text-rama-text transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10' : 'mix-blend-difference'}`}>
                {/* Logo */}
                <Link href="/" className="relative z-50 flex items-center shrink-0" aria-label="Black Bulls Lab — Home">
                    <div className="h-16 md:h-24 w-32 md:w-48 relative overflow-hidden flex items-center justify-center">
                        <Image
                            src="/blackbullslab-v2.png"
                            alt="Black Bulls Lab"
                            fill
                            quality={90}
                            className="object-contain scale-[1.65] transition-opacity duration-300 hover:opacity-80"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 relative z-50">
                    <Link href="/" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Home
                    </Link>
                    <Link href="/events" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/events" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Eventi
                    </Link>

                    {/* Esperimenti Dropdown */}
                    <div 
                        className="relative group py-4"
                        onMouseEnter={() => setExperimentsOpen(true)}
                        onMouseLeave={() => setExperimentsOpen(false)}
                        onFocus={() => setExperimentsOpen(true)}
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                setExperimentsOpen(false);
                            }
                        }}
                    >
                        <Link href="/format" className={`flex items-center gap-1 font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname.startsWith("/format") ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                            Le Nostre Serate
                            <ChevronDown size={14} className={`transition-transform duration-300 ${experimentsOpen ? 'rotate-180 text-rama-accent' : ''}`} />
                        </Link>
                        
                        <div
                            ref={dropdownRef}
                            className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-[#0A0A0A] border border-white/10 rounded-sm shadow-xl hidden flex-col overflow-hidden"
                            role="menu"
                        >
                            {experiments.map(exp => (
                                <Link 
                                    key={exp.name} 
                                    href={exp.href}
                                    className="px-6 py-4 font-outfit text-sm uppercase tracking-wider text-white/80 hover:text-rama-accent hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                    onClick={() => setExperimentsOpen(false)}
                                    role="menuitem"
                                >
                                    {exp.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/chi-siamo" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/chi-siamo" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Chi Siamo
                    </Link>
                    <Link href="/eventi-aziendali" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/eventi-aziendali" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Corporate
                    </Link>
                    <Link href="/contact" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/contact" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Contact
                    </Link>
                    <Link href="/contact" className="ml-4 font-mohave uppercase font-bold text-black bg-rama-accent px-6 py-2 tracking-widest hover:bg-white transition-colors">
                        Richiedi Info
                    </Link>
                </nav>

                {/* Hamburger Menu Icon (Mobile Only) */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="relative z-50 flex lg:hidden border-none bg-transparent flex-col gap-1.5 p-2 group"
                    aria-label="Open menu"
                >
                    <div className="w-8 h-1 bg-rama-accent group-hover:scale-105 transition-transform origin-right" />
                    <div className="w-8 h-1 bg-rama-accent group-hover:scale-105 transition-transform origin-right" />
                </button>
            </header>

            {/* Menu Overlay */}
            <RamaMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
