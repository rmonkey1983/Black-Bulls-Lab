"use client";

import { useRef } from "react";
import { EventConcept } from "@/components/events/EventConcept";
import { ArrowLeft, Mic2, Users } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export default function IlPalqoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        animateHeroText("#palqo-hero", 0.1);
        animateFade(".palqo-tag", "up", 0.3);
        animateFade(".palqo-desc", "up", 0.4);
        animateFade("#format-title", "left", 0.1);
        animateFade("#format-desc", "up", 0.2);
        animateCards("#format-steps");
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className=" min-h-screen">
            {/* HER0 SECTION */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-end">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-50"
                    >
                        <source src="/Untitled Project.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Back Button */}
                <div className="absolute top-24 left-6 z-30">
                    <Link
                        href="/format"
                        className="flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-transparent/20 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} /> Torna agli Esperimenti
                    </Link>
                </div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
                    <div id="palqo-hero" className="flex flex-col space-y-6">
                        <div className="palqo-tag flex items-center gap-3 text-rama-accent text-sm font-bold uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2 bg-rama-accent/10 backdrop-blur-sm px-3 py-1 rounded-full border border-rama-accent/20">
                                <Users size={14} /> Community & Show
                            </span>
                        </div>

                        <h1 className="line text-6xl md:text-8xl font-bold text-rama-text tracking-tighter leading-[0.9] drop-shadow-2xl">
                            <span>IL PALQO</span>
                        </h1>

                        <p className="palqo-desc text-xl md:text-3xl text-gray-300 font-light max-w-2xl border-l-4 border-rama-accent pl-6">
                            Il palcoscenico dove il talento incontra l&apos;opportunità.
                        </p>
                    </div>
                </div>
            </section>

            {/* DESCRIPTION SECTION */}
            <EventConcept
                description={`Il PalQo non è solo un evento, è un movimento. È lo spazio dove artisti emergenti, performer e creativi possono esprimere la loro arte senza filtri.\n\nNato dall'esigenza di dare voce a chi ha qualcosa da dire, Il PalQo trasforma il Black Bulls Lab in un'arena di pura espressione artistica. Dalla musica alla danza, dal teatro alla stand-up comedy, ogni forma d'arte trova qui la sua casa.\n\nUn ambiente inclusivo e vibrante dove il pubblico non è solo spettatore, ma parte integrante dell'energia creativa.`}
            />

            {/* FORMAT SECTION */}
            <section className="py-24 bg-transparent/40 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 id="format-title" className="text-4xl md:text-5xl font-bold text-rama-text mb-8">
                                IL <span className="text-rama-accent italic">FORMAT</span>
                            </h2>

                            <p id="format-desc" className="gsap-fade text-lg text-gray-300 leading-relaxed mb-8">
                                Ogni serata de &quot;Il PalQo&quot; è un viaggio in tre atti, disegnato per massimizzare l&apos;esperienza sia per gli artisti che per il pubblico.
                            </p>

                            <ul id="format-steps" className="space-y-6">
                                {[
                                    { title: "L'Aperitivo Artistico", desc: "Networking e warm-up con dj set lounge, dove artisti e pubblico si incontrano." },
                                    { title: "Le Performance", desc: "Il cuore della serata. Esibizioni live curate e selezionate, con focus sulla qualità e l'originalità." },
                                    { title: "Jam Session & Aftershow", desc: "Il palco si apre. Improvvisazione e festa fino a tarda notte." }
                                ].map((item, i) => (
                                    <li key={i} className="gsap-card flex gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-rama-accent font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-rama-text">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="gsap-fade relative h-[600px] border border-white/10 rounded-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-bordeaux/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                                <div>
                                    <Mic2 size={64} className="mx-auto text-rama-text/20 mb-4" />
                                    <h3 className="text-3xl font-bold text-rama-text mb-2">Vuoi Esibirti?</h3>
                                    <p className="text-gray-300 mb-8">La selezione è sempre aperta per nuovi talenti.</p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href="/contact"
                                            className="px-8 py-3 bg-rama-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
                                        >
                                            Candidati Ora
                                        </Link>
                                        <a
                                            href={buildWAUrl(WA_MESSAGES.ilPalqo)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 border border-rama-accent text-rama-accent font-bold uppercase tracking-widest hover:bg-rama-accent hover:text-black transition-colors rounded-sm flex items-center justify-center gap-2"
                                        >
                                            Chiedi info date
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
