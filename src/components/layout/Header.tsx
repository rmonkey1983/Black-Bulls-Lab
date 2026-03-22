"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MobileNav } from "./MobileNav";

export function Header() {
    const pathname = usePathname();
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    // Don't show on admin or rama pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/rama")) return null;

    const navItems = [
        { name: "Home", href: "/" },
        {
            name: "Esperimenti",
            href: "/events",
            subItems: [
                { name: "Il PalQo", href: "/events/il-palqo" },
                { name: "The Golden Voice", href: "/events/the-golden-voice" },
                { name: "A Cena Con Il Bugiardo", href: "/events/a-cena-con-il-bugiardo" }
            ]
        },
        { name: "Ricercatori", href: "/talents" },
        { name: "Galleria", href: "/gallery" },
        { name: "Chi Siamo", href: "/about" },
        { name: "Contatti", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[60]">
            <div className="bg-bg-dark/80 backdrop-blur-2xl border-b border-gold/[0.08]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group relative h-10 md:h-12 w-40 md:w-56" suppressHydrationWarning>
                        <Image
                            src="/logo.png"
                            alt="Black Bulls Lab Logo"
                            fill
                            className="object-contain object-left transition-opacity duration-300 group-hover:opacity-90"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isDropdownOpen = hoveredNav === item.name;

                            return (
                                <div
                                    key={item.href}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredNav(item.name)}
                                    onMouseLeave={() => setHoveredNav(null)}
                                >
                                    <Link
                                        href={item.href}
                                        suppressHydrationWarning
                                        className={`
                                            relative px-4 py-2.5 text-xs font-semibold tracking-widest uppercase flex items-center gap-1
                                            transition-all duration-300
                                            ${isActive
                                                ? "text-gold"
                                                : "text-gray-300 hover:text-gold"
                                            }
                                        `}
                                    >
                                        {item.name}
                                        {isActive && !hasSubItems && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent"
                                            />
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {hasSubItems && (
                                        <div
                                            className={`
                                                absolute top-full left-0 pt-2 w-48 transition-all duration-300 ease-out
                                                ${isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}
                                            `}
                                        >
                                            <div className="bg-bg-dark/95 backdrop-blur-xl border border-gold/10 p-2 shadow-2xl rounded-sm">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        suppressHydrationWarning
                                                        onClick={() => setHoveredNav(null)}
                                                        className="block px-4 py-3 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider border-l-2 border-transparent hover:border-gold"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:block">
                        <Link
                            href="/eventi-aziendali"
                            suppressHydrationWarning
                            className="px-5 py-2.5 border border-bordeaux/40 bg-bordeaux/5 text-bordeaux-light text-xs font-bold uppercase tracking-wider
                                hover:bg-bordeaux/15 hover:border-bordeaux/60 hover:text-white
                                transition-all duration-300"
                        >
                            Area Corporate
                        </Link>
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}
