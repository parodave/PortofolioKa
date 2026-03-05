import { BlogCard } from "./blog-card"
import { blogList } from "@/lib/blog"

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogList.map((article) => (
        <BlogCard key={article.id} article={article} />
      ))}
    </div>
  )
}
