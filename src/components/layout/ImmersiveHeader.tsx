"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade } from "@/lib/gsapAnimations";
import { useRef } from "react";

interface ImmersiveHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    mediaUrl?: string; // image or video
    mediaType?: "image" | "video";
    align?: "center" | "left";
    id?: string;
}

export function ImmersiveHeader({
    title,
    highlight,
    subtitle,
    mediaUrl,
    mediaType = "image",
    align = "left",
    id
}: ImmersiveHeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (id) {
            animateHeroText(`#${id}`, 0.3);
            animateFade(`#${id}-subtitle`, "up", 0.5);
        }
    }, [id]);

    return (
        <section id={id} className="pt-40 md:pt-64 px-6 md:px-12 mb-24 md:mb-32 relative overflow-hidden">
            {/* Massive Background Text */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[25vw] font-outfit font-black text-white/5 whitespace-nowrap z-[-1] tracking-tighter pointer-events-none uppercase mix-blend-difference">
                {highlight || title.split(" ")[0]}
            </div>

            <div className={`relative z-10 w-full overflow-hidden ${align === "center" ? "flex flex-col items-center text-center" : ""}`}>
                <h1 className="line font-mohave text-[18vw] leading-[0.8] tracking-tighter uppercase font-bold text-white flex flex-col max-w-full">
                    <span>{title}</span>
                </h1>

                {highlight && (
                    <h2 className={`line font-mohave text-[18vw] leading-[0.8] tracking-tighter uppercase font-bold text-rama-accent flex flex-col max-w-full ${align === "center" ? "" : "ml-0 md:ml-[10vw]"}`}>
                        <span>{highlight}</span>
                    </h2>
                )}

                {subtitle && (
                    <div id={`${id}-subtitle`} className="mt-12 md:mt-16 text-rama-muted font-outfit text-lg md:text-xl lg:text-2xl max-w-xl text-left">
                        <p className="gsap-fade">
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
