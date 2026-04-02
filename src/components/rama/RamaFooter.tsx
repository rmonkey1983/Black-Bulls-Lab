"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export function RamaFooter() {
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-transparent border-t border-white/10 pt-12 sm:pt-16 md:pt-32 pb-8 md:pb-16 flex flex-col px-4 sm:px-6 md:px-12 overflow-hidden">
            {/* Massive CTA */}
            {pathname !== "/" && pathname !== "/contact" && pathname !== "/events" && (
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

            <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 border-t border-white/10 pt-10 sm:pt-12 text-sm text-rama-muted font-outfit uppercase tracking-widest">

                {/* Logo and Copyright */}
                <div className="col-span-2 md:col-span-4 flex flex-col gap-8">
                    <Link href="/" aria-label="Black Bulls Lab — Home">
                        <Image
                            src="/sito log.png"
                            alt="Black Bulls Lab"
                            width={180}
                            height={60}
                            className="w-auto h-14 object-contain"
                        />
                    </Link>
                    <div className="text-rama-muted font-normal capitalize tracking-normal text-xs flex flex-col items-start gap-1">
                        <span>Dinner Show &amp; Club</span>
                        <span>based in Torino</span>
                        <br />
                        <span className="flex items-center gap-4">
                            © 2026 Black Bulls Lab. All Rights Reserved.
                            <Link href="/admin" className="text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest leading-none">Admin</Link>
                        </span>
                    </div>
                </div>


                {/* Links Column 1 */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-6 font-semibold">
                    <Link href="/events" className="hover:text-white transition-colors flex justify-between">Eventi <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/chi-siamo" className="hover:text-white transition-colors flex justify-between">Chi Siamo <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/talents" className="hover:text-white transition-colors flex justify-between">Ricercatori <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/gallery" className="hover:text-white transition-colors flex justify-between">Galleria <ArrowUpRight size={14} /></Link>
                    <div className="h-[1px] w-full bg-white/10" />
                    <Link href="/contact" className="hover:text-white transition-colors flex justify-between">Contatti <ArrowUpRight size={14} /></Link>
                </div>

                {/* Follow us block */}
                <div className="col-span-1 md:col-span-3 flex flex-col gap-6 md:pl-8">
                    <h4 className="font-rock-salt text-rama-accent transform -rotate-2 capitalize tracking-normal text-lg mb-2">Seguici</h4>
                    <a href="https://instagram.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="https://facebook.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                    <a href="https://tiktok.com/@blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                </div>

                {/* Newsletter block */}
                <div className="col-span-2 md:col-span-3 flex flex-col md:border-l md:border-white/10 md:pl-8 justify-between">
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
                            {status === "loading" ? "Invio..." : "Iscriviti"}
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
            <div className="mt-12 sm:mt-24 md:mt-32 w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-4 sm:gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-rock-salt text-rama-accent text-lg sm:text-xl transform -rotate-2">Contattaci</span>
                    <a href="mailto:info@blackbullslab.com" className="font-mohave text-2xl sm:text-4xl md:text-5xl lg:text-7xl lowercase font-bold text-white hover:text-rama-accent transition-colors break-all">
                        info@blackbullslab.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
