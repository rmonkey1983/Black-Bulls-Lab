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
  disabled?: boolean;
  suppressHydrationWarning?: boolean;
}

export function PrimaryButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  type = "button",
  disabled = false,
  suppressHydrationWarning = true,
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-10 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-3 font-syne font-bold uppercase tracking-[0.3em] transition-all duration-700 relative group/btn",
    "bg-accent-gold text-black-pure border-none",
    "hover:bg-text-primary",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "overflow-hidden",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {/* Subtle overlay for depth */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
      <span className="relative z-10">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={classes} 
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} 
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
        type={type} 
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} 
        className={classes} 
        disabled={disabled}
        suppressHydrationWarning={suppressHydrationWarning}
    >
      {content}
    </button>
  );
}
