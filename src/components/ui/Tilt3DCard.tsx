"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Tilt3DCardProps {
    children: React.ReactNode;
    className?: string;
    tiltSpeed?: number;
    tiltMax?: number;
}

export function Tilt3DCard({
    children,
    className,
    tiltSpeed = 400, // lower = faster spring
    tiltMax = 10,
}: Tilt3DCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the motion
    const mouseXSpring = useSpring(x, { stiffness: tiltSpeed, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: tiltSpeed, damping: 30 });

    // Map mouse movement [-0.5, 0.5] to rotation [-tiltMax, tiltMax]
    // Note: mouseY controls rotateX (vertical tilt), mouseX controls rotateY (horizontal tilt)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltMax, -tiltMax]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltMax, tiltMax]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: 1200 }} className={twMerge("relative w-full h-full", className)}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full transition-transform duration-100 ease-linear"
            >
                {children}
            </motion.div>
        </div>
    );
}
