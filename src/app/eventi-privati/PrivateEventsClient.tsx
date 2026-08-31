"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { PRIVATE_OCCASIONS, PRIVATE_FORMATS, PRIVATE_PROCESS, PRIVATE_PARTY_FAQS } from "./privateContent";
import { trackLead } from "@/lib/analytics";

const inputClass = "w-full rounded-sm border border-white/15 bg-black-pure px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold";

export function PrivateEventsClient() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await submitContactForm({
      name: String(form.get("name") || "").trim(), email: String(form.get("email") || "").trim(),
      leadType: "private",
      phone: String(form.get("phone") || "").trim(),
      eventType: String(form.get("partyType") || "").trim(),
      guests: String(form.get("guests") || "").trim(),
      location: String(form.get("location") || "").trim(),
      format: String(form.get("format") || "").trim(),
      period: String(form.get("period") || "").trim(),
      message: String(form.get("details") || "").trim(),
      b_contact_name: String(form.get("b_contact_name") || ""),
    });
    setStatus(result.success ? "Richiesta inviata. Ti ricontatteremo presto." : result.error || "Controlla i dati inseriti.");
    if (result.success) trackLead("private");
    if (result.success) event.currentTarget.reset();
  }

  return (
    <div className="bg-black-pure text-text-primary">
      <section className="relative min-h-[68svh] flex items-end overflow-hidden border-b border-white/10">
        <Image src="/images/brand/bg-hero-wide.webp" alt="Feste private a Torino con Black Bulls Lab" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/75 to-black-pure/20" />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-24">
          <p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Black Bulls Lab · Feste private · Torino</p>
          <h1 className="max-w-5xl text-5xl md:text-8xl leading-[.9]">Feste private a Torino con i tuoi invitati <span className="text-accent-gold italic">protagonisti.</span></h1>
          <p className="max-w-3xl text-lg text-text-secondary leading-relaxed mt-7">Black Bulls Lab crea format ed esperienze dal vivo per feste private a Torino e in Piemonte: gli invitati partecipano, interagiscono e contribuiscono a ciò che succede.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9"><a href="#proposta" className="inline-flex items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.16em] focus-visible:ring-2 focus-visible:ring-white">Raccontaci la tua festa <ArrowRight size={16} /></a><a href="https://wa.me/393342010067" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 border border-white/20 px-7 py-4 font-syne text-xs uppercase tracking-[.16em] hover:border-accent-gold focus-visible:ring-2 focus-visible:ring-accent-gold"><MessageSquare size={16} /> Scrivici su WhatsApp</a></div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Cosa stai festeggiando?</p><h2 className="text-4xl md:text-6xl max-w-4xl mb-10">Un’occasione da vivere insieme.</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">{PRIVATE_OCCASIONS.map((item, index) => <div key={item} className="bg-black-pure p-7"><span className="text-accent-gold font-syne text-sm">0{index + 1}</span><h3 className="text-xl mt-5">{item}</h3></div>)}</div></section>

      <section className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-2 gap-12"><div><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Perché BBL</p><h2 className="text-4xl md:text-6xl">La festa prende forma attorno alle persone.</h2></div><div className="grid sm:grid-cols-2 gap-6 text-text-secondary leading-relaxed">{["Format proprietari", "Invitati protagonisti", "Regia BBL", "Personalizzazione"].map((item, index) => <div key={item} className="border-t border-white/15 pt-4"><span className="text-accent-gold font-syne text-sm">0{index + 1}</span><h3 className="text-white text-xl mt-3">{item}</h3><p className="mt-2 text-sm">{index === 0 ? "Esperienze dal vivo pensate per creare interazione." : index === 1 ? "Ogni invitato può contribuire alla serata con il proprio modo di partecipare." : index === 2 ? "Coordiniamo tempi, conduzione e dinamiche dell’esperienza." : "Adattiamo proposta e dettagli all’occasione."}</p></div>)}</div></div></section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Format</p><h2 className="text-4xl md:text-6xl mb-10">Scegli da dove partire.</h2><div className="grid md:grid-cols-2 gap-6">{PRIVATE_FORMATS.map((format) => <article key={format.name} className="border border-white/10 p-7 md:p-9"><h3 className="text-2xl">{format.name}</h3><p className="text-text-secondary leading-relaxed mt-4">{format.description}</p>{format.href ? <Link href={format.href} className="inline-flex items-center gap-2 mt-6 text-accent-gold font-syne text-xs uppercase tracking-[.16em] hover:text-white">Scopri il format <ArrowRight size={15} /></Link> : <p className="text-accent-gold text-xs uppercase tracking-[.16em] mt-6">Proposta da definire</p>}</article>)}</div></section>

      <section className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-12 gap-10"><div className="lg:col-span-4"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Come lavoriamo</p><h2 className="text-4xl md:text-6xl">Metodo BBL.</h2></div><ol className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8">{PRIVATE_PROCESS.map(([number, title, text]) => <li key={number} className="border-t border-white/15 py-5"><span className="text-accent-gold font-syne text-sm">{number}</span><h3 className="text-xl mt-2">{title}</h3><p className="text-sm text-text-secondary mt-2 leading-relaxed">{text}</p></li>)}</ol></div></section>

      <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Info pratiche</p><h2 className="text-4xl md:text-6xl mb-6">Dettagli definiti con la proposta.</h2><p className="text-lg text-text-secondary leading-relaxed">Partecipanti, durata, location, tecnologia e gestione food &amp; beverage dipendono dal format e dal contesto della festa. Li definiamo insieme prima della proposta, senza pubblicare dati non confermati.</p></section>

      <section className="max-w-[1000px] mx-auto px-6 md:px-12 pb-16 md:pb-24"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Domande frequenti</p><h2 className="text-4xl md:text-6xl mb-10">Prima di organizzare.</h2><div className="divide-y divide-white/10 border-y border-white/10">{PRIVATE_PARTY_FAQS.map((faq) => <details key={faq.question} className="py-5 group"><summary className="cursor-pointer list-none pr-8 text-lg font-medium group-open:text-accent-gold">{faq.question}</summary><p className="text-text-secondary leading-relaxed mt-3 max-w-3xl">{faq.answer}</p></details>)}</div></section>

      <section id="proposta" className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-2 gap-10"><div><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Proposta privata</p><h2 className="text-4xl md:text-6xl">Raccontaci la tua festa.</h2><p className="text-text-secondary leading-relaxed mt-6">Nessun pagamento ora: raccogliamo le informazioni e definiamo con te format, data e location.</p></div><form onSubmit={handleSubmit} className="space-y-4" aria-label="Richiesta festa privata"><input type="text" name="b_contact_name" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><label className="sr-only" htmlFor="private-name">Nome e cognome</label><input id="private-name" name="name" required placeholder="Nome e cognome" autoComplete="name" className={inputClass} /><label className="sr-only" htmlFor="private-email">Email</label><input id="private-email" name="email" type="email" required placeholder="Email" autoComplete="email" className={inputClass} /><label className="sr-only" htmlFor="private-phone">Telefono</label><input id="private-phone" name="phone" type="tel" placeholder="Telefono" autoComplete="tel" className={inputClass} /><label className="sr-only" htmlFor="private-party-type">Tipo evento</label><select id="private-party-type" name="partyType" required className={inputClass} defaultValue=""><option value="" disabled>Tipo evento</option>{PRIVATE_OCCASIONS.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="private-guests">Numero indicativo invitati</label><input id="private-guests" name="guests" required placeholder="Numero indicativo invitati" inputMode="numeric" className={inputClass} /><label className="sr-only" htmlFor="private-location">Città o location</label><input id="private-location" name="location" required placeholder="Città o location" className={inputClass} /><label className="sr-only" htmlFor="private-format">Format preferito</label><select id="private-format" name="format" required className={inputClass} defaultValue=""><option value="" disabled>Format preferito</option>{PRIVATE_FORMATS.map((item) => <option key={item.name}>{item.name}</option>)}</select><label className="sr-only" htmlFor="private-period">Data o periodo</label><input id="private-period" name="period" required placeholder="Data o periodo indicativo" className={inputClass} /><label className="sr-only" htmlFor="private-details">Dettagli</label><textarea id="private-details" name="details" required rows={5} placeholder="Raccontaci i dettagli della festa" className={inputClass} /><button type="submit" className="inline-flex items-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.16em] hover:bg-white focus-visible:ring-2 focus-visible:ring-white">Raccontaci la tua festa <ArrowRight size={16} /></button><p role="status" aria-live="polite" className="min-h-6 text-sm text-accent-gold">{status}</p></form></div></section>
    </div>
  );
}
