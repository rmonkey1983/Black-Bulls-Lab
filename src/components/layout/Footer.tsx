"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";

export function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin") || pathname.startsWith("/rama")) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-bg-dark border-t border-gold/[0.08] hidden md:block">
            {/* Gold line accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="relative block h-14 w-48 mb-6" suppressHydrationWarning>
                            <Image
                                src="/logo.png"
                                alt="Black Bulls Lab Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-6">
                            Un'alchimia di sapori e performance nel cuore di Torino.
                            Vivete la notte, diversamente.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com/blackbullslab"
                                target="_blank"
                                rel="noopener noreferrer"
                                suppressHydrationWarning
                                className="w-10 h-10 border border-gold/15 flex items-center justify-center
                                    text-gray-400 hover:text-gold hover:border-gold/40
                                    transition-all duration-300"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="mailto:info@blackbullslab.it"
                                suppressHydrationWarning
                                className="w-10 h-10 border border-gold/15 flex items-center justify-center
                                    text-gray-400 hover:text-gold hover:border-gold/40
                                    transition-all duration-300"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gold/60 mb-5">
                            Esplora
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Eventi", href: "/events" },
                                { name: "Artisti", href: "/talents" },
                                { name: "Galleria", href: "/gallery" },
                                { name: "Chi Siamo", href: "/about" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        suppressHydrationWarning
                                        className="text-sm text-gray-400 hover:text-gold transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gold/60 mb-5">
                            Contatti
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={14} className="text-gold/40 shrink-0" />
                                Torino, Italia
                            </li>
                            <li>
                                <a
                                    href="mailto:info@blackbullslab.it"
                                    suppressHydrationWarning
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold transition-colors"
                                >
                                    <Mail size={14} className="text-gold/40 shrink-0" />
                                    info@blackbullslab.it
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/eventi-aziendali"
                                    suppressHydrationWarning
                                    className="text-sm text-bordeaux-light hover:text-white transition-colors mt-2 inline-block"
                                >
                                    → Area Corporate
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between pt-8 border-t border-gold/[0.06]">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Black Bulls Lab — Torino. Tutti i diritti riservati.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            suppressHydrationWarning
                            className="text-[10px] text-gray-600 hover:text-gold/60 tracking-wider uppercase transition-colors duration-300"
                        >
                            Admin
                        </Link>
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 border border-gold/15 flex items-center justify-center
                                text-gray-500 hover:text-gold hover:border-gold/30
                                transition-all duration-300"
                            aria-label="Torna in cima"
                        >
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
