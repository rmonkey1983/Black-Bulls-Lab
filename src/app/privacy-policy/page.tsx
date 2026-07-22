import React from "react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export const metadata = {
  title: "Privacy Policy | Black Bulls Lab",
  description: "Informativa sulla privacy e trattamento dei dati personali del Black Bulls Lab e delle liste d'attesa dei format.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black pb-24 text-zinc-300 font-sans">
      <ImmersiveHeader
        id="privacy-hero"
        title="PRIVACY"
        highlight="Policy"
        subtitle="Trasparenza, protezione dei dati e rispetts della tua privacy."
        mediaUrl="/images/brand/bg-stage-lights.webp"
      />

      <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl space-y-12">
          
          <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-xl text-amber-300 text-xs leading-relaxed">
            <strong>Nota di Revisione Legale (Versione Informativa v1.0):</strong> Questa informativa descrive le modalità tecniche di trattamento dei dati raccolti tramite il sito e la lista d&apos;attesa del format &quot;A Cena con il Bugiardo&quot;. Verificare con la propria consulenza legale la conformità alle specifiche normative locali prima del lancio commerciale.
          </div>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">1. Titolare del Trattamento</h2>
            <p className="leading-relaxed">
              Il Titolare del Trattamento è <strong>Black Bulls Lab</strong>, con sede a Torino (TO). Per qualsiasi richiesta relativa alla protezione dei dati personali o per l&apos;esercizio dei diritti previsti dal GDPR, puoi contattarci all&apos;indirizzo email: <a href="mailto:info@blackbullslab.com" className="text-accent-gold underline">info@blackbullslab.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">2. Dati Raccolti e Liste d&apos;Attesa</h2>
            <p className="leading-relaxed">
              Tramite la landing page ed i moduli di iscrizione alle liste d&apos;attesa (in particolare per il format <em>&quot;A Cena con il Bugiardo&quot;</em>), raccogliamo i seguenti dati:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm">
              <li><strong>Dati Anagrafici e di Contatto:</strong> Nome, Cognome, Indirizzo Email, Numero di Telefono / WhatsApp, Città di provenienza.</li>
              <li><strong>Preferenze Partecipazione:</strong> Numero indicativo di partecipanti al gruppo.</li>
              <li><strong>Dati di Navigazione e Provenienza:</strong> Pagina di atterraggio, URL referrer, parametri di campagna promozionale (UTM) ed eventuale identificatore di origine.</li>
              <li><strong>Dati Tecnici di Sicurezza:</strong> Token di verifica Cloudflare Turnstile per la protezione anti-spam e il timestamp di rilascio del consenso.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">3. Finalità e Base Giuridica</h2>
            <ul className="list-disc pl-6 space-y-3 text-zinc-400 text-sm">
              <li>
                <strong>Gestione Lista d&apos;Attesa ed Evento:</strong> I dati di contatto vengono utilizzati per gestire la pre-iscrizione alle sessioni pilota, inviare aggiornamenti sull&apos;apertura delle prenotazioni e comunicare data e location dell&apos;evento. <em>Base giuridica: Esecuzione di misure precontrattuali su richiesta dell&apos;interessato.</em>
              </li>
              <li>
                <strong>Comunicazioni di Marketing (Facoltativo):</strong> Previor esplicito e separato consenso, possiamo inviare aggiornamenti su futuri eventi, nuovi format e iniziative speciali di Black Bulls Lab via Email o WhatsApp. <em>Base giuridica: Consenso dell&apos;interessato (revocabile in qualsiasi momento).</em>
              </li>
              <li>
                <strong>Sicurezza e Prevenzione Abusi:</strong> Utilizziamo Cloudflare Turnstile per prevenire invii automatizzati o fraudolenti. <em>Base giuridica: Legittimo interesse del Titolare a garantire la sicurezza della piattaforma.</em>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">4. Piattaforme e Servizi Terzi</h2>
            <p className="leading-relaxed text-sm">
              I dati vengono memorizzati in modo sicuro attraverso infrastrutture database gestite tramite <strong>Supabase Inc.</strong>, nel rispetto delle normative europee di protezione dati. La protezione dei form è affidata a <strong>Cloudflare Inc.</strong> (Turnstile).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">5. Conservazione e Diritti dell&apos;Interessato</h2>
            <p className="leading-relaxed text-sm">
              I dati della lista d&apos;attesa saranno conservati per il tempo strettamente necessario all&apos;organizzazione della sessione e comunque non oltre 12 mesi dalla raccolta, salvo revoca o richiesta di cancellazione. In qualsiasi momento puoi richiedere l&apos;accesso, la rettifica, la cancellazione o la limitazione del trattamento scrivendo a <a href="mailto:info@blackbullslab.com" className="text-accent-gold underline">info@blackbullslab.com</a>.
            </p>
          </section>

          <footer className="pt-8 border-t border-white/5 text-xs text-zinc-500 italic">
            Ultimo aggiornamento: Luglio 2026. Versione Informativa Privacy v1.0 per Liste d&apos;Attesa Liar System.
          </footer>
        </div>
      </div>
    </main>
  );
}
