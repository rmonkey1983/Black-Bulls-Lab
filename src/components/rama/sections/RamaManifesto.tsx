import React from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";

export function RamaManifesto() {
    return (
        <section className="w-full py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-transparent relative flex items-center justify-center overflow-hidden">
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 bg-zinc-900/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h2 className="sr-only">Molto più di una cena con spettacolo a Torino</h2>

                <RamaAnimatedText
                    text="IL CONCETTO"
                    className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2"
                />

                <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw]">
                    <RamaAnimatedText text="MOLTO PIÙ" delay={0.1} />
                    <RamaAnimatedText text="DI UNA CENA" delay={0.2} className="text-rama-accent" />
                </div>

                <div className="mt-16 w-full max-w-3xl text-center mx-auto text-rama-muted font-outfit text-lg md:text-2xl leading-relaxed space-y-6">
                    <RamaAnimatedText
                        text="Sei stanco dei soliti weekend? Del solito ristorante dove il massimo dell'intrattenimento è il rumore di fondo?"
                        delay={0.3}
                    />
                    <RamaAnimatedText
                        text="Sappiamo cosa cerchi. Vuoi staccare la spina, sorprendere chi porti con te e sentirti parte di qualcosa di nuovo."
                        delay={0.4}
                    />
                    <RamaAnimatedText
                        text="Per questo è nato Black Bulls Lab. Non siamo un semplice ristorante, e non siamo un teatro. Siamo uno spazio creativo dove il palato viene viziato da chef di alto livello, mentre la mente viene stimolata da artisti, comici e performer. Niente formalità ingessate. Solo ottima compagnia, cibo incredibile e un'atmosfera che ti farà dimenticare di guardare l'orologio."
                        delay={0.5}
                        className="text-white/90"
                    />
                </div>
            </div>
        </section>
    );
}
