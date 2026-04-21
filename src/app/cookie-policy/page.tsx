import React from "react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export const metadata = {
    title: "Cookie Policy | Black Bulls Lab",
    description: "Informativa sull'utilizzo dei cookie della piattaforma Black Bulls Lab.",
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-black pb-24 text-zinc-300 font-sans">
            <ImmersiveHeader
                id="cookie-hero"
                title="COOKIE"
                highlight="Policy"
                subtitle="Dettagli tecnici per un'esperienza fluida."
                mediaUrl="/images/brand/bg-stage-lights.webp"
            />

            <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl space-y-12">
                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Cosa sono i Cookie</h2>
                        <p className="leading-relaxed">
                            I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Tipologie di Cookie che utilizziamo</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li><strong>Cookie Tecnici</strong>: Necessari per il corretto funzionamento del sito e della nostra Web App interattiva.</li>
                            <li><strong>Cookie Analitici</strong>: Utilizzati in forma anonima per capire come i visitatori interagiscono con i nostri contenuti.</li>
                            <li><strong>Preferenze</strong>: Memorizzano le tue scelte (es. lingua o consensi) per le visite successive.</li>
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">Gestione dei Consensi</h2>
                        <p className="leading-relaxed">
                            Al tuo primo accesso, un banner ti permetterà di scegliere quali cookie attivare. Puoi modificare le tue preferenze in qualsiasi momento tramite il pannello di controllo del tuo browser.
                        </p>
                    </section>

                    <footer className="pt-12 border-t border-white/5 text-sm text-zinc-500 italic">
                        Il laboratorio rispetta la tua privacy. Ultimo aggiornamento: Aprile 2024.
                    </footer>
                </div>
            </div>
        </main>
    );
}
