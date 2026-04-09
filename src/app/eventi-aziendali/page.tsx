"use client";

import { Building2, Users, Sparkles, CheckCircle2, Star, MessageSquare } from "lucide-react";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateCounters, animateCards, animateFade } from "@/lib/gsapAnimations";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

const pricingTiers = [
    {
        name: "Starter",
        size: "10–20 persone",
        price: "A partire da 45€/pers.",
        includes: ["Format a scelta", "Cena 2 portate", "1 Performer", "Coordinamento evento"],
    },
    {
        name: "Business",
        size: "20–50 persone",
        price: "A partire da 55€/pers.",
        includes: ["Format premium", "Cena 3 portate", "Team di performer", "Welcome drink", "Supporto logistico"],
        highlighted: true,
    },
    {
        name: "Enterprise",
        size: "50–100+ persone",
        price: "Preventivo su misura",
        includes: ["Format esclusivo personalizzato", "Menu ad hoc con chef", "Regia e scenografia dedicata", "Account manager dedicato"],
    },
];

export default function CorporatePage() {
    useGSAP(() => {
        animateCards("#pricing-grid");
        animateFade("#corporate-form-container", "up", 0.05);
        animateFade("#services-intro", "up", 0.1);
        animateFade("#value-cards", "up", 0.1);
    });

    return (
        <div className="min-h-screen  pb-24 relative">
            <h1 className="sr-only">Eventi Aziendali e Team Building Esperienziale a Torino</h1>
            <ImmersiveHeader
                id="corporate-hero"
                title="EVENTI"
                highlight="Aziendali"
                subtitle="Cerchi un'esperienza che faccia davvero team building? I nostri dinner show e format corporate sono progettati dalla nostra agenzia per rompere il ghiaccio, stupire e unire i tuoi collaboratori o clienti in modo sofisticato e memorabile. Dalla creatività all'esecuzione tecnica."
                mediaUrl="/images/brand/bg-venue-crowd.png"
            />

            <div className="max-w-6xl mx-auto px-6 space-y-20 relative z-10">
                {/* Value Propositions - il tuo team sarà il protagonista */}
                <section id="value-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-center text-center gap-4 hover:border-rama-accent/30 transition-all">
                        <div className="w-14 h-14 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                            <Users size={28} />
                        </div>
                        <p className="font-mohave uppercase font-bold text-white text-lg leading-tight">
                            Gruppi da 20 a 100 persone — format su misura per ogni dimensione
                        </p>
                    </div>

                    <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-center text-center gap-4 hover:border-rama-accent/30 transition-all">
                        <div className="w-14 h-14 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                            <Star size={28} />
                        </div>
                        <p className="font-mohave uppercase font-bold text-white text-lg leading-tight">
                            98% di soddisfazione — misurata su oltre 50 eventi realizzati
                        </p>
                    </div>

                    <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-center text-center gap-4 hover:border-rama-accent/30 transition-all">
                        <div className="w-14 h-14 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                            <MessageSquare size={28} />
                        </div>
                        <p className="font-mohave uppercase font-bold text-white text-lg leading-tight">
                            Preventivo in 24 ore — rispondiamo sempre entro un giorno lavorativo
                        </p>
                    </div>
                </section>

                {/* Subtitle / Intro */}
                <div id="services-intro" className="text-center">
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-5xl md:text-7xl mb-4">
                        IL TUO TEAM SARÀ <span className="text-rama-accent">IL PROTAGONISTA</span>
                    </h2>
                </div>

                {/* Pricing Tiers */}
                <section id="pricing-grid" className="space-y-8">
                    <div className="text-center">
                        <span className="font-rock-salt text-rama-accent text-xl transform -rotate-1 inline-block mb-4">Trasparenza totale</span>
                        <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-[8vw] md:text-[4vw] leading-[0.9]">
                            SOLUZIONI <span className="text-rama-accent">E PREZZI</span>
                        </h2>
                        <p className="font-outfit text-rama-muted mt-4 max-w-xl mx-auto">
                            Nessuna sorpresa. Cena + spettacolo tutto incluso. Personalizzazione su richiesta.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingTiers.map(tier => (
                            <div
                                key={tier.name}
                                className={`gsap-card relative flex flex-col gap-5 p-7 rounded-2xl border transition-all duration-300 ${
                                    tier.highlighted
                                        ? "border-rama-accent bg-rama-accent/5 shadow-[0_0_40px_rgba(200,164,78,0.1)]"
                                        : "border-white/10 bg-white/[0.03]"
                                }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rama-accent text-black font-mohave font-bold uppercase text-xs tracking-widest px-4 py-1 rounded-full">
                                        Più scelto
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-mohave font-bold uppercase tracking-wide text-white text-2xl">{tier.name}</h3>
                                    <p className="font-outfit text-rama-muted text-sm mt-1">{tier.size}</p>
                                </div>
                                <div className={`font-mohave font-bold text-xl ${tier.highlighted ? "text-rama-accent" : "text-white"}`}>
                                    {tier.price}
                                </div>
                                <ul className="flex flex-col gap-2 flex-grow">
                                    {tier.includes.map(item => (
                                        <li key={item} className="flex items-start gap-2 font-outfit text-sm text-rama-muted">
                                            <CheckCircle2 size={15} className="text-rama-accent flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto flex flex-col gap-3">
                                    <a
                                        href={`/contact?tier=${encodeURIComponent(tier.name)}`}
                                        className={`text-center font-mohave font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-lg transition-colors duration-300 ${
                                            tier.highlighted
                                                ? "bg-rama-accent text-black hover:bg-white"
                                                : "border border-white/20 text-white hover:border-rama-accent hover:text-rama-accent"
                                        }`}
                                    >
                                        Richiedi Preventivo
                                    </a>
                                    {tier.name === "Enterprise" && (
                                        <a
                                            href={buildWAUrl(WA_MESSAGES.corporate)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-center font-outfit text-xs text-white/40 hover:text-rama-accent transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                                            Parla subito su WhatsApp
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services - Parallax Version */}
                <section className="space-y-32">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-[1px] bg-rama-accent/40" />
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                            I Nostri Servizi
                        </span>
                    </div>

                    <StickyTextSection
                        content={
                            <div className="space-y-6">
                                <Building2 size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Team Building</span>
                                    <span className="text-rama-accent">Naturale.</span>
                                </h3>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Niente forza e unisce un gruppo di lavoro più di una risata condivisa durante uno spettacolo di stand-up comedy o un dinner show emozionante.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/service-plating.png"
                            alt="Team Building"
                            aspectRatio="landscape"
                            speed={0.2}
                        />
                    </StickyTextSection>

                    <StickyTextSection
                        className="md:flex-row-reverse"
                        content={
                            <div className="space-y-6">
                                <Users size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Networking</span>
                                    <span className="text-rama-accent">Senza Stress.</span>
                                </h3>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Un ambiente fluido e informale, perfetto per chiacchierare, rilassarsi e costruire relazioni autentiche tra colleghi o con i clienti più importanti.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/service-mixology.png"
                            alt="Corporate Event"
                            aspectRatio="landscape"
                            speed={0.3}
                        />
                    </StickyTextSection>

                    <StickyTextSection
                        content={
                            <div className="space-y-6">
                                <Sparkles size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Esperienza</span>
                                    <span className="text-rama-accent">Chiavi in Mano.</span>
                                </h3>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Scegli tu il livello di personalizzazione. Dalla creazione di format ad alto impatto, al menu dedicato, fino alla meticolosa scelta dell&apos;artista o del performer perfetto per il tono e la visione della tua azienda.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.png"
                            alt="Networking"
                            aspectRatio="landscape"
                            speed={0.2}
                        />
                    </StickyTextSection>
                </section>

                {/* CTA - Modulo B2B */}
                <div
                    id="corporate-form-container"
                    className="border border-rama-accent/[0.08] bg-bg-card/30 p-8 md:p-16 relative"
                >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-rama-accent/15" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-rama-accent/15" />

                    <div className="text-center mb-12">
                        <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white text-[8vw] md:text-[5vw] mb-4">
                            Progetta il tuo <br className="md:hidden" /><span className="text-rama-accent">Prossimo Evento</span>
                        </h3>
                        <p className="text-rama-muted font-outfit max-w-2xl mx-auto text-lg leading-relaxed">
                            Raccontaci la tua idea. Il nostro team è pronto a confezionare un&apos;esperienza su misura per le esigenze, il budget e gli obiettivi della tua azienda. Compila il modulo qui sotto, ti ricontatteremo entro 24 ore con una proposta creativa.
                        </p>
                    </div>

                    <form className="max-w-3xl mx-auto font-outfit space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Nome Azienda</label>
                                <input type="text" className="w-full bg-transparent/50 border border-white/10 p-4 text-white placeholder-white/30 focus:border-rama-accent/50 focus:outline-none transition-colors" placeholder="Es. Acme Corp" />
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Referente</label>
                                <input type="text" className="w-full bg-transparent/50 border border-white/10 p-4 text-white placeholder-white/30 focus:border-rama-accent/50 focus:outline-none transition-colors" placeholder="Nome e Cognome" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Email</label>
                                <input type="email" className="w-full bg-transparent/50 border border-white/10 p-4 text-white placeholder-white/30 focus:border-rama-accent/50 focus:outline-none transition-colors" placeholder="email@azienda.com" />
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Telefono</label>
                                <input type="tel" className="w-full bg-transparent/50 border border-white/10 p-4 text-white placeholder-white/30 focus:border-rama-accent/50 focus:outline-none transition-colors" placeholder="+39" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Numero Ospiti Previsti</label>
                                <select className="w-full bg-transparent/50 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors appearance-none cursor-pointer">
                                    <option value="" disabled selected>Seleziona range</option>
                                    <option value="10-20">10-20 persone</option>
                                    <option value="20-50">20-50 persone</option>
                                    <option value="50-100">50-100 persone</option>
                                    <option value="100+">100+ persone (Grandi Eventi)</option>
                                </select>
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="text-sm text-rama-muted uppercase tracking-wider">Tipo di Evento</label>
                                <input type="text" className="w-full bg-transparent/50 border border-white/10 p-4 text-white placeholder-white/30 focus:border-rama-accent/50 focus:outline-none transition-colors" placeholder="Cena di Natale, Lancio, Team Building..." />
                            </div>
                        </div>

                        <div className="gsap-fade pt-6 flex justify-center">
                            <button type="button" className="inline-flex items-center justify-center bg-rama-accent text-black font-mohave text-xl uppercase tracking-widest font-bold px-12 py-5 hover:bg-white transition-colors">
                                Richiedi un Preventivo Gratuito
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
