"use client";

import React from "react";
import { motion } from "framer-motion";

interface RamaAnimatedTextProps {
    text: string;
    className?: string;
    el?: keyof React.JSX.IntrinsicElements;
    once?: boolean;
    delay?: number;
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Custom slow ease-out
        },
    },
};

export function RamaAnimatedText({
    text,
    className = "",
    el: Wrapper = "p",
    once = true,
    delay = 0,
}: RamaAnimatedTextProps) {
    // Use Wrapper correctly avoiding type error
    const MotionWrapper = motion(Wrapper as any);

    return (
        <MotionWrapper
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-10%" }}
            variants={{
                hidden: defaultAnimations.hidden,
                visible: {
                    ...defaultAnimations.visible,
                    transition: {
                        ...defaultAnimations.visible.transition,
                        delay,
                    },
                },
            }}
        >
            {text}
        </MotionWrapper>
    );
}
