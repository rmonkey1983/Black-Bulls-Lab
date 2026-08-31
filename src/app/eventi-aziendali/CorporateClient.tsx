"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { CORPORATE_APPLICATIONS, CORPORATE_FAQS, CORPORATE_METHOD } from "./corporateContent";
import { trackLead } from "@/lib/analytics";

export function CorporateClient() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const company = String(form.get("company") || "").trim();
    const guests = String(form.get("guests") || "").trim();
    const location = String(form.get("location") || "").trim();
    const period = String(form.get("period") || "").trim();
    const message = String(form.get("message") || "").trim();
    const result = await submitContactForm({
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      leadType: "corporate",
      company,
      eventType: "Evento aziendale",
      guests,
      location,
      period,
      objective: message,
      b_contact_name: "",
    });
    setStatus(result.success ? "Richiesta inviata. Ti ricontatteremo presto." : result.error || "Controlla i dati inseriti.");
    if (result.success) trackLead("corporate");
  }

  return (
    <div className="bg-black-pure text-text-primary min-h-screen">
      <section className="relative min-h-[68svh] flex items-end overflow-hidden border-b border-white/10">
        <Image src="/images/brand/bg-stage-lights.webp" alt="Evento aziendale Black Bulls Lab a Torino" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/80 to-black-pure/20" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-20 md:py-24">
          <p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-5">Black Bulls Lab · Torino</p>
          <h1 className="text-5xl md:text-8xl max-w-5xl leading-[.9]">Team building ed eventi aziendali a Torino che fanno <span className="text-accent-gold italic">interagire</span> le persone.</h1>
          <p className="max-w-2xl text-lg text-text-secondary leading-relaxed mt-7">Black Bulls Lab progetta team building ed eventi aziendali a Torino basati su format dal vivo, interazione tra partecipanti, regia e dinamiche sociali.</p>
          <Link href="#richiesta" className="inline-flex items-center gap-3 mt-9 bg-accent-gold text-black-pure px-8 py-5 font-syne text-xs font-bold uppercase tracking-[.2em] hover:bg-white focus-visible:ring-2 focus-visible:ring-white">Parliamo del tuo evento <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Obiettivi</p><h2 className="text-4xl md:text-6xl max-w-4xl mb-9">Un evento che mette le persone in relazione.</h2><div className="grid md:grid-cols-3 gap-px bg-white/10">{["Partecipazione", "Collaborazione", "Comunicazione e connessione"].map((item, index) => <div key={item} className="bg-black-pure p-7 md:p-8 min-h-44"><span className="text-accent-gold font-syne text-sm">0{index + 1}</span><h3 className="text-2xl mt-5">{item}</h3><p className="text-text-secondary leading-relaxed mt-3">{index === 0 ? "Creare occasioni in cui tutti possano prendere parte all'esperienza." : index === 1 ? "Favorire scambio e collaborazione attraverso una situazione condivisa." : "Aprire conversazioni e connessioni fuori dalla routine."}</p></div>)}</div></section>

      <section className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Esperienze</p><div className="grid lg:grid-cols-12 gap-10 items-end"><div className="lg:col-span-7"><h2 className="text-4xl md:text-6xl">Format live, cena e interazione.</h2></div><div className="lg:col-span-5"><p className="text-text-secondary text-lg leading-relaxed">Partiamo da un format esistente, come A Cena con il Bugiardo, oppure costruiamo una proposta adatta al contesto aziendale.</p><Link href="/format/a-cena-con-il-bugiardo" className="inline-flex items-center gap-3 mt-7 text-accent-gold font-syne text-xs uppercase tracking-[.2em] hover:text-white">Scopri A Cena con il Bugiardo <ArrowRight size={16} /></Link></div></div></div></section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><div className="grid lg:grid-cols-12 gap-10"><div className="lg:col-span-4"><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Metodo BBL</p><h2 className="text-4xl md:text-6xl">Dall&apos;idea alla regia live.</h2><p className="text-text-secondary leading-relaxed mt-6">Un percorso chiaro per trasformare un obiettivo aziendale in un&apos;esperienza condivisa.</p></div><div className="lg:col-span-8 grid sm:grid-cols-2 border-t border-white/10">{CORPORATE_METHOD.map(([number, title, text]) => <div key={number} className="border-b border-white/10 py-6 pr-6"><span className="text-accent-gold font-syne text-sm">{number}</span><h3 className="text-xl mt-3">{title}</h3><p className="text-sm text-text-secondary leading-relaxed mt-2">{text}</p></div>)}</div></div></section>

      <section className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-20"><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Per quali eventi?</p><div className="flex flex-wrap gap-3">{CORPORATE_APPLICATIONS.map((item) => <span key={item} className="border border-white/15 px-4 py-3 text-sm text-text-secondary">{item}</span>)}</div></div></section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Domande frequenti</p><h2 className="text-4xl md:text-6xl mb-10">Prima di parlarne.</h2><div className="divide-y divide-white/10 border-y border-white/10">{CORPORATE_FAQS.map((faq) => <details key={faq.question} className="py-5 group"><summary className="cursor-pointer list-none pr-8 text-lg font-medium group-open:text-accent-gold">{faq.question}</summary><p className="text-text-secondary leading-relaxed mt-3 max-w-3xl">{faq.answer}</p></details>)}</div></section>

      <section id="richiesta" className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-2 gap-10"><div><p className="text-accent-gold text-xs uppercase tracking-[.28em] mb-4">Progetto su misura</p><h2 className="text-4xl md:text-6xl">Parliamo del tuo evento.</h2><p className="text-text-secondary leading-relaxed mt-6">Con contatti, partecipanti, location, periodo e obiettivo possiamo iniziare a definire la proposta.</p></div><form onSubmit={handleSubmit} className="space-y-4" aria-label="Richiesta evento aziendale"><label className="block"><span className="sr-only">Nome e cognome</span><input id="corporate-name" name="name" required placeholder="Nome e cognome" aria-label="Nome e cognome" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Email</span><input id="corporate-email" name="email" type="email" required placeholder="Email" aria-label="Email" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Azienda</span><input id="corporate-company" name="company" required placeholder="Azienda" aria-label="Azienda" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Numero partecipanti</span><input id="corporate-guests" name="guests" placeholder="Numero partecipanti" aria-label="Numero partecipanti" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Città o location</span><input id="corporate-location" name="location" placeholder="Città o location" aria-label="Città o location" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Periodo indicativo</span><input id="corporate-period" name="period" placeholder="Periodo indicativo" aria-label="Periodo indicativo" className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><label className="block"><span className="sr-only">Obiettivo o messaggio</span><textarea id="corporate-message" name="message" required placeholder="Obiettivo o messaggio" aria-label="Obiettivo o messaggio" rows={5} className="w-full bg-black-pure border border-white/15 px-4 py-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold" /></label><button className="inline-flex items-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.2em] hover:bg-white focus-visible:ring-2 focus-visible:ring-white" type="submit">Parliamo del tuo evento <ArrowRight size={16} /></button><p role="status" aria-live="polite" className="text-sm text-accent-gold min-h-5">{status}</p></form></div></section>
    </div>
  );
}
