import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDot, Compass, Lightbulb, Users } from "lucide-react";

export const ABOUT_FAQS = [
  { question: "Cos'è Black Bulls Lab?", answer: "Black Bulls Lab è un laboratorio creativo di Torino che progetta format ed esperienze dal vivo per pubblico, aziende, privati e location." },
  { question: "Cosa significa il nome?", answer: "Black richiama un'identità netta e riconoscibile. Bulls collega il nome al toro del marchio e alla città di Torino. Lab indica sperimentazione e progettazione di format." },
  { question: "Cosa create?", answer: "Creiamo format proprietari ed esperienze dal vivo in cui partecipazione, regia e interazione fanno parte dell'esperienza." },
  { question: "In cosa vi differenziate da un'agenzia eventi?", answer: "Partiamo dal format e dalla dinamica di partecipazione, poi costruiamo regia e personalizzazione adatte al contesto dell'evento." },
  { question: "Il pubblico è protagonista?", answer: "Sì. Le persone non sono solo spettatrici: partecipano alle fasi e alle interazioni previste dal format." },
  { question: "Lavorate con attori?", answer: "Dipende dal format. A Cena con il Bugiardo, per esempio, è definito proprio dall'assenza di attori e dalla partecipazione degli invitati." },
  { question: "Come usate la tecnologia?", answer: "Quando serve, sostiene informazioni, fasi e interazioni. Resta un supporto discreto al vivo, non il prodotto principale." },
  { question: "Per chi lavorate?", answer: "Per pubblico, aziende, privati e location che vogliono ospitare o vivere un format dal vivo." },
  { question: "Dove operate?", answer: "Il nostro punto di riferimento è Torino, con collaborazioni nell'area del Piemonte in base a format e location." },
  { question: "È possibile personalizzare un'esperienza?", answer: "Sì, la personalizzazione viene definita nel brief in base a obiettivi, pubblico, format e contesto." },
  { question: "Come possiamo collaborare?", answer: "Puoi contattarci per un evento aziendale, proporre una location o parlare di una collaborazione." },
];

const pillars = [
  { icon: Compass, title: "Format proprietari", text: "Ideiamo strutture riconoscibili, progettate per essere vissute dal pubblico." },
  { icon: Users, title: "Pubblico protagonista", text: "La partecipazione cambia il ritmo dell'esperienza e la relazione tra le persone." },
  { icon: Lightbulb, title: "Regia e metodo", text: "Brief, preparazione e conduzione tengono insieme creatività e operatività." },
];

