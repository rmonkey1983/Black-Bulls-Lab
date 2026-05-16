"use client";

import { useRef } from "react";
import Image from "next/image";
import { Play, Quote } from "lucide-react";
import { SOCIAL_PROOF } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { useCinematic } from "@/hooks/useCinematic";

export function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { staggerReveal } = useCinematic();

  staggerReveal(".container-max", ".proof-card");

  return (
    <section 
      ref={containerRef} 
      className="section-padding-huge bg-black-pure relative overflow-hidden"
    >
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 lg:mb-40 gap-12">
          <SectionHeading 
            title="SOCIALLY"
            highlight="PROVEN"
            subtitle="The Evidence"
            align="left"
          />
          <p className="font-syne text-[10px] uppercase tracking-[0.5em] text-accent-gold italic font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            This is not a normal event.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {SOCIAL_PROOF.map((item) => (
            <div 
              key={item.id} 
              className="proof-card group relative aspect-9/16 overflow-hidden rounded-none bg-black-elevated/10 border border-white/5 cursor-pointer backdrop-blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-accent-gold/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            >
              {/* Image Layer with Blur-to-Focus Effect */}
              <div className="absolute inset-0 z-0 transition-all duration-1000 group-hover:scale-105">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover opacity-20 blur-sm group-hover:blur-0 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black-pure/10 via-transparent to-black-pure/90" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-between p-10 lg:p-12">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-accent-gold/5 border border-accent-gold/10 backdrop-blur-xl transition-all duration-700 group-hover:bg-accent-gold/10">
                    <Quote size={16} strokeWidth={1.2} className="text-accent-gold" />
                  </div>
                  <span className="font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary opacity-40">
                    {item.type}
                  </span>
                </div>

                <div className="space-y-8">
                  <h4 className="font-syne text-[10px] uppercase tracking-[0.4em] text-accent-gold/60 group-hover:text-accent-gold font-bold transition-colors duration-700">
                    {item.title}
                  </h4>
                  <p className="font-inter text-sm lg:text-base text-text-primary leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    &ldquo;{item.content}&rdquo;
                  </p>
                  <p className="font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary pt-8 border-t border-white/5 opacity-40">
                    — {item.author}
                  </p>
                </div>
              </div>

              {/* Play Interaction Reveal */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black-pure/40 backdrop-blur-xs">
                <div className="w-20 h-20 rounded-none border border-accent-gold/20 flex items-center justify-center bg-black-pure/40 backdrop-blur-3xl scale-90 group-hover:scale-100 transition-all duration-700">
                  <Play size={24} strokeWidth={1.2} className="text-accent-gold fill-accent-gold/20" />
                </div>
              </div>

              {/* Cinematic Details */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
                <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Proof Deco */}
        <div className="mt-40 pt-20 border-t border-white/5 flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 hover:opacity-60 transition-all duration-1000 grayscale hover:grayscale-0">
           <span className="font-syne text-[10px] uppercase tracking-[0.8em] text-text-secondary">Corporate Partners</span>
           <span className="font-syne text-xs uppercase tracking-[0.6em] text-text-primary hover:text-accent-gold transition-colors cursor-default">TechCo</span>
           <span className="font-syne text-xs uppercase tracking-[0.6em] text-text-primary hover:text-accent-gold transition-colors cursor-default">GlobalBank</span>
           <span className="font-syne text-xs uppercase tracking-[0.6em] text-text-primary hover:text-accent-gold transition-colors cursor-default">LuxuryGroup</span>
        </div>
      </div>
    </section>
  );
}
