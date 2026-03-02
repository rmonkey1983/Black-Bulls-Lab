"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SeatSelector } from "@/components/booking/SeatSelector";

interface Seat {
    id: string;
    status: "available" | "occupied" | "selected" | "vip";
    price: number;
}

interface EventBookingSectionProps {
    eventId: string;
}

export function EventBookingSection({ eventId }: EventBookingSectionProps) {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    return (
        <>
            {/* Seat Selection Section */}
            <section className="py-16 px-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Prenota il tuo Posto</h3>
                <SeatSelector onSelectionChange={(seats) => setSelectedSeats(seats)} />
            </section>

            {/* Sticky Booking Bar for Mobile / Floating CTA for Desktop */}
            <div className="fixed bottom-20 md:bottom-8 left-0 right-0 p-4 md:p-0 flex justify-center z-40 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-xl border border-gold/30 p-4 rounded-2xl shadow-2xl flex items-center gap-6 pointer-events-auto max-w-lg w-full justify-between">
                    <div className="hidden md:block">
                        <span className="block text-xs text-gray-400 uppercase tracking-widest">Prezzo a persona</span>
                        <span className="text-xl font-bold text-white">€ 85,00</span>
                    </div>
                    <Link
                        href={`/checkout?eventId=${eventId}`}
                        className="flex-1 md:flex-none bg-gold text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        Prenota Ora
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </>
    );
}
