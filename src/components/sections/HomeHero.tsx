"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { QUOTE_LABEL } from "@/lib/quote";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Nessuna animazione per chi chiede di ridurre il movimento: il contenuto resta visibile.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-rule", { scaleX: 0, duration: 1.2, ease: "expo.out", transformOrigin: "center center" })
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.8 }, "-=0.8")
        .from(".hero-line", { opacity: 0, y: 48, duration: 1.2, stagger: 0.15, ease: "expo.out" }, "-=0.6")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.7")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, "-=0.6");
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative flex min-h-[88svh] items-center overflow-hidden bg-black-pure px-6 pb-20 pt-32 text-center" aria-label="Black Bulls Lab: esperienze dal vivo a Torino">
      <Image src="/images/brand/bg-hero-wide.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-linear-to-b from-black-pure/40 via-black-pure/50 to-black-pure" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="hero-rule mx-auto mb-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
        <p className="hero-eyebrow mb-6 font-syne text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">Black Bulls Lab · Torino e Piemonte</p>
        <h1 className="w-full max-w-full break-words font-heading text-[clamp(min(3rem,10vw),8vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em] text-white">
          <span className="hero-line block">Il pubblico</span>
          <span className="hero-line block italic text-accent-gold">cambia tutto.</span>
        </h1>
        <p className="hero-sub mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-200 md:text-xl">
          BBL organizza eventi di ogni tipo per aziende, privati e locali; i format sono un valore in più.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contatti" className="hero-cta inline-flex min-h-12 items-center justify-center gap-3 bg-accent-gold px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.12em] text-black-pure transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="#percorsi" className="hero-cta inline-flex min-h-12 items-center justify-center border border-white/40 px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
            Scegli il tuo percorso
          </Link>
        </div>
      </div>
    </section>
  );
}
