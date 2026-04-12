"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
}

export function PrimaryButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  type = "button",
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2 text-[10px]",
    md: "px-8 py-3.5 text-xs",
    lg: "px-10 py-4.5 text-sm",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 font-heading font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out relative overflow-hidden group/btn",
    "bg-yellow-500 text-black border border-transparent",
    "hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    "active:scale-95",
    sizeClasses[size],
    className
  );

  const shine = (
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover/btn:animate-[premium-shine_0.75s_ease-in-out_forwards] pointer-events-none" />
  );

  const content = (
    <>
      <style>{`
        @keyframes premium-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
      {shine}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as any} suppressHydrationWarning>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick as any} className={classes}>
      {content}
    </button>
  );
}
