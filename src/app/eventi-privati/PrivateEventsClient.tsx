"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { PRIVATE_BENEFITS, PRIVATE_FORMATS, PRIVATE_NEXT_STEPS, PRIVATE_OCCASIONS, PRIVATE_PARTY_FAQS, PRIVATE_PROCESS } from "./privateContent";
import { Field, INPUT_CLASS, LABEL_CLASS, SelectField } from "@/components/forms/Field";
import { trackLead } from "@/lib/analytics";
import { QUOTE_LABEL } from "@/lib/quote";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function PrivateEventsClient() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const formElement = event.currentTarget;
    submitting.current = true;
    setPending(true);
    setStatus("Invio in corso…");
    try {
      const form = new FormData(formElement);
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
      if (result.success) formElement.reset();
    } catch {
      setStatus("Errore di connessione. I dati sono conservati: riprova.");
    } finally {
      submitting.current = false;
      setPending(false);
    }

  }

  return (
    <div className="bg-black-pure text-text-primary">
      <section className="relative overflow-hidden border-b border-white/10">
        <Image src="/images/brand/bg-hero-wide.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-linear-to-t from-black-pure via-black-pure/70 to-black-pure/30" />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-14 md:pt-40 md:pb-20">
          <p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Feste private · Torino e Piemonte</p>
          <h1 className="max-w-5xl text-4xl md:text-6xl lg:text-7xl leading-[.95]">Feste private a Torino con i tuoi invitati <span className="text-accent-gold italic">protagonisti.</span></h1>
          <p className="max-w-2xl text-lg text-zinc-200 leading-relaxed mt-6">Format dal vivo per compleanni, lauree e ricorrenze: gli invitati partecipano, interagiscono e contribuiscono a ciò che succede.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="#proposta" className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></a>
            <a href={buildWAUrl(WA_MESSAGES.privati)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 text-white px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"><MessageSquare size={16} aria-hidden="true" /> Scrivici su WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="proposta" className="scroll-mt-20 border-b border-white/10 bg-black-elevated/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl">Richiedi un preventivo per la tua festa</h2>
            <p className="text-text-secondary leading-relaxed mt-5">Bastano pochi dati per iniziare. Nessun pagamento ora.</p>
            <ol className="mt-8 space-y-5">
              {PRIVATE_NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="text-accent-gold font-syne text-sm pt-0.5" aria-hidden="true">{index + 1}</span>
                  <span className="text-zinc-200 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <form aria-busy={pending} onSubmit={handleSubmit} className="lg:col-span-7 space-y-5" aria-label="Richiesta festa privata">
            <input type="text" name="b_contact_name" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="private-name" name="name" label="Nome e cognome *" autoComplete="name" required />
              <Field id="private-email" name="email" label="Email *" type="email" autoComplete="email" required />
              <Field id="private-phone" name="phone" label="Telefono (facoltativo)" type="tel" autoComplete="tel" />
              <SelectField id="private-party-type" name="partyType" label="Occasione (facoltativo)" defaultValue=""><option value="">Scegli</option>{PRIVATE_OCCASIONS.map((item) => <option key={item}>{item}</option>)}</SelectField>
              <Field id="private-guests" name="guests" label="Numero di invitati (facoltativo)" />
              <Field id="private-period" name="period" label="Data o periodo (facoltativo)" />
              <Field id="private-location" name="location" label="Città o location (facoltativo)" />
              <SelectField id="private-format" name="format" label="Format preferito (facoltativo)" defaultValue=""><option value="">Non ho ancora deciso</option>{PRIVATE_FORMATS.map((item) => <option key={item.name}>{item.name}</option>)}</SelectField>
            </div>
            <label className="block">
              <span className={LABEL_CLASS}>Che festa vuoi organizzare? *</span>
              <textarea id="private-details" name="details" required rows={4} placeholder="Occasione, idea della serata e altri dettagli utili" className={INPUT_CLASS} />
            </label>
            <button disabled={pending} type="submit" className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-sm font-bold uppercase tracking-[.12em] hover:bg-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{pending ? "Invio in corso…" : QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></button>
            <p className="text-sm text-text-secondary">Inviando la richiesta, dichiari di aver letto la <Link href="/privacy-policy" className="underline hover:text-accent-gold">Privacy Policy</Link>.</p>
            <p role="status" aria-live="polite" className="text-base text-accent-gold min-h-6">{status}</p>
          </form>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl max-w-4xl mb-9">Una festa che prende forma attorno alle persone</h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/10">{PRIVATE_BENEFITS.map(([title, text]) => <div key={title} className="bg-black-pure p-7 md:p-8"><h3 className="text-xl md:text-2xl">{title}</h3><p className="text-text-secondary leading-relaxed mt-3">{text}</p></div>)}</div>
        <h3 className="text-xl mt-12 mb-4">Per quali occasioni</h3>
        <ul className="flex flex-wrap gap-3">{PRIVATE_OCCASIONS.map((item) => <li key={item} className="border border-white/20 px-4 py-3 text-base text-zinc-200">{item}</li>)}</ul>
      </section>

      <section className="border-y border-white/10 bg-black-elevated/25"><div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><h2 className="text-3xl md:text-5xl mb-9">Scegli da dove partire</h2><div className="grid md:grid-cols-2 gap-6">{PRIVATE_FORMATS.map((format) => <article key={format.name} className="border border-white/15 p-7 md:p-9"><h3 className="text-2xl">{format.name}</h3><p className="text-text-secondary leading-relaxed mt-4">{format.description}</p>{format.href ? <Link href={format.href} className="inline-flex min-h-11 items-center gap-2 mt-4 text-accent-gold font-syne text-xs font-bold uppercase tracking-[.12em] hover:text-white">Scopri il format <ArrowRight size={15} aria-hidden="true" /></Link> : <a href="#proposta" className="inline-flex min-h-11 items-center gap-2 mt-4 text-accent-gold font-syne text-xs font-bold uppercase tracking-[.12em] hover:text-white">Raccontaci la tua idea <ArrowRight size={15} aria-hidden="true" /></a>}</article>)}</div></div></section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24"><h2 className="text-3xl md:text-5xl mb-9">Come lavoriamo</h2><ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-white/10">{PRIVATE_PROCESS.map(([number, title, text]) => <li key={number} className="border-b border-white/10 py-6"><span className="text-accent-gold font-syne text-sm" aria-hidden="true">{number}</span><h3 className="text-xl mt-2">{title}</h3><p className="text-base text-text-secondary mt-2 leading-relaxed">{text}</p></li>)}</ol></section>

      <section className="border-t border-white/10 bg-black-elevated/25"><div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24"><h2 className="text-3xl md:text-5xl mb-9">Domande frequenti</h2><div className="divide-y divide-white/10 border-y border-white/10">{PRIVATE_PARTY_FAQS.map((faq) => <details key={faq.question} className="py-5 group"><summary className="cursor-pointer pr-2 text-lg font-medium group-open:text-accent-gold">{faq.question}</summary><p className="text-text-secondary leading-relaxed mt-3 max-w-3xl">{faq.answer}</p></details>)}</div><a href="#proposta" className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white mt-10">{QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></a></div></section>
    </div>
  );
}
