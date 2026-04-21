"use client";

import { useState } from "react";
import { Building2, Users, Sparkles, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCounters, animateCards, animateFade } from "@/lib/gsapAnimations";
import { submitContact } from "@/app/actions/contact";

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

export function CorporateClient() { 
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useGSAP(() => { 
        animateCards("#pricing-grid");
        animateFade("#corporate-form-container", "up", 0.05);
        animateFade("#services-intro", "up", 0.1);
        animateFade("#value-cards", "up", 0.1);
        animateCounters("#hero-stats");
        animateCounters("#value-cards");
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Aggiungiamo campi extra al messaggio per la notifica
        const company = formData.get("company") as string;
        const guests = formData.get("guests") as string;
        const type = formData.get("event_type") as string;
        const baseMessage = formData.get("message_content") || "";
        
        const enrichedMessage = `AZIENDA: ${company}\nOSPITI: ${guests}\nTIPO EVENTO: ${type}\n\nNOTE: ${baseMessage}`;
        formData.set("message", enrichedMessage);
        formData.set("subject", `Richiesta Evento Aziendale: ${company}`);

        try {
            const res = await submitContact(formData);
            if (res.success) {
                setIsSubmitted(true);
            } else {
                alert(res.error || "Errore durante l'invio. Riprova.");
            }
        } catch (err) {
            console.error("Corporate submission error:", err);
            alert("Errore di connessione.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-24 relative">
            <h1 className="sr-only">Eventi Aziendali e Team Building Esperienziale a Torino</h1>
            
            <div className="relative">
                <ImmersiveHeader
                    id="corporate-hero"
                    title="EVENTI"
                    highlight="Aziendali"
                    subtitle="Dimentica le solite cene. Progettiamo esperienze smart, digitali e altamente coinvolgenti per il tuo team."
                    mediaUrl="/images/brand/bg-venue-crowd.webp"
                />

                <div id="hero-stats" className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 md:-mt-20 mb-20">
                    <div className="flex flex-wrap items-center gap-8 md:gap-16">
                        <div className="flex flex-col">
                            <span className="gsap-counter font-heading font-bold text-4xl md:text-6xl text-white" data-target="150">0</span>
                            <span className="text-rama-accent font-sans text-xs md:text-sm uppercase tracking-widest font-bold">Eventi Realizzati</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-4xl md:text-6xl text-white"><span className="gsap-counter" data-target="100">0</span>%</span>
                            <span className="text-rama-accent font-sans text-xs md:text-sm uppercase tracking-widest font-bold">Coinvolgimento</span>
                        </div>
                        <div className="hidden md:flex flex-col border-l border-white/10 pl-16">
                            <span className="gsap-counter font-heading font-bold text-4xl md:text-5xl text-white/40" data-target="24">0</span>
                            <span className="text-white/20 font-sans text-xs uppercase tracking-widest font-bold">Ore per il Briefing</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
                <section id="team-merit" className="space-y-16">
                    <div className="text-center">
                        <h2 className="font-heading font-bold uppercase tracking-tighter text-white text-4xl md:text-7xl mb-4 leading-none">
                            IL TUO TEAM MERITA <br className="md:hidden" />
                            <span className="text-rama-accent">UN&apos;ESPERIENZA SMART</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <Users size={24} />
                            </div>
                            <h3 className="font-heading uppercase font-bold text-white text-xl leading-tight">
                                Partecipazione 100% Digitale
                            </h3>
                            <p className="font-sans text-rama-muted text-sm leading-relaxed">
                                Ogni dipendente interagisce con il proprio smartphone. Nessuno resta a guardare, tutti sono protagonisti del gioco.
                            </p>
                        </div>

                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <Users size={24} />
                            </div>
                            <h3 className="font-heading uppercase font-bold text-white text-xl leading-tight">
                                Scalabilità Illimitata
                            </h3>
                            <p className="font-sans text-rama-muted text-sm leading-relaxed">
                                Gestiamo piccoli gruppi o intere divisioni aziendali con la stessa qualità, grazie alla nostra regia Web App proprietaria.
                            </p>
                        </div>

                        <div className="gsap-fade p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col gap-4 hover:border-rama-accent/30 transition-all">
                            <div className="w-12 h-12 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="font-heading uppercase font-bold text-white text-xl leading-tight">
                                Dashboard & Feedback
                            </h3>
                            <p className="font-sans text-rama-muted text-sm leading-relaxed">
                                Monitora il coinvolgimento e ricevi i feedback della serata. Unire il team non è mai stato così tecnologico e divertente.
                            </p>
                        </div>
                    </div>
                </section>

                <div id="services-intro" className="text-center">
                    <h2 className="font-heading font-bold uppercase tracking-tighter text-white text-4xl md:text-7xl mb-4 leading-none">
                        PROGETTIAMO <span className="text-rama-accent">IL VOSTRO SHOW</span>
                    </h2>
                </div>

                <section id="pricing-grid" className="space-y-12">
                    <div className="text-center">
                        <span className="font-rock-salt text-rama-accent text-xl transform -rotate-1 inline-block mb-4">Soluzioni chiavi in mano</span>
                        <h2 className="font-heading font-bold uppercase tracking-tighter text-white text-4xl md:text-[4vw] leading-[0.9]">
                            FORMAT <span className="text-rama-accent">AZIENDALI</span>
                        </h2>
                        <p className="font-sans text-rama-muted mt-4 max-w-xl mx-auto">
                            Scegliete il livello di interazione. Dalla web app standard alla personalizzazione totale del mistero aziendale.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingTiers.map(tier => (
                            <div
                                key={tier.name}
                                className={`gsap-card relative flex flex-col gap-5 p-7 md:p-8 rounded-2xl border transition-all duration-300 ${ tier.highlighted
                                        ? "border-rama-accent bg-rama-accent/5 shadow-[0_0_40px_rgba(200,164,78,0.1)] ring-1 ring-rama-accent/20"
                                        : "border-white/10 bg-white/[0.03]"
                                }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rama-accent text-black font-heading font-bold uppercase text-xs tracking-widest px-4 py-1 rounded-full whitespace-nowrap z-10">
                                        Più scelto
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-heading font-bold uppercase tracking-wide text-white text-2xl">{tier.name}</h3>
                                    <p className="font-sans text-rama-muted text-sm mt-1">{tier.size}</p>
                                </div>
                                <div className={`font-heading font-bold text-2xl ${tier.highlighted ? "text-rama-accent" : "text-white"}`}>
                                    {tier.price}
                                </div>
                                <ul className="flex flex-col gap-3 flex-grow py-4">
                                    {tier.includes.map(item => (
                                        <li key={item} className="flex items-start gap-2 font-sans text-sm text-rama-muted">
                                            <CheckCircle2 size={16} className="text-rama-accent flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-2 font-sans text-sm text-rama-accent font-bold">
                                        <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
                                        Web App Interattiva Inclusa
                                    </li>
                                </ul>
                                <div className="mt-auto flex flex-col gap-4">
                                    <a
                                        href={`/contact?tier=${encodeURIComponent(tier.name)}`}
                                        className={`w-full text-center font-heading font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-lg transition-colors duration-300 ${ tier.highlighted
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

                <section className="space-y-32">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-[1px] bg-rama-accent/40" />
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                            I Nostri Servizi Smart
                        </span>
                    </div>

                    <StickyTextSection
                        className="flex-col-reverse md:flex-row"
                        content={ <div className="space-y-6 mt-8 md:mt-0">
                                <Building2 size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-heading font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
                                    <span className="text-white">Team Building</span>
                                    <span className="text-rama-accent">Interattivo.</span>
                                </h3>
                                <p className="text-rama-muted font-sans text-lg leading-relaxed mt-6">
                                    Niente unisce un gruppo di lavoro più di una sfida digitale condivisa. I nostri format permettono di collaborare in tempo reale per risolvere misteri o vincere contest, alimentando lo spirito di squadra in modo moderno.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/service-plating.webp"
                            alt="Team Building"
                            aspectRatio="landscape"
                            speed={0.2}
                        />
                    </StickyTextSection>

                    <StickyTextSection
                        className="flex-col-reverse md:flex-row-reverse"
                        content={ <div className="space-y-6 mt-8 md:mt-0">
                                <Users size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-heading font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
                                    <span className="text-white">Networking</span>
                                    <span className="text-rama-accent">Tecnologico.</span>
                                </h3>
                                <p className="text-rama-muted font-sans text-lg leading-relaxed mt-6">
                                    Eliminiamo l&apos;imbarazzo dei classici eventi. La nostra Web App agisce come un facilitatore sociale, guidando gli ospiti in interazioni naturali attraverso missioni e mini-giochi digitali al tavolo.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-venue-crowd.webp"
                            alt="Networking"
                            aspectRatio="landscape"
                            speed={0.2}
                        />
                    </StickyTextSection>

                    <StickyTextSection
                        className="flex-col-reverse md:flex-row"
                        content={ <div className="space-y-6 mt-8 md:mt-0">
                                <Sparkles size={42} className="text-rama-accent mb-4" />
                                <h3 className="font-heading font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-[6vw]">
                                    <span className="text-white">Esperienza</span>
                                    <span className="text-rama-accent">Chiavi in Mano.</span>
                                </h3>
                                <p className="text-rama-muted font-sans text-lg leading-relaxed mt-6">
                                    Scegli tu il livello di personalizzazione. Dalla creazione di format ad alto impatto, al menu dedicato, fino alla meticolosa scelta dell&apos;artista o del performer perfetto per il tono e la visione della tua azienda.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.webp"
                            alt="Esperienza Completa"
                            aspectRatio="landscape"
                            speed={0.2}
                        />
                    </StickyTextSection>
                </section>

                <div
                    id="corporate-form-container"
                    className="border border-rama-accent/[0.08] bg-bg-card/30 p-8 md:p-16 relative rounded-2xl min-h-[500px] flex flex-col justify-center"
                >
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-rama-accent/15" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-rama-accent/15" />

                    {isSubmitted ? (
                        <div className="text-center space-y-8 py-12 animate-in fade-in zoom-in duration-700">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent border border-rama-accent/20">
                                    <PartyPopper size={40} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-heading font-bold text-4xl md:text-6xl text-white uppercase tracking-tighter">
                                    Richiesta <span className="text-rama-accent">Ricevuta!</span>
                                </h3>
                                <p className="text-rama-muted font-sans text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                                    Abbiamo ricevuto i dettagli del tuo evento aziendale. Un nostro esperto ti contatterà entro 24 ore per definire il format perfetto.
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="text-rama-accent font-heading text-xs uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Invia un'altra richiesta
                            </button>
                        </div>
                    ) : (
                        <>
                        <div className="text-center mb-12">
                            <h3 className="font-heading font-bold leading-[0.8] tracking-tighter uppercase text-white text-4xl md:text-[5vw] mb-4">
                                Progetta il tuo <br className="md:hidden" /><span className="text-rama-accent">Prossimo Evento</span>
                            </h3>
                            <p className="text-rama-muted font-sans max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                                Raccontaci la tua idea. Il nostro team è pronto a confezionare un&apos;esperienza su misura per le esigenze, il budget e gli obiettivi della tua azienda.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto font-sans space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Nome Azienda</label>
                                    <input name="company" type="text" required className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors rounded-xl font-sans" placeholder="Es. Acme Corp" />
                                </div>
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Referente</label>
                                    <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors rounded-xl font-sans" placeholder="Nome e Cognome" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Email Aziendale</label>
                                    <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors rounded-xl font-sans" placeholder="email@azienda.com" />
                                </div>
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Telefono</label>
                                    <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors rounded-xl font-sans" placeholder="+39" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Numero Ospiti Previsti</label>
                                    <select name="guests" required className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors cursor-pointer rounded-xl appearance-none font-sans">
                                        <option value="" disabled >Seleziona range</option>
                                        <option value="10-20">10-20 persone</option>
                                        <option value="20-50">20-50 persone</option>
                                        <option value="50-100">50-100 persone</option>
                                        <option value="100+">100+ persone (Grandi Eventi)</option>
                                    </select>
                                </div>
                                <div className="gsap-fade space-y-2">
                                    <label className="block text-xs md:text-sm text-rama-muted uppercase tracking-wider font-bold">Tipo di Evento</label>
                                    <input name="event_type" type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-rama-accent/50 focus:outline-none transition-colors rounded-xl font-sans" placeholder="Cena di Natale, Lancio, Team Building..." />
                                </div>
                            </div>

                            <div className="gsap-fade pt-8">
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full md:w-auto inline-flex items-center justify-center bg-rama-accent text-black font-heading text-lg md:text-xl uppercase tracking-widest font-bold px-12 py-5 hover:bg-white transition-colors rounded-xl shadow-xl shadow-rama-accent/10 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Costruiamo insieme la serata"}
                                </button>
                            </div>
                        </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
