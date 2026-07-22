"use client";

import { useRef } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SOCIAL_PROOF } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCinematic } from "@/hooks/useCinematic";

export function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { staggerReveal } = useCinematic();

  staggerReveal(".social-proof-grid", ".proof-card");

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 cinematic-grid opacity-50 pointer-events-none" />

      <div className="max-w-360 mx-auto px-6 md:px-12 py-32 md:py-48 lg:py-64 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-10">
          <SectionHeading
            title="SOCIALLY"
            highlight="PROVEN"
            subtitle="The Evidence"
            align="left"
            sectionNumber="05"
          />
          <div className="flex flex-col items-start md:items-end gap-3 md:mb-4">
            <p className="font-syne text-[9px] uppercase tracking-[0.5em] text-accent-gold/50 italic font-bold">
              This is not a normal event.
            </p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-accent-gold text-accent-gold opacity-70" />
              ))}
            </div>
          </div>
        </div>

        {/* Cards — taller, more visible images */}
        <div className="social-proof-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {SOCIAL_PROOF.map((item) => (
            <div
              key={item.id}
              className="proof-card group relative overflow-hidden cursor-pointer border border-white/6 transition-all duration-700 ease-out hover:border-accent-gold/25 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(200,169,107,0.05)] aspect-4/5 sm:aspect-9/14"
            >
              {/* Image — 50% visible by default */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-45 grayscale-20 transition-all duration-1000 group-hover:opacity-65 group-hover:grayscale-0"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black-pure via-black-pure/50 to-black-pure/10" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">

                {/* Top — quote icon + type */}
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-accent-gold/6 border border-accent-gold/15 backdrop-blur-sm group-hover:bg-accent-gold/10 transition-colors duration-500">
                    <Quote size={14} strokeWidth={1.5} className="text-accent-gold" />
                  </div>
                  <span className="font-syne text-[8px] uppercase tracking-[0.4em] text-text-secondary/35 mt-1">
                    {item.type}
                  </span>
                </div>

                {/* Bottom — quote + author */}
                <div className="space-y-5">
                  {/* Title */}
                  <h4 className="font-syne text-[9px] uppercase tracking-[0.4em] text-accent-gold/50 group-hover:text-accent-gold font-bold transition-colors duration-500">
                    {item.title}
                  </h4>

                  {/* Quote */}
                  <p className="font-inter text-sm lg:text-base text-text-primary leading-relaxed italic opacity-75 group-hover:opacity-95 transition-opacity duration-500">
                    &ldquo;{item.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="pt-4 border-t border-white/[0.07]">
                    <p className="font-syne text-[8px] uppercase tracking-[0.4em] text-text-secondary/40">
                      — {item.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Film grain */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.025] bg-[url('/noise.webp')] mix-blend-overlay" />

              {/* Hover gold sheen */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-linear-to-br from-accent-gold/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>

        {/* Corporate logos bar */}
        <div className="mt-24 pt-16 border-t border-white/5 flex flex-wrap justify-center items-center gap-10 md:gap-20">
          <span className="font-syne text-[9px] uppercase tracking-[0.7em] text-text-secondary/30">
            Corporate Partners
          </span>
          {["TechCo", "GlobalBank", "LuxuryGroup"].map((name) => (
            <span
              key={name}
              className="font-syne text-[10px] uppercase tracking-[0.5em] text-text-primary/20 hover:text-accent-gold/60 transition-colors duration-500 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
