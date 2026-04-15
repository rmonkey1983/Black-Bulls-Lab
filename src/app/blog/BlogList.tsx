"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: BlogPost[];
}

type Category = "all" | "seo" | "eventi" | "team";

const CATEGORIES = [
  { id: "all", label: "Tutti" },
  { id: "seo", label: "Idee & Torino" },
  { id: "eventi", label: "I Nostri Format" },
  { id: "team", label: "Il Team" },
] as const;

export function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-6 py-2 rounded-full font-heading text-xs uppercase tracking-widest font-bold transition-all duration-300 border",
              selectedCategory === cat.id
                ? "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PremiumCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full group"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] uppercase font-bold tracking-widest rounded-sm">
                    {CATEGORIES.find((c) => c.id === post.category)?.label || post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} className="text-yellow-500/50" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-yellow-500/50" />
                    {post.readingTime}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-zinc-400 text-sm font-light leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>

                <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-yellow-500 border border-white/5">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                      {post.author}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-yellow-500 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                  />
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="text-zinc-500 font-sans text-lg">
            Nessun articolo in questa categoria per ora.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-yellow-500 font-heading text-xs uppercase tracking-widest font-bold underline underline-offset-4"
          >
            Torna a tutti gli articoli
          </button>
        </div>
      )}
    </div>
  );
}
