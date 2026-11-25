"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export function HomeClient() {
  return <div className="bg-black-pure text-text-primary overflow-x-hidden">
    <HomeHero />
    <section id="percorsi" className="scroll-mt-20 border-y border-white/10 bg-black-elevated/30"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Scegli il tuo percorso</p><h2 className="text-3xl md:text-5xl mb-10">Cosa vuoi organizzare?</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">{audiences.map(([title, text, href]) => <Link key={title} href={href} className="group bg-black-pure p-7 md:p-8 min-h-52 hover:bg-black-soft transition-colors"><h3 className="text-xl leading-tight group-hover:text-accent-gold transition-colors">{title}</h3><p className="text-base text-text-secondary leading-relaxed mt-4">{text}</p><ArrowRight size={17} aria-hidden="true" className="mt-8 text-accent-gold group-hover:translate-x-2 transition-transform" /></Link>)}</div></div></section>
    <section id="esperienze" className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Il format principale</p><div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center"><div className="lg:col-span-7"><h2 className="text-4xl md:text-7xl leading-[.9]">Una cena.<br /><span className="text-accent-gold italic">Un bugiardo.</span><br />Nessun attore.</h2></div><div className="lg:col-span-5 text-text-secondary text-base md:text-lg leading-relaxed"><p>Una persona sta mentendo. Tutti gli altri devono capire chi.</p><p className="mt-5">Durante la cena ricevi informazioni riservate, osservi gli altri partecipanti, crei alleanze e prima del finale devi decidere di chi fidarti.</p><Link href="/format/a-cena-con-il-bugiardo" className="inline-flex items-center gap-3 mt-8 text-accent-gold font-syne text-xs uppercase tracking-[.12em] hover:text-white transition-colors">Scopri A Cena con il Bugiardo <ArrowRight size={16} /></Link></div></div></section>
    <section className="border-y border-white/10 bg-black-elevated/20"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28"><div className="flex flex-wrap items-end justify-between gap-6 mb-12"><div><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Format</p><h2 className="text-4xl md:text-6xl">Le esperienze</h2></div><Link href="/format" className="text-accent-gold font-syne text-xs uppercase tracking-[.12em]">Vedi tutti i format <ArrowRight size={15} className="inline ml-2" /></Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{EXPERIMENTS.map((exp) => <Link href={exp.href} key={exp.id} className="group relative min-h-105 overflow-hidden border border-white/10"><Image src={exp.image} alt={exp.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover opacity-45 grayscale group-hover:opacity-65 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-accent-gold text-xs uppercase tracking-[.15em] mb-3">{exp.badge}</p><h3 className="text-2xl leading-none group-hover:text-accent-gold transition-colors">{exp.name}</h3><p className="text-sm text-zinc-300 mt-3">{exp.subtitle}</p></div></Link>)}</div></div></section>
    <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32"><div className="grid lg:grid-cols-12 gap-12"><div className="lg:col-span-4"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Come lavoriamo</p><h2 className="text-4xl md:text-6xl">Il Metodo<br /><span className="text-accent-gold italic">BBL</span></h2><p className="text-text-secondary leading-relaxed mt-7 max-w-sm">Non ripartiamo da zero ogni volta. Usiamo format e sistemi proprietari, poi li personalizziamo per il tuo evento.</p></div><div className="lg:col-span-8 grid sm:grid-cols-2 gap-0 border-t border-white/10">{method.map(([n, title, text]) => <div key={n} className="border-b border-white/10 py-7 pr-6"><span className="text-accent-gold font-syne text-xs">{n}</span><h3 className="text-xl mt-3">{title}</h3><p className="text-base text-text-secondary mt-2 leading-relaxed">{text}</p></div>)}</div></div></section>
    <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-36 text-center"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-6">Il prossimo passo</p><h2 className="text-5xl md:text-8xl max-w-4xl mx-auto">Facciamo succedere qualcosa.</h2><Link href="/contatti" className="inline-flex items-center gap-3 mt-10 bg-accent-gold text-black-pure px-8 py-5 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white transition-colors">{QUOTE_LABEL} <ArrowRight size={16} /></Link></section>
  </div>;
}
