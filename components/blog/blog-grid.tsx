import { BlogCard } from "./blog-card"

const articles = [
  {
    id: 1,
    title: "Comment j'ai lancé mon premier business en ligne",
    description: "Retour d'expérience sur la création de FelizBella et les leçons apprises en e-commerce.",
    date: "15 Décembre 2024",
    category: "Entrepreneuriat",
    image: "/ecommerce-business-startup.jpg",
    slug: "premier-business-en-ligne",
  },
  {
    id: 2,
    title: "Le futur des DAO et de la gouvernance décentralisée",
    description: "Exploration des modèles de gouvernance Web3 et comment The Hand DAO innove dans ce domaine.",
    date: "10 Décembre 2024",
    category: "Web3",
    image: "/web3-blockchain-dao-governance.jpg",
    slug: "futur-dao-gouvernance",
  },
  {
    id: 3,
    title: "De Business Developer à Full Stack Developer",
    description: "Mon parcours de reconversion et pourquoi j'ai choisi Le Wagon pour apprendre le code.",
    date: "5 Décembre 2024",
    category: "Tech",
    image: "/coding-bootcamp-developer-journey.jpg",
    slug: "reconversion-developpeur",
  },
  {
    id: 4,
    title: "L'importance de la Data dans la prise de décision",
    description: "Comment utiliser les données pour piloter une entreprise et optimiser les performances.",
    date: "28 Novembre 2024",
    category: "Data",
    image: "/data-analytics-dashboard-business.jpg",
    slug: "data-prise-decision",
  },
  {
    id: 5,
    title: "Construire une marketplace B2B : retour d'expérience",
    description: "Les défis et succès rencontrés lors du développement de KR Global.",
    date: "20 Novembre 2024",
    category: "Entrepreneuriat",
    image: "/b2b-marketplace-platform.png",
    slug: "construire-marketplace-b2b",
  },
  {
    id: 6,
    title: "React, Next.js et l'écosystème JavaScript moderne",
    description: "Tour d'horizon des technologies que j'utilise au quotidien pour créer des applications web.",
    date: "15 Novembre 2024",
    category: "Tech",
    image: "/react-nextjs-javascript-code.jpg",
    slug: "react-nextjs-javascript",
  },
]

export function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <BlogCard key={article.id} article={article} />
      ))}
    </div>
  )
}
