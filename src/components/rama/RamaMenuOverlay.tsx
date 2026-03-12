"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface RamaMenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Esperimenti", href: "/events" },
    { name: "Ricercatori", href: "/talents" },
    { name: "Galleria", href: "/gallery" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Contatti", href: "/contact" },
];

export function RamaMenuOverlay({ isOpen, onClose }: RamaMenuOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[60] bg-rama-bg flex text-white"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 md:top-8 md:right-12 z-[70] p-4 text-rama-accent hover:rotate-90 transition-transform duration-300"
                        aria-label="Close menu"
                    >
                        <X size={32} strokeWidth={2.5} />
                    </button>

                    {/* Left Decorative Image (Hidden on very small screens) */}
                    <div className="hidden lg:block w-1/2 relative overflow-hidden">
                        <motion.div
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-yellow-600/20"
                        >
                            <img
                                src="/lab_menu.png"
                                alt="Laboratory Aesthetic Menu Background"
                                className="object-cover w-full h-full mix-blend-lighten"
                            />
                        </motion.div>
                    </div>

                    {/* Right Menu Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 md:p-24 overflow-y-auto">
                        <nav className="flex flex-col gap-4 md:gap-6">
                            {menuLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="font-mohave text-5xl md:text-7xl uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-300 block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 font-outfit text-sm text-rama-muted"
                        >
                            <div>
                                <h4 className="font-rock-salt text-rama-accent mb-4 transform -rotate-2">Seguici</h4>
                                <div className="flex flex-col gap-2">
                                    <a href="https://instagram.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                                    <a href="https://facebook.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                                    <a href="https://tiktok.com/@blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-rock-salt text-rama-accent mb-4 transform -rotate-2">Contattaci</h4>
                                <a href="mailto:info@blackbullslab.com" className="text-white hover:text-rama-accent transition-colors text-lg tracking-wider">
                                    info@blackbullslab.com
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
