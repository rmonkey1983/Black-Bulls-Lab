import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FormatCard = {
  name: string;
  href: string;
  image: string;
  eyebrow: string;
  description: string;
  detail: string;
};

const FLAGSHIP: FormatCard = {
  name: "A Cena con il Bugiardo",
  href: "/format/a-cena-con-il-bugiardo",
  image: "/images/brand/background.webp",
  eyebrow: "Format flagship · Torino",
  description: "Una cena interattiva creata da Black Bulls Lab. Una persona mente, il tavolo osserva e decide di chi fidarsi.",
  detail: "Una cena. Un bugiardo. Nessun attore.",
};

const PROPRIETARY_FORMATS: FormatCard[] = [
  { name: "Il PalQo", href: "/format/il-palqo", image: "/images/brand/bg-venue-crowd.webp", eyebrow: "Format proprietario", description: "Dinner & show live con stand-up, improvvisazione, conduzione e interazione con il pubblico.", detail: "Stand-up · improvvisazione · pubblico" },
  { name: "The Golden Voice", href: "/format/the-golden-voice", image: "/images/brand/vibe-live-jazz.webp", eyebrow: "Format proprietario", description: "Format musicale live con cantanti e partecipazione del pubblico alla valutazione.", detail: "Canto · live · partecipazione" },
];

const OTHER_FORMAT: FormatCard = {
  name: "Cena con Delitto",
  href: "/format/cena-con-delitto",
  image: "/images/brand/bg-stage-lights.webp",
  eyebrow: "Altra esperienza disponibile",
  description: "Una cena investigativa con un caso da ricostruire e indizi da seguire durante la serata.",
  detail: "Cena · indagine · Torino",
};

export const FORMAT_FAQS = [
  ["Che cosa sono le esperienze Black Bulls Lab?", "Sono format ed esperienze dal vivo progettati per coinvolgere il pubblico, le aziende, i privati e le location."],
  ["Quali format sono disponibili?", "In questa pagina trovi A Cena con il Bugiardo, Il PalQo, The Golden Voice e Cena con Delitto. Ogni scheda rimanda alla pagina dedicata."],
  ["Dove si svolgono?", "Black Bulls Lab ha focus su Torino e Piemonte. Data, location e disponibilità dipendono dal format e dalla sessione."],
  ["Posso partecipare a un format come pubblico?", "Sì, quando sono disponibili date pubbliche. Le date e le modalità vengono comunicate nella pagina del format o nel calendario."],
  ["È possibile organizzare un format per un’azienda o una festa privata?", "Sì. Puoi partire dai percorsi Aziende o Eventi Privati per raccontare il tuo progetto e definire la proposta."],
  ["Un locale può ospitare un format BBL?", "Sì. Ristoranti, bistrot, hotel e location di Torino e Piemonte possono proporre il proprio spazio nella pagina Locali & Partner."],
  ["Dove posso chiedere informazioni?", "Puoi scegliere il percorso più adatto: Aziende, Eventi Privati, Locali & Partner o il calendario per le date pubbliche."],
] as const;

function FormatCardView({ format }: { format: FormatCard }) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-black-elevated/20">
      <Link href={format.href} className="relative block aspect-[16/9] overflow-hidden" aria-label={`Scopri il format ${format.name}`}>
        <Image src={format.image} alt={format.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-55 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/20 to-transparent" />
        <span className="absolute bottom-5 left-5 right-5 font-syne text-xs uppercase tracking-[0.18em] text-white">{format.name}</span>
      </Link>
      <div className="p-6 md:p-7">
        <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-accent-gold">{format.eyebrow}</p>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{format.description}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.12em] text-white/55">{format.detail}</p>
        <Link href={format.href} className="mt-6 inline-flex items-center gap-2 font-syne text-xs font-bold uppercase tracking-[0.14em] text-accent-gold transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">Scopri il format <ArrowRight aria-hidden="true" size={15} /></Link>
      </div>
    </article>
  );
}

