"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PremiumButtonProps {
    href?: string;
    variant?: "gold" | "bordeaux" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
    "aria-label"?: string;
}

export function PremiumButton({
    href,
    variant = "gold",
    size = "md",
    children,
    onClick,
    className = "",
    type = "button",
    "aria-label": ariaLabel,
}: PremiumButtonProps) {
    const sizeClasses = {
        sm: "px-5 py-2 text-xs",
        md: "px-7 py-3 text-sm",
        lg: "px-9 py-4 text-base",
    };

    const variantClasses = {
        gold: `bg-rama-accent text-black font-bold uppercase
      hover:bg-white hover:text-black
      border border-transparent
      shadow-none`,
        bordeaux: `bg-zinc-800 text-white font-bold uppercase
      hover:bg-zinc-700
      border border-transparent
      shadow-none`,
        outline: `bg-transparent border border-rama-accent text-rama-accent font-bold uppercase
      hover:bg-rama-accent hover:text-black`,
    };

    const classes = [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2.5",
        sizeClasses[size],
        variantClasses[variant].replace(/\n\s+/g, " "),
        "tracking-wider",
        "uppercase",
        "transition-all",
        "duration-500",
        "ease-out",
        className
    ].filter(Boolean).join(" ");

    if (href) {
        return (
            <Link href={href} className={classes} aria-label={ariaLabel}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}

// Also export as GlowButton for backward compatibility
export function GlowButton({
    href,
    variant: rawVariant = "gold",
    size = "md",
    children,
    ...rest
}: Omit<PremiumButtonProps, "variant"> & { variant?: string }) {
    const v = rawVariant as string;
    const mappedVariant: "gold" | "bordeaux" | "outline" =
        v === "cyan" ? "bordeaux" : v === "green" ? "gold" : (v as "gold" | "bordeaux" | "outline");
    return (
        <PremiumButton href={href} variant={mappedVariant} size={size} {...rest}>
            {children}
        </PremiumButton>
    );
}
