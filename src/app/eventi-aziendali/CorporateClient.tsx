"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Building2, Users, Sparkles, CheckCircle2, Loader2, ArrowRight, Zap, Target, ShieldCheck, Heart, UserPlus } from "lucide-react";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { useGSAP } from "@/hooks/useGSAP";
import { useCinematic } from "@/hooks/useCinematic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { CorporateForm } from "@/components/rama/CorporateForm";
import gsap from "gsap";

const pricingTiers = [
    { 
        name: "Essential",
        size: "Social Core Experience",
        price: "€900",
        priceValue: 900,
        actionType: "checkout",
        includes: ["Format immersivo a scelta", "Ingegneria sociale di base", "1 Lead Performer"],
        ctaText: "INIZIA LA TRASFORMAZIONE"
    },
    { 
        name: "Advanced",
        size: "Deep Connection Protocol",
        price: "€1500",
        priceValue: 1500,
        actionType: "checkout",
        includes: ["Format premium adattivo", "Dinamiche sociali avanzate", "Team di performer dedicati", "Welcome Experience"],
        highlighted: true,
        ctaText: "ELEVATE IL VOSTRO TEAM"
    },
    { 
        name: "Tailored",
        size: "Exclusive Brand Universe",
        price: "Su misura",
        actionType: "contact",
        includes: ["Architettura narrativa unica", "Personalizzazione totale brand", "Regia & Scenografia High-End", "Strategic Account Manager"],
        ctaText: "PROGETTA L'IMPOSSIBILE"
    },
];

