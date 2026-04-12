"use client";

import { useState, useRef } from "react";
import { Ticket, Users, CreditCard, Lock, CheckCircle, Minus, Plus, Calendar, MapPin } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

interface EventBookingSectionProps {
    eventId: string;
    slug: string;
    title: string;
    date: string;
    location: string;
    price?: number;
}

export function EventBookingSection({ eventId, title, date, location, price }: EventBookingSectionProps) {
    const [quantity, setQuantity] = useState(2);
    const [loading, setLoading] = useState(false);
    const [booked] = useState(false);
    const [form, setForm] = useState({ nome: "", cognome: "", email: "", telefono: "", note: "" });
    const containerRef = useRef<HTMLDivElement>(null);

    const ticketPrice = price || 0;
    const total = ticketPrice * quantity;

    useGSAP(() => {
        if (booked) {
            gsap.fromTo("#booked-success", 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        } else {
            gsap.fromTo("#booking-form-content", 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    }, { dependencies: [booked], scope: containerRef });

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId,
                    eventTitle: title,
                    quantity,
                    selectedDate: date,
                    guest: {
                        name: form.nome,
                        surname: form.cognome,
                        email: form.email,
                        phone: form.telefono
                    },
                    premium: {
                        allergies: form.note,
                        occasion: "Nessuna specifica"
                    },
                    unitAmount: ticketPrice * 100 // Convert to cents
                })
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Errore sconosciuto");
            }
        } catch (error) {
            console.error("Errore di pagamento:", error);
            alert("Si è verificato un errore durante la connessione al sistema di pagamento.");
            setLoading(false);
        }
    };

    if (ticketPrice === 0) return null;

    return (
        <section ref={containerRef} className="py-16 px-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-gold/50" />
                <h3 className="text-2xl font-bold text-white tracking-tight">Prenota il Tuo Posto</h3>
            </div>

            {booked ? (
                <div
                    id="booked-success"
                    className="border border-gold/20 bg-bg-card/50 p-12 text-center opacity-0"
                >
                    <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Prenotazione Confermata!</h3>
                    <p className="text-gray-400 mb-1">
                        {quantity} bigliett{quantity === 1 ? "o" : "i"} per <span className="text-gold">{title}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                        Riceverai una conferma via email a <span className="text-gold/70">{form.email}</span>
                    </p>
                </div>
            ) : (
                <div
                    id="booking-form-content"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0"
                >
                    {/* Left: Ticket selection + Details */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Ticket selection */}
                        <div className="border border-border bg-bg-card/40 p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <Ticket size={16} className="text-gold/50" />
                                <span className="text-xs text-gold/50 uppercase tracking-widest font-medium">Biglietti</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Esperienza Completa</p>
                                    <p className="text-gold text-lg font-bold">€ {ticketPrice},00 <span className="text-gray-500 text-xs font-normal">/ persona</span></p>
                                </div>
                                <div className="flex items-center gap-3 border border-border bg-bg-dark p-1.5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/5 transition-all"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-white font-bold w-6 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold hover:bg-gold/5 transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Personal details */}
                        <div className="border border-border bg-bg-card/40 p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <Users size={16} className="text-gold/50" />
                                <span className="text-xs text-gold/50 uppercase tracking-widest font-medium">I Tuoi Dati</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={form.nome}
                                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                    className="bg-bg-dark border border-border px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="Cognome"
                                    value={form.cognome}
                                    onChange={(e) => setForm({ ...form, cognome: e.target.value })}
                                    className="bg-bg-dark border border-border px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="bg-bg-dark border border-border px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Telefono"
                                    value={form.telefono}
                                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                    className="bg-bg-dark border border-border px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold/30 transition-colors"
                                />
                            </div>
                            <textarea
                                placeholder="Allergie o note per lo chef (opzionale)"
                                value={form.note}
                                onChange={(e) => setForm({ ...form, note: e.target.value })}
                                rows={2}
                                className="w-full mt-3 bg-bg-dark border border-border px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-gold/30 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    {/* Right: Order summary */}
                    <div className="space-y-5">
                        <div className="border border-border bg-bg-card/40 p-6 sticky top-28">
                            <span className="text-xs text-gold/50 uppercase tracking-widest font-medium block mb-5">Riepilogo</span>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex items-start gap-2">
                                    <Calendar size={14} className="text-gold/40 mt-0.5 shrink-0" />
                                    <span className="text-gray-300">{date}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin size={14} className="text-gold/40 mt-0.5 shrink-0" />
                                    <span className="text-gray-300">{location}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Ticket size={14} className="text-gold/40 mt-0.5 shrink-0" />
                                    <span className="text-gray-300">{quantity} bigliett{quantity === 1 ? "o" : "i"}</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Totale</span>
                                    <span className="text-3xl font-bold text-white">€ {total},00</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading || !form.nome || !form.email}
                                className="w-full py-4 bg-gradient-to-r from-gold-dim via-gold to-gold-dim text-bg-dark font-bold uppercase tracking-widest text-sm
                                    hover:from-gold hover:via-gold-light hover:to-gold
                                    shadow-[0_0_20px_rgba(200,164,78,0.15)]
                                    hover:shadow-[0_0_30px_rgba(200,164,78,0.3)]
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all duration-500 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    "Elaborazione..."
                                ) : (
                                    <>
                                        <Lock size={16} /> Paga Ora
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-500">
                                <CreditCard size={10} />
                                <span>Pagamento sicuro · Stripe</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
