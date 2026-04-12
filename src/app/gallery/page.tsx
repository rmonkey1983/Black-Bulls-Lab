import Image from "next/image";
import { Metadata } from "next";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { Instagram, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Galleria Eventi e Dinner Show | Black Bulls Lab - Torino",
    description: "Rivivi i momenti più belli dei dinner show a Torino: scatti dai nostri format, performance dal vivo e l'atmosfera esclusiva del Black Bulls Lab.",
    alternates: { canonical: `${SITE_URL}/gallery` },
    openGraph: {
        title: "Galleria Eventi e Dinner Show | Black Bulls Lab - Torino",
        description: "Rivivi i momenti più belli dei dinner show a Torino: scatti dai nostri format, performance dal vivo e l'atmosfera esclusiva del Black Bulls Lab.",
        url: `${SITE_URL}/gallery`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Galleria Black Bulls Lab" }],
    },
};

// Placeholder data for the gallery grid
const GALLERY_IMAGES = [
    { src: "/images/brand/vibe-live-jazz.png", alt: "Atmosfera Live Jazz & Performance" },
    { src: "/images/brand/service-plating.png", alt: "Arte del Plating - Esperienza Gourmet" },
    { src: "/images/brand/vibe-cocktail-art.png", alt: "Cocktail Art & Mixology" },
    { src: "/images/brand/service-performance.png", alt: "Live Performance a Torino" },
    { src: "/images/brand/bg-venue-crowd.png", alt: "L'energia dei nostri eventi" },
    { src: "/images/brand/team-art-director.png", alt: "Dietro le quinte: Luci e Regia" },
    { src: "/images/brand/team-mixologist.png", alt: "La nostra area Bar & Spirits" },
    { src: "/images/brand/team-chef.png", alt: "Creatività in Cucina" },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen pb-24">
            <ImmersiveHeader
                title="LA NOSTRA"
                highlight="Galleria"
                subtitle="Ogni esperienza lascia un segno. Qui rivivono i momenti più belli delle nostre serate a Torino. Dagli scatti rubati durante i dinner show alle atmosfere soffuse dei club."
                mediaUrl="/images/brand/bg-venue-crowd.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 md:space-y-32">
                
                {/* Real Photo Grid - Ready for content */}
                <section className="space-y-12">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-rama-accent/40" />
                        <span className="font-rock-salt text-rama-accent transform -rotate-2 text-xl block">
                            Momenti dal Vivo
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                        {GALLERY_IMAGES.map((img, i) => (
                            <div 
                                key={i} 
                                className="group relative aspect-square overflow-hidden bg-white/5 rounded-sm md:rounded-md"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white font-outfit text-xs md:text-sm font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {img.alt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center pt-8">
                        <p className="text-rama-muted font-outfit text-sm italic flex items-center gap-2">
                            <Sparkles size={14} className="text-rama-accent" /> Più foto verranno aggiunte dopo ogni evento.
                        </p>
                    </div>
                </section>

                {/* Social Placeholder Section */}
                <section className="py-16 md:py-24 flex flex-col items-center text-center space-y-10 border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2rem] px-6">
                    <div className="w-20 h-20 rounded-full border border-rama-accent/30 flex items-center justify-center bg-rama-accent/10 shadow-[0_0_30px_rgba(200,164,78,0.1)]">
                        <Instagram size={32} className="text-rama-accent" />
                    </div>
                    <div className="space-y-5 max-w-3xl">
                        <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-4xl md:text-7xl leading-none">
                            Seguici in <span className="text-rama-accent">Tempo Reale</span>
                        </h2>
                        <p className="font-outfit text-rama-muted text-lg md:text-xl leading-relaxed">
                            Stiamo documentando le nostre serate. Per vedere i momenti rubati, i backstage e i nostri artisti dal vivo, il canale migliore è il nostro Instagram.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                        <a 
                            href={SOCIAL_LINKS.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 bg-rama-accent text-black font-mohave font-bold uppercase tracking-widest text-base px-10 py-5 rounded-full hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-rama-accent/10"
                        >
                            Instagram @blackbullslab
                            <Instagram size={18} />
                        </a>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 md:py-24 border-t border-white/10 text-center space-y-8">
                    <p className="font-rock-salt text-rama-accent text-lg transform -rotate-1 inline-block">
                        Vuoi essere nella prossima foto?
                    </p>
                    <h2 className="font-mohave font-bold uppercase tracking-tighter text-white text-5xl md:text-7xl leading-[0.9]">
                        PORTA QUESTA MAGIA<br />
                        <span className="text-rama-accent">AL TUO EVENTO</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center justify-center gap-3 bg-white text-black font-mohave font-bold uppercase tracking-widest text-base px-10 py-5 rounded-full hover:bg-rama-accent transition-all transform active:scale-95"
                        >
                            Organizza il tuo evento
                            <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/format"
                            className="inline-flex items-center justify-center border border-white/20 text-white font-mohave font-bold uppercase tracking-widest text-base px-10 py-5 rounded-full hover:border-rama-accent/60 hover:text-rama-accent transition-all transform active:scale-95"
                            aria-label="Scopri i format esclusivi di Black Bulls Lab"
                        >
                            Scopri i Format
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