export function CorporateClient() { 
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const { revealOnScroll } = useCinematic();

    useGSAP(() => { 
        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current) return;
            gsap.to(spotlightRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 1.5,
                ease: "power2.out"
            });
        };
        window.addEventListener("mousemove", handleMouseMove);

        const tl = gsap.timeline();
        tl.from(".corp-title span", {
            y: 100,
            opacity: 0,
            filter: "blur(20px)",
            stagger: 0.2,
            duration: 2,
            ease: "expo.out"
        })
        .from(".corp-sub", {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: "power2.out"
        }, "-=1");

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    revealOnScroll(".reveal-corp");

    const handleAction = async (tier: any) => {
        if (tier.actionType === "contact") {
            const form = document.getElementById("corporate-form-container");
            form?.scrollIntoView({ behavior: "smooth" });
            return;
        }

        if (tier.actionType === "checkout") {
            setIsProcessing(tier.name);
            try {
                const response = await fetch("/api/checkout/corporate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tierName: tier.name,
                        price: tier.priceValue,
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || "Errore durante il checkout");
                }
            } catch (error) {
                console.error(error);
                alert("Si è verificato un errore durante l'inizializzazione del pagamento. Riprova o contattaci.");
            } finally {
                setIsProcessing(null);
            }
        }
    };

    return (
        <main ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
            
            {/* 1. CINEMATIC HERO: Emotional & Human Transformation */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/brand/bg-venue-crowd.webp"
                        alt="Human Connection"
                        fill
                        className="object-cover opacity-20 scale-105 contrast-110"
                        priority
                    />
                    
                    <div 
                        ref={spotlightRef}
                        className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(200, 169, 107, 0.08) 0%, transparent 70%)',
                            filter: 'blur(80px)'
                        }}
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-black-pure/90 via-transparent to-black-pure z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
                </div>

                <div className="relative z-30 container-max px-6 text-center">
                    <div className="space-y-12">
                        <div className="flex flex-col items-center gap-6">
                            <span className="reveal-corp inline-block px-4 py-1 border border-accent-gold/20 text-accent-gold text-[10px] font-bold uppercase tracking-[0.6em] bg-accent-gold/5 backdrop-blur-md">
                                Ingegneria delle Connessioni Umane
                            </span>
                            <h1 className="corp-title font-syne font-bold text-[clamp(3rem,10vw,12rem)] leading-[0.8] tracking-tighter uppercase text-text-primary flex flex-col">
                                <span className="block">Trasforma il tuo</span>
                                <span className="block text-accent-gold italic">Capitale Umano.</span>
                            </h1>
                        </div>

                        <div className="corp-sub max-w-2xl mx-auto">
                            <p className="font-inter text-lg md:text-2xl text-text-secondary font-light leading-relaxed uppercase tracking-[0.2em] opacity-60">
                                Oltre il team building. <br />
                                Progettiamo esperienze sociali che lasciano un segno indelebile.
                            </p>
                        </div>

                        <div className="pt-12">
                            <PrimaryButton href="#pricing-grid" size="lg" className="w-full sm:w-auto min-w-[320px]">
                                ELEVA L&apos;ESPERIENZA
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 hidden lg:block">
                    <div className="flex items-center gap-4 text-white/10">
                        <Heart size={20} className="opacity-20" />
                        <div className="text-left">
                            <div className="text-[10px] font-bold tracking-[0.4em] uppercase">Human-Centric Design</div>
                            <div className="text-[9px] tracking-[0.2em] uppercase opacity-50">Emotional Impact: 100%</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY: Social Dynamics */}
            <section className="reveal-corp section-padding-huge bg-black-pure border-y border-white/5">
                <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 items-center">
                    <div className="space-y-16">
                        <SectionHeading 
                          title="DINAMICHE"
                          highlight="SOCIALI"
                          subtitle="L'Evoluzione del Gruppo"
                        />
                        <div className="space-y-12 font-inter text-xl md:text-2xl text-text-secondary font-light leading-relaxed opacity-70">
                            <p>
                                Rompiamo le barriere gerarchiche attraverso l&apos;immersione narrativa. In un mondo digitale, la connessione reale è il vero lusso aziendale.
                            </p>
                            <p>
                                Non usiamo slide, usiamo emozioni. Non facciamo formazione, creiamo ricordi condivisi che alimentano la cultura del tuo brand.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                            <div className="space-y-4">
                                <span className="text-accent-gold font-syne text-4xl font-bold">DEEP</span>
                                <p className="text-[9px] text-text-secondary uppercase tracking-[0.4em] font-bold opacity-30">Emotional Link</p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-accent-gold font-syne text-4xl font-bold">SHARED</span>
                                <p className="text-[9px] text-text-secondary uppercase tracking-[0.4em] font-bold opacity-30">Universe</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square">
                        <PremiumCard className="h-full">
                            <Image 
                                src="/images/brand/service-plating.webp"
                                alt="Shared Moments"
                                fill
                                className="object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black-pure via-transparent to-transparent opacity-80" />
                        </PremiumCard>
                    </div>
                </div>
            </section>

            {/* 3. PROTOCOLS: Pricing Tiers */}
            <section id="pricing-grid" className="reveal-corp section-padding-huge bg-black-pure">
                <div className="container-max">
                    <div className="mb-32 text-center">
                        <SectionHeading 
                          title="PROTOCOLLI"
                          highlight="DI TRASFORMAZIONE"
                          subtitle="Seleziona l'Intensità"
                          align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`group relative flex flex-col p-12 border transition-all duration-700 ${ tier.highlighted
                                        ? "border-accent-gold bg-accent-gold/3 shadow-[0_40px_100px_rgba(200,164,78,0.05)]"
                                        : "border-white/5 bg-white/1"
                                }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-black-pure font-syne font-bold uppercase text-[9px] tracking-[0.4em] px-6 py-2 z-10">
                                        Premium Protocol
                                    </div>
                                )}
                                <div className="space-y-2 mb-12">
                                    <h3 className="font-syne font-bold uppercase tracking-tighter text-text-primary text-3xl">{tier.name}</h3>
                                    <p className="font-inter text-text-secondary/40 text-[10px] uppercase tracking-[0.3em]">{tier.size}</p>
                                </div>
                                <div className={`font-syne font-bold text-4xl mb-12 ${tier.highlighted ? "text-accent-gold" : "text-text-primary"}`}>
                                    {tier.price}
                                </div>
                                <ul className="flex flex-col gap-6 grow mb-12">
                                    {tier.includes.map(item => (
                                        <li key={item} className="flex items-start gap-4 font-inter text-sm text-text-secondary/60">
                                            <ShieldCheck size={16} className="text-accent-gold shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-4 font-inter text-sm text-accent-gold font-bold">
                                        <UserPlus size={16} className="shrink-0 mt-0.5" />
                                        Social Interaction App
                                    </li>
                                </ul>
                                <button
                                    disabled={isProcessing === tier.name}
                                    onClick={() => handleAction(tier)}
                                    className={`w-full py-6 font-syne font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 ${ tier.highlighted
                                            ? "bg-accent-gold text-black-pure hover:bg-white"
                                            : "border border-white/10 text-text-primary hover:border-accent-gold hover:text-accent-gold"
                                    }`}
                                >
                                    {isProcessing === tier.name ? (
                                        <Loader2 size={18} className="animate-spin mx-auto" />
                                    ) : (
                                        tier.ctaText
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. IMMERSIVE SECTIONS: Human Connection Focus */}
            <section className="reveal-corp section-padding-huge bg-black-pure border-y border-white/5">
                <div className="container-max space-y-48 lg:space-y-64">
                    <StickyTextSection
                        className="flex-col-reverse md:flex-row gap-24 items-center"
                        content={ <div className="space-y-8">
                                <span className="text-accent-gold font-bold text-[10px] uppercase tracking-[0.6em]">01 // Social Impact</span>
                                <h3 className="font-syne font-bold leading-[0.85] tracking-tighter uppercase text-text-primary text-5xl md:text-[6vw]">
                                    Connessione <br /> <span className="text-accent-gold italic">Umana.</span>
                                </h3>
                                <p className="text-text-secondary/60 font-inter text-lg md:text-xl leading-relaxed mt-12 max-w-xl">
                                    Abbattiamo i silos aziendali attraverso il gioco. Quando le persone ridono, competono e collaborano, il team smette di essere un organigramma e diventa una comunità.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.webp"
                            alt="Human Connection"
                            aspectRatio="landscape"
                            speed={0.1}
                        />
                    </StickyTextSection>

                    <StickyTextSection
                        className="flex-col-reverse md:flex-row-reverse gap-24 items-center"
                        content={ <div className="space-y-8 md:text-right flex flex-col md:items-end">
                                <span className="text-accent-gold font-bold text-[10px] uppercase tracking-[0.6em]">02 // Shared Legacy</span>
                                <h3 className="font-syne font-bold leading-[0.85] tracking-tighter uppercase text-text-primary text-5xl md:text-[6vw]">
                                    Ricordi <br /> <span className="text-accent-gold italic">Condivisi.</span>
                                </h3>
                                <p className="text-text-secondary/60 font-inter text-lg md:text-xl leading-relaxed mt-12 max-w-xl">
                                    L&apos;impatto di un evento si misura in ciò che resta il giorno dopo in ufficio. Creiamo storie che verranno raccontate per anni, rafforzando l&apos;identità del tuo gruppo.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-venue-crowd.webp"
                            alt="Shared Legacy"
                            aspectRatio="landscape"
                            speed={0.1}
                        />
                    </StickyTextSection>
                </div>
            </section>

            {/* 5. CONTACT FORM SECTION */}
            <section id="corporate-form-container" className="reveal-corp section-padding-huge bg-black-pure relative">
                <div className="container-max">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-center">
                        <div className="space-y-16">
                            <div className="space-y-8">
                                <span className="text-accent-gold font-bold text-[10px] uppercase tracking-[0.8em]">Bespoke Experience</span>
                                <h2 className="font-syne font-bold leading-[0.85] tracking-tighter uppercase text-text-primary text-5xl md:text-[5vw]">
                                    Crea la tua <br /><span className="text-accent-gold italic">Trasformazione.</span>
                                </h2>
                                <p className="text-text-secondary/60 font-inter text-xl leading-relaxed max-w-lg">
                                    Ogni team è unico. Raccontaci le vostre sfide sociali. Noi progettiamo l&apos;esperienza per superarle.
                                </p>
                            </div>
                            
                            <div className="pt-16 border-t border-white/5 space-y-6">
                                <p className="font-syne text-[10px] uppercase tracking-[0.4em] text-text-secondary opacity-30">Contatto Strategico:</p>
                                <a 
                                    href={buildWAUrl(WA_MESSAGES.corporate)}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 text-accent-gold hover:text-text-primary transition-all font-syne text-xs font-bold uppercase tracking-[0.6em]"
                                >
                                    WHATSAPP CREATIVO
                                    <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                                </a>
                            </div>
                        </div>

                        <div className="reveal-corp bg-white/2 p-12 lg:p-16 border border-white/5 backdrop-blur-3xl shadow-2xl">
                            <CorporateForm />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
