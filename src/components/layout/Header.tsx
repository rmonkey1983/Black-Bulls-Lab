"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", code: "HOM" },
        { name: "Esperimenti", href: "/events", code: "EXP" },
        { name: "Ricercatori", href: "/talents", code: "RES" },
        { name: "Archivio", href: "/gallery", code: "ARC" },
        { name: "Laboratorio", href: "/about", code: "LAB" },
        { name: "Terminale", href: "/contact", code: "TRM" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-lab-dark/90 backdrop-blur-xl border-b border-green/10 z-50 hidden md:block scanline-overlay">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group" suppressHydrationWarning>
                    <div className="w-8 h-8 border border-green/40 flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
                        <div className="w-3 h-3 bg-green/60 rotate-[-45deg]" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">
                        BLACK BULLS{" "}
                        <span className="text-green text-glow-green">LAB</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="flex items-center space-x-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                suppressHydrationWarning
                                className={`
                                    relative px-4 py-2 text-xs font-semibold tracking-wider uppercase
                                    transition-all duration-300 group
                                    ${isActive
                                        ? "text-green text-glow-green"
                                        : "text-gray-400 hover:text-green"
                                    }
                                `}
                            >
                                <span className="data-readout text-[10px] text-gray-muted block mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    [{item.code}]
                                </span>
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-green shadow-[0_0_10px_rgba(0,255,136,0.5)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA */}
                <Link
                    href="/corporate"
                    suppressHydrationWarning
                    className="px-5 py-2 border border-cyan/40 bg-cyan/5 text-cyan text-xs font-bold uppercase tracking-wider
                        hover:bg-cyan/15 hover:border-cyan/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]
                        transition-all duration-300 data-readout"
                >
                    ◆ Area Corporate
                </Link>

                {/* Status Indicator */}
                <div className="absolute top-2 right-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
                    <span className="data-readout text-[9px] text-green/50 uppercase tracking-widest">
                        System Online
                    </span>
                </div>
            </div>
        </header>
    );
}
