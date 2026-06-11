import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  category: 'seo' | 'eventi' | 'team'
  author: string
  coverImage: string
  readingTime: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))
  
  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const fullPath = path.join(BLOG_DIR, file)
      const raw = fs.readFileSync(fullPath, 'utf-8')
      const { data, content } = matter(raw)
      
      return {
        slug,
        title: data.title ?? 'Senza Titolo',
        description: data.description ?? '',
        date: data.date ?? new Date().toISOString(),
        category: data.category ?? 'seo',
        author: data.author ?? 'Black Bulls Lab',
        coverImage: data.coverImage ?? '/images/brand/bg-hero-wide.webp',
        readingTime: readingTime(content).text,
        content,
      } as BlogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  
  return {
    slug,
    title: data.title ?? 'Senza Titolo',
    description: data.description ?? '',
    date: data.date ?? new Date().toISOString(),
    category: data.category ?? 'seo',
    author: data.author ?? 'Black Bulls Lab',
    coverImage: data.coverImage ?? '/images/brand/bg-hero-wide.webp',
    readingTime: readingTime(content).text,
    content,
  } as BlogPost
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category)
}
