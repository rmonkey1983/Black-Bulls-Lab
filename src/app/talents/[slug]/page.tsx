import { notFound } from "next/navigation";
import Image from "next/image";
import { Instagram, Globe, Music, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const talents = [
    {
        id: "chef-rubio",
        name: "Chef Rubio",
        role: "Culinary Director",
        bio: "Visionario della cucina moderna, Rubio trasforma ingredienti dimenticati in esperienze sensoriali. Con un passato nelle cucine stellate di Parigi e Tokyo, porta al Black Bulls Lab una filosofia basata sul contrasto: ruvido ed elegante, caotico e preciso.",
        stats: { events: 12, rating: 4.9, style: "Raw & refined" },
        social: { instagram: "@chefrubio", website: "chefrubio.it" },
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800",
        portfolio: [
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
        ],
        upcomingEvent: "Notte Medievale"
    },
    {
        id: "dj-set",
        name: "Alex V",
        role: "Sound Architect",
        bio: "Alex V non mette solo dischi, scolpisce l'atmosfera. Specializzato in ambientazioni sonore immersive, i suoi set spaziano dalla deep techno al jazz sperimentale, creando il tappeto sonoro perfetto per ogni esperienza del Lab.",
        stats: { events: 24, rating: 5.0, style: "Deep & Hypnotic" },
        social: { instagram: "@alexv_sound", soundcloud: "alexv" },
        image: "https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=800",
        portfolio: [
            "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800"
        ],
        upcomingEvent: "Neon Jazz"
    },
];

export async function generateStaticParams() {
    return talents.map((talent) => ({
        slug: talent.id,
    }));
}

export default async function TalentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const talent = talents.find((t) => t.id === slug);

    if (!talent) return notFound();

    return (
        <div className="min-h-screen bg-black pb-32">
            {/* Cinematic Header */}
            <div className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${talent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <Link
                    href="/talents"
                    className="absolute top-24 left-6 z-30 flex items-center gap-2 text-white/70 hover:text-gold transition-colors uppercase text-xs font-bold tracking-widest"
                >
                    <ArrowLeft size={16} /> Torna ai Talenti
                </Link>

                <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-8">
                    <span className="inline-block px-3 py-1 bg-red text-white text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm shadow-lg">
                        {talent.role}
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] drop-shadow-2xl mb-4">
                        {talent.name}
                    </h1>
                    {/* Social Links */}
                    <div className="flex gap-6 mt-6">
                        <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Globe size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Music size={24} /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Bio */}
                <div className="md:col-span-8">
                    <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Biografia</h2>
                    <p className="text-lg text-gray-300 leading-relaxed font-light">{talent.bio}</p>

                    {/* Portfolio */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Portfolio</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {talent.portfolio.map((img, idx) => (
                                <div key={idx} className={`relative rounded-xl overflow-hidden aspect-[4/3] ${idx === 0 ? "md:col-span-2 aspect-[16/9]" : ""}`}>
                                    <Image
                                        src={img}
                                        alt={`Portfolio ${idx}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="md:col-span-4 space-y-8">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-gold font-bold uppercase tracking-widest text-sm mb-6">Statistiche</h3>

                        <div className="space-y-6">
                            <div>
                                <span className="block text-4xl font-bold text-white">{talent.stats.events}</span>
                                <span className="text-gray-400 text-sm">Eventi Completati</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold text-white">{talent.stats.rating}</span>
                                <span className="text-gray-400 text-sm">Rating Medio</span>
                            </div>
                            <div>
                                <span className="block text-xl font-bold text-white capitalize">{talent.stats.style}</span>
                                <span className="text-gray-400 text-sm">Stile Distintivo</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 p-6 rounded-2xl">
                        <h3 className="text-white font-bold mb-2">Prossimamente</h3>
                        <p className="text-gray-300 text-sm mb-4">Non perdere l'occasione di vederlo all'opera.</p>
                        <div className="flex items-center gap-2 text-gold font-bold uppercase text-sm tracking-wider">
                            <ArrowRight size={16} /> {talent.upcomingEvent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
