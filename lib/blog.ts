import fs from "node:fs"
import path from "node:path"
import { cache } from "react"

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog")

export type BlogContentSource = "local_markdown"

export interface BlogArticle {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  seoTitle: string
  seoDescription: string
  image: string
  source: BlogContentSource
  // Backward-compatible aliases used by existing UI components.
  description: string
  date: string
}

interface FrontMatter {
  title?: string
  slug?: string
  excerpt?: string
  description?: string
  content?: string
  category?: string
  tags?: string[]
  publishedAt?: string
  date?: string
  seoTitle?: string
  seoDescription?: string
  image?: string
}

function parseTags(rawValue: string) {
  return rawValue
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^['\"]|['\"]$/g, ""))
    .filter(Boolean)
}

function parseFrontMatter(rawFile: string) {
  if (!rawFile.startsWith("---")) {
    return { frontMatter: {} as FrontMatter, content: rawFile.trim() }
  }

  const endOfFrontMatter = rawFile.indexOf("\n---", 3)

  if (endOfFrontMatter === -1) {
    return { frontMatter: {} as FrontMatter, content: rawFile.trim() }
  }

  const frontMatterRaw = rawFile.slice(3, endOfFrontMatter).trim()
  const content = rawFile.slice(endOfFrontMatter + 4).trim()
  const frontMatter: FrontMatter = {}

  for (const line of frontMatterRaw.split("\n")) {
    const [rawKey, ...rest] = line.split(":")
    if (!rawKey || rest.length === 0) continue

    const key = rawKey.trim()
    const value = rest.join(":").trim()

    if (key === "tags") {
      frontMatter.tags = parseTags(value)
      continue
    }

    const cleanValue = value.replace(/^['\"]|['\"]$/g, "")

    if (key === "title") frontMatter.title = cleanValue
    if (key === "slug") frontMatter.slug = cleanValue
    if (key === "excerpt") frontMatter.excerpt = cleanValue
    if (key === "description") frontMatter.description = cleanValue
    if (key === "category") frontMatter.category = cleanValue
    if (key === "publishedAt") frontMatter.publishedAt = cleanValue
    if (key === "date") frontMatter.date = cleanValue
    if (key === "seoTitle") frontMatter.seoTitle = cleanValue
    if (key === "seoDescription") frontMatter.seoDescription = cleanValue
    if (key === "image") frontMatter.image = cleanValue
  }

  return { frontMatter, content }
}

function normalizeBlogArticle(filename: string, rawFile: string): BlogArticle {
  const filenameWithoutExt = filename.replace(/\.md$/, "")
  const fallbackSlug = filenameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "")
  const { frontMatter, content } = parseFrontMatter(rawFile)

  const title = frontMatter.title || fallbackSlug
  const excerpt = frontMatter.excerpt || frontMatter.description || ""
  const publishedAt = frontMatter.publishedAt || frontMatter.date || new Date().toISOString()

  return {
    title,
    slug: frontMatter.slug || fallbackSlug,
    excerpt,
    content: frontMatter.content || content,
    category: frontMatter.category || "General",
    tags: frontMatter.tags || [],
    publishedAt,
    seoTitle: frontMatter.seoTitle || `${title} | Karim Hammouche`,
    seoDescription: frontMatter.seoDescription || excerpt,
    image: frontMatter.image || "/placeholder.svg",
    source: "local_markdown",
    // Backward-compatible aliases used by current UI.
    description: excerpt,
    date: publishedAt,
  }
}

export const getAllBlogPosts = cache(() => {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [] as BlogArticle[]
  }

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_CONTENT_DIR, file)
      const rawFile = fs.readFileSync(filePath, "utf8")
      return normalizeBlogArticle(file, rawFile)
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
})

export const getBlogArticle = cache((slug: string) => {
  return getAllBlogPosts().find((article) => article.slug === slug)
})

export const getBlogSlugs = cache(() => {
  return getAllBlogPosts().map((article) => article.slug)
})

export function getBlogTagsWithCount() {
  const counts = new Map<string, number>()

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }

  return [{ name: "Tous", count: getAllBlogPosts().length }, ...Array.from(counts.entries()).map(([name, count]) => ({ name, count }))]
}
