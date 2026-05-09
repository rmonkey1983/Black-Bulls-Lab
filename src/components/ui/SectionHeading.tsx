"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Assuming a utility for class merging exists, otherwise template literals

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  accentPos?: "top" | "bottom" | "none";
  className?: string;
  titleClassName?: string;
  level?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  title,
  highlight,
  subtitle,
  badge,
  align = "left",
  accentPos = "none",
  className,
  titleClassName,
  level = "h2",
}: SectionHeadingProps) {
  const Tag = level;

  return (
    <div className={cn(
      "space-y-6 reveal-section",
      align === "center" ? "text-center mx-auto" : "text-left",
      className
    )}>
      {/* Optional Badge */}
      {badge && (
        <span className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
          {badge}
        </span>
      )}
      
      {/* Main Title */}
      <Tag className={cn(
        "font-heading font-bold leading-[0.9] tracking-tighter uppercase text-white",
        level === "h1" ? "text-5xl md:text-8xl lg:text-9xl" : "text-4xl md:text-6xl lg:text-7xl",
        titleClassName
      )}>
        {title}{" "}
        {highlight && (
          <span className="text-yellow-500 inline-block ml-1">
            {highlight}
          </span>
        )}
      </Tag>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="font-sans text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Optional Bottom Accent */}
      {accentPos === "bottom" && (
        <div className={cn("h-px w-24 bg-yellow-500/60 mt-4", align === "center" ? "mx-auto" : "")} />
      )}
    </div>
  );
}
