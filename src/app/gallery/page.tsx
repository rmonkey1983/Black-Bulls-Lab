import { Metadata } from "next";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Camera, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Galleria Eventi | Black Bulls Lab",
    description: "Il laboratorio visivo è in allestimento. Stiamo selezionando gli scatti migliori dei nostri eventi a Torino.",
    alternates: { canonical: `${SITE_URL}/gallery` },
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen pb-24 bg-black relative">
            <ImmersiveHeader
                id="gallery-hero"
                title="IL NOSTRO"
                highlight="Laboratorio"
                subtitle="La bellezza è nel dettaglio."
                mediaUrl="/images/brand/bg-stage-lights.webp"
            />

            <div className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-16 rounded-3xl text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent border border-rama-accent/20">
                            <Camera size={24} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter text-white">
                            Sviluppo in <span className="text-rama-accent">Corso.</span>
                        </h2>
                        <p className="text-rama-muted font-sans text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            Stiamo selezionando con cura gli scatti migliori e le performance più emozionanti dei nostri ultimi eventi per offrirti un&apos;esperienza visiva all&apos;altezza del Lab. Torna presto a trovarci.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <Link
                            href="/format"
                            className="inline-flex items-center justify-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-base px-10 py-5 rounded-full hover:bg-white transition-all transform active:scale-95"
                        >
                            Scopri i format
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}


