import React from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";

export function RamaManifesto() {
    return (
        <section className="w-full py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-transparent relative flex items-center justify-center overflow-hidden">
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 bg-zinc-900/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-col items-center text-center">
                <h2 className="sr-only">Agenzia Creatori di Emozioni e Dinner Show</h2>

                <RamaAnimatedText
                    text="IL NOSTRO APPROCCIO"
                    className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2"
                />

                <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw]">
                    <RamaAnimatedText text="L'ARTE DI" delay={0.1} />
                    <RamaAnimatedText text="STUPIRE" delay={0.2} className="text-rama-accent" />
                </div>

                <div className="mt-16 w-full max-w-3xl text-center mx-auto text-rama-muted font-outfit text-lg md:text-2xl leading-relaxed space-y-6">
                    <RamaAnimatedText
                        text="Sei alla ricerca di un evento che lasci il segno? Di un format che unisca alta gastronomia, intrattenimento e puro coinvolgimento emotivo?"
                        delay={0.3}
                    />
                    <RamaAnimatedText
                        text="Siamo Black Bulls Lab, un team di professionisti con una passione viscerale per l'intrattenimento. Siamo specializzati nella creazione e produzione di dinner show ed esperienze immersive."
                        delay={0.4}
                    />
                    <RamaAnimatedText
                        text="La nostra missione è trovare sempre la soluzione creativa perfetta. Dallo studio del format alla direzione artistica, fino alla cura ossessiva di ogni dettaglio, progettiamo soluzioni esclusive per privati e aziende, portando magia ed eccellenza in ogni occasione. Per noi, l'impossibile è solo un punto di partenza."
                        delay={0.5}
                        className="text-white/90"
                    />
                </div>
            </div>
        </section>
    );
}
