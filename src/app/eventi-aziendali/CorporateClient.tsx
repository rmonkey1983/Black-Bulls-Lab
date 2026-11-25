"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { CORPORATE_APPLICATIONS, CORPORATE_BENEFITS, CORPORATE_FAQS, CORPORATE_METHOD, CORPORATE_NEXT_STEPS } from "./corporateContent";
import { trackLead } from "@/lib/analytics";
import { QUOTE_LABEL } from "@/lib/quote";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";
import { Field, INPUT_CLASS, LABEL_CLASS } from "@/components/forms/Field";

export function CorporateClient() {
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
        phone: String(form.get("phone") || "").trim(),
        eventType: "Evento aziendale",
        guests,
        location,
        period,
        objective: message,
        b_contact_name: String(form.get("b_contact_name") || ""),
      });
      setStatus(result.success ? "Richiesta inviata. Ti ricontatteremo presto." : result.error || "Controlla i dati inseriti.");
      if (result.success) trackLead("corporate");
      if (result.success) formElement.reset();
    } catch {
      setStatus("Errore di connessione. I dati sono conservati: riprova.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <div className="bg-black-pure text-text-primary min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <Image src="/images/brand/bg-stage-lights.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-linear-to-t from-black-pure via-black-pure/70 to-black-pure/30" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-32 pb-14 md:pt-40 md:pb-20">
          <p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-5">Aziende · Torino e Piemonte</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-5xl leading-[.95]">Team building ed eventi aziendali a Torino che fanno <span className="text-accent-gold italic">interagire</span> le persone.</h1>
          <p className="max-w-2xl text-lg text-zinc-200 leading-relaxed mt-6">Format dal vivo per cene aziendali, kick-off ed eventi interni: i partecipanti non assistono, entrano nell&apos;esperienza insieme ai colleghi.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="#richiesta" className="inline-flex min-h-12 items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href={buildWAUrl(WA_MESSAGES.corporate)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 text-white px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"><MessageSquare size={16} aria-hidden="true" /> Scrivici su WhatsApp</a>
          </div>
        </div>
      </section>

      <section id="richiesta" className="scroll-mt-20 border-b border-white/10 bg-black-elevated/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-14 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl">Richiedi un preventivo per la tua azienda</h2>
            <p className="text-text-secondary leading-relaxed mt-5">Bastano pochi dati per iniziare. Inviare la richiesta non comporta alcun pagamento.</p>
            <ol className="mt-8 space-y-5">
              {CORPORATE_NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="text-accent-gold font-syne text-sm pt-0.5" aria-hidden="true">{index + 1}</span>
                  <span className="text-zinc-200 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <form aria-busy={pending} onSubmit={handleSubmit} className="lg:col-span-7 space-y-5" aria-label="Richiesta evento aziendale">
            <input type="text" name="b_contact_name" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="corporate-name" name="name" label="Nome e cognome *" autoComplete="name" required />
              <Field id="corporate-company" name="company" label="Azienda *" autoComplete="organization" required />
              <Field id="corporate-email" name="email" label="Email *" type="email" autoComplete="email" required />
              <Field id="corporate-phone" name="phone" label="Telefono (facoltativo)" type="tel" autoComplete="tel" />
              <Field id="corporate-guests" name="guests" label="Numero di partecipanti (facoltativo)" />
              <Field id="corporate-period" name="period" label="Data o periodo (facoltativo)" />
            </div>
            <Field id="corporate-location" name="location" label="Città o location (facoltativo)" />
            <label className="block">
              <span className={LABEL_CLASS}>Che evento vuoi organizzare? *</span>
              <textarea id="corporate-message" name="message" required rows={4} placeholder="Occasione, obiettivo e altri dettagli utili" className={INPUT_CLASS} />
            </label>
            <button className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-accent-gold text-black-pure px-7 py-4 font-syne text-sm font-bold uppercase tracking-[.12em] hover:bg-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" disabled={pending} type="submit">{pending ? "Invio in corso…" : QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></button>
            <p className="text-sm text-text-secondary">Inviando la richiesta, dichiari di aver letto la <Link href="/privacy-policy" className="underline hover:text-accent-gold">Privacy Policy</Link>.</p>
            <p role="status" aria-live="polite" className="text-base text-accent-gold min-h-6">{status}</p>
          </form>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl max-w-4xl mb-9">Cosa cambia rispetto a una cena o a un evento passivo</h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {CORPORATE_BENEFITS.map(([title, text]) => (
            <div key={title} className="bg-black-pure p-7 md:p-8"><h3 className="text-xl md:text-2xl">{title}</h3><p className="text-text-secondary leading-relaxed mt-3">{text}</p></div>
          ))}
        </div>
        <h3 className="text-xl mt-12 mb-4">Per quali eventi</h3>
        <ul className="flex flex-wrap gap-3">{CORPORATE_APPLICATIONS.map((item) => <li key={item} className="border border-white/20 px-4 py-3 text-base text-zinc-200">{item}</li>)}</ul>
      </section>

      <section className="border-y border-white/10 bg-black-elevated/25">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7"><p className="text-accent-gold text-xs uppercase tracking-[.2em] mb-4">Un format da cui partire</p><h2 className="text-3xl md:text-5xl">A Cena con il Bugiardo, per la tua azienda</h2></div>
          <div className="lg:col-span-5"><p className="text-text-secondary text-lg leading-relaxed">Una cena interattiva in cui il tavolo deve capire chi sta mentendo. Non servono recitazione né esperienza. In alternativa costruiamo una proposta adatta al contesto aziendale.</p><Link href="/format/a-cena-con-il-bugiardo" className="inline-flex min-h-11 items-center gap-3 mt-5 text-accent-gold font-syne text-xs font-bold uppercase tracking-[.12em] hover:text-white">Come funziona il format <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl mb-9">Come lavoriamo</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-white/10">{CORPORATE_METHOD.map(([number, title, text]) => <li key={number} className="border-b border-white/10 py-6"><span className="text-accent-gold font-syne text-sm" aria-hidden="true">{number}</span><h3 className="text-xl mt-2">{title}</h3><p className="text-base text-text-secondary leading-relaxed mt-2">{text}</p></li>)}</ol>
      </section>

      <section className="border-t border-white/10 bg-black-elevated/25"><div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24"><h2 className="text-3xl md:text-5xl mb-9">Domande frequenti</h2><div className="divide-y divide-white/10 border-y border-white/10">{CORPORATE_FAQS.map((faq) => <details key={faq.question} className="py-5 group"><summary className="cursor-pointer pr-2 text-lg font-medium group-open:text-accent-gold">{faq.question}</summary><p className="text-text-secondary leading-relaxed mt-3 max-w-3xl">{faq.answer}</p></details>)}</div><Link href="#richiesta" className="inline-flex min-h-12 items-center gap-3 mt-10 bg-accent-gold text-black-pure px-7 py-4 font-syne text-xs font-bold uppercase tracking-[.12em] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{QUOTE_LABEL} <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </div>
  );
}
