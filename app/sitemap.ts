import type { MetadataRoute } from "next"
import { getBlogSlugs } from "@/lib/blog"
import { getBaseUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const now = new Date()

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/blog", baseUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: new URL(`/blog/${slug}`, baseUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...coreRoutes, ...blogRoutes]
}
