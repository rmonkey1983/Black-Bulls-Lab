"use client";

import React from "react";
import { cn } from "@/lib/utils";

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
  sectionNumber?: string;
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
  sectionNumber,
}: SectionHeadingProps) {
  const Tag = level;

  return (
    <div className={cn(
      "relative reveal-section",
      align === "center" ? "text-center mx-auto" : "text-left",
      className
    )} suppressHydrationWarning>

      {/* Section number — enormous and ghosted */}
      {sectionNumber && (
        <span
          className="section-number absolute -top-8 -left-4 select-none pointer-events-none"
          aria-hidden="true"
        >
          {sectionNumber}
        </span>
      )}

      {/* Optional Top Accent */}
      {accentPos === "top" && (
        <div className={cn("h-px w-12 bg-accent-gold/60 mb-8 stagger-item", align === "center" ? "mx-auto" : "")} />
      )}

      {/* Optional Badge */}
      {badge && (
        <div className="inline-flex items-center gap-3 mb-6 stagger-item">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="font-syne text-[9px] uppercase tracking-[0.6em] text-accent-gold font-bold">
            {badge}
          </span>
        </div>
      )}

      {/* Optional Subtitle — shown ABOVE the title for visual rhythm */}
      {subtitle && (
        <p className="font-inter text-[10px] md:text-xs text-text-secondary font-medium uppercase tracking-[0.4em] opacity-40 mb-5 stagger-item">
          {subtitle}
        </p>
      )}

      {/* Main Title */}
      <Tag className={cn(
        "font-syne font-bold leading-[0.85] tracking-tighter uppercase stagger-item",
        level === "h1"
          ? "text-5xl md:text-8xl lg:text-[10rem]"
          : "text-4xl md:text-6xl lg:text-8xl",
        titleClassName
      )}>
        {title && <span className="text-text-primary">{title} </span>}
        {highlight && (
          <span className="text-accent-gold italic block md:inline">
            {highlight}
          </span>
        )}
      </Tag>

      {/* Optional Bottom Accent */}
      {accentPos === "bottom" && (
        <div className={cn("h-px w-12 bg-accent-gold/60 mt-8 stagger-item", align === "center" ? "mx-auto" : "")} />
      )}
    </div>
  );
}
