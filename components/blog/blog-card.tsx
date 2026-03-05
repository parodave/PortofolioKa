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
    <Link href={`/blog/${article.slug}`}>
      <Card className="overflow-hidden group cursor-pointer border-0 shadow-none hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="px-0 pt-4">
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.description}</p>
          <time className="text-xs text-muted-foreground">{article.date}</time>
        </CardContent>
      </Card>
    </Link>
  )
}
