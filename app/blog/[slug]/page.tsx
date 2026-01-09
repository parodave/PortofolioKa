import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogNavbar } from "@/components/blog/blog-navbar"

const articles: Record<
  string,
  {
    title: string
    description: string
    date: string
    category: string
    image: string
    content: string
  }
> = {
  "premier-business-en-ligne": {
    title: "Comment j'ai lancé mon premier business en ligne",
    description: "Retour d'expérience sur la création de FelizBella et les leçons apprises en e-commerce.",
    date: "15 Décembre 2024",
    category: "Entrepreneuriat",
    image: "/ecommerce-business-startup.jpg",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
  "futur-dao-gouvernance": {
    title: "Le futur des DAO et de la gouvernance décentralisée",
    description: "Exploration des modèles de gouvernance Web3 et comment The Hand DAO innove dans ce domaine.",
    date: "10 Décembre 2024",
    category: "Web3",
    image: "/web3-blockchain-dao-governance.jpg",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
  "reconversion-developpeur": {
    title: "De Business Developer à Full Stack Developer",
    description: "Mon parcours de reconversion et pourquoi j'ai choisi Le Wagon pour apprendre le code.",
    date: "5 Décembre 2024",
    category: "Tech",
    image: "/coding-bootcamp-developer-journey.jpg",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
  "data-prise-decision": {
    title: "L'importance de la Data dans la prise de décision",
    description: "Comment utiliser les données pour piloter une entreprise et optimiser les performances.",
    date: "28 Novembre 2024",
    category: "Data",
    image: "/data-analytics-dashboard-business.jpg",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
  "construire-marketplace-b2b": {
    title: "Construire une marketplace B2B : retour d'expérience",
    description: "Les défis et succès rencontrés lors du développement de KR Global.",
    date: "20 Novembre 2024",
    category: "Entrepreneuriat",
    image: "/b2b-marketplace-platform.png",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
  "react-nextjs-javascript": {
    title: "React, Next.js et l'écosystème JavaScript moderne",
    description: "Tour d'horizon des technologies que j'utilise au quotidien pour créer des applications web.",
    date: "15 Novembre 2024",
    category: "Tech",
    image: "/react-nextjs-javascript-code.jpg",
    content: `
      Contenu de l'article à venir...
      
      Vous pouvez modifier ce contenu avec vos propres articles.
    `,
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Button asChild>
            <Link href="/blog">Retour au blog</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <BlogNavbar />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/blog">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </Button>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-primary">{article.category}</span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </header>

        <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground whitespace-pre-line">{article.content}</p>
        </div>
      </article>
    </main>
  )
}

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}
