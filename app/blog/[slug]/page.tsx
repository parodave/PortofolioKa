import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogNavbar } from "@/components/blog/blog-navbar"
import { AudioPlayer } from "@/components/blog/AudioPlayer"
import { getBlogArticle, getBlogSlugs } from "@/lib/blog"
import { getCachedAudioUrl, hashText, stripMarkdown } from "@/lib/tts"
import { absoluteUrl, parseFrenchDateToIso } from "@/lib/seo"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return {
      title: "Article non trouvé",
      description: "L'article demandé n'existe pas ou n'est plus disponible.",
      robots: { index: false, follow: false },
    }
  }

  const canonicalPath = `/blog/${slug}`

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalPath,
    },
    keywords: [article.category, "blog", "Karim Hammouche", "portfolio"],
    openGraph: {
      type: "article",
      url: absoluteUrl(canonicalPath),
      title: article.title,
      description: article.description,
      images: [
        {
          url: absoluteUrl(article.image || "/placeholder.svg"),
          alt: article.title,
        },
      ],
      locale: "fr_FR",
      authors: ["Karim Hammouche"],
      publishedTime: parseFrenchDateToIso(article.date),
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [absoluteUrl(article.image || "/placeholder.svg")],
    },
  }
}

export default async function ArticlePage({ params }: BlogPageProps) {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    notFound()
  }

  const plainText = stripMarkdown(article.content)
  const voiceId = process.env.ELEVENLABS_VOICE_ID || ""
  const contentHash = hashText(plainText)
  const initialAudioUrl = voiceId ? await getCachedAudioUrl(slug, contentHash, voiceId) : null

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.image || "/placeholder.svg"),
    datePublished: parseFrenchDateToIso(article.date),
    dateModified: parseFrenchDateToIso(article.date),
    author: {
      "@type": "Person",
      name: "Karim Hammouche",
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: "Karim Hammouche",
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    articleSection: article.category,
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogNavbar />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/blog">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Retour au blog
          </Link>
        </Button>

        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-primary">{article.category}</span>
            <time className="text-sm text-muted-foreground">{article.date}</time>
          </div>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </header>

        <AudioPlayer slug={slug} text={plainText} initialUrl={initialAudioUrl} />

        <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="whitespace-pre-line text-muted-foreground">{article.content}</p>
        </div>
      </article>
    </main>
  )
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}
