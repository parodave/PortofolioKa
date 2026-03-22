import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogNavbar } from "@/components/blog/blog-navbar"
import { blogList } from "@/lib/blog"
import { absoluteUrl } from "@/lib/seo"

const pageTitle = "Blog"
const pageDescription = "Articles et réflexions sur l'entrepreneuriat, la tech, la data et le développement web."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Karim Hammouche | ${pageTitle}`,
    description: pageDescription,
    url: absoluteUrl("/blog"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/react-nextjs-javascript-code.jpg"),
        width: 1200,
        height: 630,
        alt: "Blog de Karim Hammouche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Karim Hammouche | ${pageTitle}`,
    description: pageDescription,
    images: [absoluteUrl("/react-nextjs-javascript-code.jpg")],
  },
}

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Karim Hammouche",
    description: pageDescription,
    url: absoluteUrl("/blog"),
    blogPost: blogList.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: absoluteUrl(`/blog/${article.slug}`),
      image: absoluteUrl(article.image || "/placeholder.svg"),
      datePublished: article.date,
      articleSection: article.category,
      description: article.description,
      author: {
        "@type": "Person",
        name: "Karim Hammouche",
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogNavbar />
      <section className="mx-auto max-w-5xl px-6 py-12" aria-labelledby="blog-heading">
        <BlogHeader />
        <BlogGrid />
      </section>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Karim Hammouche. Tous droits réservés.
      </footer>
    </main>
  )
}
