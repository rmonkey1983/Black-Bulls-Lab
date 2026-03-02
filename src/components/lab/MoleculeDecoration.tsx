"use client";

import { motion } from "framer-motion";

interface MoleculeDecorationProps {
    className?: string;
    color?: "green" | "cyan" | "amber";
    size?: number;
}

const colors = {
    green: "#00ff88",
    cyan: "#00d4ff",
    amber: "#ffaa00",
};

export function MoleculeDecoration({ className = "", color = "green", size = 200 }: MoleculeDecorationProps) {
    const c = colors[color];

    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            className={`animate-molecule-spin ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
        >
            {/* Central node */}
            <circle cx="100" cy="100" r="6" fill={c} opacity="0.6" />
            <circle cx="100" cy="100" r="12" fill="none" stroke={c} strokeWidth="0.5" opacity="0.3" />

            {/* Orbital nodes */}
            <circle cx="40" cy="60" r="4" fill={c} opacity="0.4" />
            <circle cx="160" cy="60" r="4" fill={c} opacity="0.4" />
            <circle cx="60" cy="160" r="4" fill={c} opacity="0.4" />
            <circle cx="150" cy="150" r="3" fill={c} opacity="0.4" />
            <circle cx="100" cy="30" r="3" fill={c} opacity="0.4" />

            {/* Bonds */}
            <line x1="100" y1="100" x2="40" y2="60" stroke={c} strokeWidth="0.8" opacity="0.25" />
            <line x1="100" y1="100" x2="160" y2="60" stroke={c} strokeWidth="0.8" opacity="0.25" />
            <line x1="100" y1="100" x2="60" y2="160" stroke={c} strokeWidth="0.8" opacity="0.25" />
            <line x1="100" y1="100" x2="150" y2="150" stroke={c} strokeWidth="0.8" opacity="0.25" />
            <line x1="100" y1="100" x2="100" y2="30" stroke={c} strokeWidth="0.8" opacity="0.25" />

            {/* Double bond */}
            <line x1="40" y1="60" x2="100" y2="30" stroke={c} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4" />
            <line x1="160" y1="60" x2="150" y2="150" stroke={c} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4" />

            {/* Orbital rings */}
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke={c} strokeWidth="0.3" opacity="0.1" transform="rotate(30 100 100)" />
            <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke={c} strokeWidth="0.3" opacity="0.1" transform="rotate(-45 100 100)" />
        </motion.svg>
    );
}

export function HexagonDecoration({ className = "", color = "green", size = 60 }: MoleculeDecorationProps) {
    const c = colors[color || "green"];
    const s = size || 60;

    return (
        <svg
            width={s}
            height={s}
            viewBox="0 0 60 60"
            className={className}
        >
            <polygon
                points="30,2 55,17 55,43 30,58 5,43 5,17"
                fill="none"
                stroke={c}
                strokeWidth="0.8"
                opacity="0.2"
            />
            <polygon
                points="30,10 47,20 47,40 30,50 13,40 13,20"
                fill="none"
                stroke={c}
                strokeWidth="0.5"
                opacity="0.1"
            />
        </svg>
    );
}
