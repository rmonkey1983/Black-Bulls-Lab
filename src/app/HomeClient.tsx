"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { EXPERIMENTS } from "@/lib/constants";
import { HomeHero } from "@/components/sections/HomeHero";
import { QUOTE_LABEL } from "@/lib/quote";

const audiences = [
  ["Aziende", "Team building, cene ed eventi aziendali in cui le persone interagiscono davvero.", "/eventi-aziendali"],
  ["Eventi Privati", "Un format originale per compleanni, lauree e occasioni da vivere insieme.", "/eventi-privati"],
  ["Locali & Partner", "Ospita un format proprietario e porta nuove persone nel tuo spazio.", "/locali-partner"],
  ["Partecipa a una serata", "A Cena con il Bugiardo: entra nella lista d'attesa per la sessione pilota a Torino.", "/format/a-cena-con-il-bugiardo"],
];
const method = [
  ["01", "Brief", "Obiettivo, pubblico, location, budget."], ["02", "Scelta Format", "Il format più adatto al tuo evento."],
  ["03", "Personalizzazione", "Contenuti, tono e dinamiche su misura."], ["04", "Preparazione", "Verifica location, scaletta, conduzione, tecnologia e coordinamento."],
  ["05", "Regia Live", "Regia dell'esperienza, ritmo e controllo operativo."], ["06", "Report", "Feedback, partecipazione, risultati e indicazioni per replicare."],
];

function PercorsoCard({ title, text, href, i }: { title: string; text: string; href: string; i: number }) {
  return <li className="percorso-item"><Link href={href} className="group flex h-full flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-pure focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"><TableMark index={i} /><span className="mt-8 font-syne text-xs text-black-pure/70">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-3 font-serif text-3xl md:text-4xl leading-tight transition-transform duration-500 group-hover:-translate-y-1">{title}</h3><p className="mt-4 text-base leading-relaxed text-pretty text-black-pure/75">{text}</p><span className="mt-auto pt-8 inline-flex items-center gap-2 font-syne text-xs uppercase tracking-[.12em]">Scopri <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-2" /></span></Link></li>;
}

function TableMark({ index }: { index: number }) {
  const seats = Array.from({ length: 6 }, (_, k) => {
    const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 60 + Math.cos(a) * 46, y: 60 + Math.sin(a) * 46 };
  });
  // Un solo posto evidenziato per tavolo: ogni percorso ha il suo.
  const lit = index % 6;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-28 w-28 text-black-pure">
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1.25" className="percorso-ring transition-colors duration-500" />
      {seats.map((seat, k) => (
        <circle key={k} cx={seat.x} cy={seat.y} r="6" fill={k === lit ? "#C8A96B" : "none"} stroke={k === lit ? "#C8A96B" : "currentColor"} strokeWidth="1.25" className="percorso-seat transition-colors duration-500 group-hover:fill-accent-gold group-hover:stroke-accent-gold" />
      ))}
    </svg>
  );
}

