"use client";

import { useState } from "react";
import { submitCasting } from "@/app/actions/casting";
import { ArrowLeft, CheckCircle2, Mic2 } from "lucide-react";

export function GoldenVoiceForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await submitCasting(formData);

        if (result.success) {
            setMessage({ type: 'success', text: result.message! });
        } else {
            setMessage({ type: 'error', text: result.error! });
            setLoading(false);
        }
    }

    if (message?.type === 'success') {
        return (
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">Candidatura Ricevuta</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Grazie per aver inviato il tuo materiale! Il nostro team di selezione lo valuterà e ti contatterà presto.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="text-center mb-10 relative z-10">
                <Mic2 className="mx-auto text-gold mb-4" size={40} />
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 uppercase tracking-wide">Voglio esibirmi con te</h3>
                <p className="text-gray-400">Compila il form per partecipare alle audizioni di THE GOLDEN VOICE.</p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Honeypot */}
                <div style={{ display: 'none' }} aria-hidden="true">
                    <input type="text" name="b_contact_name" tabIndex={-1} autoComplete="off" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Nome e Cognome *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={loading}
                            className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                            placeholder="Mario Rossi"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={loading}
                            className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                            placeholder="mario@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Telefono *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            disabled={loading}
                            className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                            placeholder="+39 333 1234567"
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Età</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            disabled={loading}
                            className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                            placeholder="25"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="signature_song" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Brano Cavallo di Battaglia *</label>
                    <input
                        type="text"
                        id="signature_song"
                        name="signature_song"
                        required
                        disabled={loading}
                        className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                        placeholder="Es. Sognami - Biagio Antonacci"
                    />
                </div>

                <div>
                    <label htmlFor="media_link" className="block text-xs font-outfit uppercase tracking-widest text-gray-500 mb-2">Link a un&apos;esibizione (YouTube, Drive, Instagram) - Consigliato</label>
                    <input
                        type="url"
                        id="media_link"
                        name="media_link"
                        disabled={loading}
                        className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                        placeholder="https://youtu.be/..."
                    />
                </div>

                {message?.type === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-md text-sm">
                        {message.text}
                    </div>
                )}

                <div className="pt-4 flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-3 px-12 py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "IN INVIO..." : "INVIA CANDIDATURA"} <ArrowLeft className="rotate-180" size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
