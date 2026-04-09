"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

interface RamaAnimatedTextProps {
    text: string;
    className?: string;
    el?: keyof React.JSX.IntrinsicElements;
    once?: boolean;
    delay?: number;
}

export function RamaAnimatedText({
    text,
    className = "",
    el: Wrapper = "p",
    once = true,
    delay = 0,
}: RamaAnimatedTextProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        gsap.fromTo(textRef.current, 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                delay: delay,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 90%",
                    once: once
                }
            }
        );
    }, { dependencies: [text, delay], scope: textRef });

    // We cast Wrapper to any to use it as a component
    const Tag = Wrapper as any;

    return (
        <Tag
            ref={textRef}
            className={className}
            style={{ opacity: 0 }}
        >
            {text}
        </Tag>
    );
}
