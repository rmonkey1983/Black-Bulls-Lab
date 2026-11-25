import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { QUOTE_LABEL } from "@/lib/quote";

interface FormatPathsProps {
  whatsappHref: string;
  joinText: string;
  organizeText: string;
}

/** Two clear ways forward on a format page: attend a night or organize one. */
export function FormatPaths({ whatsappHref, joinText, organizeText }: FormatPathsProps) {
  return (
    <section className="border-t border-white/10 bg-black-elevated/25 px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <div className="border border-white/15 p-7 md:p-10">
          <h2 className="text-2xl md:text-4xl">Vuoi partecipare?</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">{joinText}</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-white/40 px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] text-white hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold sm:w-auto"><MessageSquare size={16} aria-hidden="true" /> Chiedi le prossime date</a>
        </div>
        <div className="border border-accent-gold/50 p-7 md:p-10">
          <h2 className="text-2xl md:text-4xl">Vuoi organizzare una serata?</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">{organizeText}</p>
          <Link href="/contatti" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-accent-gold px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] text-black-pure hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto">{QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
