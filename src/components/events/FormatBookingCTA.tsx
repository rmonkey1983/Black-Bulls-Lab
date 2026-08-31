import { Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface FormatBookingCTAProps {
    formatName: string;
}

export function FormatBookingCTA({ formatName }: FormatBookingCTAProps) {
    return (
        <section className="py-24 px-6 bg-zinc-950/50 border-y border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-10">
                    <SectionHeading
                        title="PRENOTA IL TUO"
                        highlight={formatName.toUpperCase()}
                        subtitle="Scopri le prossime informazioni sul format"
                        align="center"
                    />
                </div>
                
                <div className="flex flex-col items-center gap-8">
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Consulta il calendario per verificare eventuali date pubbliche e modalità di partecipazione.
                    </p>
                    
                    <PrimaryButton href="/calendario" size="lg">
                        <Calendar size={18} className="mr-2" />
                        Apri il Calendario
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
}
