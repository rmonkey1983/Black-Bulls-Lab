"use client";

import { useState, useRef } from "react";
import { Bell, ArrowRight, CheckCircle, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

export function NoEventsNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                once: true
            }
        });

        tl.from(containerRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "expo.out" })
          .from(".newsletter-icon", { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.4")
          .from(".newsletter-label", { opacity: 0, duration: 0.5 }, "-=0.3")
          .from(".newsletter-headline div", { y: "110%", duration: 0.6, stagger: 0.1, ease: "expo.out" }, "-=0.3")
          .from(".newsletter-body", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
          .from(".newsletter-feature", { opacity: 0, duration: 0.5, stagger: 0.05 }, "-=0.3")
          .from(".newsletter-form", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3");
    }, { scope: containerRef });

    useGSAP(() => {
        if (status === "success" && successRef.current) {
            gsap.fromTo(successRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, { dependencies: [status] });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        setErrorMsg("");

        try {
            const formPayload = new FormData(e.currentTarget);
            const honeypot = formPayload.get("b_contact_name") as string;
            
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim().toLowerCase(), b_contact_name: honeypot }),
            });

            if (res.ok) {
                setStatus("success");
            } else {
                const data = await res.json().catch(() => ({}));
                setErrorMsg(data?.error ?? "Errore durante la registrazione. Riprova.");
                setStatus("error");
            }
        } catch {
            setErrorMsg("Errore di rete. Controlla la connessione e riprova.");
            setStatus("error");
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full my-10 rounded-2xl overflow-hidden border border-white/10 opacity-1"
        >
            {/* Background glow layers */}
            <div className="absolute inset-0 bg-[#0b0b0b]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(229,182,12,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rama-accent/50 to-transparent" />

            <div className="relative z-10 px-6 py-14 md:py-20 flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

                {/* Icon badge */}
                <div className="newsletter-icon w-20 h-20 rounded-full border border-rama-accent/30 bg-rama-accent/10 flex items-center justify-center">
                    <Calendar className="text-rama-accent" size={34} strokeWidth={1.5} />
                </div>

                {/* Label */}
                <span className="newsletter-label font-rock-salt text-rama-accent text-base md:text-xl transform -rotate-1 block">
                    Prossime Date in Arrivo
                </span>

                {/* Headline */}
                <div className="newsletter-headline font-heading font-bold uppercase tracking-tighter text-white leading-[0.85] text-[12vw] sm:text-[9vw] md:text-[6vw] overflow-hidden">
                    <div className="will-change-transform">Stiamo preparando</div>
                    <div className="text-rama-accent will-change-transform">le prossime date.</div>
                </div>

                {/* Body text */}
                <p className="newsletter-body font-sans text-rama-muted text-lg md:text-xl max-w-lg leading-relaxed">
                    Lascia la tua email — sarai il primo a sapere quando escono i biglietti.{" "}
                    <span className="text-white font-medium">Spesso sold out in 48 ore.</span>
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        { icon: Bell, text: "Notifica immediata" },
                        { icon: Sparkles, text: "Accesso anticipato" },
                        { icon: ArrowRight, text: "Niente spam, mai" },
                    ].map(({ icon: Icon, text }) => (
                        <div
                            key={text}
                            className="newsletter-feature flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm text-white/70 font-sans"
                        >
                            <Icon size={13} className="text-rama-accent" />
                            {text}
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className="newsletter-form w-full max-w-md">
                    {status === "success" ? (
                        <div ref={successRef} className="flex flex-col items-center gap-3 py-6">
                            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                <CheckCircle className="text-green-500" size={28} />
                            </div>
                            <p className="font-heading font-bold uppercase text-white text-xl tracking-wide">
                                Sei dentro!
                            </p>
                            <p className="font-sans text-rama-muted text-sm">
                                Ti avviseremo non appena la prossima data sarà disponibile.
                            </p>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                {/* Honeypot */}
                                <div style={{ display: 'none' }} aria-hidden="true">
                                    <input type="text" name="b_contact_name" tabIndex={-1} autoComplete="off" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === "error") setStatus("idle");
                                    }}
                                    placeholder="La tua email..."
                                    className={`flex-1 bg-white/[0.05] border rounded-xl px-5 py-4 text-white font-sans text-sm placeholder:text-white/30 focus:outline-none transition-colors ${
                                        status === "error"
                                            ? "border-red-500/50 focus:border-red-500/70"
                                            : "border-white/15 focus:border-rama-accent/50"
                                    }`}
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="flex items-center justify-center gap-2 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait whitespace-nowrap"
                                >
                                    {status === "loading" ? (
                                        <span className="inline-block w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>Avvisami <ArrowRight size={15} /></>
                                    )}
                                </button>
                            </form>
                            {status === "error" && errorMsg && (
                                <p className="font-sans text-red-400 text-xs mt-2 text-left">
                                    ⚠ {errorMsg}
                                </p>
                            )}
                        </>
                    )}
                    <p className="font-sans text-xs text-white/20 mt-3">
                        Nessuno spam. Disiscrizione in un click. Privacy garantita.
                    </p>
                </div>

                {/* Secondary link — /format */}
                <Link
                    href="/format"
                    className="group inline-flex items-center gap-2 font-sans text-sm text-white/40 hover:text-rama-accent transition-colors duration-300 uppercase tracking-widest mt-2"
                >
                    Nel frattempo, scopri i nostri format
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

            </div>
        </div>
    );
}
