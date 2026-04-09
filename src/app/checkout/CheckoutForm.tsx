"use client";

import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Lock, CheckCircle, ChevronRight, ChevronLeft, ShieldCheck, Mail, Phone, User, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");

    const event = {
        id: "1",
        title: eventId === "il-palqo" ? "Il PalQo" : eventId === "a-cena-con-il-bugiardo" ? "A Cena Con Il Bugiardo" : "Cena Con Il Delitto",
        price: 85,
        location: "Sala dei Cavalieri",
    };

    const [step, setStep] = useState(1);
    const formAreaRef = useRef<HTMLDivElement>(null);
    
    // Step 1 State
    const [quantity, setQuantity] = useState(2);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Step 2 State
    const [guest, setGuest] = useState({ name: "", surname: "", email: "", phone: "" });

    // Step 3 State
    const [premium, setPremium] = useState({ allergies: "", occasion: "" });
    const [loading, setLoading] = useState(false);

    // Validations
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email);
    const isPhoneValid = guest.phone.replace(/[^0-9]/g, '').length >= 9;
    const isStep1Valid = selectedDate !== null && quantity > 0;
    const isStep2Valid = guest.name.length > 1 && guest.surname.length > 1 && isEmailValid && isPhoneValid;

    // Calendar Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const calendarDates = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const dates = [];
        // Pad empty days at start
        const emptyDays = firstDay === 0 ? 6 : firstDay - 1; // Assuming Monday is first
        for (let i = 0; i < emptyDays; i++) dates.push(null);
        
        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i);
            const isPast = d < today;
            const isSoldOut = !isPast && (d.getDate() % 5 === 0 || d.getDate() % 8 === 0);
            dates.push({ date: d, isPast, isSoldOut });
        }
        return dates;
    }, [currentMonth, today]);

    const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

    useGSAP(() => {
        if (formAreaRef.current) {
            gsap.fromTo(formAreaRef.current.children, 
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", overwrite: true }
            );
        }
    }, { dependencies: [step], scope: formAreaRef });

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: event.id,
                    eventTitle: event.title,
                    quantity,
                    selectedDate,
                    guest,
                    premium
                })
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Errore durante la creazione della sessione");
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Si è verificato un errore di connessione con il sistema di pagamento. Riprova.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-32 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <Link href={`/events/${eventId || '1'}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        Torna all&apos;evento
                    </Link>
                    
                    {/* Progress Indicator */}
                    <div className="flex gap-4 items-center">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step === i ? 'bg-gold text-black' : step > i ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-500'}`}>
                                    {step > i ? <CheckCircle size={16} /> : i}
                                </div>
                                {i < 3 && <div className={`w-8 h-[2px] ${step > i ? 'bg-green-500/50' : 'bg-white/10'}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Left: Form Area */}
                    <div ref={formAreaRef} className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm min-h-[500px]">
                        {/* STEP 1: L'Esperienza */}
                        {step === 1 && (
                            <div key="step1" className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold font-mohave uppercase tracking-tighter text-white">L&apos;Esperienza</h2>
                                    <p className="text-gray-400 text-sm">Seleziona la data e il numero di partecipanti per {event.title}.</p>
                                </div>

                                {/* DatePicker */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2 text-center">
                                            <Calendar size={18} className="text-gold text-center" /> Data dell&apos;Evento
                                        </h3>
                                        <div className="flex items-center gap-4 text-white">
                                            <button onClick={handlePrevMonth} className="hover:text-gold transition-colors"><ChevronLeft size={20} /></button>
                                            <span className="font-bold uppercase tracking-widest text-sm text-gold text-center">
                                                {currentMonth.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                                            </span>
                                            <button onClick={handleNextMonth} className="hover:text-gold transition-colors"><ChevronRight size={20} /></button>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs mb-2 text-gray-500 font-medium">
                                        {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(d => <div key={d} className="text-center">{d}</div>)}
                                    </div>
                                    
                                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                                        {calendarDates.map((item, idx) => {
                                            if (!item) return <div key={idx} className="aspect-square" />;
                                            const { date, isPast, isSoldOut } = item;
                                            const isSelected = selectedDate?.getTime() === date.getTime();
                                            
                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={isPast || isSoldOut}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all disabled:cursor-not-allowed ${
                                                        isSelected ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(200,164,78,0.3)]' :
                                                        isSoldOut ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                        isPast ? 'text-gray-600 opacity-50' : 'bg-white/5 text-white hover:bg-white/15 border border-white/10'
                                                    }`}
                                                >
                                                    <span className="text-lg font-bold block text-center">{date.getDate()}</span>
                                                    {isSoldOut && <span className="text-[9px] uppercase tracking-tighter opacity-80 leading-none text-center">Sold Out</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tickets Selection */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Ospiti</h3>
                                        <p className="text-gray-400 text-sm">Numero di persone al tavolo</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-black/50 rounded-lg p-2 border border-white/20">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors text-xl font-bold bg-white/5">-</button>
                                        <span className="text-white font-bold w-6 text-center text-xl">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors text-xl font-bold bg-white/5">+</button>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setStep(2)} 
                                    disabled={!isStep1Valid}
                                    className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    Continua all&apos;Ospite <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {/* STEP 2: L'Ospite */}
                        {step === 2 && (
                            <div key="step2" className="space-y-8">
                                <div className="space-y-2">
                                    <div onClick={() => setStep(1)} className="text-xs text-gold uppercase tracking-widest cursor-pointer hover:text-white flex items-center gap-1 mb-2"><ChevronLeft size={12}/> Torna a Data e Posti</div>
                                    <h2 className="text-3xl font-bold font-mohave uppercase tracking-tighter text-white">L&apos;Ospite</h2>
                                    <p className="text-gray-400 text-sm">I tuoi dettagli per confermare la prenotazione.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"><User size={14}/> Nome</label>
                                        <input type="text" value={guest.name} onChange={e => setGuest({...guest, name: e.target.value})} placeholder="Mario" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cognome</label>
                                        <input type="text" value={guest.surname} onChange={e => setGuest({...guest, surname: e.target.value})} placeholder="Rossi" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
                                    </div>

                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"><Mail size={14}/> Indirizzo Email</label>
                                        <div className="relative">
                                            <input type="email" value={guest.email} onChange={e => setGuest({...guest, email: e.target.value})} placeholder="mario.rossi@email.com" className={`w-full bg-black/30 border ${guest.email.length>0 && isEmailValid ? 'border-green-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:border-gold outline-none transition-all pr-12`} />
                                            {isEmailValid && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5 flex items-center justify-center" />}
                                        </div>
                                    </div>

                                    <div className="space-y-2 relative">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"><Phone size={14}/> Cellulare</label>
                                        <div className="relative">
                                            <input type="tel" value={guest.phone} onChange={e => setGuest({...guest, phone: e.target.value})} placeholder="+39 333 1234567" className={`w-full bg-black/30 border ${guest.phone.length>0 && isPhoneValid ? 'border-green-500/50' : 'border-white/10'} rounded-xl px-4 py-3.5 text-white focus:border-gold outline-none transition-all pr-12`} />
                                            {isPhoneValid && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5 flex items-center justify-center" />}
                                        </div>
                                        <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-1 border border-white/5 bg-white/5 p-2 rounded-lg"><Info size={12} className="text-gold flex-shrink-0" /> Lo useremo solo in caso di comunicazioni urgenti sul tuo tavolo.</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setStep(3)} 
                                    disabled={!isStep2Valid}
                                    className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    Continua ai Dettagli Premium <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {/* STEP 3: Il Tocco Premium & Pagamento */}
                        {step === 3 && (
                            <div key="step3" className="space-y-8">
                                <div className="space-y-2">
                                    <div onClick={() => setStep(2)} className="text-xs text-gold uppercase tracking-widest cursor-pointer hover:text-white flex items-center gap-1 mb-2"><ChevronLeft size={12}/> Torna ai Dati Ospite</div>
                                    <h2 className="text-3xl font-bold font-mohave uppercase tracking-tighter text-white flex items-center gap-3">
                                        Il Tocco Premium <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full border border-gold/30">VIP</span>
                                    </h2>
                                    <p className="text-gray-400 text-sm">Aiutaci a farti vivere una serata magica, curando ogni tuo dettaglio.</p>
                                </div>

                                <div className="space-y-6 bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 uppercase">Allergie o Intolleranze</label>
                                        <textarea 
                                            value={premium.allergies} onChange={e => setPremium({...premium, allergies: e.target.value})}
                                            placeholder="Non esitare ad avvisarci di celiachia, intolleranze al lattosio o altro. Il nostro Chef creerà un'esperienza perfetta per te." 
                                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none h-24 transition-all resize-none text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 uppercase">Occasione Speciale</label>
                                        <select 
                                            value={premium.occasion} onChange={e => setPremium({...premium, occasion: e.target.value})}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-gold outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-black">Un semplice evento esclusivo</option>
                                            <option value="compleanno" className="bg-black">Festeggio il Compleanno</option>
                                            <option value="anniversario" className="bg-black">Anniversario Romantico</option>
                                            <option value="azziendale" className="bg-black">Evento Aziendale / Team</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Caparra & Checkout CTA */}
                                <div className="bg-gradient-to-br from-gold/10 to-red/10 border border-gold/30 rounded-xl p-6 relative overflow-hidden">
                                    {/* Security Banner Ribbon */}
                                    <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold uppercase tracking-widest px-8 py-1 transform translate-x-12 translate-y-4 rotate-45 shadow-lg">Secure</div>
                                    
                                    <div className="flex flex-col gap-4 mb-6 relative z-10">
                                        <h3 className="font-bold text-white text-lg">Conferma la Prenotazione</h3>
                                        <p className="text-sm text-gray-400">Per garantire il tavolo esclusivo, richiediamo una piccola caparra rimborsabile di <strong className="text-white">€20.00 a persona</strong>.</p>
                                        
                                        <div className="flex items-center justify-between border-y border-white/10 py-4 my-2">
                                            <span className="text-gray-300">Caparra totale ({quantity} ospiti)</span>
                                            <span className="text-3xl font-bold text-white underline decoration-gold underline-offset-4">€ {quantity * 20}.00</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePayment}
                                        disabled={loading}
                                        className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3 relative z-10 group"
                                    >
                                        {loading ? "Elaborazione in Sicurezza..." : (
                                            <>
                                                <Lock size={18} className="group-hover:scale-110 transition-transform" />
                                                Riserva il mio Tavolo
                                            </>
                                        )}
                                    </button>
                                    
                                    {/* Security & Trust Icons */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-4 border-t border-gold/20 text-xs text-gray-400 font-medium">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-green-400" />
                                            <span>Pagamento end-to-end crittografato</span>
                                        </div>
                                        <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
                                        <div className="flex items-center gap-3">
                                            <span>Powered by</span>
                                            <div className="font-bold tracking-tighter text-white opacity-80 flex items-center gap-1"><CreditCard size={14}/> Stripe</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-bg-dark/50 border border-white/10 rounded-2xl p-6 sticky top-32">
                            <h2 className="text-lg font-bold text-white mb-6 font-mohave tracking-wide uppercase border-b border-white/10 pb-4">Riepilogo Ordine</h2>
                            
                            <div className="space-y-5 text-sm">
                                <div className="space-y-1">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold uppercase">L&apos;Esperienza</p>
                                    <p className="text-white text-base font-medium">{event.title}</p>
                                    {selectedDate && <p className="text-gold">{selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>}
                                </div>
                                
                                <div className="space-y-1">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold uppercase">Ospiti & Location</p>
                                    <p className="text-white font-medium">{quantity} Posti al Tavolo</p>
                                    <p className="text-gray-400">{event.location}</p>
                                </div>

                                {step > 1 && guest.name && (
                                    <div className="space-y-1 border-t border-white/5 pt-4 mt-4 animate-[fadeIn_0.5s_ease-out]">
                                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold uppercase">Intestatario</p>
                                        <p className="text-white font-medium">{guest.name} {guest.surname}</p>
                                        <p className="text-gray-400 break-all">{guest.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
