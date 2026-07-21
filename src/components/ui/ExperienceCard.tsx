"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

export function ExperienceCard({
  category,
  title,
  description,
  image,
  href,
  className,
}: ExperienceCardProps) {
  const isCorporate = href === "/eventi-aziendali" || category.toLowerCase() === "business";
  const ctaLabel = isCorporate
    ? "Richiedi un preventivo"
    : href.includes("/format") && href !== "/format"
    ? "Scopri il format"
    : "Vedi il calendario date";

  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-black-elevated/20 border border-white/[0.06]",
        "transition-all duration-700 ease-out",
        "hover:border-accent-gold/25 hover:shadow-[0_60px_120px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(200,169,107,0.08)]",
        "stagger-item",
        className
      )}
      suppressHydrationWarning
    >
      {/* Image Layer — visible at 55%, becomes full on hover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-50 grayscale-[40%] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:opacity-75 group-hover:grayscale-0"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-black-pure/40 via-transparent to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-6 left-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 border border-accent-gold/20 bg-black-pure/60 backdrop-blur-md">
            <span className="w-1 h-1 rounded-full bg-accent-gold/70" />
            <span className="font-syne text-[9px] uppercase tracking-[0.5em] text-accent-gold">
              {category}
            </span>
          </span>
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 space-y-5">
          <h3 className="font-syne text-3xl lg:text-4xl font-bold uppercase tracking-tighter text-text-primary group-hover:text-accent-gold transition-colors duration-700 leading-none">
            {title}
          </h3>

          <p className="font-inter text-[10px] uppercase tracking-[0.3em] leading-relaxed text-text-secondary opacity-60 md:opacity-0 transition-all duration-700 translate-y-0 md:translate-y-4 md:group-hover:opacity-60 md:group-hover:translate-y-0">
            {description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] opacity-100 md:opacity-0 transition-all duration-700 delay-100 md:group-hover:opacity-100">
            <span className="font-syne text-[9px] uppercase tracking-[0.4em] text-accent-gold">
              {ctaLabel}
            </span>
            <div className="flex h-9 w-9 items-center justify-center border border-accent-gold/30 transition-all duration-500 group-hover:bg-accent-gold group-hover:border-accent-gold">
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="text-accent-gold transition-all duration-500 group-hover:text-black-pure group-hover:rotate-45"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[url('/noise.webp')] mix-blend-overlay z-20" />

      {/* Subtle gold sheen on hover */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-br from-accent-gold/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </Link>
  );
}
