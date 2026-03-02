"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DataReadoutProps {
    label: string;
    value: string;
    color?: "green" | "cyan" | "amber";
    animate?: boolean;
    className?: string;
}

const colorMap = {
    green: "text-green",
    cyan: "text-cyan",
    amber: "text-amber",
};

const glowMap = {
    green: "text-glow-green",
    cyan: "text-glow-cyan",
    amber: "",
};

export function DataReadout({ label, value, color = "green", animate = true, className = "" }: DataReadoutProps) {
    const [displayValue, setDisplayValue] = useState(animate ? "" : value);
    const [showCursor, setShowCursor] = useState(animate);

    useEffect(() => {
        if (!animate) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index <= value.length) {
                setDisplayValue(value.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowCursor(false), 1500);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [value, animate]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col gap-1 ${className}`}
        >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-muted data-readout">
                {label}
            </span>
            <span className={`data-readout text-sm ${colorMap[color]} ${glowMap[color]}`}>
                {displayValue}
                {showCursor && <span className="animate-cursor ml-0.5">▌</span>}
            </span>
        </motion.div>
    );
}
