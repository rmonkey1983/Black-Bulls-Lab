import { Metadata } from "next";
import { CorporateClient } from "./CorporateClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
    description: "Organizza il tuo evento aziendale o team building a Torino con il Black Bulls Lab. Format immersivi, Web App interattiva e regia dedicata per un'esperienza smart.",
    alternates: { canonical: `${SITE_URL}/eventi-aziendali` },
    openGraph: {
        title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
        description: "Organizza il tuo evento aziendale o team building a Torino con il Black Bulls Lab. Format immersivi, Web App interattiva e regia dedicata per un'esperienza smart.",
        url: `${SITE_URL}/eventi-aziendali`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Eventi Aziendali - Black Bulls Lab" }],
    },
};

export default function CorporatePage() {
    return <CorporateClient />;
}
