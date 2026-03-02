import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-lab-dark pb-24">
            <PageHeader
                title="ARCHIVIO"
                highlight="CAMPIONI"
                subtitle="Ogni esperimento lascia una traccia. Qui conserviamo i risultati più significativi."
                code="ARC-SPC"
            />
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                <GalleryGrid />
            </div>
        </div>
    );
}
