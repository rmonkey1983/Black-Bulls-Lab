"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { RamaMenuOverlay } from "./RamaMenuOverlay";

export function RamaHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-rama-text">
                {/* Logo */}
                <Link href="/" className="relative group flex items-center gap-1 z-50">
                    <span className="font-mohave text-3xl font-bold tracking-tighter uppercase group-hover:text-rama-accent transition-colors duration-300">
                        BLACK BULLS LAB
                    </span>
                    <span className="font-outfit text-xs font-bold bg-rama-accent text-rama-bg px-1 py-0.5 rounded-sm">
                        ®
                    </span>
                </Link>

                {/* Hamburger Menu Icon */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="relative z-50 flex border-none bg-transparent flex-col gap-1.5 p-2 group"
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
