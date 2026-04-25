import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogGrid } from "@/components/blog/blog-grid"
import { BlogNavbar } from "@/components/blog/blog-navbar"

export const metadata: Metadata = {
  title: "Blog | Karim Hammouche",
  description: "Articles et réflexions de Karim Hammouche sur l'entrepreneuriat, la tech et le développement web.",
  openGraph: {
    title: "Blog | Karim Hammouche",
    description: "Articles et réflexions de Karim Hammouche sur l'entrepreneuriat, la tech et le développement web.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Karim Hammouche",
    description: "Articles et réflexions de Karim Hammouche sur l'entrepreneuriat, la tech et le développement web.",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogNavbar />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <BlogHeader />
        <BlogGrid />
      </div>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Karim Hammouche. Tous droits réservés.
      </footer>
    </main>
  )
}
