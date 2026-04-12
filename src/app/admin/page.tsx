"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, getGalleryItems, getTalents } from "@/lib/dataStore";
import { FlaskConical, Image as ImageIcon, Users, Plus, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ events: 0, photos: 0, talents: 0 });

    useEffect(() => {
        async function loadStats() {
            const [events, photos, talents] = await Promise.all([
                getEvents(),
                getGalleryItems(),
                getTalents(),
            ]);
            setStats({
                events: events.length,
                photos: photos.length,
                talents: talents.length,
            });
        }
        loadStats();
    }, []);

    const statCards = [
        { label: "Esperimenti", value: stats.events, icon: FlaskConical, color: "green", href: "/admin/events" },
        { label: "Campioni Foto", value: stats.photos, icon: ImageIcon, color: "cyan", href: "/admin/gallery" },
        { label: "Artisti", value: stats.talents, icon: Users, color: "amber", href: "/admin/talents" },
    ];

    const quickActions = [
        { label: "Nuovo Esperimento", href: "/admin/events?action=new", icon: Plus, color: "green" },
        { label: "Aggiungi Foto", href: "/admin/gallery?action=new", icon: Plus, color: "cyan" },
        { label: "Nuovo Ricercatore", href: "/admin/talents?action=new", icon: Plus, color: "amber" },
    ];

    const colorClasses: Record<string, { text: string; border: string; bg: string; glow: string }> = {
        green: { text: "text-green", border: "border-green/20", bg: "bg-green/5", glow: "text-glow-green" },
        cyan: { text: "text-cyan", border: "border-cyan/20", bg: "bg-cyan/5", glow: "text-glow-cyan" },
        amber: { text: "text-amber", border: "border-amber/20", bg: "bg-amber/5", glow: "" },
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">
                    DSH-001 // Pannello Principale
                </span>
                <h1 className="text-3xl font-bold text-rama-text mt-1">Dashboard</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    const c = colorClasses[card.color];
                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className={`border ${c.border} ${c.bg} p-6 hover:border-opacity-50
                                transition-all duration-300 group relative`}
                        >
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green/20" />
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="data-readout text-[10px] text-gray-muted tracking-[0.2em] uppercase">
                                        {card.label}
                                    </span>
                                    <div className={`text-4xl font-bold ${c.text} ${c.glow} mt-1`}>
                                        {card.value}
                                    </div>
                                </div>
                                <Icon size={24} className={`${c.text} opacity-30`} />
                            </div>
                            <div className={`flex items-center gap-1 mt-4 data-readout text-[10px] ${c.text} opacity-0
                                group-hover:opacity-100 transition-opacity tracking-wider`}>
                                Gestisci <ArrowRight size={10} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase mb-3 block">
                    Azioni Rapide
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {quickActions.map((action) => {
                        const Icon = action.icon;
                        const c = colorClasses[action.color];
                        return (
                            <Link
                                key={action.label}
                                href={action.href}
                                className={`flex items-center gap-3 px-4 py-3 border ${c.border} ${c.bg}
                                    hover:border-opacity-50 transition-all duration-300 ${c.text} data-readout text-xs
                                    uppercase tracking-wider`}
                            >
                                <Icon size={14} />
                                {action.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* System Info */}
            <div className="border border-green/10 bg-lab-card/30 p-5">
                <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase mb-3 block">
                    Info Sistema
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 data-readout text-xs">
                    <div>
                        <span className="text-gray-muted block text-[9px] tracking-wider">PIATTAFORMA</span>
                        <span className="text-green">Next.js 16</span>
                    </div>
                    <div>
                        <span className="text-gray-muted block text-[9px] tracking-wider">STORAGE</span>
                        <span className="text-cyan">Supabase</span>
                    </div>
                    <div>
                        <span className="text-gray-muted block text-[9px] tracking-wider">STATO</span>
                        <span className="text-green flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" /> Operativo
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-muted block text-[9px] tracking-wider">TEMA</span>
                        <span className="text-amber">Laboratorio</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
