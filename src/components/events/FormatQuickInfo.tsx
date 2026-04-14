"use client";

import React from "react";
import { Clock, Users, BadgeEuro, Sparkles } from "lucide-react";

interface QuickInfoItem {
    icon: React.ElementType;
    label: string;
    value: string;
}

interface FormatQuickInfoProps {
    duration?: string;
    capacity: string;
    price: string;
    highlight?: string;
    highlightLabel?: string;
}

export function FormatQuickInfo({ duration, capacity, price, highlight, highlightLabel }: FormatQuickInfoProps) {
    const infos: QuickInfoItem[] = [
        { icon: Clock, label: "Durata", value: duration || "" },
        { icon: Users, label: "Capienza", value: capacity },
        { icon: BadgeEuro, label: "Prezzo", value: price },
        { icon: Sparkles, label: highlightLabel || "Highlight", value: highlight || "Show Immersivo" },
    ].filter(item => item.value !== "");

    return (
        <section className="w-full py-12 px-4 md:px-6 bg-white/[0.02] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {infos.map((info, i) => (
                        <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-rama-accent/30 transition-colors">
                            <div className="flex items-center gap-2 text-rama-accent mb-1">
                                <info.icon size={16} />
                                <span className="font-heading text-[10px] uppercase tracking-[0.2em] font-bold">{info.label}</span>
                            </div>
                            <span className="font-sans text-white text-sm md:text-base font-medium">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
