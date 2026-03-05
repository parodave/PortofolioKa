export interface BlogArticle {
  title: string
  description: string
  date: string
  category: string
  image: string
  content: string
}

export const blogArticles: Record<string, BlogArticle> = {
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

export const blogList = Object.entries(blogArticles).map(([slug, article], index) => ({
  id: index + 1,
  slug,
  ...article,
}))

export function getBlogArticle(slug: string) {
  return blogArticles[slug]
}

export function getBlogSlugs() {
  return Object.keys(blogArticles)
}
