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
        ctaText: "Prenota il pacchetto Starter"
    },
    {
        name: "Business",
        size: "20–50 persone",
        price: "A partire da 55€/pers.",
        includes: ["Format premium", "Cena 3 portate", "Team di performer", "Welcome drink", "Supporto logistico"],
        highlighted: true,
        ctaText: "Questo è il mio team"
    },
    {
        name: "Enterprise",
        size: "50–100+ persone",
        price: "Preventivo su misura",
        includes: ["Format esclusivo personalizzato", "Menu ad hoc con chef", "Regia e scenografia dedicata", "Account manager dedicato"],
        ctaText: "Voglio qualcosa di unico"
    },
];

export default function CorporatePage() {
    useGSAP(() => {
        animateCards("#pricing-grid");
        animateFade("#corporate-form-container", "up", 0.05);
        animateFade("#services-intro", "up", 0.1);
        animateFade("#value-cards", "up", 0.1);
        animateCounters("#hero-stats");
        animateCounters("#value-cards");
    });

    return (
        <div className="min-h-screen pb-24 relative">
            <h1 className="sr-only">Eventi Aziendali e Team Building Esperienziale a Torino</h1>
            <div className="relative">
                <ImmersiveHeader
                    id="corporate-hero"
                    title="EVENTI"
                    highlight="Aziendali"
                    subtitle="La cena aziendale che i tuoi colleghi ricorderanno ancora il prossimo anno."
                    mediaUrl="/images/brand/bg-venue-crowd.png"
                />

                {/* Hero Stats - Overlapping or Floating under subtitle area */}
                <div id="hero-stats" className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 md:-mt-20 mb-20">
                    <div className="flex flex-wrap items-center gap-8 md:gap-16">
                        <div className="flex flex-col">
                            <span className="gsap-counter font-mohave font-bold text-4xl md:text-6xl text-white" data-target="50">0</span>
                            <span className="text-rama-accent font-outfit text-xs md:text-sm uppercase tracking-widest font-bold">Eventi Realizzati</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mohave font-bold text-4xl md:text-6xl text-white"><span className="gsap-counter" data-target="98">0</span>%</span>
                            <span className="text-rama-accent font-outfit text-xs md:text-sm uppercase tracking-widest font-bold">Soddisfazione</span>
                        </div>
                        <div className="hidden md:flex flex-col border-l border-white/10 pl-16">
                            <span className="gsap-counter font-mohave font-bold text-4xl md:text-5xl text-white/40" data-target="15">0</span>
                            <span className="text-white/20 font-outfit text-xs uppercase tracking-widest font-bold">Partner Corporate</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
                {/* New Section: Team Experience */}
                <section id="team-merit" className="space-y-16">
                    <div className="text-center">
                        <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-4xl md:text-7xl mb-4 leading-none">
                            IL TUO TEAM MERITA <br className="md:hidden" />
                            <span className="text-rama-accent">DI PIÙ DI UN APERITIVO</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <Users size={24} />
                            </div>
                            <h3 className="font-mohave uppercase font-bold text-white text-xl leading-tight">
                                Gruppi da 10 a 100 persone
                            </h3>
                            <p className="font-outfit text-rama-muted text-sm leading-relaxed">
                                Format su misura per ogni dimensione, progettati per coinvolgere ogni singolo partecipante.
                            </p>
                        </div>

                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="font-mohave uppercase font-bold text-white text-xl leading-tight">
                                Risposta in 24 ore
                            </h3>
                            <p className="font-outfit text-rama-muted text-sm leading-relaxed">
                                Preventivo gratuito e senza impegno. Il nostro team risponde rapidamente per garantirti la massima efficienza organizzativa.
                            </p>
                        </div>

                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="font-mohave uppercase font-bold text-white text-xl leading-tight">
                                Tutto incluso
                            </h3>
                            <p className="font-outfit text-rama-muted text-sm leading-relaxed">
                                Cena, spettacolo, regia. Zero sorprese in fattura e un&apos;esperienza fluida dall&apos;inizio alla fine.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Subtitle / Intro */}
                <div id="services-intro" className="text-center">
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-4xl md:text-7xl mb-4 leading-none">
                        IL TUO TEAM SARÀ <span className="text-rama-accent">IL PROTAGONISTA</span>
                    </h2>
                </div>

                {/* Pricing Tiers */}
                <section id="pricing-grid" className="space-y-12">
                    <div className="text-center">
                        <span className="font-rock-salt text-rama-accent text-xl transform -rotate-1 inline-block mb-4">Trasparenza totale</span>
                        <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-4xl md:text-[4vw] leading-[0.9]">
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
                                className={`gsap-card relative flex flex-col gap-5 p-7 md:p-8 rounded-2xl border transition-all duration-300 ${
                                    tier.highlighted
                                        ? "border-rama-accent bg-rama-accent/5 shadow-[0_0_40px_rgba(200,164,78,0.1)] ring-1 ring-rama-accent/20"
                                        : "border-white/10 bg-white/[0.03]"
                                }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rama-accent text-black font-mohave font-bold uppercase text-xs tracking-widest px-4 py-1 rounded-full whitespace-nowrap z-10">
                                        Più scelto
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-mohave font-bold uppercase tracking-wide text-white text-2xl">{tier.name}</h3>
                                    <p className="font-outfit text-rama-muted text-sm mt-1">{tier.size}</p>
                                </div>
                                <div className={`font-mohave font-bold text-2xl ${tier.highlighted ? "text-rama-accent" : "text-white"}`}>
                                    {tier.price}
                                </div>
                                <ul className="flex flex-col gap-3 flex-grow py-4">
                                    {tier.includes.map(item => (
                                        <li key={item} className="flex items-start gap-2 font-outfit text-sm text-rama-muted">
                                            <CheckCircle2 size={16} className="text-rama-accent flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto flex flex-col gap-4">
                                    <a
                                        href={`/contact?tier=${encodeURIComponent(tier.name)}`}
                                        className={`w-full text-center font-mohave font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-lg transition-colors duration-300 ${
                                            tier.highlighted
                                                ? "bg-rama-accent text-black hover:bg-white"
                                                : "border border-white/20 text-white hover:border-rama-accent hover:text-rama-accent"
                                        }`}
                                    >
                                        {tier.ctaText}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services - Inverted order on mobile */}
                <section className="space-y-32">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-[1px] bg-rama-accent/40" />
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                            I Nostri Servizi
                        </span>
                    </div>

                    <StickyTextSection
                        className="flex-col-reverse md:flex-row"
                        content={
                            <div className="space-y-6 mt-8 md:mt-0">
                                <Building2 size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
                                    <span className="text-white">Team Building</span>
                                    <span className="text-rama-accent">Naturale.</span>
                                </h3>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Niente unisce un gruppo di lavoro più di una risata condivisa durante uno spettacolo di stand-up comedy o un dinner show emozionante.
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
                        className="flex-col-reverse md:flex-row-reverse"
                        content={
                            <div className="space-y-6 mt-8 md:mt-0">
                                <Users size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
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
                        className="flex-col-reverse md:flex-row"
                        content={
                            <div className="space-y-6 mt-8 md:mt-0">
                                <Sparkles size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
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
                    className="border border-rama-accent/[0.08] bg-bg-card/30 p-8 md:p-16 relative rounded-2xl"
                >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-rama-accent/15" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-rama-accent/15" />

                    <div className="text-center mb-12">
                        <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white text-4xl md:text-[5vw] mb-4">
                            Progetta il tuo <br className="md:hidden" /><span className="text-rama-accent">Prossimo Evento</span>
                        </h3>
                        <p className="text-rama-muted font-outfit max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                            Raccontaci la tua idea. Il nostro team è pronto a confezionare un&apos;esperienza su misura per le esigenze, il budget e gli obiettivi della tua azienda.
                        </p>
                    </div>

                    <form className="max-w-3xl mx-auto font-outfit space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Nome Azienda</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:border-rama-accent/50 focus:outline-none transition-colors rounded-sm" placeholder="Es. Acme Corp" />
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Referente</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:border-rama-accent/50 focus:outline-none transition-colors rounded-sm" placeholder="Nome e Cognome" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Email Aziendale</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:border-rama-accent/50 focus:outline-none transition-colors rounded-sm" placeholder="email@azienda.com" />
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Telefono</label>
                                <input type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:border-rama-accent/50 focus:outline-none transition-colors rounded-sm" placeholder="+39" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Numero Ospiti Previsti</label>
                                {/* Native select on mobile ensured by not using custom wrapper components */}
                                <select className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors cursor-pointer rounded-sm">
                                    <option value="" disabled selected>Seleziona range</option>
                                    <option value="10-20">10-20 persone</option>
                                    <option value="20-50">20-50 persone</option>
                                    <option value="50-100">50-100 persone</option>
                                    <option value="100+">100+ persone (Grandi Eventi)</option>
                                </select>
                            </div>
                            <div className="gsap-fade space-y-2">
                                <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Tipo di Evento</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder-white/20 focus:border-rama-accent/50 focus:outline-none transition-colors rounded-sm" placeholder="Cena di Natale, Lancio, Team Building..." />
                            </div>
                        </div>

                        <div className="gsap-fade pt-8">
                            <button type="button" className="w-full md:w-auto inline-flex items-center justify-center bg-rama-accent text-black font-mohave text-lg md:text-xl uppercase tracking-widest font-bold px-12 py-5 hover:bg-white transition-colors rounded-sm shadow-xl shadow-rama-accent/10">
                                Costruiamo insieme la serata
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
