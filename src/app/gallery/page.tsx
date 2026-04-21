import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Camera, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


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

            <div className="max-w-7xl mx-auto px-6 -mt-12 md:-mt-24 relative z-20">
                {/* Intro Card */}
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl text-center space-y-6 mb-16">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-rama-accent/10 rounded-full flex items-center justify-center text-rama-accent border border-rama-accent/20">
                            <Camera size={20} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-tighter text-white">
                            Sviluppo in <span className="text-rama-accent">Corso.</span>
                        </h2>
                        <p className="text-rama-muted font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                            Stiamo selezionando con cura gli scatti migliori per offrirti un&apos;esperienza visiva all&apos;altezza del Lab. Ecco un assaggio dell&apos;atmosfera.
                        </p>
                    </div>
                </div>

                {/* Teaser Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative aspect-[14/16] overflow-hidden rounded-2xl border border-white/10">
                        <Image 
                            src="/images/gallery/premium_dinner_mystery_1776455193300.png"
                            alt="Atmosfera Black Bulls Lab"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-[10px] text-rama-accent uppercase tracking-[0.3em] font-bold">Concept 01</span>
                            <h3 className="text-white font-heading text-lg uppercase font-bold mt-1">L&apos;Eleganza del Mistero</h3>
                        </div>
                    </div>

                    <div className="group relative aspect-[14/16] overflow-hidden rounded-2xl border border-white/10">
                        <Image 
                            src="/images/gallery/performer_emotion_noir_1776455217323.png"
                            alt="Performance Live Black Bulls Lab"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-[10px] text-rama-accent uppercase tracking-[0.3em] font-bold">Concept 02</span>
                            <h3 className="text-white font-heading text-lg uppercase font-bold mt-1">Emozione Visiva</h3>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/format"
                        className="inline-flex items-center justify-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-lg"
                    >
                        Scopri i format
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </main>
    );
}


