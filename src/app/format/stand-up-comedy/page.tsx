"use client";

import React from "react";
import { RamaAnimatedText } from "@/components/rama/RamaAnimatedText";

export default function StandUpComedyPage() {
    return (
        <main className="w-full bg-black min-h-screen text-white relative z-10 pt-32 pb-16">
            <section className="relative w-full flex flex-col justify-center px-6 md:px-12 py-16 overflow-hidden">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto z-20">
                    <RamaAnimatedText
                        text="IL NOSTRO FORMAT"
                        className="font-rock-salt text-rama-accent text-xl md:text-3xl lg:text-4xl mb-6 transform -rotate-3"
                    />

                    {/* H1 SEO */}
                    <h1 className="sr-only">Cena Stand Up Comedy Torino: Divertimento e Alta Cucina</h1>

                    <div className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[14vw] lg:text-[8vw] mb-12">
                        <RamaAnimatedText text="STAND-UP" delay={0.1} />
                        <RamaAnimatedText text="COMEDY" delay={0.2} className="text-rama-accent" />
                    </div>

                    <p className="text-rama-muted font-outfit text-xl md:text-2xl leading-relaxed max-w-3xl">
                        Il palco del Black Bulls Lab si trasforma per regalarti serate di pura comicità.
                        Scopri il nostro format di cena con <strong>stand up comedy a Torino</strong>: un
                        connubio perfetto tra cocktail d'autore, eccellenze gastronomiche
                        ed esilaranti monologhi recitati dai migliori comici emergenti e non.
                    </p>
                </div>
            </section>
        </main>
    );
}
