"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { usePathname } from "next/navigation";

export function RamaFooter() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-black border-t border-white/10 pt-16 md:pt-32 pb-8 md:pb-16 flex flex-col px-6 md:px-12">
            {/* Massive CTA */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 group cursor-pointer w-max">
                <Link href="/events" className="font-mohave text-[18vw] md:text-[140px] leading-[0.8] uppercase font-bold text-rama-text hover:text-rama-accent transition-colors duration-500">
                    Prossimi<br />Eventi
                </Link>
                <ArrowUpRight
                    size={120}
                    strokeWidth={1}
                    className="text-rama-text group-hover:text-rama-accent group-hover:-translate-y-4 group-hover:translate-x-4 transition-all duration-500 hidden md:block"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-white/10 pt-12 text-sm text-rama-muted font-outfit uppercase tracking-widest">

                {/* Logo and Copyright */}
                <div className="md:col-span-4 flex flex-col gap-8 text-rama-bg">
                    <div className="bg-rama-accent p-8 w-full max-w-[300px]">
                        <h2 className="font-mohave text-6xl font-bold tracking-tighter mix-blend-difference mb-8 leading-none">
                            BLACK<br />BULLS<br />LAB
                        </h2>
                        <div className="flex justify-between items-center text-black">
                            <span className="text-xl">*</span>
                            <span className="text-xl">O</span>
                            <span className="text-xl">{"</>"}</span>
                        </div>
                    </div>
                    <div className="text-rama-muted font-normal capitalize tracking-normal text-xs flex flex-col items-start gap-1">
                        <span>Dinner Show & Club</span>
                        <span>based in Torino</span>
                        <br />
                        <span className="flex items-center gap-4">
                            2026 Black Bulls Lab All Rights reserved
                            <Link href="/admin" className="text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest leading-none">Admin</Link>
                        </span>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="md:col-span-2 flex flex-col gap-6 font-semibold">
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
                <div className="md:col-span-3 flex flex-col gap-6 md:pl-8">
                    <h4 className="font-rock-salt text-rama-accent transform -rotate-2 capitalize tracking-normal text-lg mb-2">Seguici</h4>
                    <a href="https://instagram.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="https://facebook.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                    <a href="https://tiktok.com/@blackbullslab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                </div>

                {/* Newsletter block */}
                <div className="md:col-span-3 flex flex-col md:border-l md:border-white/10 md:pl-8 justify-between">
                    <div>
                        <h4 className="font-rock-salt text-rama-accent transform -rotate-2 capitalize tracking-normal text-lg mb-4">Newsletter</h4>
                        <p className="text-xs font-normal capitalize tracking-normal mb-8">Iscriviti per non perdere i prossimi eventi.</p>
                    </div>

                    <form
                        className="flex border border-white/20 p-1 focus-within:border-white/50 transition-colors"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Grazie per l'iscrizione!");
                            (e.target as HTMLFormElement).reset();
                        }}
                    >
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="bg-transparent outline-none flex-grow px-3 py-2 text-white font-normal capitalize tracking-normal placeholder:text-white/30"
                        />
                        <button type="submit" className="bg-white/10 hover:bg-white text-white hover:text-black transition-colors px-6 py-2 font-semibold cursor-pointer">
                            Iscriviti
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Contact string */}
            <div className="mt-24 md:mt-32 w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 gap-8">
                <div className="flex flex-col gap-2">
                    <span className="font-rock-salt text-rama-accent text-xl transform -rotate-2">Contattaci</span>
                    <a href="mailto:info@blackbullslab.com" className="font-mohave text-4xl md:text-5xl lg:text-7xl lowercase font-bold text-white hover:text-rama-accent transition-colors">
                        info@blackbullslab.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
