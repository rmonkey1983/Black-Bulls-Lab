"use client";

import { useState } from "react";
import { StoryViewer, Story } from "./StoryViewer";

export function HappeningVibes() {
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

    const stories: Story[] = [
        { id: 1, user: "Chef Rubio", image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600", avatar: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=100", timestamp: "5m" },
        { id: 2, user: "DJ Set", image: "https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=600", avatar: "https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=100", timestamp: "1h" },
        { id: 3, user: "Cocktail Art", image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=600", avatar: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=100", timestamp: "3h" },
        { id: 4, user: "Magic Show", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=600", avatar: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=100", timestamp: "4h" },
        { id: 5, user: "Live Jazz", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600", avatar: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=100", timestamp: "6h" },
    ];

    return (
        <>
            <section className="w-full py-8 overflow-x-auto no-scrollbar pl-6">
                <div className="flex gap-5 min-w-max">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                            onClick={() => setActiveStoryIndex(index)}
                        >
                            {/* Hexagonal specimen container */}
                            <div className="relative w-[76px] h-[76px] flex items-center justify-center">
                                {/* Hex border */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 76 76">
                                    <polygon
                                        points="38,2 70,20 70,56 38,74 6,56 6,20"
                                        fill="none"
                                        stroke="rgba(0,255,136,0.3)"
                                        strokeWidth="1.5"
                                        className="group-hover:stroke-[rgba(0,255,136,0.7)] transition-all duration-300"
                                    />
                                </svg>
                                {/* Image circular inside hex */}
                                <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-lab-dark
                                    group-hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-shadow duration-300">
                                    <img
                                        src={story.avatar}
                                        alt={story.user}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                {/* Live indicator */}
                                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                                    <div className="w-2 h-2 rounded-full bg-green animate-pulse-glow shadow-[0_0_6px_rgba(0,255,136,0.5)]" />
                                </div>
                            </div>
                            <span className="data-readout text-[9px] uppercase font-bold text-gray-500 tracking-[0.15em] group-hover:text-green transition-colors">
                                {story.user}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {activeStoryIndex !== null && (
                <StoryViewer
                    stories={stories}
                    initialIndex={activeStoryIndex}
                    onClose={() => setActiveStoryIndex(null)}
                />
            )}
        </>
    );
}
