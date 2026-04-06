"use client";

import { motion } from "framer-motion";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-16 shadow-2xl relative overflow-hidden backdrop-blur-sm text-center"
            >
                {/* Visual Success */}
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                    <CheckCircle className="text-green-500 w-12 h-12" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-mohave uppercase tracking-tighter text-white mb-4">
                    Prenotazione <span className="text-gold">Confermata</span>
                </h1>
                
                <p className="text-gray-400 font-outfit text-lg max-w-md mx-auto mb-10">
                    La tua transazione è andata a buon fine. Abbiamo ricevuto la caparra e riservato il tuo tavolo in esclusiva.
                    Riceverai a breve un&apos;email con il riepilogo.
                </p>

                <div className="bg-black/30 border border-white/5 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-3 text-white">
                        <Calendar className="text-gold" size={24} />
                        <div className="text-left leading-tight">
                            <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Status</span>
                            <span className="font-bold">Lista Vip Registrata</span>
                        </div>
                    </div>
                </div>

                {sessionId && (
                    <p className="text-xs text-gray-600 font-mono mb-10">
                        ID: {sessionId.split('_').pop()}
                    </p>
                )}

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-gold text-black font-bold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-all shadow-lg"
                >
                    Torna alla Home <ArrowRight size={18} />
                </Link>
            </motion.div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-transparent pt-32 text-center text-white font-mohave text-2xl">Caricamento...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
