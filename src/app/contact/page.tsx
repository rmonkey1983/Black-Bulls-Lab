"use client";

import { useState } from "react";
import Image from "next/image";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Send, Mail, MapPin, Instagram, Sparkles, ChevronDown, Phone } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact } from "@/app/actions/contact";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/constants";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [msg, setMsg] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");

    useGSAP(() => {
        animateFade("#contact-info", "up", 0.1);
        animateFade("#contact-form-container", "up", 0.05);
    });
    
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
        } catch {
            setStatus("error");
            setMsg("Errore di rete improvviso. Ritenta più tardi.");
        }
    };

    return (
        <div className="min-h-screen pb-24">
            <ImmersiveHeader
                id="contact-hero"
                title="CONTATTACI"
                highlight=""
                subtitle=""
                mediaUrl=""
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:-mt-24 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                
                {/* Info Column (Top on mobile) */}
                <div id="contact-info" className="space-y-10 md:space-y-12">
                    <div className="gsap-fade">
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block mb-4">
                            <Sparkles size={14} className="inline mr-2" /> L&apos;Agenzia
                        </span>
                        <h2 className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-4xl md:text-7xl">
                            <span className="text-white">Il tuo evento</span>
                            <span className="text-rama-accent">inizia da qui.</span>
                        </h2>
                        <p className="text-rama-muted font-outfit text-base md:text-lg leading-relaxed mt-6">
                            Scrivici. Rispondiamo entro un'ora. Il tuo tavolo è già pronto — manca solo la data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: "Email", value: CONTACT_EMAIL, icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
                            { label: "Telefono", value: CONTACT_PHONE, icon: Phone, href: `tel:${CONTACT_PHONE.replace(/\s+/g, '')}` },
                            { label: "Social", value: "@blackbullslab", icon: Instagram, href: SOCIAL_LINKS.instagram },
                            { label: "Indirizzo", value: "Torino, Italia", icon: MapPin },
                        ].map((info) => (
                            <div key={info.label} className="gsap-fade">
                                {info.href ? (
                                    <a 
                                        href={info.href} 
                                        target={info.href.startsWith('http') ? "_blank" : undefined}
                                        rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 p-5 border border-white/5 bg-white/5 rounded-xl hover:border-rama-accent/40 hover:bg-white/[0.08] transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent group-hover:bg-rama-accent group-hover:text-black transition-colors">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <span className="block font-outfit text-[10px] text-rama-muted tracking-widest uppercase mb-0.5">{info.label}</span>
                                            <span className="text-white font-medium text-base md:text-lg">{info.value}</span>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 p-5 border border-white/5 bg-white/5 rounded-xl transition-all">
                                        <div className="w-10 h-10 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <span className="block font-outfit text-[10px] text-rama-muted tracking-widest uppercase mb-0.5">{info.label}</span>
                                            <span className="text-white font-medium text-base md:text-lg">{info.value}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* WhatsApp Specific Button for Mobile */}
                        <div className="gsap-fade pt-2">
                            <a 
                                href={`https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-mohave font-bold uppercase tracking-widest p-5 rounded-xl hover:bg-[#20ba5a] transition-colors shadow-lg shadow-green-500/10"
                            >
                                <Phone size={20} />
                                Scrivici su WhatsApp — rispondiamo subito
                            </a>
                        </div>
                    </div>

                    <div className="gsap-fade w-full aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden relative group hidden md:block">
                        <Image
                            src="/images/brand/bg-venue-crowd.png"
                            alt="Atmosfera Black Bulls Lab"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>

                {/* Form Column (Bottom on mobile) */}
                <div
                    id="contact-form-container"
                    className="border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-xl relative rounded-2xl shadow-2xl overflow-hidden"
                >
                    {sent ? (
                        <div className="p-10 md:p-20 text-center py-24 md:py-32">
                            <div className="w-20 h-20 rounded-full bg-rama-accent/10 border border-rama-accent/30 mx-auto flex items-center justify-center mb-8">
                                <Send size={32} className="text-rama-accent" />
                            </div>
                            <h3 className="font-mohave text-3xl md:text-4xl font-bold text-white uppercase mb-4">Messaggio<br /><span className="text-rama-accent">Inviato</span></h3>
                            <p className="text-rama-muted font-outfit text-base md:text-lg">
                                Ti risponderemo entro 24/48 ore. Grazie!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                            <div className="space-y-2">
                                <h3 className="font-mohave text-2xl md:text-3xl font-bold text-white uppercase">Siamo qui — <span className="text-rama-accent">scrivici</span></h3>
                                <p className="text-rama-muted font-outfit text-sm">Compila il modulo sotto e ti ricontatteremo.</p>
                            </div>

                            {msg && status === "error" && (
                                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-sm font-outfit">
                                    {msg}
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Name */}
                                <div className="gsap-fade space-y-2">
                                    <label htmlFor="name" className="block font-outfit text-xs text-rama-accent/80 tracking-widest uppercase font-bold">Nome e Cognome</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Il tuo nome"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-xl focus:border-rama-accent/50 focus:outline-none focus:ring-1 focus:ring-rama-accent/20 transition-all font-outfit"
                                    />
                                </div>

                                {/* Email */}
                                <div className="gsap-fade space-y-2">
                                    <label htmlFor="email" className="block font-outfit text-xs text-rama-accent/80 tracking-widest uppercase font-bold">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="la.tua@email.com"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-xl focus:border-rama-accent/50 focus:outline-none focus:ring-1 focus:ring-rama-accent/20 transition-all font-outfit"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="gsap-fade space-y-2">
                                    <label htmlFor="subject" className="block font-outfit text-xs text-rama-accent/80 tracking-widest uppercase font-bold">Motivo della Richiesta</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-xl focus:border-rama-accent/50 focus:outline-none cursor-pointer font-outfit appearance-none"
                                    >
                                        <option value="" className="bg-[#0c0c0c] text-white/50">Seleziona un motivo...</option>
                                        <option value="event" className="bg-[#0c0c0c]">Informazioni Eventi</option>
                                        <option value="booking" className="bg-[#0c0c0c]">Prenotazione Dinner Show</option>
                                        <option value="corporate" className="bg-[#0c0c0c]">Collaborazione Corporate</option>
                                        <option value="talent" className="bg-[#0c0c0c]">Candidatura Artista</option>
                                        <option value="other" className="bg-[#0c0c0c]">Altro</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="gsap-fade space-y-2">
                                    <label htmlFor="message" className="block font-outfit text-xs text-rama-accent/80 tracking-widest uppercase font-bold">Messaggio</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        minLength={10}
                                        rows={4}
                                        placeholder="Come possiamo aiutarti?"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-xl focus:border-rama-accent/50 focus:outline-none focus:ring-1 focus:ring-rama-accent/20 transition-all font-outfit min-h-[120px] resize-none"
                                    />
                                </div>
                            </div>

                            {siteKey && (
                                <div className="flex justify-center">
                                    <Turnstile siteKey={siteKey} onSuccess={setTurnstileToken} options={{ theme: 'dark' }} />
                                </div>
                            )}

                            <div className="gsap-fade pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest p-5 rounded-xl hover:bg-white transition-all transform active:scale-[0.98] shadow-xl shadow-rama-accent/10 ${status === 'loading' ? 'opacity-50' : ''}`}
                                >
                                    {status === "loading" ? "Invio in corso…" : "Invia Messaggio"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
