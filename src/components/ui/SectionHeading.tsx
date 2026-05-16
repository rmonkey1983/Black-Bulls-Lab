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
      {/* Optional Top Accent */}
      {accentPos === "top" && (
        <div className={cn("h-px w-12 bg-accent-gold/60 mb-8 stagger-item", align === "center" ? "mx-auto" : "")} />
      )}

      {/* Optional Badge */}
      {badge && (
        <span className="inline-block px-4 py-1.5 border border-accent-gold/20 text-accent-gold text-[10px] font-syne font-bold uppercase tracking-[0.4em] stagger-item">
          {badge}
        </span>
      )}
      
      {/* Main Title */}
      <Tag className={cn(
        "font-syne font-bold leading-[0.85] tracking-tighter uppercase text-text-primary stagger-item",
        level === "h1" ? "text-5xl md:text-8xl lg:text-[10rem]" : "text-4xl md:text-6xl lg:text-8xl",
        titleClassName
      )}>
        {title && <span>{title} </span>}
        {highlight && (
          <span className="text-accent-gold block md:inline">
            {highlight}
          </span>
        )}
      </Tag>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="font-inter text-xs md:text-sm text-text-secondary font-medium uppercase tracking-[0.3em] opacity-60 stagger-item">
          {subtitle}
        </p>
      )}

      {/* Optional Bottom Accent */}
      {accentPos === "bottom" && (
        <div className={cn("h-px w-12 bg-accent-gold/60 mt-8 stagger-item", align === "center" ? "mx-auto" : "")} />
      )}
    </div>
  );
}
