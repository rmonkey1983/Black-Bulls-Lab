import React from "react";
import type { Metadata } from "next";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Black Bulls Lab" },
  description: "Informativa sulla privacy e trattamento dei dati personali del Black Bulls Lab e delle liste d'attesa dei format.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Black Bulls Lab",
    description: "Informativa sulla privacy e trattamento dei dati personali del Black Bulls Lab e delle liste d'attesa dei format.",
    url: "/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy | Black Bulls Lab",
    description: "Informativa sulla privacy e trattamento dei dati personali del Black Bulls Lab e delle liste d'attesa dei format.",
  },
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
              I dati vengono memorizzati in modo sicuro attraverso infrastrutture database gestite tramite <strong>Supabase Inc.</strong>, nel rispetto delle normative europee di protezione dati. La protezione dei form è affidata a <strong>Cloudflare Inc.</strong> (Turnstile). Per gli analytics del sito, Google Analytics 4 di <strong>Google LLC</strong> viene caricato solo dopo il consenso alla categoria analytics. Il rifiuto mantiene Google Analytics disabilitato.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">5. Analytics e Consenso</h2>
            <p className="leading-relaxed text-sm">
              Google Analytics 4 è utilizzato per comprendere l&apos;utilizzo del sito e le prestazioni dei contenuti. Gli eventi BBL inviati al servizio non contengono nome, email, telefono, azienda, messaggio, identificativo utente o altri dati personali provenienti dai moduli. L&apos;archiviazione analytics è negata prima del consenso e resta negata dopo il rifiuto; con il consenso analytics viene abilitata. I segnali pubblicitari <code>ad_storage</code>, <code>ad_user_data</code> e <code>ad_personalization</code> restano negati.
            </p>
            <p className="leading-relaxed text-sm">
              Il consenso può essere modificato o revocato tramite “Preferenze Cookie” nel footer. Nelle impostazioni attuali di Google Analytics 4, gli eventi e i dati utente sono configurati per una conservazione di 14 mesi; il reset del periodo di conservazione con una nuova attività dell&apos;utente è disattivato. Per ulteriori informazioni, consulta la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-accent-gold underline">Privacy Policy di Google</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">6. Conservazione e Diritti dell&apos;Interessato</h2>
            <p className="leading-relaxed text-sm">
              I dati della lista d&apos;attesa saranno conservati per il tempo strettamente necessario all&apos;organizzazione della sessione e comunque non oltre 12 mesi dalla raccolta, salvo revoca o richiesta di cancellazione. In qualsiasi momento puoi richiedere l&apos;accesso, la rettifica, la cancellazione o la limitazione del trattamento scrivendo a <a href="mailto:info@blackbullslab.com" className="text-accent-gold underline">info@blackbullslab.com</a>.
            </p>
          </section>

          <footer className="pt-8 border-t border-white/5 text-xs text-zinc-500 italic">
            Ultimo aggiornamento: 30 agosto 2026. Versione informativa 1.1.
          </footer>
        </div>
      </div>
    </main>
  );
}