export function AboutClient() {
  return (
    <div className="relative overflow-hidden bg-black-pure text-white">
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden px-6 pb-20 pt-36 md:min-h-[680px] md:px-12 md:pb-28 lg:px-20">
        <Image src="/images/brand/bg-venue-crowd.webp" alt="Pubblico durante un'esperienza dal vivo Black Bulls Lab" fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black-pure via-black-pure/70 to-black-pure/30" />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-5 font-syne text-xs uppercase tracking-[0.28em] text-accent-gold">Chi siamo · Torino</p>
          <h1 className="max-w-5xl font-heading text-[clamp(3.2rem,10vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em]">Black Bulls Lab</h1>
          <p className="mt-8 max-w-2xl font-heading text-xl uppercase leading-tight text-accent-gold md:text-3xl">Laboratorio di format ed esperienze dal vivo</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">Progettiamo situazioni in cui il pubblico non assiste soltanto: entra nella dinamica, interagisce e contribuisce a ciò che accade.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-12 md:py-28 lg:px-20">
        <div><p className="font-syne text-xs uppercase tracking-[0.28em] text-accent-gold">Il laboratorio</p><h2 className="mt-4 max-w-md font-heading text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">Perché Black Bulls Lab</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-white/75 md:text-xl"><p>Black Bulls Lab è un laboratorio creativo di Torino che progetta format ed esperienze dal vivo per pubblico, aziende, privati e location.</p><p>Ogni progetto parte dalla partecipazione: costruiamo una regia chiara, prepariamo le interazioni e usiamo la tecnologia solo quando aiuta a sostenere informazioni o fasi dell&apos;esperienza.</p></div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-20 md:px-12 md:py-24 lg:px-20"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-2xl"><p className="font-syne text-xs uppercase tracking-[0.28em] text-accent-gold">Un nome, tre direzioni</p><h2 className="mt-4 font-heading text-4xl uppercase leading-none md:text-6xl">Black · Bulls · Lab</h2></div><div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">{[["BLACK", "Un'identità netta, essenziale e riconoscibile."], ["BULLS", "Il toro del marchio richiama Torino e il carattere con cui affrontiamo ogni progetto."], ["LAB", "Uno spazio di sperimentazione: osserviamo, progettiamo e portiamo i format dal vivo."]].map(([title, text]) => <div key={title} className="bg-black-pure p-8 md:min-h-52 md:p-10"><h3 className="font-heading text-3xl font-bold text-accent-gold">{title}</h3><p className="mt-5 text-base leading-relaxed text-white/70">{text}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mb-12 max-w-2xl"><p className="font-syne text-xs uppercase tracking-[0.28em] text-accent-gold">Come lavoriamo</p><h2 className="mt-4 font-heading text-4xl uppercase leading-none md:text-6xl">Tre pilastri</h2></div><div className="grid gap-5 md:grid-cols-3">{pillars.map(({ icon: Icon, title, text }) => <article key={title} className="border border-white/10 bg-white/[0.02] p-7 md:p-9"><Icon aria-hidden="true" className="mb-8 text-accent-gold" size={28} strokeWidth={1.5} /><h3 className="font-heading text-2xl uppercase">{title}</h3><p className="mt-4 leading-relaxed text-white/70">{text}</p></article>)}</div></section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-20 md:px-12 md:py-24 lg:px-20"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><p className="font-syne text-xs uppercase tracking-[0.28em] text-accent-gold">Collaboriamo con</p><h2 className="mt-4 font-heading text-4xl uppercase leading-none md:text-5xl">Il prossimo percorso</h2></div><div className="grid gap-3 md:col-span-2 md:grid-cols-3">{[["Esperienze", "/format"], ["Aziende", "/eventi-aziendali"], ["Eventi Privati", "/eventi-privati"], ["Locali & Partner", "/locali-partner"], ["Contatti e collaborazioni", "/contatti"]].map(([label, href]) => <Link key={href} href={href} className="group flex items-center justify-between border border-white/10 p-5 text-sm uppercase tracking-[0.12em] text-white/80 transition hover:border-accent-gold hover:text-accent-gold"><span>{label}</span><ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1" /></Link>)}</div></div></section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28 lg:px-20"><div className="mb-10 flex items-center gap-3"><CircleDot aria-hidden="true" className="text-accent-gold" size={18} /><h2 className="font-heading text-3xl uppercase md:text-5xl">Domande frequenti</h2></div><div className="divide-y divide-white/10 border-y border-white/10">{ABOUT_FAQS.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-heading text-lg uppercase leading-tight text-white marker:hidden md:text-xl">{faq.question}</summary><p className="max-w-3xl pt-4 leading-relaxed text-white/70">{faq.answer}</p></details>)}</div></section>

      <section className="mx-6 mb-20 border border-accent-gold/30 bg-accent-gold/[0.06] px-6 py-14 text-center md:mx-12 md:px-12 md:py-20 lg:mx-auto lg:max-w-7xl"><h2 className="font-heading text-4xl uppercase leading-none md:text-6xl">Scopri le esperienze</h2><p className="mx-auto mt-5 max-w-xl text-white/70">Conosci i format Black Bulls Lab e trova il percorso adatto al tuo pubblico.</p><Link href="/format" className="mt-8 inline-flex items-center gap-3 bg-accent-gold px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white">Vai alle esperienze <ArrowRight aria-hidden="true" size={16} /></Link></section>
    </div>
  );
}
