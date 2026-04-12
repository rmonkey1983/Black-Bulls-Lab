"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hoverGlow?: boolean;
  grayscaleHover?: boolean;
  onClick?: () => void;
}

export function PremiumCard({
  children,
  className,
  href,
  hoverGlow = true,
  grayscaleHover = false,
  onClick,
}: PremiumCardProps) {
  const baseClasses = cn(
    "relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500",
    hoverGlow && "hover:border-yellow-500/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.08)]",
    grayscaleHover && "group",
    className
  );

  const content = (
    <>
      {children}
      {/* Subtle inner overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block group cursor-pointer", baseClasses)} onClick={onClick} suppressHydrationWarning>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {content}
    </div>
  );
}
