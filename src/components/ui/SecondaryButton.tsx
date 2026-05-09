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
}

export function SecondaryButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  type = "button",
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-10 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-3 font-heading font-black uppercase tracking-[0.3em] transition duration-500 relative group/btn",
    "bg-transparent text-white border-2 border-[#FFD700]/30 rounded-full",
    "hover:border-[#FFD700] hover:text-[#FFD700] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:-translate-y-1",
    "active:scale-95 active:translate-y-0",
    "overflow-hidden",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <style>{`
        @keyframes pulse-glow {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
      
      {/* Subtle internal glow on hover */}
      <span className="absolute inset-0 w-full h-full bg-[#FFD700]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-full" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} suppressHydrationWarning>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={classes}>
      {content}
    </button>
  );
}
