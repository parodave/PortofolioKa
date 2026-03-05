import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogNavbar } from "@/components/blog/blog-navbar"
import { AudioPlayer } from "@/components/blog/AudioPlayer"
import { getBlogArticle, getBlogSlugs } from "@/lib/blog"
import { getCachedAudioUrl, hashText, stripMarkdown } from "@/lib/tts"

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
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-primary">{article.category}</span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </header>

        <AudioPlayer slug={slug} text={plainText} initialUrl={initialAudioUrl} />

        <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
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
