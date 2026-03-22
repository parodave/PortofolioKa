import { BlogCard } from "./blog-card"
import { getAllBlogPosts } from "@/lib/blog"

export function BlogGrid() {
  const posts = getAllBlogPosts()

  if (posts.length === 0) {
    return <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((article) => (
        <BlogCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
