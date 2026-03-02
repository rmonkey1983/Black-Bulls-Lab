"use client";

import { useState } from "react";
import { Check, User } from "lucide-react";

interface Seat {
    id: string;
    status: "available" | "occupied" | "selected" | "vip";
    price: number;
}

interface Table {
    id: string;
    type: "round" | "square" | "booth";
    seats: Seat[];
    position: { x: number; y: number };
}

interface SeatSelectorProps {
    onSelectionChange: (selectedSeats: Seat[]) => void;
}

export function SeatSelector({ onSelectionChange }: SeatSelectorProps) {
    // Mock Layout Data
    const initialTables: Table[] = [
        {
            id: "T1", type: "round", position: { x: 20, y: 20 },
            seats: [
                { id: "T1-1", status: "available", price: 85 },
                { id: "T1-2", status: "occupied", price: 85 },
                { id: "T1-3", status: "available", price: 85 },
                { id: "T1-4", status: "available", price: 85 },
            ]
        },
        {
            id: "T2", type: "round", position: { x: 60, y: 20 },
            seats: [
                { id: "T2-1", status: "vip", price: 120 },
                { id: "T2-2", status: "vip", price: 120 },
                { id: "T2-3", status: "available", price: 120 },
                { id: "T2-4", status: "available", price: 120 },
            ]
        },
        {
            id: "T3", type: "booth", position: { x: 40, y: 60 },
            seats: [
                { id: "T3-1", status: "available", price: 100 },
                { id: "T3-2", status: "available", price: 100 },
                { id: "T3-3", status: "available", price: 100 },
                { id: "T3-4", status: "available", price: 100 },
                { id: "T3-5", status: "available", price: 100 },
                { id: "T3-6", status: "available", price: 100 },
            ]
        },
    ];

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [tables] = useState<Table[]>(initialTables);

    const toggleSeat = (seat: Seat) => {
        if (seat.status === "occupied") return;

        let newSelection;
        if (selectedSeats.includes(seat.id)) {
            newSelection = selectedSeats.filter(id => id !== seat.id);
        } else {
            newSelection = [...selectedSeats, seat.id];
        }
        setSelectedSeats(newSelection);

        // Find full seat objects to pass back
        const selectedSeatObjects: Seat[] = [];
        tables.forEach(table => {
            table.seats.forEach(s => {
                if (newSelection.includes(s.id)) selectedSeatObjects.push(s);
            });
        });
        onSelectionChange(selectedSeatObjects);
    };

    return (
        <div className="w-full bg-gray-900 rounded-xl p-6 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Scegli il tuo tavolo</h3>
                <div className="flex gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-600"></div> Occupato</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-white border border-gray-500"></div> Libero</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gold"></div> Selezionato</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red"></div> VIP</div>
                </div>
            </div>

            <div className="relative w-full h-[400px] bg-black/50 rounded-lg border border-white/5 mx-auto">
                {/* Stage Area */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-12 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center text-xs tracking-[0.2em] text-gray-500 uppercase font-bold border-b border-white/10">
                    Palcoscenico
                </div>

                {/* Tables */}
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className="absolute rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                        style={{
                            left: `${table.position.x}%`,
                            top: `${table.position.y}%`,
                            width: table.type === 'booth' ? '120px' : '80px',
                            height: table.type === 'booth' ? '60px' : '80px',
                            borderRadius: table.type === 'booth' ? '12px' : '50%'
                        }}
                    >
                        <span className="text-xs text-gray-500 font-mono">{table.id}</span>

                        {/* Seats */}
                        {table.seats.map((seat, idx) => {
                            // Calculate seat position around table
                            const total = table.seats.length;
                            const angle = (idx * (360 / total) - 90) * (Math.PI / 180);
                            const radius = 50; // Distance from center

                            const x = table.type === 'booth'
                                ? (idx < 3 ? -10 + (idx * 30) : -10 + ((idx - 3) * 30)) - 20
                                : Math.cos(angle) * radius + 25;

                            const y = table.type === 'booth'
                                ? (idx < 3 ? -35 : 35) + 15
                                : Math.sin(angle) * radius + 25;

                            const isSelected = selectedSeats.includes(seat.id);

                            return (
                                <button
                                    key={seat.id}
                                    onClick={() => toggleSeat(seat)}
                                    disabled={seat.status === "occupied"}
                                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg ${seat.status === "occupied" ? "bg-gray-700 cursor-not-allowed text-gray-500" :
                                            isSelected ? "bg-gold text-black scale-110 z-10" :
                                                seat.status === "vip" ? "bg-red text-white hover:bg-red-700" :
                                                    "bg-white text-black hover:bg-gray-200"
                                        }`}
                                    style={{
                                        left: `${x}px`,
                                        top: `${y}px`,
                                    }}
                                >
                                    {isSelected ? <Check size={14} /> : <User size={14} />}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
