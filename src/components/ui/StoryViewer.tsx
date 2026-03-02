"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface Story {
    id: number;
    user: string;
    image: string;
    avatar: string; // Add avatar for the header
    timestamp?: string;
}

interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

export function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const currentIndexRef = useRef(currentIndex);

    // Keep ref in sync
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const handleNext = useCallback(() => {
        if (currentIndexRef.current < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    }, [stories.length, onClose]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setProgress(0);
        }
    };

    // Auto-advance logic
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + 2; // Speed of progress bar
            });
        }, 100);

        return () => clearInterval(timer);
    }, [handleNext]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full md:max-w-md md:h-[90vh] md:rounded-2xl overflow-hidden bg-gray-900"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={stories[currentIndex].image}
                            alt={stories[currentIndex].user}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-4 left-4 right-4 flex gap-1 h-1 z-20">
                        {stories.map((_, idx) => (
                            <div key={idx} className="flex-1 bg-white/30 rounded-full overflow-hidden h-full">
                                <div
                                    className={`h-full bg-white transition-all duration-100 ease-linear ${idx < currentIndex ? "w-full" : idx === currentIndex ? `w-[${progress}%]` : "w-0"
                                        }`}
                                    style={{ width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%' }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-white/50 overflow-hidden">
                                <img src={stories[currentIndex].avatar} alt={stories[currentIndex].user} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-sm">{stories[currentIndex].user}</span>
                            <span className="text-xs text-gray-300 ml-2">{stories[currentIndex].timestamp || "2h"}</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Tap Zones */}
                    <div className="absolute inset-0 z-10 flex">
                        <div className="flex-1 h-full" onClick={handlePrev} />
                        <div className="flex-1 h-full" onClick={handleNext} />
                    </div>

                    {/* Footer / CTA */}
                    <div className="absolute bottom-8 left-6 right-6 z-20">
                        <div className="bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 text-white text-sm font-medium text-center">
                            Swipe up for details
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
