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
}

export function PrimaryButton({
  href,
  onClick,
  children,
  className,
  size = "md",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-10 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-3 font-heading font-black uppercase tracking-[0.3em] transition duration-500 relative group/btn",
    "bg-linear-to-r from-[#FFD700] via-[#F5C400] to-[#FFD700] bg-[length:200%_auto] text-black border-none rounded-full",
    "hover:bg-[right_center] hover:shadow-[0_15px_40px_rgba(255,215,0,0.4)] hover:-translate-y-1",
    "active:scale-95 active:translate-y-0",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "overflow-hidden shadow-lg",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <style>{`
        @keyframes shine-pill {
          0% { transform: translateX(-200%) skewX(-30deg); }
          100% { transform: translateX(200%) skewX(-30deg); }
        }
      `}</style>
      
      {/* Shine effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] skew-x-[-30deg] group-hover/btn:animate-[shine-pill_1s_ease-in-out_forwards] pointer-events-none" />
      
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
    <button type={type} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={classes} disabled={disabled}>
      {content}
    </button>
  );
}
