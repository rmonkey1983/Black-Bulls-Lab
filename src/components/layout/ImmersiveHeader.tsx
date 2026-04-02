"use client";

import { motion } from "framer-motion";

import { RamaAnimatedText } from "@/components/rama/RamaAnimatedText";

interface ImmersiveHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    mediaUrl?: string; // image or video
    mediaType?: "image" | "video";
    align?: "center" | "left";
}

export function ImmersiveHeader({
    title,
    highlight,
    subtitle,
    mediaUrl,
    mediaType = "image",
    align = "left"
}: ImmersiveHeaderProps) {
    return (
        <section className="pt-40 md:pt-64 px-6 md:px-12 mb-24 md:mb-32 relative overflow-hidden">
            {/* Massive Background Text */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[25vw] font-outfit font-black text-white/5 whitespace-nowrap z-[-1] tracking-tighter pointer-events-none uppercase mix-blend-difference">
                {highlight || title.split(" ")[0]}
            </div>

            <div className={`relative z-10 w-full overflow-hidden ${align === "center" ? "flex flex-col items-center text-center" : ""}`}>
                <RamaAnimatedText
                    text={title}
                    className="font-mohave text-[18vw] leading-[0.8] tracking-tighter uppercase font-bold text-white flex flex-col max-w-full"
                />

                {highlight && (
                    <RamaAnimatedText
                        text={highlight}
                        className={`font-mohave text-[18vw] leading-[0.8] tracking-tighter uppercase font-bold text-rama-accent flex flex-col max-w-full ${align === "center" ? "" : "ml-0 md:ml-[10vw]"}`}
                        delay={0.1}
                    />
                )}

                {subtitle && (
                    <div className="mt-12 md:mt-16 text-rama-muted font-outfit text-lg md:text-xl lg:text-2xl max-w-xl text-left">
                        <RamaAnimatedText
                            text={subtitle}
                            delay={0.2}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
