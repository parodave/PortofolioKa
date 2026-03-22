import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogArticle } from "@/lib/blog"

export function BlogCard({ article }: { article: BlogArticle }) {
  const displayDate = new Date(article.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article>
      <Link href={`/blog/${article.slug}`} aria-label={`Lire l'article : ${article.title}`}>
        <Card className="group cursor-pointer overflow-hidden border-0 shadow-none transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="px-0 pt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">{article.category}</p>
            <h2 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
              {article.title}
            </h2>
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
            <div className="flex items-center justify-between gap-2">
              <time className="text-xs text-muted-foreground">{displayDate}</time>
              <div className="flex flex-wrap justify-end gap-1">
                {article.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}