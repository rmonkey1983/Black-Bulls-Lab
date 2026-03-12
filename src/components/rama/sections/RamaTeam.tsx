"use client";

import React from "react";
import { motion } from "framer-motion";
import { RamaAnimatedText } from "../RamaAnimatedText";

const teamMembers = [
    { name: "ALESSANDRO", role: "EXECUTIVE CHEF", img: "/images/brand/team-chef.png" },
    { name: "MARTINA", role: "ART DIRECTOR", img: "/images/brand/team-art-director.png" },
    { name: "LORENZO", role: "HEAD MIXOLOGIST", img: "/images/brand/team-mixologist.png" },
    { name: "SARA", role: "LEAD PERFORMER", img: "/images/brand/team-performer.png" }
];

export function RamaTeam() {
    return (
        <section className="w-full bg-black py-32 md:py-48 px-6 md:px-12 flex flex-col items-center">

            <div className="text-center mb-24 md:mb-32">
                <RamaAnimatedText
                    text="IL NOSTRO TEAM"
                    className="font-rock-salt text-rama-accent text-xl md:text-3xl mb-8 transform -rotate-2"
                />
                <h2 className="font-mohave font-bold leading-[0.8] tracking-tighter uppercase text-white flex flex-col text-[14vw] md:text-[10vw]">
                    <RamaAnimatedText text="CONOSCI I" />
                    <RamaAnimatedText text="RICERCATORI" delay={0.1} />
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                {teamMembers.map((member, i) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative flex flex-col cursor-pointer"
                    >
                        <div className="w-full aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden relative mb-6">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="font-mohave text-3xl md:text-4xl text-white font-bold uppercase tracking-wide group-hover:text-rama-accent transition-colors">
                                {member.name}
                            </h3>
                            <p className="font-rock-salt text-white/50 transform -rotate-2 mt-2 text-sm">
                                {member.role}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
