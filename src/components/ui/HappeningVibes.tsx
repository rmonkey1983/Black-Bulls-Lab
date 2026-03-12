"use client";

import { useState } from "react";
import { StoryViewer, Story } from "./StoryViewer";

export function HappeningVibes() {
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

    const stories: Story[] = [
        { id: 1, user: "Chef Show", image: "/images/brand/service-plating.png", avatar: "/images/brand/team-chef.png", timestamp: "5m" },
        { id: 2, user: "DJ Set", image: "/images/brand/bg-venue-crowd.png", avatar: "/images/brand/team-art-director.png", timestamp: "1h" },
        { id: 3, user: "Cocktail Art", image: "/images/brand/vibe-cocktail-art.png", avatar: "/images/brand/team-mixologist.png", timestamp: "3h" },
        { id: 4, user: "Live Show", image: "/images/brand/service-performance.png", avatar: "/images/brand/team-performer.png", timestamp: "4h" },
        { id: 5, user: "Live Jazz", image: "/images/brand/vibe-live-jazz.png", avatar: "/images/brand/vibe-live-jazz.png", timestamp: "6h" },
    ];

    return (
        <>
            <section className="w-full py-6 md:py-8 overflow-x-auto no-scrollbar pl-4 md:pl-6">
                <div className="flex gap-5 min-w-max">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                            onClick={() => setActiveStoryIndex(index)}
                        >
                            {/* Circular avatar with gold ring */}
                            <div className="relative">
                                <div className="w-[72px] h-[72px] rounded-full p-[2px]
                                    bg-gradient-to-br from-gold via-gold-dim to-bordeaux
                                    group-hover:shadow-[0_0_15px_rgba(200,164,78,0.3)] transition-shadow duration-300">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-bg-dark">
                                        <img
                                            src={story.avatar}
                                            alt={story.user}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                                {/* Live indicator */}
                                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse-glow shadow-[0_0_6px_rgba(200,164,78,0.5)]" />
                                </div>
                            </div>
                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.15em] group-hover:text-gold transition-colors">
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
