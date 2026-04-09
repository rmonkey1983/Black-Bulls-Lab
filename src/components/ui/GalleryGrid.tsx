"use client";

import { useState, useEffect, useRef } from "react";
import { X, Play } from "lucide-react";
import { getGalleryItems, GalleryItem } from "@/lib/dataStore";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";

function isVideo(src: string): boolean {
    return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(src);
}

export function GalleryGrid() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getGalleryItems().then(setImages);
    }, []);

    useGSAP(() => {
        if (selectedImage) {
            gsap.fromTo(lightboxRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out", display: "flex" }
            );
            gsap.fromTo(".lightbox-content", 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.2)" }
            );
        } else {
            if (lightboxRef.current) {
                gsap.to(lightboxRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        if (lightboxRef.current) lightboxRef.current.style.display = "none";
                    }
                });
            }
        }
    }, { dependencies: [selectedImage], scope: lightboxRef });

    useGSAP(() => {
        if (images.length > 0) {
            gsap.from(".gallery-item", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.05,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 90%",
                    once: true
                }
            });
        }
    }, { dependencies: [images], scope: gridRef });

    return (
        <>
            <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
                {images.map((img) => {
                    const isVid = img.type === "video" || isVideo(img.src);

                    return (
                        <div
                            key={img.id}
                            className="gallery-item break-inside-avoid relative group overflow-hidden cursor-zoom-in
                                border border-border hover:border-gold/25
                                transition-all duration-300 transform sm:hover:scale-[1.02] opacity-1"
                            onClick={() => setSelectedImage(img)}
                        >
                            {isVid ? (
                                <div className="relative">
                                    <video
                                        src={img.src}
                                        muted
                                        playsInline
                                        className="w-full h-auto object-cover"
                                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                        onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-bg-dark/60 border border-gold/30 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                                            <Play size={20} className="text-gold ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-auto object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <span className="text-gold font-bold uppercase tracking-wider text-sm">{img.category}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Overlay */}
            <div
                ref={lightboxRef}
                className="fixed inset-0 z-50 bg-bg-dark/95 hidden items-center justify-center p-4 opacity-0"
                onClick={() => setSelectedImage(null)}
            >
                <div className="lightbox-content relative w-full max-w-5xl h-[80vh] opacity-0">
                    <div
                        className="w-full h-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedImage && (
                            <>
                                {(selectedImage.type === "video" || isVideo(selectedImage.src)) ? (
                                    <video
                                        src={selectedImage.src}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </>
                        )}
                    </div>

                    <button
                        className="absolute -top-12 right-0 text-white p-2 hover:text-gold transition-colors cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                </div>
            </div>
        </>
    );
}
