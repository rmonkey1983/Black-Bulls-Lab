"use client";

import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Sparkles, Target, Heart, Star, ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateQuote, animateSteps, animateFade } from "@/lib/gsapAnimations";

const timeline = [
    { year: "2024", title: "L'Ideazione", desc: "Nasce l'idea di Black Bulls Lab. Volevamo garantire al nostro pubblico torinese serate uniche dove l'alta cucina incontra lo spettacolo dal vivo, offrendoti un'esperienza mai vista prima." },
    { year: "2025", title: "Il Primo Format", desc: "Dal concept alla realtà. I nostri primi dinner show immersivi diventano il nuovo punto di riferimento per chi cerca emozioni vibranti e intrattenimento di livello." },
    { year: "Oggi", title: "Oltre l'Evento", desc: "Progettiamo produzioni originali e soluzioni su misura sempre più ambiziose. Il nostro focus rimane uno solo: farti vivere ricordi indimenticabili." },
];

export default function AboutPage() {
    useGSAP(() => {
        animateQuote("#vision-section");
        animateSteps("#timeline-steps");
        animateFade("#values-grid", "up", 0.1);
    });

    return (
        <div className="min-h-screen  pb-24 relative">
            <ImmersiveHeader
                id="about-hero"
                title="CHI"
                highlight="Siamo"
                subtitle="Un team di professionisti dove energia, cultura teatrale e competenza si fondono per dare vita a format straordinari."
                mediaUrl=""
            />

            <div className="relative z-10 space-y-16 md:space-y-24 mt-[-4vh]">

                {/* Vision Section - Sticky */}
                <section className="px-6 max-w-7xl mx-auto">
                    <StickyTextSection
                        content={
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-rama-accent/40" />
                                    <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">La Visione</span>
                                </div>
                                <div id="vision-section" className="gsap-quote">
                                    <h2 className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-7xl mt-2">
                                        <div className="reveal-block"><span className="inner text-white">Oltre l&apos;</span></div>
                                        <div className="reveal-block"><span className="inner text-rama-accent">evento.</span></div>
                                        <div className="reveal-block"><span className="inner text-white">Oltre l&apos;</span></div>
                                        <div className="reveal-block"><span className="inner text-rama-accent">immaginazione.</span></div>
                                    </h2>
                                </div>
                                <p className="gsap-fade text-base md:text-lg text-rama-muted font-outfit font-light leading-relaxed mt-4">
                                    Black Bulls Lab è molto più di un&apos;agenzia. Siamo architetti dell&apos;intrattenimento. 
                                    Progettiamo dinner show e spettacoli dove l&apos;ospite è al centro della scena, 
                                    curando maniacalmente sia la direzione creativa che l&apos;eccellenza esecutiva.
                                </p>
                                <div className="pt-4">
                                    <PremiumButton href="/events" variant="gold" size="lg">
                                        <span className="font-mohave tracking-widest uppercase text-base">Scopri i format</span>
                                        <ArrowRight size={18} className="ml-2" />
                                    </PremiumButton>
                                </div>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <ParallaxImage
                                src="/images/brand/team-art-director.png"
                                alt="Il Nostro Art Director"
                                aspectRatio="portrait"
                                speed={0.2}
                                priority
                            />
                            <div className="pt-12">
                                <ParallaxImage
                                    src="/images/brand/team-chef.png"
                                    alt="Il Nostro Chef"
                                    aspectRatio="portrait"
                                    speed={0.4}
                                />
                            </div>
                        </div>
                    </StickyTextSection>
                </section>


                {/* Full Width Break - The Difference */}
                <section className="relative py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <ParallaxImage
                            src="/images/brand/bg-venue-crowd.png"
                            alt="Crowd & Lights"
                            className="!w-full !h-full !rounded-none !aspect-auto"
                            speed={0.5}
                        />
                        <div className="absolute inset-0 bg-rama-bg/80 backdrop-blur-sm" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                        <h3 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white text-[12vw] md:text-[10vw] mb-12">
                            La <span className="text-rama-accent">Differenza</span>
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 mx-auto rounded-full border border-rama-accent/30 flex items-center justify-center text-rama-accent">
                                    <Target size={20} />
                                </div>
                                <p className="text-rama-muted font-outfit">Non offriamo un servizio ordinario <br /> <span className="text-rama-accent font-semibold">progettiamo emozioni indimenticabili</span></p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 mx-auto rounded-full border border-rama-accent/30 flex items-center justify-center text-rama-accent">
                                    <Sparkles size={20} />
                                </div>
                                <p className="text-rama-muted font-outfit">Non proponiamo format pre-confezionati <br /> <span className="text-rama-accent font-semibold">creiamo soluzioni su misura</span></p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 mx-auto rounded-full border border-rama-accent/30 flex items-center justify-center text-rama-accent">
                                    <Heart size={20} />
                                </div>
                                <p className="text-rama-muted font-outfit">Non organizziamo semplici date <br /> <span className="text-rama-accent font-semibold">costruiamo ricordi preziosi</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Scroll */}
                <section className="px-6 max-w-7xl mx-auto">
                    <StickyTextSection
                        className="md:flex-row-reverse"
                        content={
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-rama-accent/40" />
                                    <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">I Nostri Valori</span>
                                </div>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-7xl mt-6">
                                    <span className="text-white">Dettagli che fanno</span>
                                    <span className="text-rama-accent">la differenza.</span>
                                </h2>
                                
                                {/* Contrast wrapper for readability */}
                                <div id="values-grid" className="bg-black/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl mt-8">
                                    <p className="gsap-fade text-base md:text-lg text-white/90 font-outfit font-light leading-relaxed">
                                        Esperienza, passione e dedizione assoluta. Questi sono i pilastri con cui affrontiamo 
                                        ogni singola produzione. Il nostro team è programmato per trovare sempre la soluzione ideale 
                                        e superare le aspettative del tuo pubblico, in ogni situazione.
                                    </p>
                                    <ul className="space-y-4 pt-6 font-outfit">
                                        <li className="gsap-fade flex items-center gap-4">
                                            <Star className="text-rama-accent" size={20} />
                                            <span className="text-white font-medium tracking-wide">Creatività senza limiti</span>
                                        </li>
                                        <li className="gsap-fade flex items-center gap-4">
                                            <Target className="text-rama-accent" size={20} />
                                            <span className="text-white font-medium tracking-wide">Precisione maniacale</span>
                                        </li>
                                        <li className="gsap-fade flex items-center gap-4">
                                            <Heart className="text-rama-accent" size={20} />
                                            <span className="text-white font-medium tracking-wide">Emozione al centro</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-6">
                                    <PremiumButton href="/events" variant="outline" size="lg">
                                        <span className="font-mohave tracking-widest uppercase text-base text-white">Esplora gli Eventi</span>
                                        <ArrowRight size={18} className="ml-2 text-white" />
                                    </PremiumButton>
                                </div>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/service-plating.png"
                            alt="Alta Gastronomia"
                            aspectRatio="portrait"
                            speed={0.3}
                        />
                    </StickyTextSection>
                </section>


                {/* Timeline */}
                <section className="max-w-5xl mx-auto px-6 pt-16 pb-32">
                    <div className="gsap-fade text-center mb-20 flex flex-col items-center">
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-2xl md:text-3xl block">La Nostra Visione</span>
                        <h2 className="font-mohave text-4xl md:text-6xl font-bold text-white uppercase mt-4">La Timeline</h2>
                        <div className="h-[2px] w-24 bg-rama-accent/40 mt-6" />
                    </div>

                    <div className="relative">
                        {/* Center Line for Desktop, Left Line for Mobile */}
                        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[1px] bg-rama-accent/15 md:-translate-x-1/2" />
                        
                        <div id="timeline-steps" className="space-y-16 md:space-y-24">
                            {timeline.map((item, i) => (
                                <div
                                    key={i}
                                    className={`gsap-step relative flex flex-col md:flex-row items-start md:items-center w-full ${
                                        i % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Timeline point */}
                                    <div className="absolute left-[11px] md:left-1/2 top-2 md:top-1/2 w-4 h-4 border border-rama-accent/60 rotate-45 bg-bg-dark md:-translate-y-1/2 z-10 transition-colors duration-500 group-hover:bg-rama-accent" style={{ transform: "translateX(-50%) rotate(45deg)" }} />

                                    {/* Content Container */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                        <span className="text-sm md:text-base text-rama-accent tracking-widest uppercase font-mohave">{item.year}</span>
                                        <h3 className="font-mohave text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mt-2">{item.title}</h3>
                                        <p className={`text-rama-muted font-outfit text-base md:text-lg mt-4 leading-relaxed max-w-md ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
