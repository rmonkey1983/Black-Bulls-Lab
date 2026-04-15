import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
import { SITE_URL } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Blog | Black Bulls Lab`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://blackbullslab.com/blog/${slug}`,
      images: [{ url: post.coverImage }],
    },
  };
}

const components = {
  h2: (props: any) => (
    <h2
      className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mt-16 mb-8 border-b border-white/5 pb-4"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-heading text-xl md:text-2xl font-bold uppercase text-yellow-500 mt-12 mb-6"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="font-sans text-[17px] text-zinc-300 font-light leading-[1.8] max-w-[680px] mx-auto mb-8"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-yellow-500 hover:text-white underline underline-offset-4 transition-colors font-medium"
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="max-w-[680px] mx-auto border-l-4 border-yellow-500 bg-zinc-900/50 p-8 my-12 italic text-xl text-zinc-200 font-serif"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  ul: (props: any) => (
    <ul
      className="max-w-[680px] mx-auto list-disc list-outside pl-5 mb-8 space-y-4 text-zinc-300 font-light"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="max-w-[680px] mx-auto list-decimal list-outside pl-5 mb-8 space-y-4 text-zinc-300 font-light"
      {...props}
    />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts logic
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  const categoryStyles = {
    seo: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    eventi: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    team: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  const categoryLabels = {
    seo: "Idee & Torino",
    eventi: "I Nostri Format",
    team: "Il Team",
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <article className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: `${SITE_URL}${post.coverImage}`,
            author: {
              "@type": "Person",
              "name": post.author,
            },
            publisher: {
              "@type": "Organization",
              "name": "Black Bulls Lab",
              "url": SITE_URL,
            },
            datePublished: post.date,
            url: `${SITE_URL}/blog/${post.slug}`,
          }),
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-12">
          <Link href="/" className="hover:text-yellow-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-yellow-500 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px] md:max-w-none">
            {post.title}
          </span>
        </nav>

        {/* Header Header */}
        <header className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <div
            className={cn(
              "inline-block px-4 py-1 rounded-full border text-[10px] uppercase font-bold tracking-[0.2em]",
              categoryStyles[post.category as keyof typeof categoryStyles] ||
                categoryStyles.seo
            )}
          >
            {categoryLabels[post.category as keyof typeof categoryLabels] ||
              post.category}
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-tight tracking-tighter">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-zinc-400 uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <User size={14} className="text-yellow-500/50" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-yellow-500/50" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-yellow-500/50 opacity-0 w-0 h-0" /> {/* Spacer or hidden element if needed */}
              <div className="flex items-center gap-2">
                 <Clock size={14} className="text-yellow-500/50" />
                 <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Cover Image */}
      <div className="w-full aspect-video relative mb-20 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>

      {/* Footer / Related Items */}
      <footer className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-white/5 mb-20" />

        {relatedPosts.length > 0 && (
          <section className="space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-3xl font-bold uppercase text-white tracking-widest">
                Articoli Correlati
              </h2>
              <Link
                href="/blog"
                className="group flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-bold hover:text-yellow-500 transition-colors"
              >
                Vedi tutti <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block space-y-6"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/5 transition-all duration-500 group-hover:border-yellow-500/30">
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors">
                      {rp.title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-400 line-clamp-2">
                      {rp.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </footer>

      <div className="mt-32">
        <PreFooterCTA />
      </div>
    </article>
  );
}
