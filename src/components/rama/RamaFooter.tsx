"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Music2 } from "lucide-react";

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
        <footer className="w-full bg-black border-t border-rama-accent/20 pt-20 pb-12 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start gap-12">
                {/* Brand & Sede */}
                <div className="space-y-6 flex flex-col items-center md:items-start max-w-xs">
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
                        <p className="font-heading text-[10px] text-rama-accent uppercase tracking-[0.3em] font-bold">
                            Analizziamo l'ordinario per progettare l'inatteso.
                        </p>
                        <p className="font-sans text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed">
                            Dinner Show & Club · Torino <br />
                            © 2026 Black Bulls Lab. All Rights Reserved. · <Link href="/contact" className="text-rama-accent hover:text-white transition-colors">Rientra al Lab</Link>
                        </p>
                    </div>
                </div>

                {/* News & Legal */}
                <div className="flex flex-col items-center md:items-end gap-8 flex-grow">
                    {/* Newsletter Form */}
                    <div className="w-full max-w-sm space-y-4">
                        <p className="font-heading text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold text-center md:text-right">
                            Ricevi gli inviti agli eventi segreti
                        </p>
                        <form 
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setStatus("loading");
                                const res = await subscribeToNewsletter(email);
                                if (res.success) {
                                    setStatus("success");
                                    setEmail("");
                                    setMessage("Iscrizione completata!");
                                } else {
                                    setStatus("error");
                                    setMessage(res.error || "Errore");
                                }
                            }}
                            className="flex items-center"
                        >
                            <input
                                type="email"
                                placeholder="Il tuo indirizzo email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border border-white/10 px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-rama-accent/50 w-full rounded-l-md"
                                disabled={status === "loading" || status === "success"}
                            />
                            <button
                                type="submit"
                                className="bg-rama-accent text-black px-4 py-2 text-[10px] font-heading font-bold uppercase tracking-widest rounded-r-md hover:bg-white transition-colors disabled:opacity-50"
                                disabled={status === "loading" || status === "success"}
                            >
                                {status === "loading" ? "..." : "Join"}
                            </button>
                        </form>
                        {message && (
                            <p className={`text-[10px] font-sans ${status === 'success' ? 'text-green-500' : 'text-red-500'} text-center md:text-right animate-pulse`}>
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-rama-accent transition-colors" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-rama-accent transition-colors" aria-label="Facebook">
                            <Facebook size={18} />
                        </a>
                        <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-rama-accent transition-colors" aria-label="TikTok">
                            <Music2 size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl w-full mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap justify-center gap-8 font-heading text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    <Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link>
                    <Link href="/talents" className="hover:text-white transition-colors">Artisti</Link>
                    <Link href="/format" className="hover:text-white transition-colors">Format</Link>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">Contatti</Link>
                </div>

                <div className="flex gap-8 font-sans text-[9px] uppercase tracking-widest text-zinc-600">
                    <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                    <Link href="/cookie-policy" className="hover:text-zinc-400 transition-colors">Cookie Policy</Link>
                </div>

                <div className="text-center md:text-right">
                    <p className="font-heading text-[8px] text-zinc-700 uppercase tracking-[0.8em] font-medium">
                        System Status: Online // Entertainment Laboratory
                    </p>
                </div>
            </div>
        </footer>
    );
}
