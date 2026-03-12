"use client";

import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ParallaxDemoPage() {
    return (
        <div className="min-h-screen  text-rama-text pb-32">
            <div className="fixed top-24 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-rama-accent/60 hover:text-rama-accent transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>

            {/* Hero Section */}
            <section className="h-[70vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/10 to-bg-dark z-10" />
                <ParallaxImage
                    src="/images/brand/bg-hero-wide.png"
                    alt="Atmosphere"
                    className="absolute inset-0 !w-full !h-full !rounded-none !aspect-auto"
                    speed={0.3}
                    priority
                />
                <div className="relative z-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter"
                    >
                        PARALLAX
                        <br />
                        <span className="text-rama-accent font-mohave uppercase">Vision</span>
                    </motion.h1>
                </div>
            </section>

            {/* Intro Text */}
            <section className="py-24 px-6 max-w-4xl mx-auto text-center">
                <p className="text-2xl md:text-4xl leading-tight font-light text-gray-200">
                    "Un'esperienza visiva dove la profondità incontra il movimento.
                    Ogni scorrimento rivela <span className="text-rama-accent italic font-serif-display">nuove prospettive</span>."
                </p>
            </section>

            {/* Sticky Section 1 */}
            <section className="px-6 max-w-7xl mx-auto">
                <StickyTextSection
                    content={
                        <div className="space-y-6">
                            <span className="text-rama-accent text-xs tracking-[0.3em] uppercase block">The Concept</span>
                            <h2 className="text-5xl font-bold">Immersive Dining</h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Non ci limitiamo a servire cibo. Creiamo atmosfere.
                                Il design e l'illuminazione giocano un ruolo fondamentale
                                nel trasformare una cena in un evento.
                            </p>
                        </div>
                    }
                >
                    <ParallaxImage
                        src="/images/brand/bg-stage-lights.png"
                        alt="Dining Details"
                        aspectRatio="portrait"
                        speed={0.2}
                    />
                    <ParallaxImage
                        src="/images/brand/service-plating.png"
                        alt="Chef Plating"
                        aspectRatio="landscape"
                        speed={0.4}
                    />
                    <ParallaxImage
                        src="/images/brand/service-mixology.png"
                        alt="Cocktail Bar"
                        aspectRatio="square"
                        speed={0.2}
                    />
                </StickyTextSection>
            </section>

            {/* Full Width Break */}
            <section className="py-32">
                <div className="h-[60vh] relative w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                        <h3 className="text-6xl font-mohave uppercase text-rama-text z-20">Taste the Moment</h3>
                    </div>
                    <ParallaxImage
                        src="/images/brand/bg-venue-crowd.png"
                        alt="Atmospheric Dinner"
                        className="!w-full !h-full !rounded-none !aspect-auto"
                        speed={0.4}
                    />
                </div>
            </section>

            {/* Sticky Section 2 - Reversed Logic Simulation (Text Right, Image Left) - Implementation is tricky with just component reuse, 
           so utilizing the same component but maybe swapping order in a real scenario. 
           Here we just use another standard section. */}
            <section className="px-6 max-w-7xl mx-auto pb-24">
                <StickyTextSection
                    className="flex-row-reverse" // Tailwind grid/flex reversal if supported by component, but component uses specific classes.
                    content={
                        <div className="space-y-6">
                            <span className="text-rama-accent text-xs tracking-[0.3em] uppercase block">Performance</span>
                            <h2 className="text-5xl font-bold">Live Art</h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Musicisti, acrobati e performer internazionali.
                                Ogni sera uno spettacolo diverso accompagna la tua cena.
                            </p>
                        </div>
                    }
                >
                    <ParallaxImage
                        src="/images/brand/vibe-live-jazz.png"
                        alt="Live Music"
                        aspectRatio="square"
                        speed={0.3}
                    />
                    <ParallaxImage
                        src="/images/brand/service-performance.png"
                        alt="Performer"
                        aspectRatio="portrait"
                        speed={0.5}
                    />
                </StickyTextSection>
            </section>

        </div>
    );
}
