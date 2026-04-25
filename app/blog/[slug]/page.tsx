import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogNavbar } from "@/components/blog/blog-navbar"
import { AudioPlayer } from "@/components/blog/AudioPlayer"
import { BlogMarkdown } from "@/components/blog/blog-markdown"
import { getBlogArticle, getBlogSlugs } from "@/lib/blog"
import { getCachedAudioUrl, hashText, stripMarkdown } from "@/lib/tts"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return {
      title: "Article non trouvé | Karim Hammouche",
      description: "L'article demandé est introuvable.",
    }
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      images: article.image ? [article.image] : undefined,
      type: "article",
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Article non trouvé</h1>
          <Button asChild>
            <Link href="/blog">Retour au blog</Link>
          </Button>
        </div>
      </main>
    )
  }

  const plainText = stripMarkdown(article.content)
  const voiceId = process.env.ELEVENLABS_VOICE_ID || ""
  const contentHash = hashText(plainText)
  const initialAudioUrl = voiceId ? await getCachedAudioUrl(slug, contentHash, voiceId) : null
  const displayDate = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen bg-background">
      <BlogNavbar />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/blog">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Retour au blog
          </Link>
        </Button>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">{displayDate}</span>
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5 text-xs text-primary">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
        </header>

        <AudioPlayer slug={slug} text={plainText} initialUrl={initialAudioUrl} />

        <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>

        <BlogMarkdown content={article.content} />
      </article>
    </main>
  )
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}
