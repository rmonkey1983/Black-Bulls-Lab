"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Send, Mail, MapPin, Instagram } from "lucide-react";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen  pb-24">
            <ImmersiveHeader
                title="CONTATTACI"
                highlight=""
                subtitle="Hai una domanda? Vuoi prenotare un'esperienza? Scrivici, ci pensiamo noi."
                mediaUrl="/images/brand/bg-hero-wide.png"
            />

            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-border bg-bg-card/50 relative"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-rama-accent/15" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-rama-accent/15" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-rama-accent/15" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-rama-accent/15" />

                    {sent ? (
                        <div className="p-12 text-center py-24">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 border border-rama-accent/30 mx-auto flex items-center justify-center mb-6"
                            >
                                <Send size={24} className="text-rama-accent" />
                            </motion.div>
                            <h3 className="font-mohave text-3xl md:text-5xl font-bold text-white uppercase mb-4">Messaggio<br /><span className="text-rama-accent">Inviato</span></h3>
                            <p className="text-rama-muted font-outfit text-lg">
                                Ti risponderemo al più presto. Grazie per averci contattato!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                            {/* Name */}
                            <div className="relative border-b border-white/20 focus-within:border-rama-accent transition-colors duration-500">
                                <label
                                    htmlFor="name"
                                    className="font-outfit text-xs text-rama-accent/60 tracking-widest uppercase block mb-1"
                                >
                                    Nome e Cognome
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    placeholder="Il tuo nome..."
                                    className="w-full bg-transparent border-none px-0 py-3 text-white text-lg font-outfit
                                        placeholder:text-gray-600 focus:outline-none focus:ring-0"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative border-b border-white/20 focus-within:border-rama-accent transition-colors duration-500">
                                <label
                                    htmlFor="email"
                                    className="font-outfit text-xs text-rama-accent/60 tracking-widest uppercase block mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="la-tua@email.com"
                                    className="w-full bg-transparent border-none px-0 py-3 text-white text-lg font-outfit
                                        placeholder:text-gray-600 focus:outline-none focus:ring-0"
                                />
                            </div>

                            {/* Subject */}
                            <div className="relative border-b border-white/20 focus-within:border-rama-accent transition-colors duration-500">
                                <label
                                    htmlFor="subject"
                                    className="font-outfit text-xs text-rama-accent/60 tracking-widest uppercase block mb-1"
                                >
                                    Motivo
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full bg-transparent border-none px-0 py-3 text-white text-lg font-outfit
                                        focus:outline-none focus:ring-0 appearance-none rounded-none"
                                >
                                    <option value="" className="bg-bg-dark">Seleziona un motivo...</option>
                                    <option value="event" className="bg-bg-dark">Informazioni Eventi</option>
                                    <option value="booking" className="bg-bg-dark">Prenotazione</option>
                                    <option value="corporate" className="bg-bg-dark">Collaborazione Corporate</option>
                                    <option value="talent" className="bg-bg-dark">Candidatura Artista</option>
                                    <option value="other" className="bg-bg-dark">Altro</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="relative border-b border-white/20 focus-within:border-rama-accent transition-colors duration-500">
                                <label
                                    htmlFor="message"
                                    className="font-outfit text-xs text-rama-accent/60 tracking-widest uppercase block mb-1"
                                >
                                    Il Tuo Messaggio
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Raccontaci come possiamo aiutarti..."
                                    className="w-full bg-transparent border-none px-0 py-3 text-white text-lg font-outfit
                                        placeholder:text-gray-600 resize-none focus:outline-none focus:ring-0"
                                />
                            </div>

                            <div className="pt-4">
                                <PremiumButton type="submit" variant="gold" size="lg" className="w-full">
                                    <Send size={14} /> Invia Messaggio
                                </PremiumButton>
                            </div>
                        </form>
                    )}
                </motion.div>

                <div className="pt-24">
                    <StickyTextSection
                        content={
                            <div className="space-y-6">
                                <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                                    <MapPin size={14} className="inline mr-2" /> La Location
                                </span>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Dove Scocca</span>
                                    <span className="text-rama-accent">la Scintilla.</span>
                                </h2>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mb-8 mt-6">
                                    Nel cuore post-industriale di Torino. Uno spazio dove l'architettura
                                    urbana incontra l'eleganza del design contemporaneo.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { label: "Indirizzo", value: "Torino, Italia", icon: MapPin },
                                        { label: "Email", value: "info@blackbullslab.it", icon: Mail },
                                        { label: "Social", value: "@blackbullslab", icon: Instagram },
                                    ].map((info) => (
                                        <div key={info.label} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-sm hover:border-rama-accent/40 transition-colors">
                                            <info.icon className="text-rama-accent" size={20} />
                                            <div>
                                                <span className="block font-outfit text-xs text-rama-muted tracking-widest uppercase mb-1">{info.label}</span>
                                                <span className="text-white font-medium">{info.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-venue-crowd.png"
                            alt="Location Interior"
                            aspectRatio="portrait"
                            speed={0.2}
                            priority
                        />
                    </StickyTextSection>
                </div>
            </div>
        </div>
    );
}
