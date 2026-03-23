"use client";

import React from "react";
import { RamaAnimatedText } from "@/components/rama/RamaAnimatedText";

export default function DinnerShowPage() {
    return (
        <main className="w-full bg-transparent min-h-screen text-white relative z-10 pt-32 pb-16">
            <section className="relative w-full flex flex-col justify-center px-6 md:px-12 py-16 overflow-hidden">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto z-20">
                    <RamaAnimatedText
                        text="DINNER SHOW E COMEDY CLUB A TORINO"
                        className="font-rock-salt text-rama-accent text-[6vw] md:text-3xl lg:text-4xl mb-6 transform -rotate-3"
                    />

                    {/* H1 SEO */}
                    <h1 className="sr-only">Dinner Show e Comedy Club a Torino: Il Gusto Incontra il Palcoscenico</h1>

                    <div className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[14vw] lg:text-[10vw] mb-12">
                        <RamaAnimatedText text="IL GUSTO" delay={0.1} />
                        <RamaAnimatedText text="INCONTRA IL" delay={0.2} />
                        <RamaAnimatedText text="PALCOSCENICO" delay={0.3} className="text-rama-accent" />
                    </div>

                    <p className="text-rama-muted font-outfit text-xl md:text-2xl leading-relaxed max-w-4xl text-center mb-16">
                        Immagina di assaporare un piatto curato nei minimi dettagli. Ora immagina che, mentre lo gusti, le luci si abbassano e la stanza si riempie di risate, musica o pura meraviglia teatrale. Al Black Bulls Lab, l'intrattenimento non fa da contorno alla tua cena. <strong className="text-white">È il piatto principale.</strong>
                    </p>

                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-24">
                        <div className="bg-zinc-900/50 p-8 border border-white/5 hover:border-rama-accent/30 transition-colors">
                            <h3 className="text-white font-mohave text-3xl font-bold tracking-tight uppercase mb-4">Nessun compromesso sulla qualità</h3>
                            <p className="text-rama-muted font-outfit text-lg leading-relaxed">
                                Dimentica i "menu turistici" tipici di alcune cene-spettacolo. Qui l'alta gastronomia è protagonista tanto quanto gli artisti sul palco.
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 border border-white/5 hover:border-rama-accent/30 transition-colors md:translate-y-8">
                            <h3 className="text-white font-mohave text-3xl font-bold tracking-tight uppercase mb-4 text-rama-accent">Sei parte dell'esperienza</h3>
                            <p className="text-rama-muted font-outfit text-lg leading-relaxed">
                                In un teatro sei uno spettatore passivo al buio. Qui sei immerso in un'atmosfera vibrante, puoi interagire, brindare e vivere la serata insieme ai tuoi amici e agli artisti.
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 border border-white/5 hover:border-rama-accent/30 transition-colors">
                            <h3 className="text-white font-mohave text-3xl font-bold tracking-tight uppercase mb-4">Il lusso dell'informalità</h3>
                            <p className="text-rama-muted font-outfit text-lg leading-relaxed">
                                Un ambiente dal design premium e ricercato, ma con l'accoglienza calorosa di casa. Sentiti libero di ridere a crepapelle e goderti un drink miscelato alla perfezione.
                            </p>
                        </div>
                    </div>

                    <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                        <a href="/events" className="inline-flex items-center justify-center bg-roma-gold text-black font-mohave text-xl uppercase tracking-widest font-bold px-10 py-5 hover:bg-white transition-colors">
                            Scopri il Calendario Eventi
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
