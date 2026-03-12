import React from "react";
import { RamaHero } from "@/components/rama/sections/RamaHero";
import { RamaManifesto } from "@/components/rama/sections/RamaManifesto";
import { RamaWorks } from "@/components/rama/sections/RamaWorks";
import { RamaServices } from "@/components/rama/sections/RamaServices";
import { RamaFAQ } from "@/components/rama/sections/RamaFAQ";
import { RamaTestimonial } from "@/components/rama/sections/RamaTestimonial";
import { RamaTeam } from "@/components/rama/sections/RamaTeam";

export default function RamaHomePage() {
    return (
        <main className="w-full bg-black min-h-screen text-white relative z-10 selection:bg-rama-accent selection:text-black">
            <RamaHero />
            <RamaManifesto />
            <RamaWorks />
            <RamaServices />
            <RamaFAQ />
            <RamaTestimonial />
            <RamaTeam />
        </main>
    );
}
