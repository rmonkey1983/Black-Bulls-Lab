import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUOTE_LABEL } from "@/lib/quote";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-black-pure px-6 pb-20 pt-32 text-center" aria-label="Black Bulls Lab: esperienze dal vivo a Torino">
      <Image src="/images/brand/bg-hero-wide.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-linear-to-b from-black-pure/40 via-black-pure/50 to-black-pure" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-6 font-syne text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">Black Bulls Lab · Torino e Piemonte</p>
        <h1 className="w-full max-w-full break-words font-heading text-[clamp(min(3rem,10vw),8vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em] text-white">
          Il pubblico<br /><span className="italic text-accent-gold">cambia tutto.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-200 md:text-xl">
          Format ed esperienze dal vivo per aziende, feste private, pubblico e locali. Non resti a guardare: partecipi, scegli e fai parte di ciò che succede.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contatti" className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent-gold px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.12em] text-black-pure transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="#percorsi" className="inline-flex min-h-12 items-center justify-center border border-white/40 px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">
            Scegli il tuo percorso
          </Link>
        </div>
      </div>
    </section>
  );
}
