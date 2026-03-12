"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Scroll3DSectionProps {
    children: React.ReactNode;
    className?: string;
    depth?: number; // How far back it starts (-Z)
    tiltMax?: number; // Max rotation X
    offset?: any; // Framer motion offset
}

export function Scroll3DSection({
    children,
    className,
    depth = 100,
    tiltMax = 15,
    offset = ["start 95%", "center center"],
}: Scroll3DSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset,
    });

    // Calculate opacity, scale/z-depth, and rotation
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

    // Z-translate for depth effect
    const translateZ = useTransform(scrollYProgress, [0, 1], [-depth, 0]);

    // Tilt back then straighten
    const rotateX = useTransform(scrollYProgress, [0, 1], [tiltMax, 0]);

    return (
        <div ref={ref} className={twMerge("w-full", className)} style={{ perspective: "1500px" }}>
            <motion.div
                style={{
                    opacity,
                    z: translateZ,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full origin-bottom"
            >
                {children}
            </motion.div>
        </div>
    );
}
