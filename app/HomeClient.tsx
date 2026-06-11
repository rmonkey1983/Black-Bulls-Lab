"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { EXPERIMENTS, SERVICE_EXPERIENCES } from "@/lib/constants";
import { teamMembers } from "@/lib/teamData";
import { ArrowRight, ChevronDown } from "lucide-react";
import FaqSection from "@/components/ui/FaqSection";
import { RamaBlogPreview } from "@/components/rama/sections/RamaBlogPreview";
import { ProssimeDate } from "@/components/rama/sections/ProssimeDate";
import { BlogPost } from "@/lib/blog";
import { useCinematic } from "@/hooks/useCinematic";

interface HomeClientProps {
  latestPosts: BlogPost[];
  nextEvents: any[];
}

/* ─── Marquee Band ─────────────────────────────────────────── */
function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  const items = [
    "Black Bulls Lab",
    "Torino",
    "Dinner Show",
    "Esperienze Immersive",
    "Team Building",
    "Cena con Delitto",
    "Il PalQo",
  ];

  return (
    <div className="marquee-band">
      <div className={reverse ? "marquee-inner-reverse" : "marquee-inner"}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export function HomeClient({ latestPosts, nextEvents }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const { revealOnScroll, staggerReveal, softParallax } = useCinematic();

  useGSAP(() => {
    // Mouse reactive spotlight
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 2.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
      })
      .from(
        ".hero-line-1, .hero-line-2",
        {
          y: 120,
          opacity: 0,
          filter: "blur(16px)",
          duration: 1.8,
          stagger: 0.15,
          ease: "expo.out",
        },
        "-=0.8"
      )
      .from(
        ".hero-sub",
        {
          opacity: 0,
          y: 24,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1"
      )
      .from(
        ".hero-ctas > *",
        {
          opacity: 0,
          y: 20,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ".hero-stats > *",
        {
          opacity: 0,
          y: 16,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6"
      );

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  revealOnScroll(".reveal-section");
  softParallax(".hero-bg-image", 0.2);
  staggerReveal(".format-grid", ".format-card");
  staggerReveal(".reveal-section", ".stagger-item");

  const scrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden"
    >
      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-end md:items-center justify-center overflow-hidden bg-black-pure pb-24 md:pb-0"
      >
        {/* Background image — 60% visible */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brand/bull-hero.jpg"
            alt="Black Bulls Lab"
            fill
            sizes="100vw"
            className="hero-bg-image object-cover opacity-55 scale-105"
            priority
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/60 to-black-pure/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black-pure/80 via-transparent to-black-pure/40" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay" />
        </div>

        {/* Mouse spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(200,169,107,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Corner deco */}
        <div className="absolute top-28 left-8 hidden lg:flex flex-col gap-1 z-20">
          <div className="w-10 h-px bg-accent-gold/30" />
          <div className="w-px h-10 bg-accent-gold/30" />
        </div>
        <div className="absolute top-28 right-8 hidden lg:flex flex-col items-end gap-1 z-20">
          <div className="w-10 h-px bg-accent-gold/30" />
          <div className="self-end w-px h-10 bg-accent-gold/30" />
        </div>

        {/* Content */}
        <div className="relative z-30 w-full px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-4 mb-10">
              <span className="w-8 h-px bg-accent-gold" />
              <span className="font-syne text-[10px] uppercase tracking-[0.6em] text-accent-gold font-bold">
                Torino · Esperienze Immersive
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-syne font-bold uppercase leading-[0.85] tracking-tighter mb-10">
              <span className="hero-line-1 block text-[clamp(2.4rem,7.5vw,7rem)] text-text-primary">
                Non organizziamo eventi.
              </span>
              <span className="hero-line-2 block text-[clamp(2.4rem,7.5vw,7rem)] text-accent-gold italic">
                Creiamo esperienze.
              </span>
            </h1>

            {/* Sub */}
            <p className="hero-sub font-inter text-sm md:text-base text-text-secondary leading-relaxed tracking-[0.15em] uppercase max-w-2xl mb-14 opacity-70">
              Cene spettacolo interattive per privati (B2C){" "}
              <span className="hidden md:inline">
                e format di team building originali per aziende (B2B) a Torino.
              </span>
              <span className="md:hidden"> & Team Building aziendale (B2B).</span>
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16">
              <PrimaryButton href="/calendario" size="lg" className="sm:min-w-[240px]">
                VEDI CALENDARIO DATE
              </PrimaryButton>
              <SecondaryButton href="/eventi-aziendali" size="lg" className="sm:min-w-[240px]">
                TEAM BUILDING AZIENDALE
              </SecondaryButton>
            </div>

            {/* Stats bar */}
            <div className="hero-stats flex items-center gap-10 md:gap-16">
              {[
                { value: "12k+", label: "Spettatori" },
                { value: "100%", label: "Immersive" },
                { value: "LAB", label: "Proven Format" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-syne text-2xl md:text-3xl font-bold text-accent-gold leading-none">
                    {value}
                  </span>
                  <span className="font-syne text-[8px] uppercase tracking-[0.5em] text-text-secondary opacity-40">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3 group"
          aria-label="Scorri in basso"
        >
          <span className="font-syne text-[8px] uppercase tracking-[0.6em] text-text-secondary/40 group-hover:text-accent-gold transition-colors duration-500">
            Scroll
          </span>
          <ChevronDown
            size={18}
            strokeWidth={1}
            className="text-accent-gold/40 group-hover:text-accent-gold group-hover:translate-y-1 transition-all duration-500"
          />
        </button>
      </section>

      {/* ── MARQUEE #1 ── */}
      <MarqueeBand />

      {/* ══════════════════════════════════════════════
          2. IL METODO — Ingegneria Emotiva
      ══════════════════════════════════════════════ */}
      <section
        id="metodo"
        className="reveal-section relative overflow-hidden border-b border-white/[0.05]"
        suppressHydrationWarning
      >
        {/* Section number bg */}
        <div className="absolute top-0 right-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          <span className="section-number opacity-[0.025]">01</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 lg:py-64">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

            {/* Left — text */}
            <div className="space-y-12">
              <SectionHeading
                title="INGEGNERIA"
                highlight="EMOTIVA"
                subtitle="L'Approccio Black Bulls"
                align="left"
              />

              <div className="space-y-8 max-w-xl">
                <p className="font-inter text-lg lg:text-2xl text-text-secondary font-light leading-relaxed">
                  L&apos;intrattenimento è obsoleto. Progettiamo reazioni chimiche
                  collettive. Ogni battito, ogni luce, ogni parola abbatte le
                  barriere della realtà.
                </p>
                <p className="font-inter text-base lg:text-xl text-text-secondary/60 font-light leading-relaxed">
                  Neuroscienze e arte performativa. La chiave per un engagement
                  che non si dimentica.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/[0.06]">
                {[
                  { value: "100%", label: "Immersive Presence" },
                  { value: "LAB", label: "Proven Dynamics" },
                  { value: "12k+", label: "Witnesses" },
                ].map(({ value, label }) => (
                  <div key={label} className="space-y-2">
                    <span className="text-accent-gold font-syne text-3xl lg:text-4xl font-bold block">
                      {value}
                    </span>
                    <p className="font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary/30">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — abstract visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-square">
                {/* Decorative concentric circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[180, 130, 80].map((r, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-accent-gold/10"
                      style={{ width: `${r * 2}px`, height: `${r * 2}px` }}
                    />
                  ))}
                  <div
                    className="absolute rounded-full border border-accent-gold/30 animate-pulse"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-syne text-[8px] uppercase tracking-[0.8em] text-accent-gold opacity-60">
                      Focus
                    </span>
                  </div>
                </div>

                {/* Cross lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-accent-gold to-transparent" />
                </div>

                {/* Ambient glow */}
                <div className="absolute inset-0 bg-accent-gold/5 blur-[80px] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. CINEMATIC SHOWCASE
      ══════════════════════════════════════════════ */}
      <div className="bg-black-pure">
        <CinematicShowcase />
      </div>

      {/* ── MARQUEE #2 — reverse ── */}
      <MarqueeBand reverse />

      {/* ══════════════════════════════════════════════
          4. I NOSTRI SERVIZI
      ══════════════════════════════════════════════ */}
      <section
        className="reveal-section relative overflow-hidden border-y border-white/[0.05]"
        suppressHydrationWarning
      >
        <div className="absolute top-0 left-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          <span className="section-number opacity-[0.025]">02</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 lg:py-64">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-10">
            <SectionHeading
              title="I NOSTRI"
              highlight="SERVIZI"
              subtitle="Scegli il tuo percorso"
              align="left"
            />
            <p className="font-inter text-text-secondary max-w-xs text-left md:text-right font-medium uppercase text-[10px] tracking-[0.4em] leading-loose opacity-40 md:mb-4">
              Dalle cene spettacolo per privati (B2C)
              <br />
              ai team building dedicati alle imprese (B2B).
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SERVICE_EXPERIENCES.map((service) => (
              <ExperienceCard
                key={service.id}
                category={service.category}
                title={service.title}
                description={service.description}
                image={service.image}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. I FORMAT
      ══════════════════════════════════════════════ */}
      <section
        id="format"
        className="reveal-section relative overflow-hidden bg-black-pure"
        suppressHydrationWarning
      >
        <div className="absolute top-0 right-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          <span className="section-number opacity-[0.025]">03</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 lg:py-64">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-10">
            <SectionHeading
              title="I"
              highlight="FORMAT"
              subtitle="Esperienze pronte all'uso"
              align="left"
            />
            <p className="font-inter text-text-secondary max-w-xs text-left md:text-right font-medium uppercase text-[10px] tracking-[0.4em] leading-loose opacity-25 md:mb-4">
              Scalable narrative architectures.
              <br />
              Exclusive access. Limited seats.
            </p>
          </div>

          {/* Format cards — editorial layout */}
          <div className="format-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {EXPERIMENTS.map((exp, idx) => (
              <PremiumCard key={exp.id} href={exp.href} className="format-card">
                <div className="relative aspect-[3/4] overflow-hidden bg-black-elevated">
                  <Image
                    src={exp.image}
                    alt={exp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-45 grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-70"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/40 to-transparent" />

                  {/* Index number */}
                  <div className="absolute top-5 left-5 font-syne text-[10px] text-accent-gold/40 tracking-[0.5em] uppercase">
                    0{idx + 1}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-5 right-5">
                    <span className="font-syne text-[8px] text-accent-gold tracking-[0.5em] uppercase border border-accent-gold/20 px-3 py-1.5 bg-black-pure/60 backdrop-blur-sm">
                      {exp.badge}
                    </span>
                  </div>

                  {/* Content bottom */}
                  <div className="absolute bottom-0 left-0 w-full p-6 space-y-4">
                    <h3 className="font-syne text-2xl lg:text-3xl font-bold uppercase text-text-primary tracking-tighter leading-none group-hover:text-accent-gold transition-colors duration-700">
                      {exp.name}
                    </h3>

                    <p className="font-inter text-[9px] lg:text-[10px] text-text-secondary uppercase tracking-[0.35em] leading-relaxed opacity-50 md:opacity-0 md:group-hover:opacity-50 transition-all duration-700 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                      {exp.desc}
                    </p>

                    <div className="pt-3 flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-100 border-t border-white/[0.08]">
                      <span className="font-syne text-[8px] uppercase tracking-[0.5em] text-accent-gold">
                        Scopri
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-accent-gold group-hover:translate-x-2 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. SOCIAL PROOF
      ══════════════════════════════════════════════ */}
      <div
        className="reveal-section border-y border-white/[0.05]"
        style={{ background: "rgba(20,20,20,0.4)" }}
        suppressHydrationWarning
      >
        <SocialProofSection />
      </div>

      {/* ══════════════════════════════════════════════
          7. TEAM
      ══════════════════════════════════════════════ */}
      <section
        className="reveal-section relative overflow-hidden bg-black-pure"
        suppressHydrationWarning
      >
        <div className="absolute top-0 left-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          <span className="section-number opacity-[0.02]">04</span>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 lg:py-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Left — label col */}
            <div className="lg:col-span-4 space-y-10">
              <SectionHeading
                title="THE"
                highlight="ARCHITECTS"
                subtitle="Creative Minds"
                align="left"
              />
              <p className="font-inter text-text-secondary font-medium uppercase text-[10px] tracking-[0.4em] leading-loose opacity-30 max-w-xs">
                Behind every successful experiment lies a team obsessed with
                detail. Meet the creators of the impossible.
              </p>
              <div className="pt-6">
                <SecondaryButton href="/chi-siamo" size="lg" className="w-full sm:w-auto">
                  CONOSCI IL TEAM
                </SecondaryButton>
              </div>
            </div>

            {/* Right — team cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {teamMembers
                .filter((m) => ["manuel", "maurizio"].includes(m.id))
                .map((member) => (
                  <PremiumCard key={member.id} href={`/team/${member.id}`}>
                    <div className="relative">
                      {/* Photo */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-55 grayscale group-hover:grayscale-0 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/30 to-transparent" />

                        {/* Name overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-7">
                          <h3 className="font-syne text-2xl lg:text-3xl font-bold uppercase text-text-primary group-hover:text-accent-gold transition-colors duration-700 leading-tight tracking-tighter">
                            {member.name}
                          </h3>
                          <p className="font-syne text-[9px] text-accent-gold/50 uppercase tracking-[0.5em] font-bold mt-2">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE #3 ── */}
      <MarqueeBand />

      {/* ══════════════════════════════════════════════
          8. PROSSIME DATE
      ══════════════════════════════════════════════ */}
      <div className="border-y border-white/[0.05]" style={{ background: "rgba(18,18,18,0.3)" }}>
        <div className="py-20 md:py-36 px-6 md:px-12">
          <ProssimeDate events={nextEvents} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          9. FINAL CTA
      ══════════════════════════════════════════════ */}
      <div className="reveal-section bg-black-pure" suppressHydrationWarning>
        <FinalCTA />
      </div>

      {/* ══════════════════════════════════════════════
          10. BLOG + FAQ
      ══════════════════════════════════════════════ */}
      <div
        className="reveal-section border-y border-white/[0.05]"
        style={{ background: "rgba(20,20,20,0.3)" }}
        suppressHydrationWarning
      >
        <div className="py-20 md:py-36 px-6 md:px-12">
          <RamaBlogPreview posts={latestPosts} />
        </div>
      </div>

      <div className="reveal-section py-20 md:py-36 px-6 md:px-12" suppressHydrationWarning>
        <div className="max-w-[960px] mx-auto">
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
