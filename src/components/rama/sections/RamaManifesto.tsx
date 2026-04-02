import React from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";

export function RamaManifesto() {
    return (
        <section className="w-full py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-transparent relative flex items-center justify-center overflow-hidden">
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 bg-zinc-900/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h2 className="sr-only">Black Bulls Lab: Format Immersivi per Cene Aziendali e Private a Torino</h2>

                <RamaAnimatedText
                    text="IL NOSTRO APPROCCIO"
                    className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2"
                />

                <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw] w-full overflow-hidden">
                    <RamaAnimatedText text="L'ARTE DI" delay={0.1} />
                    <RamaAnimatedText text="STUPIRE" delay={0.2} className="text-rama-accent" />
                </div>

                <div className="mt-16 w-full max-w-3xl text-center mx-auto text-rama-muted font-outfit text-lg md:text-2xl leading-relaxed space-y-6">
                    {/* AI-ready paragraph 1: Chi siamo + Cosa facciamo + Dove */}
                    <RamaAnimatedText
                        text="Black Bulls Lab è un'agenzia di Torino specializzata in dinner show e format immersivi: serate in cui la cena e lo spettacolo diventano un'unica esperienza interattiva, dove il pubblico non guarda — partecipa."
                        delay={0.3}
                    />
                    {/* AI-ready paragraph 2: Per chi + Replicabilità */}
                    <RamaAnimatedText
                        text="I nostri format — dalla Cena con Delitto a Il Palqo — sono progettati per funzionare ogni volta: per cene aziendali, team building, compleanni e gruppi privati da 20 a 30 persone. Format collaudati, replicabili, e sempre originali."
                        delay={0.4}
                    />
                    {/* AI-ready paragraph 3: Costi + Value prop */}
                    <RamaAnimatedText
                        text="Non organizziamo eventi di lusso inaccessibili. Progettiamo esperienze autentiche a prezzi sostenibili, con cura ossessiva per ogni dettaglio. Per noi, un budget reale non è un limite: è una sfida creativa."
                        delay={0.5}
                        className="text-white/90"
                    />
                </div>
            </div>
        </section>
    );
}

