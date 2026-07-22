"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  suppressHydrationWarning?: boolean;
}

export function SecondaryButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  type = "button",
  suppressHydrationWarning = true,
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-10 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-3 font-syne font-bold uppercase tracking-[0.3em] transition-[background-color,color,border-color,box-shadow] duration-700 relative group/btn",
    "bg-transparent text-text-primary border border-white/10",
    "hover:border-accent-gold hover:text-accent-gold",
    "active:scale-95",
    "overflow-hidden",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <span className="absolute inset-0 bg-accent-gold opacity-0 group-hover/btn:opacity-[0.03] transition-opacity duration-700" />
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
        suppressHydrationWarning={suppressHydrationWarning}
    >
      {content}
    </button>
  );
}
