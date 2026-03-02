"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");

    // Mock Event Data lookup
    const event = {
        id: "1",
        title: "Notte Medievale: Il Banchetto del Toro",
        date: "15 Giugno 2026",
        price: 85,
        location: "Sala dei Cavalieri",
    };

    const [quantity, setQuantity] = useState(2);
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // Simulate API call to Stripe
        setTimeout(() => {
            alert("Reindirizzamento a Stripe (Simulato)");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-32 px-6">
            <div className="max-w-3xl mx-auto">
                <Link href={`/events/${eventId || '1'}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} />
                    Torna all&apos;evento
                </Link>

                <h1 className="text-3xl font-bold text-white mb-8">Completa la Prenotazione</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Riepilogo</h2>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Evento</p>
                                    <p className="text-white font-medium">{event.title}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Data</p>
                                    <p className="text-white font-medium">{event.date}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Location</p>
                                    <p className="text-white font-medium">{event.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Tickets */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Seleziona Posti</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Biglietto Standard</p>
                                    <p className="text-gold">€ {event.price},00</p>
                                </div>
                                <div className="flex items-center gap-4 bg-black rounded-lg p-2 border border-white/20">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="text-white font-bold w-4 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">I tuoi Dati</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Nome" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                                <input type="text" placeholder="Cognome" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                            </div>
                            <input type="email" placeholder="Email" className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                            <input type="tel" placeholder="Telefono" className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                            <textarea placeholder="Allergie o Note per lo Chef" className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-gold outline-none h-24" />
                        </div>

                        {/* Total & Pay */}
                        <div className="bg-gradient-to-br from-gold/10 to-red/10 border border-gold/30 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-300">Totale da pagare</span>
                                <span className="text-3xl font-bold text-white">€ {event.price * quantity},00</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3"
                            >
                                {loading ? "Elaborazione..." : (
                                    <>
                                        <Lock size={18} />
                                        Paga in Sicurezza
                                    </>
                                )}
                            </button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                                <CreditCard size={12} />
                                <span>Pagamenti sicuri via Stripe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
