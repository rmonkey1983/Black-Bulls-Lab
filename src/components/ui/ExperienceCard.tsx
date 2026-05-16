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
  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-4/5 overflow-hidden rounded-none border border-white/5 bg-black-elevated/10 backdrop-blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-accent-gold/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] stagger-item",
        className
      )}
    >
      {/* Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-20 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black-pure/10 via-transparent to-black-pure/90" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex h-full flex-col justify-end p-10 lg:p-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="font-syne text-[10px] uppercase tracking-[0.5em] text-accent-gold/40 group-hover:text-accent-gold transition-colors duration-700">
              {category}
            </span>
            <h3 className="font-syne text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-text-primary group-hover:text-accent-gold transition-colors duration-700">
              {title}
            </h3>
          </div>

          <p className="font-inter text-[10px] lg:text-xs uppercase tracking-[0.3em] leading-relaxed text-text-secondary opacity-0 transition-all duration-1000 translate-y-10 group-hover:opacity-40 group-hover:translate-y-0">
            {description}
          </p>

          <div className="flex items-center justify-between pt-10 opacity-0 transition-all duration-1000 delay-200 group-hover:opacity-100">
            <span className="font-syne text-[9px] uppercase tracking-[0.4em] text-accent-gold">Explore Experience</span>
            <div className="flex h-12 w-12 items-center justify-center border border-accent-gold/20 transition-all duration-700 group-hover:bg-accent-gold group-hover:text-black-pure">
              <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform duration-700 group-hover:rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Details */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
    </Link>
  );
}
