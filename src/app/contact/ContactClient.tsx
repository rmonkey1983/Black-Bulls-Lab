"use client";

import Image from "next/image";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Mail, MapPin, Instagram, Sparkles, Phone } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/lib/constants";
import { BookingForm } from "@/components/ui/BookingForm";

export function ContactClient() {
    useGSAP(() => {
        animateFade("#contact-info", "up", 0.1);
        animateFade("#contact-form-container", "up", 0.05);
    });

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
                
                <div id="contact-info" className="space-y-10 md:space-y-12">
                    <div className="gsap-fade">
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block mb-4">
                            <Sparkles size={14} className="inline mr-2" /> L&apos;Agenzia
                        </span>
                        <h2 className="font-heading font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-4xl md:text-7xl">
                            <span className="text-white">Il tuo evento</span>
                            <span className="text-rama-accent">inizia da qui.</span>
                        </h2>
                        <p className="text-rama-muted font-sans text-base md:text-lg leading-relaxed mt-6">
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
                                            <span className="block font-sans text-[10px] text-rama-muted tracking-widest uppercase mb-0.5">{info.label}</span>
                                            <span className="text-white font-medium text-base md:text-lg">{info.value}</span>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 p-5 border border-white/5 bg-white/5 rounded-xl transition-all">
                                        <div className="w-10 h-10 rounded-full bg-rama-accent/10 flex items-center justify-center text-rama-accent">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <span className="block font-sans text-[10px] text-rama-muted tracking-widest uppercase mb-0.5">{info.label}</span>
                                            <span className="text-white font-medium text-base md:text-lg">{info.value}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        <div className="gsap-fade pt-2">
                            <a 
                                href={`https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-heading font-bold uppercase tracking-widest p-5 rounded-xl hover:bg-[#20ba5a] transition-colors shadow-lg shadow-green-500/10"
                            >
                                <Phone size={20} />
                                Scrivici su WhatsApp — rispondiamo subito
                            </a>
                        </div>
                    </div>

                    <div className="gsap-fade w-full aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden relative group hidden md:block">
                        <Image
                            src="/images/brand/bg-venue-crowd.webp"
                            alt="Atmosfera Black Bulls Lab"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>

                <div
                    id="contact-form-container"
                    className="md:col-span-1"
                >
                    <BookingForm />
                </div>
            </div>
        </div>
    );
}
