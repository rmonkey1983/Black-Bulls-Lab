import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Microscope } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export default function TalentsPage() {
    const talents = [
        {
            id: "chef-rubio",
            name: "Chef Rubio",
            role: "Direttore Culinario",
            image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800",
            code: "RES-001",
        },
        {
            id: "dj-set",
            name: "Alex V",
            role: "Architetto Sonoro",
            image: "https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=800",
            code: "RES-002",
        },
    ];

    return (
        <div className="min-h-screen bg-lab-dark pb-24">
            <PageHeader
                title="TEAM DI"
                highlight="RICERCATORI"
                subtitle="Le menti e le anime che formulano ogni esperimento del Black Bulls Lab."
                code="RES-DIR"
            />
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {talents.map((talent) => (
                        <Link
                            key={talent.id}
                            href={`/talents/${talent.id}`}
                            className="group relative block aspect-[3/4] overflow-hidden bg-lab-card border border-green/10
                                hover:border-green/30 hover:shadow-[0_0_25px_rgba(0,255,136,0.06)]
                                transition-all duration-500"
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green/25 z-20 group-hover:w-6 group-hover:h-6 group-hover:border-green/50 transition-all duration-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green/25 z-20 group-hover:w-6 group-hover:h-6 group-hover:border-green/50 transition-all duration-500" />

                            <Image
                                src={talent.image}
                                alt={talent.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-lab-dark via-lab-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Classification code */}
                            <div className="absolute top-3 right-3 z-20">
                                <span className="data-readout text-[9px] text-green/30 tracking-[0.2em] flex items-center gap-1">
                                    <Microscope size={10} />
                                    {talent.code}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                <span className="data-readout text-green/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                                    {talent.role}
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-2">{talent.name}</h3>
                                <div className="flex items-center gap-2 text-cyan text-sm font-medium opacity-0 transform translate-y-4
                                    group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 data-readout">
                                    Visualizza Profilo <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
