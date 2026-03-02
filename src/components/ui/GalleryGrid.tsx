"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
    id: string;
    src: string;
    alt: string;
    category: string;
}

export function GalleryGrid() {
    const images: GalleryItem[] = [
        { id: "1", src: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800", alt: "Cocktail Art", category: "Bar" },
        { id: "2", src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800", alt: "Live Jazz", category: "Music" },
        { id: "3", src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800", alt: "Comedy Night", category: "Stage" },
        { id: "4", src: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800", alt: "Gourmet Dish", category: "Food" },
        { id: "5", src: "https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=800", alt: "Party Vibes", category: "Atmosphere" },
        { id: "6", src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800", alt: "DJ Set", category: "Music" },
    ];

    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 p-4">
                {images.map((img) => (
                    <motion.div
                        key={img.id}
                        layoutId={`image-${img.id}`}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white font-bold uppercase tracking-wider text-sm">{img.category}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative w-full max-w-5xl h-[80vh]">
                            <motion.div
                                layoutId={`image-${selectedImage.id}`}
                                className="w-full h-full relative"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                            >
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>

                            <button
                                className="absolute -top-12 right-0 text-white p-2 hover:text-gold transition-colors"
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
