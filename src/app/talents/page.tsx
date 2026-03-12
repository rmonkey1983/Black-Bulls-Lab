"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { ImmersiveHeader } from "@/components/layout/ImmersiveHeader";
import { getTalents, Talent } from "@/lib/dataStore";
import { ParallaxImage, StickyTextSection } from "@/components/ui/ParallaxScroll";

export default function TalentsPage() {
    const [talents, setTalents] = useState<Talent[]>([]);

    useEffect(() => {
        getTalents().then(setTalents);
    }, []);

    return (
        <div className="min-h-screen  pb-24">
            <ImmersiveHeader
                title="I NOSTRI"
                highlight="Artisti"
                subtitle="Le menti creative e i talenti che danno vita ad ogni esperienza del Black Bulls Lab."
                mediaUrl="/images/brand/service-performance.png"
            />
            <div className="max-w-7xl mx-auto px-6 space-y-20">

                {/* Intro Section */}
                <section>
                    <StickyTextSection
                        className="md:flex-row-reverse"
                        content={
                            <div className="space-y-6">
                                <span className="flex items-center gap-2 text-rama-accent text-xs font-bold tracking-[0.2em] uppercase">
                                    <Users size={14} /> Il Nostro Cast
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-rama-text">
                                    I Volti del <br /><span className="text-rama-accent font-mohave uppercase">Toro.</span>
                                </h2>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    Chef visionari, bartender alchimisti, artisti e performer.
                                    Scopri i talenti che ogni sera trasformano il Black Bulls Lab in magia.
                                </p>
                            </div>
                        }
                    >
                        <ParallaxImage
                            src="/images/brand/bg-stage-lights.png"
                            alt="Talent Group"
                            aspectRatio="landscape"
                            speed={0.2}
                            priority
                        />
                    </StickyTextSection>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talents.map((talent) => (
                        <Link
                            key={talent.id}
                            href={`/talents/${talent.id}`}
                            className="group relative block aspect-[3/4] overflow-hidden bg-bg-card border border-border
                                hover:border-rama-accent/25 hover:shadow-[0_0_30px_rgba(200,164,78,0.05)]
                                transition-all duration-500"
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-rama-accent/15 z-20
                                group-hover:w-6 group-hover:h-6 group-hover:border-rama-accent/40 transition-all duration-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-rama-accent/15 z-20
                                group-hover:w-6 group-hover:h-6 group-hover:border-rama-accent/40 transition-all duration-500" />

                            <img
                                src={talent.image}
                                alt={talent.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                <span className="text-rama-accent/60 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                                    {talent.role}
                                </span>
                                <h3 className="text-3xl font-bold text-rama-text mb-2">{talent.name}</h3>
                                <div className="flex items-center gap-2 text-rama-accent text-sm font-medium opacity-0 transform translate-y-4
                                    group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    Scopri di più <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
