"use client";

import React, { useRef } from "react";
import { RamaAnimatedText } from "../RamaAnimatedText";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCards } from "@/lib/gsapAnimations";

const teamMembers = [
    { name: "ALESSANDRO", role: "EXECUTIVE CHEF", img: "/images/brand/team-chef.png" },
    { name: "MARTINA", role: "ART DIRECTOR", img: "/images/brand/team-art-director.png" },
    { name: "LORENZO", role: "HEAD MIXOLOGIST", img: "/images/brand/team-mixologist.png" },
    { name: "SARA", role: "LEAD PERFORMER", img: "/images/brand/team-performer.png" }
];

export function RamaTeam() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        animateCards("#team-grid");
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-transparent py-20 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 flex flex-col items-center">

            <div className="text-center mb-16 sm:mb-24 md:mb-32">
                <RamaAnimatedText
                    text="IL NOSTRO TEAM"
                    className="font-rock-salt text-rama-accent text-base sm:text-xl md:text-3xl mb-6 sm:mb-8 transform -rotate-2"
                />
                <div className="font-mohave font-bold leading-[0.85] tracking-tighter uppercase text-white flex flex-col text-[15vw] sm:text-[14vw] md:text-[10vw] w-full overflow-hidden">
                    <RamaAnimatedText text="CONOSCI I" />
                    <RamaAnimatedText text="RICERCATORI" delay={0.1} />
                </div>
            </div>

            <div id="team-grid" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
                {teamMembers.map((member) => (
                    <div
                        key={member.name}
                        className="gsap-card group relative flex flex-col cursor-pointer"
                    >
                        <div className="w-full aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden relative mb-6">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-transparent/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="font-mohave text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold uppercase tracking-wide group-hover:text-rama-accent transition-colors break-words">
                                {member.name}
                            </h3>
                            <p className="font-rock-salt text-white/50 transform -rotate-2 mt-2 text-xs sm:text-sm">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
