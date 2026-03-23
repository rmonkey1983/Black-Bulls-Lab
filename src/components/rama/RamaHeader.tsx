"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RamaMenuOverlay } from "./RamaMenuOverlay";

const experiments = [
    { name: "Il PalQo", href: "/esperimenti/il-palqo" },
    { name: "The Golden Voice", href: "/esperimenti/the-golden-voice" },
    { name: "A Cena Con Il Bugiardo", href: "/esperimenti/a-cena-con-il-bugiardo" },
];

export function RamaHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [experimentsOpen, setExperimentsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-rama-text transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10' : 'mix-blend-difference'}`}>
                {/* Logo */}
                <Link href="/" className="relative group flex items-center gap-1 z-50">
                    <span className="font-mohave text-3xl font-bold tracking-tighter uppercase group-hover:text-rama-accent transition-colors duration-300">
                        BLACK BULLS LAB
                    </span>
                    <span className="font-outfit text-xs font-bold bg-rama-accent text-rama-bg px-1 py-0.5 rounded-sm">
                        ®
                    </span>
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
                    >
                        <Link href="/esperimenti" className={`flex items-center gap-1 font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname.startsWith("/esperimenti") ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                            Esperimenti
                            <ChevronDown size={14} className={`transition-transform duration-300 ${experimentsOpen ? 'rotate-180 text-rama-accent' : ''}`} />
                        </Link>
                        
                        <AnimatePresence>
                            {experimentsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-12 left-1/2 -translate-x-1/2 w-64 bg-[#0A0A0A] border border-white/10 rounded-sm shadow-xl flex flex-col overflow-hidden"
                                >
                                    {experiments.map(exp => (
                                        <Link 
                                            key={exp.name} 
                                            href={exp.href}
                                            className="px-6 py-4 font-outfit text-sm uppercase tracking-wider text-white/80 hover:text-rama-accent hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                            onClick={() => setExperimentsOpen(false)}
                                        >
                                            {exp.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/chi-siamo" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/chi-siamo" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Chi Siamo
                    </Link>
                    <Link href="/contact" className={`font-outfit text-sm uppercase tracking-widest transition-colors duration-300 font-medium ${pathname === "/contact" ? "text-rama-accent" : "text-white/80 hover:text-rama-accent"}`}>
                        Contact
                    </Link>
                    <Link href="/events" className="ml-4 font-mohave uppercase font-bold text-black bg-rama-accent px-6 py-2 tracking-widest hover:bg-white transition-colors">
                        Prenota
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
