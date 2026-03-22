import { Badge } from "@/components/ui/badge"
import { getBlogTagsWithCount } from "@/lib/blog"

export function BlogHeader() {
  const tags = getBlogTagsWithCount()

  return (
    <div className="mb-10">
      <h1 className="mb-2 text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mb-6 text-muted-foreground">Mes articles et réflexions sur l'entrepreneuriat, la tech et le développement.</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag.name} variant="outline" className="px-3 py-1.5 text-sm">
            {tag.name}
            <span className="ml-1.5 text-xs opacity-70">{tag.count}</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
