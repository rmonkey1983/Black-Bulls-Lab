"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { CONTACT_EMAIL, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export function RamaFooter() {
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-transparent border-t border-white/10 pt-12 sm:pt-16 md:pt-32 pb-8 md:pb-16 pb-safe flex flex-col px-4 sm:px-6 md:px-12 overflow-hidden">
            {/* Massive CTA */}
            {pathname !== "/" && pathname !== "/contact" && (
                <div className="flex flex-row justify-between items-end mb-16 sm:mb-24 md:mb-40 group cursor-pointer overflow-hidden">
                    <Link href="/events" className="font-mohave text-[18vw] sm:text-[16vw] md:text-[140px] leading-[0.85] uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-500">
                        Prossimi<br />Eventi
                    </Link>
                    <ArrowUpRight
                        size={80}
                        strokeWidth={1}
                        className="text-rama-text group-hover:text-rama-accent group-hover:-translate-y-4 group-hover:translate-x-4 transition-[color,transform] duration-500 hidden md:block flex-shrink-0"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 border-t border-white/10 pt-10 sm:pt-12 text-sm text-rama-muted font-outfit uppercase tracking-widest">

                {/* Logo and Copyright */}
                <div className="col-span-1 sm:col-span-2 md:col-span-4 flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
                    <Link href="/" aria-label="Black Bulls Lab — Home">
                        <Image
                            src="/blackbullslab-v2.png"
                            alt="Black Bulls Lab"
                            width={160}
                            height={160}
                            className="w-auto h-20 md:h-32 object-contain"
                            sizes="(max-width: 640px) 80px, 120px"
                        />
                    </Link>
                    <div className="text-rama-muted font-normal capitalize tracking-normal text-xs flex flex-col items-center md:items-start gap-1">
                        <span>Dinner Show &amp; Club · Torino</span>
                        <br />
                        <span className="flex items-center gap-4">
                            © 2026 {SITE_NAME}. All Rights Reserved.
                        </span>
                    </div>
                </div>


                {/* Links Column 1 */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-5 md:gap-6 font-semibold md:pl-0 px-4 md:px-0">
                    <Link href="/events" className="hover:text-white transition-colors flex justify-between">Eventi <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/chi-siamo" className="hover:text-white transition-colors flex justify-between">Chi Siamo <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/talents" className="hover:text-white transition-colors flex justify-between">Artisti <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/gallery" className="hover:text-white transition-colors flex justify-between">Galleria <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/contact" className="hover:text-white transition-colors flex justify-between">Contatti <ArrowUpRight size={14} /></Link>
                </div>

                {/* Follow us block */}
                <div className="col-span-1 md:col-span-3 flex flex-col gap-5 md:gap-6 md:pl-8 px-4 md:px-0">
                    <h4 className="font-rock-salt text-rama-accent transform -rotate-2 capitalize tracking-normal text-lg mb-2">Seguici</h4>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex justify-between border-b border-white/5 pb-2" aria-label="Seguici su Instagram">Instagram <ArrowUpRight size={12} className="opacity-40" /></a>
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex justify-between border-b border-white/5 pb-2" aria-label="Seguici su Facebook">Facebook <ArrowUpRight size={12} className="opacity-40" /></a>
                    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex justify-between border-b border-white/5 pb-2" aria-label="Seguici su TikTok">TikTok <ArrowUpRight size={12} className="opacity-40" /></a>
                </div>

                {/* Newsletter block */}
                <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col md:border-l md:border-white/10 md:pl-8 justify-between mt-8 md:mt-0 px-4 md:px-0">
                    <div>
                        <h4 className="font-rock-salt text-rama-accent transform -rotate-2 capitalize tracking-normal text-lg mb-4">Newsletter</h4>
                        <p className="text-xs font-normal capitalize tracking-normal mb-8">Iscriviti per non perdere i prossimi eventi.</p>
                    </div>

                    <form
                        className="flex border border-white/20 p-1 focus-within:border-white/50 transition-colors"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (!email) return;

                            setStatus("loading");
                            const res = await subscribeToNewsletter(email);

                            if (res?.error) {
                                setStatus("error");
                                setMessage(res.error);
                            } else {
                                setStatus("success");
                                setMessage("Iscrizione completata con successo!");
                                setEmail("");
                            }
                        }}
                    >
                        <label htmlFor="newsletter-email" className="sr-only">Email per newsletter</label>
                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading"}
                            autoComplete="email"
                            placeholder="Your Email"
                            className="bg-transparent outline-none flex-grow px-3 py-2 text-white font-normal capitalize tracking-normal placeholder:text-white/30 disabled:opacity-50"
                        />
                        <button 
                            type="submit" 
                            disabled={status === "loading"}
                            className="bg-white/10 hover:bg-white text-white hover:text-black transition-colors px-6 py-2 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Invio..." : "Avvisami"}
                        </button>
                    </form>
                    {message && (
                        <p className={`text-xs mt-2 ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom Contact string */}
            <div className="mt-16 sm:mt-24 md:mt-32 w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-10 gap-6 sm:gap-8">
                <div className="flex flex-col gap-4 w-full">
                    <span className="font-rock-salt text-rama-accent text-lg sm:text-xl transform -rotate-2">Contattaci</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-mohave text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[7vw] lowercase font-bold text-white hover:text-rama-accent transition-colors break-all leading-none">
                        {CONTACT_EMAIL}
                    </a>
                </div>
            </div>
        </footer>
    );
}
