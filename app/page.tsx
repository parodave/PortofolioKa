import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperience } from "@/components/work-experience"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navbar } from "@/components/navbar"
import { NavDecor } from "@/components/nav-decor"
import { absoluteUrl } from "@/lib/seo"

const pageTitle = "Portfolio"
const pageDescription =
  "Découvrez le portfolio de Karim Hammouche : parcours, expériences, projets, compétences et contact."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Karim Hammouche | ${pageTitle}`,
    description: pageDescription,
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: absoluteUrl("/professional-man-portrait.png"),
        width: 1200,
        height: 630,
        alt: "Portrait de Karim Hammouche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Karim Hammouche | ${pageTitle}`,
    description: pageDescription,
    images: [absoluteUrl("/professional-man-portrait.png")],
  },
}

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karim Hammouche",
    url: absoluteUrl("/"),
    image: absoluteUrl("/professional-man-portrait.png"),
    email: "mailto:karim@karimhammouche.com",
    jobTitle: "Full Stack Developer",
    nationality: ["French", "Moroccan", "Algerian"],
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <h1 className="sr-only">Karim Hammouche - Portfolio professionnel</h1>
      <NavDecor />
      <Navbar />
      <div className="mx-auto max-w-2xl space-y-10 px-6 py-12">
        <HeroSection />
        <AboutSection />
        <WorkExperience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
