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
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm mb-2",
          align === "center" ? "mx-auto" : ""
        )}>
          <span className="font-heading text-[10px] tracking-[0.3em] text-yellow-500 uppercase font-bold">
            {badge}
          </span>
        </div>
      )}

      {/* Optional Top Accent */}
      {accentPos === "top" && (
        <div className={cn("h-[1px] w-16 bg-yellow-500/40", align === "center" ? "mx-auto" : "")} />
      )}

      {/* Rock Salt Subtitle */}
      {subtitle && (
        <div className={cn(
          "flex items-center gap-3 mb-2",
          align === "center" ? "justify-center" : "justify-start"
        )}>
          {align === "left" && <div className="h-[1px] w-8 bg-yellow-500/40" />}
          <span className="font-rock-salt text-yellow-500/90 transform -rotate-2 text-lg md:text-xl block">
            {subtitle}
          </span>
          {align === "center" && <div className="h-[1px] w-8 bg-yellow-500/40" />}
        </div>
      )}

      {/* Main Title */}
      <Tag className={cn(
        "font-heading font-bold leading-[0.9] tracking-tighter uppercase text-white",
        level === "h1" ? "text-5xl md:text-8xl lg:text-9xl italic -skew-x-2" : "text-4xl md:text-7xl lg:text-8xl"
      )}>
        {title}{" "}
        {highlight && (
          <span className="text-yellow-500 italic transform skew-x-12 inline-block ml-1">
            {highlight}
          </span>
        )}
      </Tag>

      {/* Optional Bottom Accent */}
      {accentPos === "bottom" && (
        <div className={cn("h-[1px] w-24 bg-yellow-500/60 mt-4", align === "center" ? "mx-auto" : "")} />
      )}
    </div>
  );
}
