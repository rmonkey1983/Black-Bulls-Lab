"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Instagram, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTalents, Talent } from "@/lib/dataStore";

export default function TalentPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [talent, setTalent] = useState<Talent | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getTalents().then((talents) => {
            const found = talents.find((t) => t.id === slug);
            if (found) {
                setTalent(found);
            } else {
                setNotFound(true);
            }
        });
    }, [slug]);

    if (notFound) {
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-center">
                    <span className="text-[10px] text-bordeaux-light tracking-[0.3em] uppercase font-medium">404</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-2">Artista Non Trovato</h1>
                    <p className="text-gray-400 mt-2 text-sm">L&apos;artista che stai cercando non è disponibile.</p>
                    <Link href="/talents" className="inline-flex items-center gap-2 text-rama-accent text-sm mt-6 hover:text-rama-accent-light transition-colors">
                        <ArrowLeft size={14} /> Torna agli Artisti
                    </Link>
                </div>
            </div>
        );
    }

    if (!talent) {
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-rama-accent/40 text-sm animate-pulse-glow">Caricamento artista...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  pb-32">
            {/* Cinematic Header */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${talent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                <Link
                    href="/talents"
                    className="absolute top-24 left-6 z-30 flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft size={16} /> Torna agli Artisti
                </Link>

                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-8">
                    <span className="inline-block px-3 py-1.5 bg-bordeaux/20 border border-bordeaux/30 text-bordeaux-light text-[10px] font-bold uppercase tracking-widest mb-4">
                        {talent.role}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl mb-4">
                        {talent.name}
                    </h1>
                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                        <a href={`https://instagram.com/${talent.name.toLowerCase().replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-rama-accent/20 flex items-center justify-center text-gray-400 hover:text-rama-accent hover:border-rama-accent/40 transition-all duration-300">
                            <Instagram size={18} />
                        </a>
                        <a href={`https://google.com/search?q=${encodeURIComponent(talent.name)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-rama-accent/20 flex items-center justify-center text-gray-400 hover:text-rama-accent hover:border-rama-accent/40 transition-all duration-300">
                            <Globe size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16">
                {/* Bio */}
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 bg-rama-accent/50" />
                        <span className="text-xs uppercase tracking-[0.3em] text-rama-accent/40 font-medium">Biografia</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed font-light">{talent.bio}</p>
                </div>
            </div>
        </div>
    );
}
