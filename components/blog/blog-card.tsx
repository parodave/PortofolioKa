import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Article {
  id: number
  title: string
  description: string
  date: string
  category: string
  image: string
  slug: string
}

export function BlogCard({ article }: { article: Article }) {
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
            <h2 className="mb-2 text-lg font-semibold leading-tight transition-colors line-clamp-2 group-hover:text-primary">
              {article.title}
            </h2>
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
            <time className="text-xs text-muted-foreground">{article.date}</time>
          </CardContent>
        </Card>
      </Link>
    </article>
  )
}
