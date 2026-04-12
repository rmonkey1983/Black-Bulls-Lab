"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade } from "@/lib/gsapAnimations";

import Image from "next/image";

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

    useGSAP(() => {
        if (id) {
            animateHeroText(`#${id}`, 0.3);
            animateFade(`#${id}-subtitle`, "up", 0.5);
        }
    }, [id]);

    return (
        <section id={id} className="pt-40 md:pt-60 px-6 md:px-12 mb-24 md:mb-32 relative overflow-hidden min-h-[60vh] md:min-h-[80vh] flex flex-col justify-end pb-12 md:pb-24">
            
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {mediaUrl && mediaType === "image" && (
                    <Image
                        src={mediaUrl}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center md:object-top opacity-30 brightness-[0.7] contrast-125"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            </div>

            {/* Massive Background Text */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[25vw] font-outfit font-black text-white/5 whitespace-nowrap z-[1] tracking-tighter pointer-events-none uppercase mix-blend-difference">
                {highlight || title.split(" ")[0]}
            </div>

            <div className={`relative z-10 w-full overflow-hidden ${align === "center" ? "flex flex-col items-center text-center" : ""}`}>
                <h1 className="line font-mohave text-[clamp(3.5rem,15vw,10rem)] leading-[0.8] tracking-tighter uppercase font-bold text-white flex flex-col max-w-full">
                    <span>{title}</span>
                </h1>

                {highlight && (
                    <h2 className={`line font-mohave text-[clamp(3.5rem,15vw,10rem)] leading-[0.8] tracking-tighter uppercase font-bold text-rama-accent flex flex-col max-w-full ${align === "center" ? "" : "ml-0 md:ml-[10vw]"}`}>
                        <span>{highlight}</span>
                    </h2>
                )}

                {subtitle && (
                    <div id={`${id}-subtitle`} className="mt-8 md:mt-12 text-rama-muted font-outfit text-base md:text-xl lg:text-2xl max-w-2xl text-left border-l-2 border-rama-accent/30 pl-6 bg-black/10 backdrop-blur-sm py-4 rounded-r-xl">
                        <p className="gsap-fade">
                            {subtitle}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
