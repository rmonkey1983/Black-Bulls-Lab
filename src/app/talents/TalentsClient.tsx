"use client";

import Link from "next/link";
import { ArrowRight, Users, Mic, Utensils, GlassWater, Zap } from "lucide-react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export function TalentsClient() {
    return (
        <div className="min-h-screen pb-24">
            <ImmersiveHeader
                title="I NOSTRI"
                highlight="Artisti"
                subtitle="Le menti creative e i talenti che danno vita ad ogni esperienza del Black Bulls Lab."
                mediaUrl="/images/brand/service-performance.webp"
            />
            <div className="max-w-7xl mx-auto px-6 space-y-20">
                <section className="py-20 flex flex-col md:flex-row items-center gap-12 border-y border-white/5 bg-white/[0.02] rounded-3xl p-8 md:p-16">
                    <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                            <span className="flex items-center gap-2 text-rama-accent text-xs font-bold tracking-[0.2em] uppercase">
                                <Users size={14} /> Join the Lab
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white font-heading uppercase tracking-tighter leading-none">
                                Sei un artista, <br />
                                <span className="text-rama-accent">performer o chef?</span>
                            </h2>
                            <p className="text-zinc-300 text-xl leading-relaxed max-w-xl">
                                Black Bulls Lab cerca talenti per le sue serate a Torino. Cantanti, attori, bartender, chef — se hai qualcosa di unico da mostrare, vogliamo conoscerti.
                            </p>
                        </div>
                        
                        <Link
                            href="/contact?motivo=candidatura-artista"
                            className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-base px-10 py-5 rounded-full hover:bg-white transition-colors duration-300"
                        >
                            Voglio esibirmi con voi
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {[
                            { role: "Performer", icon: Mic, desc: "Cantanti, attori, performer" },
                            { role: "Chef", icon: Utensils, desc: "Cucina sperimentale" },
                            { role: "Bartender", icon: GlassWater, desc: "Mixology & Alchimia" },
                            { role: "Tecnico", icon: Zap, desc: "Luci, Audio & Show" },
                        ].map((item) => (
                            <div key={item.role} className="p-6 border border-white/10 bg-black/40 rounded-2xl hover:border-rama-accent/40 transition-colors group flex items-center gap-4 sm:flex-col sm:items-start">
                                <item.icon size={28} className="text-rama-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h3 className="font-heading font-bold text-white uppercase tracking-wider text-xl">{item.role}</h3>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="text-center max-w-3xl mx-auto py-12">
                    <p className="font-sans text-rama-muted italic text-lg opacity-60">
                        "Non cerchiamo semplici esecutori, ma menti creative che vogliano sfidare i limiti dell&apos;intrattenimento tradizionale."
                    </p>
                </section>
            </div>
        </div>
    );
}
