import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkExperience } from "@/components/work-experience"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navbar } from "@/components/navbar"
import { NavDecor } from "@/components/nav-decor"

export default function Home() {
return (
<main className="min-h-screen bg-background">
<NavDecor />
<Navbar />
<div className="mx-auto max-w-2xl px-6 py-12 space-y-10">
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
