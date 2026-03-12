"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PremiumBackground() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || pathname.startsWith("/rama")) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
            {/* Base dark color */}
            <div className="absolute inset-0 bg-bg-dark" />

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: "url('/noise.png')" }}
            />

            {/* Top gradient (subtle bordeaux) */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-bordeaux/5 via-bordeaux/[0.02] to-transparent" />

            {/* Bottom gradient (subtle gold) */}
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-gold/5 via-gold/[0.02] to-transparent" />

            {/* Radial glow center */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.02] blur-[100px]"
            />
        </div>
    );
}
