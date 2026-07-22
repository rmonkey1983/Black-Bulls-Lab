/**
 * HeroSection — Hero cinematic della homepage Black Bulls Lab
 * 
 * Componente hero con video background, testo animato GSAP e CTA.
 * Precedentemente in blocks/hero-section-5.tsx, qui ricreato come componente standalone.
 */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".hero-tag", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(".hero-title span", {
      y: "110%",
      opacity: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: "expo.out",
    }, "-=0.4")
    .from(".hero-sub", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, "-=0.6")
    .from(".hero-cta", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5")
    .from(".hero-scroll", {
      opacity: 0,
      duration: 1,
    }, "-=0.3");
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black-pure"
      aria-label="Hero — Black Bulls Lab"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/brand/bg-hero-wide.webp"
          alt="Black Bulls Lab — Creatori di Emozioni"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 scale-105"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black-pure/80 via-black-pure/40 to-black-pure/90" />
        <div className="absolute inset-0 bg-linear-to-r from-black-pure/60 via-transparent to-black-pure/60" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,169,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-300 mx-auto space-y-10">
        {/* Tag */}
        <div className="hero-tag inline-flex items-center gap-3 px-5 py-2 border border-accent-gold/20 bg-accent-gold/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="font-syne text-[10px] uppercase tracking-[0.6em] text-accent-gold">
            Torino — Black Bulls Lab
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-title font-syne font-bold text-[clamp(2.2rem,8vw,9rem)] leading-[0.9] tracking-tighter uppercase text-white">
          <span className="block overflow-hidden">
            <span className="block">Creatori di</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-accent-gold">Emozioni.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub font-inter text-base md:text-2xl text-text-secondary/70 font-light leading-relaxed max-w-2xl mx-auto">
          Dinner show esclusivi, team building immersivi e format teatrali che
          trasformano ogni serata in un&apos;esperienza indimenticabile.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
          <Link
            href="/format"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-accent-gold text-black-pure font-syne font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all duration-500 text-center"
          >
            Scopri i Format
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
          <Link
            href="/calendario"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 border border-white/15 text-white font-syne text-xs font-bold uppercase tracking-[0.4em] hover:border-accent-gold/50 hover:text-accent-gold transition-all duration-500 bg-white/2 backdrop-blur-sm text-center"
          >
            Prenota una Data
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="font-syne text-[9px] uppercase tracking-[0.5em] text-text-secondary/40">
          Scorri
        </span>
        <ChevronDown size={16} className="text-accent-gold/50 animate-bounce" />
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-12 left-12 w-24 h-px bg-accent-gold/15 hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-px h-24 bg-accent-gold/15 hidden lg:block" />
      <div className="absolute top-12 right-12 w-24 h-px bg-accent-gold/15 hidden lg:block" />
      <div className="absolute top-12 right-12 w-px h-24 bg-accent-gold/15 hidden lg:block" />
    </section>
  );
}
