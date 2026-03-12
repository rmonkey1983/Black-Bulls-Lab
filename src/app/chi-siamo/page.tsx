"use client";

import { motion } from "framer-motion";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { Sparkles, Target, Heart, Star } from "lucide-react";

const timeline = [
    { year: "2026", title: "Fondazione", desc: "Black Bulls Lab nasce nel cuore di Torino, dove energia urbana e creatività si incontrano." },
    { year: "2026", title: "Prima Esperienza", desc: "Il Banchetto del Toro segna l'inizio di un nuovo modo di vivere la serata." },
    { year: "2026", title: "Espansione", desc: "Nuovi format, nuove collaborazioni, nuove emozioni entrano nel laboratorio." },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen  pb-24 relative">
            <ImmersiveHeader
                title="CHI"
                highlight="Siamo"
                subtitle="Un laboratorio urbano dove energia, cultura e spettacolo si fondono in esperienze immersive."
                mediaUrl=""
            />

            <div className="relative z-10 space-y-24 md:space-y-32">

                {/* Vision Section - Sticky */}
                <section className="px-6 max-w-7xl mx-auto">
                    <StickyTextSection
                        content={
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-rama-accent/40" />
                                    <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">La Visione</span>
                                </div>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[8vw] mt-6">
                                    <span className="text-white">Oltre il</span>
                                    <span className="text-rama-accent">ristorante.</span>
                                    <span className="text-white">Oltre lo</span>
                                    <span className="text-rama-accent">spettacolo.</span>
                                </h2>
                                <p className="text-lg md:text-xl text-rama-muted font-outfit font-light leading-relaxed mt-8">
                                    Black Bulls Lab è il laboratorio urbano dove cucina di qualità,
                                    intrattenimento live e socialità si fondono.
                                    Ogni serata è un racconto, ogni piatto un capitolo.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-hero-wide.png"
                            alt="Atmosphere"
                            aspectRatio="landscape"
                            speed={0.2}
                            priority
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <ParallaxImage
                                src="/images/brand/bg-hero-wide.png"
                                alt="Chef Detail"
                                aspectRatio="square"
                                speed={0.4}
                            />
                            <div className="pt-12">
                                <ParallaxImage
                                    src="/images/brand/bg-venue-crowd.png"
                                    alt="Cocktail"
                                    aspectRatio="square"
                                    speed={0.1}
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
                                <p className="text-rama-muted font-outfit">Non vendi una cena <br /> <span className="text-rama-accent font-semibold">vendi un&apos;esperienza</span></p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 mx-auto rounded-full border border-rama-accent/30 flex items-center justify-center text-rama-accent">
                                    <Sparkles size={20} />
                                </div>
                                <p className="text-rama-muted font-outfit">Non vendi uno show <br /> <span className="text-rama-accent font-semibold">vendi coinvolgimento</span></p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 mx-auto rounded-full border border-rama-accent/30 flex items-center justify-center text-rama-accent">
                                    <Heart size={20} />
                                </div>
                                <p className="text-rama-muted font-outfit">Non organizzi eventi <br /> <span className="text-rama-accent font-semibold">costruisci ricordi</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Scroll */}
                <section className="px-6 max-w-7xl mx-auto">
                    <StickyTextSection
                        className="md:flex-row-reverse"
                        content={
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-[1px] w-12 bg-rama-accent/40" />
                                    <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">I Nostri Valori</span>
                                </div>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[8vw] mt-6">
                                    <span className="text-white">Dettagli che fanno</span>
                                    <span className="text-rama-accent">la differenza.</span>
                                </h2>
                                <p className="text-lg text-rama-muted font-outfit font-light leading-relaxed mt-8">
                                    Dalla selezione delle materie prime alla regia delle luci.
                                    Nulla è lasciato al caso. La nostra ossessione per i dettagli
                                    è ciò che rende ogni evento Black Bulls Lab unico.
                                </p>
                                <ul className="space-y-4 pt-4 font-outfit">
                                    <li className="flex items-center gap-4">
                                        <Star className="text-rama-accent" size={20} />
                                        <span className="text-white">Creatività senza limiti</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Target className="text-rama-accent" size={20} />
                                        <span className="text-white">Precisione maniacale</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Heart className="text-rama-accent" size={20} />
                                        <span className="text-white">Emozione al centro</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.png"
                            alt="Restaurant Detail"
                            aspectRatio="portrait"
                            speed={0.3}
                        />
                    </StickyTextSection>
                </section>


                {/* Timeline */}
                <section className="max-w-4xl mx-auto px-6 pt-12 pb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-2xl block mb-6">La Nostra Storia</span>
                    </motion.div>

                    <div className="relative border-l border-rama-accent/15 ml-4 md:ml-[50%] md:translate-x-[-0.5px] space-y-16">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`relative pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}
                            >
                                {/* Timeline diamond */}
                                <div className={`absolute top-1.5 w-3 h-3 border border-rama-accent/60  rotate-45 
                                    ${i % 2 === 0 ? '-left-[6.5px] md:-left-[6.5px]' : '-left-[6.5px] md:-right-[6.5px] md:left-auto'}
                                `} />

                                <span className="text-xs text-rama-accent tracking-widest uppercase font-mohave">{item.year}</span>
                                <h3 className="font-mohave text-4xl md:text-5xl font-bold text-white uppercase mt-2">{item.title}</h3>
                                <p className="text-rama-muted font-outfit text-base md:text-lg mt-4 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
