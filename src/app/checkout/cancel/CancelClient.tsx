"use client";

import { useRef, Suspense } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

function CancelContent() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId") || "";
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
                {/* Visual Cancelled */}
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                    <XCircle className="text-red-500 w-12 h-12" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-tighter text-white mb-4">
                    Pagamento <span className="text-red-500">Annullato</span>
                </h1>
                
                <p className="text-gray-400 font-sans text-lg max-w-md mx-auto mb-10">
                    Il processo di pagamento è stato interrotto. Nessun addebito è stato effettuato e la tua prenotazione non è stata completata.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`/checkout?eventId=${eventId}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-500 text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-all shadow-lg text-center"
                    >
                        Riprova Pagamento
                    </Link>
                    
                    <Link
                        href="/format"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center"
                    >
                        <ArrowLeft size={18} /> Altri Eventi
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function CancelClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent pt-32 text-center text-white font-heading text-2xl">Caricamento...</div>}>
            <CancelContent />
        </Suspense>
    );
}

export default CancelClient;
