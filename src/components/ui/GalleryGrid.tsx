"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { getGalleryItems, GalleryItem } from "@/lib/dataStore";

function isVideo(src: string): boolean {
    return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(src);
}

export function GalleryGrid() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    useEffect(() => {
        getGalleryItems().then(setImages);
    }, []);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
                {images.map((img) => {
                    const isVid = img.type === "video" || isVideo(img.src);

                    return (
                        <motion.div
                            key={img.id}
                            layoutId={`image-${img.id}`}
                            className="break-inside-avoid relative group overflow-hidden cursor-zoom-in
                                border border-border hover:border-gold/25
                                transition-all duration-300"
                            onClick={() => setSelectedImage(img)}
                            whileHover={{ scale: 1.02 }}
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
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-bg-dark/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full max-w-5xl h-[80vh]">
                            <motion.div
                                layoutId={`image-${selectedImage.id}`}
                                className="w-full h-full relative"
                                onClick={(e) => e.stopPropagation()}
                            >
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
                            </motion.div>

                            <button
                                className="absolute -top-12 right-0 text-white p-2 hover:text-gold transition-colors cursor-pointer"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
