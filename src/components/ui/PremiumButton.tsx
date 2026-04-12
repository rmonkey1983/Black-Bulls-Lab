"use client";

import Link from "next/link";

interface PremiumButtonProps {
    href?: string;
    variant?: "gold" | "bordeaux" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
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
        "relative",
        "overflow-hidden",
        "group/btn",
        className
    ].filter(Boolean).join(" ");

    const shineEffect = (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover/btn:animate-[premium-shine_0.7s_ease-in-out_forwards] pointer-events-none" />
    );

    if (href) {
        return (
            <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
                <style>{`
                    @keyframes premium-shine {
                        0% { transform: translateX(-150%) skewX(-20deg); }
                        100% { transform: translateX(150%) skewX(-20deg); }
                    }
                `}</style>
                {shineEffect}
                <span className="relative z-10 flex items-center gap-2.5">{children}</span>
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
            <style>{`
                @keyframes premium-shine {
                    0% { transform: translateX(-150%) skewX(-20deg); }
                    100% { transform: translateX(150%) skewX(-20deg); }
                }
            `}</style>
            {shineEffect}
            <span className="relative z-10 flex items-center gap-2.5">{children}</span>
        </button>
    );
}

// Also export as GlowButton for backward compatibility
export function GlowButton({
    href,
    variant = "gold",
    size = "md",
    children,
    ...rest
}: PremiumButtonProps) {
    // Map legacy variants
    const mappedVariant: "gold" | "bordeaux" | "outline" =
        variant === ("cyan" as any) ? "bordeaux" : variant === ("green" as any) ? "gold" : variant;

    return (
        <PremiumButton href={href} variant={mappedVariant} size={size} {...rest}>
            {children}
        </PremiumButton>
    );
}
