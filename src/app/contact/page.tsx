"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Send, Mail, MapPin, Instagram, Sparkles, ChevronDown } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact } from "@/app/actions/contact";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [msg, setMsg] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    
    // Fallback environment var check, will only render Turnstile if public key is available
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setMsg("");
        
        const formData = new FormData(e.currentTarget);
        if (turnstileToken) formData.append("cf-turnstile-response", turnstileToken);

        try {
            const res = await submitContact(formData);
            if (res?.error) {
                setStatus("error");
                setMsg(res.error);
            } else {
                setStatus("success");
                setSent(true);
            }
        } catch (error) {
            setStatus("error");
            setMsg("Errore di rete improvviso. Ritenta più tardi.");
        }
    };

    return (
        <div className="min-h-screen pb-24">
            <ImmersiveHeader
                title="CONTATTACI"
                highlight=""
                subtitle=""
                mediaUrl=""
            />

            <div className="max-w-7xl mx-auto px-6 py-12 lg:-mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                
                {/* Left Column: Text & Image */}
                <div className="space-y-12">
                    <div>
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block mb-4">
                            <Sparkles size={14} className="inline mr-2" /> L'Agenzia
                        </span>
                        <h2 className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-5xl md:text-7xl">
                            <span className="text-white">Dove Nascono</span>
                            <span className="text-rama-accent">le Emozioni.</span>
                        </h2>
                        <p className="text-rama-muted font-outfit text-base md:text-lg leading-relaxed mt-6">
                            Hai un'idea per un evento unico? Cerchi un dinner show esclusivo o una consulenza creativa? 
                            Il nostro quartier generale creativo è un hub dove l'immaginazione prende forma 
                            e diventa spettacolo. Contattaci, il nostro team troverà la soluzione perfetta per te.
                        </p>
                    </div>

                    <div className="w-full aspect-[16/9] md:aspect-[4/3] rounded-lg overflow-hidden relative group">
                        <img 
                            src="/images/brand/bg-venue-crowd.png" 
                            alt="Location Interior" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div className="grid sm:grid-cols-1 gap-4">
                        {[
                            { label: "Indirizzo", value: "Torino, Italia", icon: MapPin },
                            { label: "Email", value: "info@blackbullslab.it", icon: Mail },
                            { label: "Social", value: "@blackbullslab", icon: Instagram },
                        ].map((info) => (
                            <div key={info.label} className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-md hover:border-rama-accent/40 transition-colors">
                                <info.icon className="text-rama-accent" size={20} />
                                <div>
                                    <span className="block font-outfit text-xs text-rama-muted tracking-widest uppercase mb-1">{info.label}</span>
                                    <span className="text-white font-medium">{info.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-xl relative rounded-xl shadow-2xl"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-rama-accent" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-rama-accent" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-rama-accent" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-rama-accent" />

                    {sent ? (
                        <div className="p-12 text-center py-32">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 rounded-full bg-rama-accent/10 border border-rama-accent/30 mx-auto flex items-center justify-center mb-6"
                            >
                                <Send size={24} className="text-rama-accent" />
                            </motion.div>
                            <h3 className="font-mohave text-3xl md:text-4xl font-bold text-white uppercase mb-4">Richiesta<br /><span className="text-rama-accent">Inviata</span></h3>
                            <p className="text-rama-muted font-outfit text-base">
                                Il nostro team analizzerà la tua richiesta e ti risponderà entro 24/48 ore. Grazie!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                            
                            {/* Form Messages */}
                            {msg && status === "error" && (
                                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-md text-red-400 text-sm font-outfit mb-4">
                                    {msg}
                                </div>
                            )}

                            {/* Honeypot for Anti-Spam */}
                            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                            {/* Name */}
                            <div className="relative border-b-2 border-white/15 focus-within:border-rama-accent focus-within:bg-white/5 transition-all duration-300 p-2 rounded-t-md">
                                <label
                                    htmlFor="name"
                                    className="font-outfit text-[10px] md:text-xs text-rama-accent/80 tracking-widest uppercase block mb-1 font-medium"
                                >
                                    Nome e Cognome
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    placeholder="Es. Mario Rossi"
                                    className="w-full bg-transparent border-none px-0 py-2 text-white text-base md:text-lg font-outfit
                                        placeholder:text-white/40 focus:outline-none focus:ring-0"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative border-b-2 border-white/15 focus-within:border-rama-accent focus-within:bg-white/5 transition-all duration-300 p-2 rounded-t-md">
                                <label
                                    htmlFor="email"
                                    className="font-outfit text-[10px] md:text-xs text-rama-accent/80 tracking-widest uppercase block mb-1 font-medium"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="la.tua@email.com"
                                    className="w-full bg-transparent border-none px-0 py-2 text-white text-base md:text-lg font-outfit
                                        placeholder:text-white/40 focus:outline-none focus:ring-0"
                                />
                            </div>

                            {/* Subject */}
                            <div className="relative border-b-2 border-white/15 focus-within:border-rama-accent focus-within:bg-white/5 transition-all duration-300 p-2 rounded-t-md">
                                <label
                                    htmlFor="subject"
                                    className="font-outfit text-[10px] md:text-xs text-rama-accent/80 tracking-widest uppercase block mb-1 font-medium"
                                >
                                    Motivo della Richiesta
                                </label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full bg-transparent border-none px-0 py-2 text-white text-base md:text-lg font-outfit
                                            focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0c0c0c] text-white/50">Seleziona un motivo...</option>
                                        <option value="event" className="bg-[#0c0c0c]">Informazioni Eventi</option>
                                        <option value="booking" className="bg-[#0c0c0c]">Prenotazione Dinner Show</option>
                                        <option value="corporate" className="bg-[#0c0c0c]">Collaborazione Corporate / B2B</option>
                                        <option value="talent" className="bg-[#0c0c0c]">Candidatura Artista / Performer</option>
                                        <option value="other" className="bg-[#0c0c0c]">Altro</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="relative border-b-2 border-white/15 focus-within:border-rama-accent focus-within:bg-white/5 transition-all duration-300 p-2 rounded-t-md">
                                <label
                                    htmlFor="message"
                                    className="font-outfit text-[10px] md:text-xs text-rama-accent/80 tracking-widest uppercase block mb-1 font-medium"
                                >
                                    Il Tuo Messaggio
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    minLength={10}
                                    rows={5}
                                    placeholder="Raccontaci dettagliatamente la tua idea o come possiamo aiutarti..."
                                    className="w-full bg-transparent border-none px-0 py-2 text-white text-base md:text-lg font-outfit
                                        placeholder:text-white/40 resize-none focus:outline-none focus:ring-0"
                                />
                            </div>

                            {/* Turnstile optional rendering */}
                            {siteKey && (
                                <div className="pt-2 flex justify-center">
                                    <Turnstile 
                                        siteKey={siteKey} 
                                        onSuccess={(token) => setTurnstileToken(token)}
                                        options={{ theme: 'dark' }}
                                    />
                                </div>
                            )}

                            <div className="pt-6">
                                <PremiumButton type="submit" variant="gold" size="lg" className={`w-full ${status === 'loading' ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <span className="font-mohave tracking-widest uppercase text-lg">
                                        {status === "loading" ? "Invio in corso..." : "Parla con il Nostro Team"}
                                    </span>
                                </PremiumButton>
                                <p className="text-xs text-center text-white/40 font-outfit mt-4 flex items-center justify-center gap-2">
                                    <Sparkles size={12} className="text-rama-accent" /> Ti risponderemo entro 24/48 ore.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
