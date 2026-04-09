"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ParallaxImage Component
 * Renders an image that moves at a different speed than the scroll using GSAP ScrollTrigger.
 */
interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // Speed factor (e.g., 0.5 for half speed)
    aspectRatio?: "video" | "square" | "portrait" | "landscape";
    priority?: boolean;
}

export function ParallaxImage({
    src,
    alt,
    className,
    speed = 0.5,
    aspectRatio = "landscape",
    priority = false,
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current) return;

        // Register ScrollTrigger if not already
        gsap.registerPlugin(ScrollTrigger);

        // Calculate the shift based on speed - simplified for GSAP
        // We move the image from -10% to 10% relative to its container
        gsap.fromTo(imageRef.current, 
            { y: "-10%" },
            {
                y: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef });

    const aspectClasses = {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden w-full bg-transparent",
                aspectClasses[aspectRatio],
                className
            )}
        >
            <div ref={imageRef} className="absolute inset-[-15%] w-[130%] h-[130%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
}

/**
 * StickyTextSection Component
 * Keeps text fixed while scrolling through a long section.
 */
interface StickyTextSectionProps {
    children: React.ReactNode;
    content: React.ReactNode;
    className?: string;
}

export function StickyTextSection({ children, content, className }: StickyTextSectionProps) {
    return (
        <div className={cn("relative flex flex-col md:flex-row gap-8 md:gap-16 py-12 md:py-24", className)}>
            <div className="md:w-1/2 md:sticky md:top-32 md:h-fit z-10">
                {content}
            </div>
            <div className="md:w-1/2 space-y-16">
                {children}
            </div>
        </div>
    );
}
