"use client";

import React, { useRef } from "react";
import Image from "next/image";
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
import { 
  ArrowRight
} from "lucide-react";

import FaqSection from "@/components/ui/FaqSection";
import { RamaBlogPreview } from "@/components/rama/sections/RamaBlogPreview";
import { ProssimeDate } from "@/components/rama/sections/ProssimeDate";
import { BlogPost } from "@/lib/blog";
import { useCinematic } from "@/hooks/useCinematic";

interface HomeClientProps {
  latestPosts: BlogPost[];
  nextEvents: any[];
}

export function HomeClient({ latestPosts, nextEvents }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const { revealOnScroll, staggerReveal, softParallax } = useCinematic();

  useGSAP(() => {
    // Mouse reactive lighting effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const { clientX, clientY } = e;
      gsap.to(spotlightRef.current, {
        x: clientX,
        y: clientY,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 1. HERO ANIMATIONS
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-content", {
      opacity: 0,
      duration: 3,
      ease: "power2.inOut"
    })
    .from(".hero-headline span", {
      y: 100,
      opacity: 0,
      filter: "blur(20px)",
      duration: 2,
      stagger: 0.3,
      ease: "expo.out"
    }, "-=2")
    .from(".hero-subheadline", {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      duration: 2,
      ease: "power2.out"
    }, "-=1.5")
    .from(".hero-ctas > *", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=1");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  // Apply unified reveal to all sections
   revealOnScroll(".reveal-section");
   softParallax(".hero-bg-image", 0.2);
   staggerReveal(".format-grid", ".format-card");
   staggerReveal(".reveal-section", ".stagger-item");

  const scrollToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('metodo');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-black-pure text-text-primary min-h-screen selection:bg-accent-gold selection:text-black-pure overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black-pure">
        {/* ... (Hero content stays same) ... */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/brand/bull-hero.jpg"
            alt="Black Bulls Lab Background"
            fill
            sizes="100vw"
            className="hero-bg-image object-cover opacity-30 scale-110"
            priority
          />
          
          <div 
            ref={spotlightRef}
            className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden lg:block"
            style={{
              background: 'radial-gradient(circle, rgba(200, 169, 107, 0.05) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
          />

          <div className="absolute inset-0 bg-linear-to-b from-black-pure/80 via-transparent to-black-pure z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,11,11,0.9)_100%)] z-10" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.webp')] mix-blend-overlay z-20" />
        </div>

        <div className="hero-content relative z-30 container-max px-6 text-center">
          <div className="space-y-12 md:space-y-20">
            <h1 className="hero-headline flex flex-col items-center">
              <span className="block font-syne font-bold text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tighter uppercase text-text-primary">
                Non organizziamo eventi.
              </span>
              <span className="block font-syne font-bold text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tighter uppercase text-accent-gold italic">
                Creiamo esperienze
              </span>
              <span className="block font-syne font-bold text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tighter uppercase text-text-primary">
                che le persone ricordano.
              </span>
            </h1>

            <div className="hero-subheadline max-w-3xl mx-auto">
               <p className="font-inter text-text-secondary text-sm md:text-xl leading-relaxed tracking-[0.2em] uppercase opacity-70">
                  Dinner show. Immersive games. Cinematic live experiences. <br className="hidden md:block" />
                  Accesso limitato. Ogni sessione è irripetibile.
               </p>
            </div>

            <div className="hero-ctas pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
              <PrimaryButton href="/format" size="lg" className="w-full sm:w-auto min-w-[240px]">
                  ENTRA NELL&apos;ESPERIENZA
              </PrimaryButton>
              <SecondaryButton href="/calendario" size="lg" className="w-full sm:sm:w-auto min-w-[240px]">
                  RISERVA IL TUO POSTO
              </SecondaryButton>
            </div>
          </div>

          <button 
            onClick={scrollToNext} 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-4 transition-all duration-500" 
            aria-label="Discover more"
          >
            <span className="font-syne text-[10px] uppercase tracking-[0.5em] text-text-secondary group-hover:text-accent-gold transition-colors">Experience</span>
            <div className="w-px h-12 bg-linear-to-b from-accent-gold/40 to-transparent group-hover:h-20 transition-all duration-700" />
          </button>
        </div>

        <div className="absolute top-12 left-12 w-12 h-px bg-white/10 hidden lg:block" />
        <div className="absolute top-12 left-12 w-px h-12 bg-white/10 hidden lg:block" />
        <div className="absolute top-12 right-12 w-12 h-px bg-white/10 hidden lg:block" />
        <div className="absolute top-12 right-12 w-px h-12 bg-white/10 hidden lg:block" />
      </section>

      {/* 2. SEZIONE 'IL METODO' (Intrigue) */}
      <section id="metodo" className="reveal-section section-padding-huge visual-rhythm-alt relative overflow-hidden border-y border-white/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-40 lg:gap-64 items-center">
            <div className="space-y-24 lg:space-y-40">
                <SectionHeading 
                  title="INGEGNERIA"
                  highlight="EMOTIVA"
                  subtitle="L'Approccio Black Bulls"
                  align="left"
                />
                <div className="space-y-16 font-inter text-xl lg:text-3xl text-text-secondary font-light leading-relaxed max-w-2xl">
                    <p>
                        L&apos;intrattenimento è obsoleto. Progettiamo reazioni chimiche collettive. Ogni battito, ogni luce, ogni parola abbatte le barriere della realtà.
                    </p>
                    <p>
                        Neuroscienze e arte performativa. La chiave per un engagement che non si dimentica.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-20 pt-20 border-t border-white/5">
                    <div className="space-y-4">
                        <span className="text-accent-gold font-syne text-4xl lg:text-5xl font-bold">100%</span>
                        <p className="text-[10px] text-text-secondary uppercase tracking-[0.5em] font-bold opacity-30">Immersive</p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-accent-gold font-syne text-4xl lg:text-5xl font-bold">LAB</span>
                        <p className="text-[10px] text-text-secondary uppercase tracking-[0.5em] font-bold opacity-30">Proven</p>
                    </div>
                    <div className="space-y-4 col-span-2 sm:col-span-1">
                        <span className="text-accent-gold font-syne text-4xl lg:text-5xl font-bold">12k+</span>
                        <p className="text-[10px] text-text-secondary uppercase tracking-[0.5em] font-bold opacity-30">Guests</p>
                    </div>
                </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[650px] aspect-square">
                    <svg viewBox="0 0 400 400" fill="none" className="w-full h-full opacity-5">
                        <path className="circuit-path" d="M200 50V350M50 200H350M100 100L300 300M300 100L100 300" stroke="#C8A96B" strokeWidth="0.5" strokeDasharray="10 10" />
                        <circle cx="200" cy="200" r="120" stroke="#C8A96B" strokeWidth="0.5" />
                        <circle cx="200" cy="200" r="180" stroke="#C8A96B" strokeWidth="0.2" strokeDasharray="5 5" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border border-accent-gold/10 flex items-center justify-center backdrop-blur-3xl ambient-float">
                            <span className="font-syne text-[11px] text-accent-gold tracking-[0.8em] uppercase opacity-40">Focus</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. CINEMATIC SHOWCASE (Immersion) */}
      <div className="bg-black-pure">
        <CinematicShowcase />
      </div>

      {/* 4. ESPERIENZE IMMERSIVE (Scope) */}
      <section className="reveal-section section-padding-huge bg-black-pure border-y border-white/5">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-40 lg:mb-72 gap-16">
            <SectionHeading 
              title="ESPERIENZE"
              highlight="IMMERSIVE"
              subtitle="Il nostro ecosistema"
              align="left"
            />
            <p className="font-inter text-text-secondary max-w-sm text-left md:text-right font-medium uppercase text-[11px] tracking-[0.5em] leading-loose opacity-30">
              Dall&apos;intrattenimento dal vivo alle sfide digitali. <br />
              Progettiamo il coinvolgimento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32">
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

      {/* 5. PREVIEW FORMAT (Desire) */}
      <section id="format" className="reveal-section section-padding-huge bg-black-pure">
        <div className="container-max">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-40 lg:mb-72 gap-16">
                <SectionHeading 
                  title="I"
                  highlight="FORMAT"
                  subtitle="Esperienze pronte all'uso"
                  align="left"
                />
                <p className="font-inter text-text-secondary max-w-sm text-left md:text-right font-medium uppercase text-[11px] tracking-[0.5em] leading-loose opacity-30">
                    Architetture narrative scalabili. <br />
                    Solo su prenotazione. Posti limitati.
                </p>
            </div>

            <div className="format-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-32">
                {EXPERIMENTS.map((exp) => (
                    <PremiumCard key={exp.id} href={exp.href} className="format-card">
                        <div className="relative aspect-3/4 overflow-hidden bg-black-pure">
                            <Image 
                                src={exp.image}
                                alt={exp.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-1000 group-hover:scale-105 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-40"
                            />
                            
                            <div className="absolute inset-0 bg-linear-to-b from-black-pure/10 via-transparent to-black-pure/95" />
                            
                            <div className="absolute top-12 left-12">
                                <span className="font-syne text-[10px] text-accent-gold tracking-[0.6em] uppercase border-b border-accent-gold/20 pb-3">
                                    {exp.badge}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-12 lg:p-20 space-y-10">
                                <h3 className="font-syne text-4xl lg:text-6xl font-bold uppercase text-text-primary tracking-tighter leading-none group-hover:text-accent-gold transition-colors duration-700">
                                    {exp.name}
                                </h3>
                                
                                <p className="font-inter text-[10px] lg:text-xs text-text-secondary uppercase tracking-[0.4em] leading-relaxed opacity-0 group-hover:opacity-40 transition-all duration-1000 translate-y-12 group-hover:translate-y-0">
                                    {exp.desc}
                                </p>

                                <div className="pt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-200">
                                    <span className="font-syne text-[9px] uppercase tracking-[0.5em] text-accent-gold">Details</span>
                                    <ArrowRight size={20} className="text-accent-gold group-hover:translate-x-3 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                    </PremiumCard>
                ))}
            </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF (Validation) */}
      <div className="reveal-section section-padding-huge visual-rhythm-alt border-y border-white/5">
        <SocialProofSection />
      </div>

      {/* 7. TEAM (Trust) */}
      <section className="reveal-section section-padding-huge bg-black-pure">
        <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-40 lg:gap-64 items-center">
                <div className="lg:col-span-4 space-y-24">
                    <SectionHeading 
                        title="MENTI"
                        highlight="CREATIVE"
                        subtitle="The Architects"
                        align="left"
                    />
                    <p className="font-inter text-text-secondary font-medium uppercase text-[11px] tracking-[0.5em] leading-loose opacity-30">
                        Dietro ogni esperimento riuscito c&apos;è una squadra di esperti ossessionata dai dettagli. Incontra i creatori dell&apos;impossibile.
                    </p>
                    <div className="pt-16">
                        <SecondaryButton href="/chi-siamo" size="lg" className="w-full sm:w-auto">
                            CONOSCI IL TEAM
                        </SecondaryButton>
                    </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-24 lg:gap-32">
                    {teamMembers.filter(m => ['manuel', 'maurizio'].includes(m.id)).map((member) => (
                        <PremiumCard key={member.id} href={`/team/${member.id}`}>
                            <div className="space-y-12 p-6">
                                <div className="relative aspect-3/4 overflow-hidden bg-black-pure border border-white/5">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-30 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black-pure/70 via-transparent to-transparent" />
                                </div>
                                <div className="space-y-4 px-8 pb-10">
                                    <h3 className="font-syne text-4xl lg:text-5xl font-bold uppercase text-text-primary group-hover:text-accent-gold transition-colors duration-700 leading-none tracking-tighter">
                                        {member.name}
                                    </h3>
                                    <p className="font-syne text-[10px] text-accent-gold uppercase tracking-[0.6em] font-bold opacity-40">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </PremiumCard>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 8. PROSSIME DATE (Urgency/Action Prep) */}
      <div className="visual-rhythm-alt border-y border-white/5">
        <div className="section-padding-large">
          <ProssimeDate events={nextEvents} />
        </div>
      </div>

      {/* 9. FINAL EMOTIONAL CTA (Action) */}
      <div className="reveal-section section-padding-huge bg-black-pure">
        <FinalCTA />
      </div>

      <div className="reveal-section visual-rhythm-alt border-y border-white/5">
        <div className="section-padding-large">
          <RamaBlogPreview posts={latestPosts} />
        </div>
      </div>
      
      <div className="reveal-section section-padding-large">
        <div className="container-narrow">
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
