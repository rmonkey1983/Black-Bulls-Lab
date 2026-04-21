"use client";

import { useRef, Suspense } from "react";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
    }, { scope: containerRef });

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center">
            <div
                ref={containerRef}
                className="max-w-2xl w-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-16 shadow-2xl relative overflow-hidden backdrop-blur-sm text-center opacity-0"
            >
                {/* Visual Success */}
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                    <CheckCircle className="text-green-500 w-12 h-12" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-tighter text-white mb-4">
                    Prenotazione <span className="text-yellow-500">Confermata</span>
                </h1>
                
                <p className="text-zinc-300 font-sans text-lg max-w-md mx-auto mb-10">
                    La tua transazione è andata a buon fine. Abbiamo ricevuto la caparra e riservato il tuo tavolo in esclusiva.
                    Riceverai a breve un&apos;email con il riepilogo.
                </p>

                <div className="bg-black/30 border border-white/5 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-3 text-white">
                        <Calendar className="text-yellow-500" size={24} />
                        <div className="text-left leading-tight">
                            <span className="block text-xs uppercase tracking-widest text-zinc-400 mb-1">Status</span>
                            <span className="font-bold">Lista Vip Registrata</span>
                        </div>
                    </div>
                </div>

                {sessionId && (
                    <p className="text-xs text-zinc-500 font-mono mb-10">
                        ID: {sessionId.split('_').pop()}
                    </p>
                )}

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-all shadow-lg"
                >
                    Torna alla Home <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}

export function SuccessClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent pt-32 text-center text-white font-heading text-2xl">Caricamento...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

export default SuccessClient;
