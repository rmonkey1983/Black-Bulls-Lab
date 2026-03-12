"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, MapPin, X } from "lucide-react";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    if (pathname.startsWith("/admin") || pathname.startsWith("/rama")) return null;

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    interface NavItem {
        name: string;
        href: string;
        subItems?: { name: string; href: string }[];
    }

    const navItems: NavItem[] = [
        { name: "Home", href: "/" },
        {
            name: "Esperimenti",
            href: "/events",
            subItems: [
                { name: "Il PalQo", href: "/events/il-palqo" },
                { name: "The Golden Voice", href: "/events/the-golden-voice" }
            ]
        },
        { name: "Ricercatori", href: "/talents" },
        { name: "Galleria", href: "/gallery" },
        { name: "Chi Siamo", href: "/about" },
        { name: "Contatti", href: "/contact" },
    ];

    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleExpand = (name: string) => {
        setExpandedItem(expandedItem === name ? null : name);
    };

    // --- Animation Variants ---

    // --- Animation Variants ---

    const menuVars: import("framer-motion").Variants = {
        initial: {
            clipPath: "circle(0% at calc(100% - 40px) 40px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
        animate: {
            clipPath: "circle(150% at calc(100% - 40px) 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
        },
        exit: {
            clipPath: "circle(0% at calc(100% - 40px) 40px)",
            transition: {
                delay: 0.2, // Wait for content to fade out
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const contentVars: import("framer-motion").Variants = {
        initial: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.07,
                staggerDirection: 1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const linkVars: import("framer-motion").Variants = {
        initial: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 },
            },
        },
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
        exit: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 },
            },
        },
    };

    // Use a portal to render the menu outside the header (which has backdrop-filter)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-[110] w-12 h-12 flex flex-col justify-center items-center gap-1.5 group rounded-full border border-gold/20 bg-black/80 hover:bg-gold hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(200,164,78,0.1)]"
                    aria-label="Toggle Menu"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} className={isOpen ? "text-white" : "text-gold"} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-1.5 items-center justify-center w-full h-full"
                            >
                                <span className="w-5 h-[2px] bg-gold group-hover:bg-black transition-colors duration-300" />
                                <span className="w-5 h-[2px] bg-gold group-hover:bg-black transition-colors duration-300" />
                                <span className="w-5 h-[2px] bg-gold group-hover:bg-black transition-colors duration-300" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Menu Overlay - Portaled to body to escape Header's clipping context */}
            {mounted && typeof document !== 'undefined' &&
                (document.getElementById('mobile-nav-portal') || document.body) &&
                // We construct a portal
                /**
                 * Note: Ideally we target a specific ID, but body works too.
                 * However, to use createPortal we need ReactDOM.
                 */
                (createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                variants={menuVars}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="fixed inset-0 z-[100] bg-black text-white origin-top-right overflow-hidden flex flex-col"
                                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} // Force fixed
                            >
                                {/* Background Elements */}
                                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-bordeaux/20" />
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                                </div>

                                <div className="relative z-10 flex flex-col h-full justify-center px-4 sm:px-8 py-16 sm:py-20">

                                    {/* Links Container */}
                                    <motion.div
                                        variants={contentVars}
                                        initial="initial"
                                        animate="open"
                                        exit="exit"
                                        className="flex flex-col gap-4 text-center items-center"
                                    >
                                        <motion.div variants={linkVars} className="mb-6">
                                            <span className="text-xs font-mono text-gold/60 tracking-[0.3em] uppercase block mb-2">
                                                Navigazione
                                            </span>
                                        </motion.div>

                                        {navItems.map((item) => (
                                            <div key={item.href} className="overflow-hidden w-full flex flex-col items-center">
                                                <motion.div variants={linkVars} className="w-full">
                                                    {item.subItems ? (
                                                        <div className="flex flex-col items-center w-full">
                                                            <button
                                                                onClick={() => toggleExpand(item.name)}
                                                                className={`text-3xl xs:text-4xl sm:text-5xl font-bold uppercase tracking-tighter hover:text-gold transition-colors duration-300 flex items-center gap-2 justify-center w-full relative group
                                                                    ${pathname.startsWith(item.href) || expandedItem === item.name ? "text-white" : "text-white/50"}
                                                                `}
                                                            >
                                                                {item.name}
                                                                <span className={`text-base ml-2 transition-transform duration-300 ${expandedItem === item.name ? 'rotate-180 text-gold' : 'text-white/30'}`}>
                                                                    ▼
                                                                </span>
                                                            </button>

                                                            <AnimatePresence>
                                                                {expandedItem === item.name && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                        className="flex flex-col items-center gap-3 mt-4 mb-4 w-full bg-white/5 py-4 rounded-lg border border-white/5"
                                                                    >
                                                                        {item.subItems.map(sub => (
                                                                            <Link
                                                                                key={sub.href}
                                                                                href={sub.href}
                                                                                className="text-lg text-gray-300 hover:text-gold uppercase tracking-widest font-medium w-full text-center py-1"
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        ))}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            href={item.href}
                                                            className={`text-3xl xs:text-4xl sm:text-5xl font-bold uppercase tracking-tighter hover:text-gold transition-colors duration-300 block w-full text-center
                                                                ${pathname === item.href ? "text-white" : "text-white/50"}
                                                            `}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </motion.div>
                                            </div>
                                        ))}

                                        <motion.div variants={linkVars} className="mt-8">
                                            <Link
                                                href="/eventi-aziendali"
                                                className="inline-block px-8 py-3 border border-bordeaux/40 bg-bordeaux/10 text-bordeaux-light text-sm font-bold uppercase tracking-widest hover:bg-bordeaux/20 hover:text-white transition-all duration-300"
                                            >
                                                Area Corporate
                                            </Link>
                                        </motion.div>
                                    </motion.div>

                                    {/* Footer / Socials */}
                                    <motion.div
                                        variants={contentVars}
                                        initial="initial"
                                        animate="open"
                                        exit="exit"
                                        className="absolute bottom-10 left-0 right-0 flex justify-center gap-8"
                                    >
                                        <motion.a variants={linkVars} href="https://instagram.com/blackbullslab" target="_blank" className="text-white/40 hover:text-gold transition-colors">
                                            <Instagram size={24} />
                                        </motion.a>
                                        <motion.a variants={linkVars} href="mailto:info@blackbullslab.it" className="text-white/40 hover:text-gold transition-colors">
                                            <Mail size={24} />
                                        </motion.a>
                                        <motion.a variants={linkVars} href="/contact" className="text-white/40 hover:text-gold transition-colors">
                                            <MapPin size={24} />
                                        </motion.a>
                                    </motion.div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                ))
            }
        </div>
    );
}

// Helper to avoid build error with require in functional component if needed,
// but inline require is fine for this fix to avoid adding imports at top level
// which might need @types/react-dom if not present.
// Ideally we import createPortal from 'react-dom' at top.