export function HomeClient() {
  const percorsiRef = useRef<HTMLElement>(null);
  const metodoRef = useRef<HTMLElement>(null);
  const formatRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Con "riduci movimento" le sedute restano visibili senza animazione.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: ".percorsi-list", start: "top 80%", once: true } })
        .from(".percorso-item", { opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: "expo.out" })
        .from(".percorso-ring", { scale: 0.6, opacity: 0, duration: 1, transformOrigin: "50% 50%", ease: "power3.out" }, "-=0.8")
        .from(".percorso-seat", { opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.6");
    });
  }, { scope: percorsiRef });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: ".metodo-list", start: "top 80%", once: true } })
        .from(".metodo-item", { opacity: 0, y: 36, duration: 1, stagger: 0.12, ease: "expo.out" })
        .from(".metodo-num", { opacity: 0, x: -12, duration: 0.7, stagger: 0.12, ease: "power2.out" }, "-=0.8");
    });
  }, { scope: metodoRef });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".format-card", {
        opacity: 0, y: 48, duration: 1.1, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".format-grid", start: "top 80%", once: true },
      });
    });
  }, { scope: formatRef });

  return <div className="bg-black-pure text-text-primary overflow-x-hidden">
    <HomeHero />
    <section id="percorsi" ref={percorsiRef} className="scroll-mt-20 bg-ivory text-black-pure"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28"><p className="text-xs uppercase tracking-[.2em] mb-5 text-black-pure/70">Scegli il tuo percorso</p><h2 className="font-serif text-4xl md:text-6xl leading-[1] mb-14 md:mb-20 max-w-3xl">Cosa vuoi organizzare?</h2><p className="font-syne text-xs uppercase tracking-[.2em] text-black-pure/70 mb-8">Per aziende, privati e locali</p><ul className="percorsi-list grid md:grid-cols-3 gap-x-8 gap-y-14">{audiences.slice(0, 3).map(([title, text, href], i) => <PercorsoCard key={title} title={title} text={text} href={href} i={i} />)}</ul><p className="font-syne text-xs uppercase tracking-[.2em] text-black-pure/70 mt-20 mb-8 border-t border-black-pure/20 pt-14">Per il pubblico</p><ul className="percorsi-list grid md:grid-cols-3 gap-x-8 gap-y-14">{audiences.slice(3).map(([title, text, href], k) => <PercorsoCard key={title} title={title} text={text} href={href} i={k + 3} />)}</ul></div></section>
    <section id="esperienze" className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Il format principale</p><div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center"><div className="lg:col-span-7"><h2 className="font-serif text-4xl md:text-7xl leading-[.95]">Una cena.<br /><span className="text-accent-gold italic">Un bugiardo.</span><br />Nessun attore.</h2></div><div className="lg:col-span-5 text-text-secondary text-base md:text-lg leading-relaxed"><p>Una persona sta mentendo. Tutti gli altri devono capire chi.</p><p className="mt-5">Durante la cena ricevi informazioni riservate, osservi gli altri partecipanti, crei alleanze e prima del finale devi decidere di chi fidarti.</p><Link href="/format/a-cena-con-il-bugiardo" className="inline-flex items-center gap-3 mt-8 text-accent-gold font-syne text-xs uppercase tracking-[.12em] hover:text-white transition-colors">Scopri A Cena con il Bugiardo <ArrowRight size={16} /></Link></div></div></section>
    <section ref={formatRef} className="border-y border-white/10 bg-black-elevated/20"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28"><div className="flex flex-wrap items-end justify-between gap-6 mb-12"><div><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Format</p><h2 className="font-serif text-4xl md:text-6xl">Le esperienze</h2></div><Link href="/format" className="inline-flex min-h-11 items-center gap-2 text-accent-gold font-syne text-xs uppercase tracking-[.12em] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">Vedi tutti i format <ArrowRight size={15} aria-hidden="true" /></Link></div><div className="format-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{EXPERIMENTS.map((exp) => <Link href={exp.href} key={exp.id} className={`format-card group relative min-h-105 overflow-hidden border transition-colors duration-500 hover:border-accent-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${"upcoming" in exp && exp.upcoming ? "border-dashed border-white/25" : "border-white/10"}`}><Image src={exp.image} alt="" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover opacity-45 grayscale transition-[opacity,filter,transform] duration-700 ease-out group-hover:opacity-65 group-hover:grayscale-0 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><p className={`text-xs uppercase tracking-[.15em] mb-3 ${"upcoming" in exp && exp.upcoming ? "text-white/70" : "text-accent-gold"}`}>{exp.badge}</p><h3 className="font-serif text-2xl leading-none group-hover:text-accent-gold transition-colors">{exp.name}</h3><p className="text-sm text-pretty text-zinc-300 mt-3">{exp.subtitle}</p></div></Link>)}</div></div></section>
    <section ref={metodoRef} className="bg-ivory text-black-pure"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28"><div className="grid lg:grid-cols-12 gap-12"><div className="lg:col-span-4"><p className="text-xs uppercase tracking-[.2em] mb-5 text-black-pure/70">Come lavoriamo</p><h2 className="font-serif text-4xl md:text-6xl leading-[1]">Il Metodo <span className="italic">BBL</span></h2><p className="text-black-pure/75 leading-relaxed mt-7 max-w-sm">Non ripartiamo da zero ogni volta. Usiamo format e sistemi proprietari, poi li personalizziamo per il tuo evento.</p></div><ol className="metodo-list lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t-2 border-black-pure pt-10">{method.map(([n, title, text]) => <li key={n} className="metodo-item"><span className="metodo-num block font-serif text-5xl text-black-pure/60 leading-none">{n}</span><h3 className="text-xl font-semibold mt-5">{title}</h3><p className="text-base text-black-pure/75 mt-2 leading-relaxed">{text}</p></li>)}</ol></div></div></section>
    <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36 text-center"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-6">Il prossimo passo</p><h2 className="font-serif text-5xl md:text-8xl leading-[.95] max-w-4xl mx-auto">Facciamo succedere qualcosa.</h2><Link href="/contatti" className="inline-flex items-center gap-3 mt-10 bg-accent-gold text-black-pure px-8 py-5 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white transition-colors">{QUOTE_LABEL} <ArrowRight size={16} /></Link></section>
  </div>;
}
