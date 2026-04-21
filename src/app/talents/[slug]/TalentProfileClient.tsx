"use client";

import { Instagram, Globe, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Talent } from "@/lib/dataStore";

interface TalentProfileClientProps {
    talent: Talent;
}

export function TalentProfileClient({ talent }: TalentProfileClientProps) {
    return (
        <div className="min-h-screen pb-32">
            {/* Cinematic Header */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${talent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-8">
                    {/* Bio Section */}
                    <div className="md:col-span-1 space-y-8">
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-white/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                            <ArrowLeft size={16} /> Torna all'elenco
                        </button>

                        <div>
                            <span className="inline-block px-3 py-1.5 bg-rama-accent/10 border border-rama-accent/20 text-rama-accent text-[10px] font-bold uppercase tracking-widest mb-4">
                                {talent.category}
                            </span>
                            <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter text-white leading-none">
                                {talent.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-6">
                                <a href={`https://instagram.com/${talent.name.toLowerCase().replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-rama-accent hover:border-rama-accent/30 transition-all duration-300">
                                    <Instagram size={20} />
                                </a>
                                <a href={`https://google.com/search?q=${encodeURIComponent(talent.name)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-rama-accent hover:border-rama-accent/30 transition-all duration-300">
                                    <Search size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-6 bg-rama-accent/50" />
                                <h3 className="font-heading font-bold uppercase tracking-wider text-white">L'Esperienza</h3>
                            </div>
                            <p className="text-lg text-zinc-300 leading-relaxed font-light">{talent.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
