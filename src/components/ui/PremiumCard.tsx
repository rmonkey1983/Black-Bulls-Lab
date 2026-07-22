"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hoverGlow?: boolean;
  grayscaleHover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function PremiumCard({
  children,
  className,
  href,
  hoverGlow = true,
  onClick,
  style,
}: PremiumCardProps) {
  const baseClasses = cn(
    "relative block overflow-hidden rounded-none border border-white/5 bg-black-elevated/10 backdrop-blur-3xl transition-[border-color,box-shadow] duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] stagger-item",
    hoverGlow && "hover:border-accent-gold/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)]",
    "group",
    className
  );

  const content = (
    <>
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick} style={style} suppressHydrationWarning>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick} style={style}>
      {content}
    </div>
  );
}
