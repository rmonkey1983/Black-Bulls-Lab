import React from "react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";

export const metadata = {
    title: "Privacy Policy | Black Bulls Lab",
    description: "Informativa sulla privacy e trattamento dei dati personali del Black Bulls Lab.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-black pb-24 text-zinc-300 font-sans">
            <ImmersiveHeader
                id="privacy-hero"
                title="PRIVACY"
                highlight="Policy"
                subtitle="Trasparenza e rispetto dei tuoi dati."
                mediaUrl="/images/brand/bg-stage-lights.webp"
            />

            <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl space-y-12">
                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">1. Titolarità del Trattamento</h2>
                        <p className="leading-relaxed">
                            Il titolare del trattamento è **Black Bulls Lab**, con sede a Torino. Per qualsiasi richiesta relativa alla protezione dei dati, puoi contattarci all'indirizzo email dedicato.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">2. Tipologia di dati raccolti</h2>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>Dati di contatto forniti tramite i form di prenotazione (Nome, Email, Telefono).</li>
                            <li>Dati tecnici di navigazione raccolti per ottimizzare l'esperienza utente.</li>
                            <li>Preferenze di partecipazione agli eventi per personalizzare i nostri format.</li>
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">3. Finalità del trattamento</h2>
                        <p className="leading-relaxed">
                            I dati vengono trattati esclusivamente per gestire le tue prenotazioni, rispondere alle tue richieste corporate e, previo tuo consenso via newsletter, inviarti inviti esclusivi ai nostri eventi futuri.
                        </p>
                    </section>

                    <footer className="pt-12 border-t border-white/5 text-sm text-zinc-500 italic">
                        Ultimo aggiornamento: Aprile 2024. Questa pagina ha valore informativo per il lancio della piattaforma.
                    </footer>
                </div>
            </div>
        </main>
    );
}
