"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { CONTACT_EMAIL, SITE_NAME, SOCIAL_LINKS, LOGO_PATH } from "@/lib/constants";

export function RamaFooter() {
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-black border-t border-yellow-500/20 pt-20 pb-12 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-12">
                {/* Brand & Sede */}
                <div className="space-y-6 flex flex-col items-center md:items-start">
                    <Link href="/" aria-label="Black Bulls Lab — Home" suppressHydrationWarning className="inline-block relative">
                         <div className="relative w-40 h-10">
                            <Image
                                src={LOGO_PATH}
                                alt="Black Bulls Lab Logo"
                                fill
                                className="object-contain"
                            />
                         </div>
                    </Link>
                    <div className="space-y-2 text-center md:text-left">
                        <p className="font-heading text-[10px] text-yellow-500 uppercase tracking-[0.3em] font-bold">
                            Il Laboratorio delle Emozioni
                        </p>
                        <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                            Sede Creativa: <span className="text-zinc-400">Torino, Italia</span> <br />
                            © {new Date().getFullYear()} Black Bulls Lab. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Social & Contact */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-8">
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300">
                            <Instagram size={18} />
                        </a>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 font-heading text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                        <Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link>
                        <Link href="/format" className="hover:text-white transition-colors">Inostri Format</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Collabora con noi</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Tech Detail */}
            <div className="mt-20 pt-8 border-t border-white/5 w-full text-center">
                <p className="font-heading text-[8px] text-zinc-800 uppercase tracking-[1em] opacity-50">
                    Sytem Status: Online // Entertainment Laboratory
                </p>
            </div>
        </footer>
    );
}
