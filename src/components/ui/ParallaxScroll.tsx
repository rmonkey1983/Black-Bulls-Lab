"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ParallaxImage Component
 * Renders an image that moves at a different speed than the scroll.
 */
interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // Speed factor (e.g., 0.5 for half speed, -0.5 for reverse)
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
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Calculate the vertical movement based on scroll progress and speed
    // A positive y value moves the image down (slower than scroll if simple parallax)
    // We want the image to move slightly within its container.
    // The logic: 
    // start: y = -50 * speed
    // end: y = 50 * speed
    // This creates a shift of 100 * speed pixels over the viewport duration.
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // Map aspect ratio to Tailwind classes
    const aspectClasses = {
        video: "aspect-video",
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "relative overflow-hidden w-full bg-transparent",
                aspectClasses[aspectRatio],
                className
            )}
        >
            <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>
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
