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
  style?: React.CSSProperties;
}

export function PremiumCard({
  children,
  className,
  href,
  hoverGlow = true,
  grayscaleHover = false,
  onClick,
  style,
}: PremiumCardProps) {
  const baseClasses = cn(
    "relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-md motion-safe:transition motion-safe:duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
    hoverGlow && "hover:border-yellow-500/40 hover:shadow-[0_0_50px_rgba(234,179,8,0.1)] hover:-translate-y-1",
    grayscaleHover && "group",
    className
  );

  const content = (
    <>
      {children}
      {/* Subtle inner overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {/* Scanner-like line effect on hover */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-yellow-500/50 to-transparent -translate-y-full group-hover:translate-y-[400%] transition-transform duration-1500 ease-in-out opacity-0 group-hover:opacity-100" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("block group cursor-pointer", baseClasses)} onClick={onClick} style={style} suppressHydrationWarning>
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
