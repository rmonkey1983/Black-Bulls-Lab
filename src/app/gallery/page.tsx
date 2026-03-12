import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";
import { Camera } from "lucide-react";

export default function GalleryPage() {
    return (
        <div className="min-h-screen  pb-24">
            <ImmersiveHeader
                title="LA NOSTRA"
                highlight="Galleria"
                subtitle="Ogni esperienza lascia un segno. Qui rivivono i momenti più belli."
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
                                    <span className="text-rama-accent">l'Attimo.</span>
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
            </div>
        </div>
    );
}
