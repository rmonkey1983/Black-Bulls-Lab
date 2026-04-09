import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GalleryPage() {
    return (
        <div className="min-h-screen pb-24">
            <ImmersiveHeader
                title="LA NOSTRA"
                highlight="Galleria"
                subtitle="Ogni esperienza lascia un segno. Qui rivivono i momenti più belli delle nostre serate a Torino."
                mediaUrl="/images/brand/bg-venue-crowd.png"
            />

            <div className="max-w-7xl mx-auto px-6 space-y-20">
                {/* Intro Section */}
                <section>
                    <StickyTextSection
                        className="md:flex-row-reverse"
                        content={
                            <div className="space-y-6">
                                <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                                    <Camera size={14} className="inline mr-2" /> Shot on Location
                                </span>
                                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[10vw] md:text-[6vw]">
                                    <span className="text-white">Catturare</span>
                                    <span className="text-rama-accent">l&apos;Attimo.</span>
                                </h2>
                                <p className="text-rama-muted font-outfit text-lg leading-relaxed mt-6">
                                    Luci, sguardi, dettagli. La nostra galleria non è solo un archivio,
                                    ma il racconto visivo delle notti più esclusive di Torino.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.png"
                            alt="Gallery Mood"
                            aspectRatio="landscape"
                            speed={0.2}
                            priority
                        />
                    </StickyTextSection>
                </section>

                <div className="space-y-8">
                    <GalleryGrid />
                </div>

                {/* Funnel CTA — end of gallery */}
                <section className="py-12 border-t border-white/10 text-center space-y-6">
                    <p className="font-rock-salt text-rama-accent text-lg transform -rotate-1 inline-block">
                        Ti è piaciuto quello che vedi?
                    </p>
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-[8vw] md:text-[4vw] leading-[0.9]">
                        PORTA QUESTA MAGIA<br />
                        <span className="text-rama-accent">AL TUO EVENTO</span>
                    </h2>
                    <p className="font-outfit text-rama-muted text-lg max-w-xl mx-auto">
                        Queste foto non sono eccezioni — sono la norma. Ogni serata che organizziamo punta a creare momenti come questi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-base px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
                        >
                            Organizza il tuo evento
                            <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="/format"
                            className="inline-flex items-center border border-white/20 text-white font-mohave font-bold uppercase tracking-widest text-base px-8 py-4 rounded-full hover:border-rama-accent/60 hover:text-rama-accent transition-colors duration-300"
                        >
                            Scopri i Format
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

