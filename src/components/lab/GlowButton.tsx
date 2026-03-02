"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface GlowButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "green" | "cyan" | "amber";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit";
}

const variantStyles = {
    green: {
        bg: "bg-green/10",
        border: "border-green/40",
        text: "text-green",
        hoverBg: "hover:bg-green/20",
        hoverBorder: "hover:border-green/70",
        shadow: "hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]",
        glow: "text-glow-green",
    },
    cyan: {
        bg: "bg-cyan/10",
        border: "border-cyan/40",
        text: "text-cyan",
        hoverBg: "hover:bg-cyan/20",
        hoverBorder: "hover:border-cyan/70",
        shadow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]",
        glow: "text-glow-cyan",
    },
    amber: {
        bg: "bg-amber/10",
        border: "border-amber/40",
        text: "text-amber",
        hoverBg: "hover:bg-amber/20",
        hoverBorder: "hover:border-amber/70",
        shadow: "hover:shadow-[0_0_30px_rgba(255,170,0,0.2)]",
        glow: "",
    },
};

const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
};

export function GlowButton({
    children,
    href,
    onClick,
    variant = "green",
    size = "md",
    className = "",
    type = "button",
}: GlowButtonProps) {
    const v = variantStyles[variant];
    const s = sizeStyles[size];

    const classes = `
        inline-flex items-center justify-center gap-2
        ${v.bg} ${v.border} ${v.text} ${v.hoverBg} ${v.hoverBorder} ${v.shadow} ${v.glow}
        ${s}
        border font-bold uppercase tracking-wider
        transition-all duration-300
        data-readout
        ${className}
    `.trim();

    const inner = (
        <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={classes}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.span>
    );

    if (href) {
        return <Link href={href}>{inner}</Link>;
    }

    return (
        <button type={type} onClick={onClick} className="cursor-pointer">
            {inner}
        </button>
    );
}