export function FormatIndexClient() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black-pure text-text-primary">
      <section className="border-b border-white/10 px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Black Bulls Lab · Torino e Piemonte</p>
          <h1 className="mt-5 max-w-5xl font-heading text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-8xl">Esperienze Black Bulls Lab</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">Format ed esperienze dal vivo progettati da Black Bulls Lab: il pubblico partecipa, osserva e contribuisce a ciò che succede.</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Il flagship</p><h2 className="mt-3 font-heading text-4xl uppercase leading-none md:text-6xl">L’esperienza principale</h2></div><Link href={FLAGSHIP.href} className="inline-flex items-center gap-2 font-syne text-xs font-bold uppercase tracking-[0.14em] text-accent-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">Scopri il format <ArrowRight aria-hidden="true" size={15} /></Link></div>
          <article className="grid overflow-hidden border border-white/10 bg-black-elevated/20 md:grid-cols-2">
            <Link href={FLAGSHIP.href} className="relative block min-h-64 overflow-hidden md:min-h-96" aria-label="Scopri il format A Cena con il Bugiardo"><Image src={FLAGSHIP.image} alt={FLAGSHIP.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-55 transition duration-700 hover:scale-105 hover:opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-black-pure via-transparent to-transparent" /></Link>
            <div className="flex flex-col justify-center p-7 md:p-12"><p className="font-syne text-xs uppercase tracking-[0.2em] text-accent-gold">{FLAGSHIP.eyebrow}</p><h3 className="mt-4 font-heading text-4xl uppercase leading-none md:text-6xl">{FLAGSHIP.name}</h3><p className="mt-6 text-lg font-medium leading-relaxed text-white">{FLAGSHIP.detail}</p><p className="mt-4 max-w-xl leading-relaxed text-text-secondary">{FLAGSHIP.description}</p><Link href={FLAGSHIP.href} className="mt-7 inline-flex w-fit items-center gap-2 bg-accent-gold px-6 py-4 font-syne text-xs font-bold uppercase tracking-[0.14em] text-black-pure hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Scopri il format <ArrowRight aria-hidden="true" size={16} /></Link></div>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 md:px-12 md:py-24"><div className="mx-auto max-w-7xl"><p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Format proprietari BBL</p><h2 className="mt-3 max-w-3xl font-heading text-4xl uppercase leading-none md:text-6xl">Esperienze costruite per far partecipare il pubblico.</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{PROPRIETARY_FORMATS.map((format) => <FormatCardView key={format.href} format={format} />)}</div></div></section>

      <section className="px-6 py-16 md:px-12 md:py-24"><div className="mx-auto max-w-7xl"><p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Altre esperienze</p><h2 className="mt-3 font-heading text-4xl uppercase leading-none md:text-6xl">Cena con Delitto</h2><p className="mt-5 max-w-2xl leading-relaxed text-text-secondary">Un’esperienza investigativa distinta dai format proprietari BBL, con una pagina dedicata per informazioni e modalità.</p><div className="mt-8 max-w-xl"><FormatCardView format={OTHER_FORMAT} /></div></div></section>

      <section className="border-y border-white/10 bg-black-elevated/20 px-6 py-16 md:px-12 md:py-20"><div className="mx-auto max-w-7xl"><p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Scegli il percorso</p><h2 className="mt-3 font-heading text-4xl uppercase leading-none md:text-6xl">Dove vuoi portare l’esperienza?</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Aziende", "/eventi-aziendali"], ["Eventi Privati", "/eventi-privati"], ["Locali & Partner", "/locali-partner"], ["Date pubbliche", "/calendario"]].map(([label, href]) => <Link key={href} href={href} className="flex items-center justify-between border border-white/10 p-5 text-sm uppercase tracking-[0.1em] text-white/80 hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"><span>{label}</span><ArrowRight aria-hidden="true" size={16} /></Link>)}</div></div></section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-20"><p className="font-syne text-xs uppercase tracking-[0.24em] text-accent-gold">Domande frequenti</p><h2 className="mt-3 font-heading text-4xl uppercase leading-none md:text-6xl">Prima di scegliere</h2><div className="mt-8 divide-y divide-white/10 border-y border-white/10">{FORMAT_FAQS.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer pr-8 text-lg font-medium text-white marker:hidden">{question}</summary><p className="mt-3 max-w-3xl leading-relaxed text-text-secondary">{answer}</p></details>)}</div></section>
    </div>
  );
}
