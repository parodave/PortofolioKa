import fs from "node:fs"
import path from "node:path"
import { cache } from "react"

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogArticle {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  content: string
}

interface FrontMatter {
  title?: string
  description?: string
  date?: string
  tags?: string[]
  image?: string
  slug?: string
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
      const parsedTags = value
        .replace(/^\[/, "")
        .replace(/\]$/, "")
        .split(",")
        .map((tag) => tag.trim().replace(/^['\"]|['\"]$/g, ""))
        .filter(Boolean)
      frontMatter.tags = parsedTags
      continue
    }

    const cleanValue = value.replace(/^['\"]|['\"]$/g, "")

    if (key === "title") frontMatter.title = cleanValue
    if (key === "description") frontMatter.description = cleanValue
    if (key === "date") frontMatter.date = cleanValue
    if (key === "image") frontMatter.image = cleanValue
    if (key === "slug") frontMatter.slug = cleanValue
  }

  return { frontMatter, content }
}

function normalizeBlogArticle(filename: string, rawFile: string): BlogArticle {
  const filenameWithoutExt = filename.replace(/\.md$/, "")
  const fallbackSlug = filenameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "")
  const { frontMatter, content } = parseFrontMatter(rawFile)

  return {
    slug: frontMatter.slug || fallbackSlug,
    title: frontMatter.title || fallbackSlug,
    description: frontMatter.description || "",
    date: frontMatter.date || new Date().toISOString(),
    tags: frontMatter.tags || [],
    image: frontMatter.image || "/placeholder.svg",
    content,
  }
}

const readBlogArticles = cache(() => {
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export function getAllBlogPosts() {
  return readBlogArticles()
}

export function getBlogArticle(slug: string) {
  return readBlogArticles().find((article) => article.slug === slug)
}

export function getBlogSlugs() {
  return readBlogArticles().map((article) => article.slug)
}

export function getBlogTagsWithCount() {
  const counts = new Map<string, number>()

  for (const post of readBlogArticles()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }

  return [{ name: "Tous", count: readBlogArticles().length }, ...Array.from(counts.entries()).map(([name, count]) => ({ name, count }))]
}
