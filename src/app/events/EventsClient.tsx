"use client";

import { useState } from "react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade } from "@/lib/gsapAnimations";
import Link from "next/link";

export function EventsClient() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useGSAP(() => {
        animateFade("#waitlist-content", "up", 0.1);
        animateFade("#waitlist-form", "up", 0.3);
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen pb-24 bg-black relative">
            <ImmersiveHeader
                id="events-hero"
                title="IL NOSTRO"
                highlight="Calendario"
                subtitle="Stiamo preparando le prossime date."
                mediaUrl="/images/brand/bg-venue-crowd.webp"
            />

            <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                <div id="waitlist-content" className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent border border-rama-accent/20">
                            <Sparkles size={24} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter text-white">
                            Sii il primo <span className="text-rama-accent">a sapere.</span>
                        </h2>
                        <p className="text-rama-muted font-sans text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Le prenotazioni per i nostri format aprono periodicamente e i posti vanno esauriti in fretta. Lascia la tua email per ricevere l&apos;accesso prioritario alle prossime date.
                        </p>
                    </div>

                    <form id="waitlist-form" onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="La tua migliore email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-full px-8 py-5 font-sans text-white focus:outline-none focus:border-rama-accent/50 transition-colors"
                                disabled={status === "loading" || status === "success"}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="w-full md:absolute md:right-2 md:top-2 md:w-auto mt-4 md:mt-0 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : status === "success" ? (
                                    <CheckCircle2 size={20} />
                                ) : (
                                    "Avvisami subito"
                                )}
                            </button>
                        </div>
                        {status === "success" && (
                            <p className="text-green-500 font-sans text-sm animate-pulse">
                                Confermiamo! Ti avviseremo appena le date saranno online.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 font-sans text-sm">
                                Qualcosa è andato storto. Riprova più tardi.
                            </p>
                        )}
                    </form>

                    <div className="pt-8 border-t border-white/5">
                        <Link
                            href="/format"
                            className="group inline-flex items-center gap-2 text-rama-accent font-heading text-xs uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
                        >
                            Nel frattempo → Scopri i 4 format
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

