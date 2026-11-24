import { MessageSquare } from "lucide-react";
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
                        title="INFORMAZIONI SU"
                        highlight={formatName.toUpperCase()}
                        subtitle="Date, location e disponibilità"
                        align="center"
                    />
                </div>
                
                <div className="flex flex-col items-center gap-8">
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Scrivici per un evento privato o aziendale, o per sapere quando ci saranno date pubbliche.
                    </p>
                    
                    <PrimaryButton href="/contatti" size="lg">
                        <MessageSquare size={18} className="mr-2" />
                        Chiedi informazioni
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
}
