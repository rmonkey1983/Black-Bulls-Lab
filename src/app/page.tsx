import React from "react";
import { RamaHero } from "@/components/rama/sections/RamaHero";
import { RamaManifesto } from "@/components/rama/sections/RamaManifesto";
import { RamaServices } from "@/components/rama/sections/RamaServices";
import { RamaFAQ } from "@/components/rama/sections/RamaFAQ";

export default function RamaHomePage() {
    return (
        <main className="w-full bg-transparent min-h-screen text-white relative z-10 selection:bg-rama-accent selection:text-black">
            <RamaHero />
            <RamaManifesto />
            <RamaServices />
            <RamaFAQ />
        </main>
    );
}
