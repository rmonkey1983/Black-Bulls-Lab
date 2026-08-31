import React from "react";
import type { Metadata } from "next";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export const metadata: Metadata = {
    title: { absolute: "Cookie Policy | Black Bulls Lab" },
    description: "Informativa sull'utilizzo dei cookie della piattaforma Black Bulls Lab.",
    alternates: { canonical: "/cookie-policy" },
    openGraph: {
        title: "Cookie Policy | Black Bulls Lab",
        description: "Informativa sull'utilizzo dei cookie della piattaforma Black Bulls Lab.",
        url: "/cookie-policy",
    },
    twitter: {
        title: "Cookie Policy | Black Bulls Lab",
        description: "Informativa sull'utilizzo dei cookie della piattaforma Black Bulls Lab.",
    },
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-black pb-24 text-zinc-300 font-sans">
            <ImmersiveHeader
                id="cookie-hero"
                title="COOKIE"
                highlight="Policy"
                subtitle="Dettagli tecnici per un&apos;esperienza fluida."
                mediaUrl="/images/brand/bg-stage-lights.webp"
            />

            <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl space-y-12">
                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Cosa sono i Cookie</h2>
                        <p className="leading-relaxed">
                            I cookie sono piccoli file di testo che i siti visitati dall&apos;utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Tipologie di Cookie che utilizziamo</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li><strong>Cookie Tecnici</strong>: Necessari per il corretto funzionamento del sito.</li>
                            <li><strong>Cookie Analitici</strong>: Google Analytics 4 può essere attivato solo dopo il consenso alla categoria analytics, per comprendere come i visitatori interagiscono con i contenuti del sito.</li>
                            <li><strong>Preferenze</strong>: Memorizzano le tue scelte (es. lingua o consensi) per le visite successive.</li>
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Google Analytics 4</h2>
                        <p className="leading-relaxed">
                            Il fornitore del servizio analytics è Google LLC, tramite Google Analytics 4. Il servizio è utilizzato per analizzare l&apos;uso del sito e le prestazioni dei contenuti. Prima di una scelta esplicita, l&apos;archiviazione analytics è disabilitata e Google Analytics non viene caricato. Con il consenso alla categoria analytics, l&apos;archiviazione analytics viene abilitata. I segnali pubblicitari restano disabilitati: <code>ad_storage</code>, <code>ad_user_data</code> e <code>ad_personalization</code> restano negati.
                        </p>
                        <p className="leading-relaxed">
                            Gli eventi di conversione di Black Bulls Lab non inviano a Google Analytics nomi, email, telefoni, aziende, messaggi, identificativi utente o altri dati personali inseriti nei moduli.
                        </p>
                        <ul className="list-disc pl-6 space-y-3">
                            <li><strong>Categoria</strong>: analytics.</li>
                            <li><strong>Consenso</strong>: espresso tramite il banner Cookie; il rifiuto mantiene Google Analytics disabilitato.</li>
                            <li><strong>Revoca o modifica</strong>: puoi riaprire “Preferenze Cookie” dal footer e modificare la scelta.</li>
                            <li><strong>Conservazione</strong>: nelle impostazioni attuali di Google Analytics 4, gli eventi e i dati utente sono configurati per una conservazione di 14 mesi. Il reset del periodo di conservazione con una nuova attività dell&apos;utente è disattivato.</li>
                        </ul>
                        <p className="leading-relaxed">
                            Per informazioni sul trattamento dei dati da parte di Google, consulta la <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-accent-gold underline">Privacy Policy di Google</a>.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Gestione dei Consensi</h2>
                        <p className="leading-relaxed">
                            Al tuo primo accesso, un banner ti permetterà di scegliere quali categorie attivare. Puoi modificare la scelta in qualsiasi momento tramite “Preferenze Cookie” nel footer.
                        </p>
                    </section>

                    <footer className="pt-12 border-t border-white/5 text-sm text-zinc-500 italic">
                        Il laboratorio rispetta la tua privacy. Ultimo aggiornamento: 30 agosto 2026.
                    </footer>
                </div>
            </div>
        </main>
    );
}
