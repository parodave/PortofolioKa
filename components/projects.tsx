"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type ProjectLink = { type: string; href: string }
type Project = {
  title: string
  dates: string
  description: string
  tags: string[]
  image: string
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    title: "KR Global Solutions LTD",
    dates: "2025 – Present",
    description:
      "Co-founder of an international digital company focused on SaaS platforms, e-commerce solutions, and AI integration. Designing and building custom web applications, automating business processes, and supporting digital transformation across multiple markets.",
    tags: ["SaaS", "Next.js", "TypeScript", "Automation", "AI", "Stripe", "Supabase"],
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [{ type: "Website", href: "https://www.krglobalsolutionsltd.com" }],
  },
  {
    title: "The Hand DAO",
    dates: "2025 – Present",
    description:
      "Co-founder of a decentralized organization designed to federate multiple businesses under a shared governance and revenue model. Worked on DAO structure, governance logic, platform design, and long-term strategic roadmap.",
    tags: ["DAO", "Web3", "Governance", "Platform Design", "Automation"],
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "FelizBella Cosmetics",
    dates: "2025 – Present",
    description:
      "Co-founder of an online cosmetics brand. Involved in brand creation, e-commerce setup, digital marketing strategy, and operational coordination with suppliers and partners.",
    tags: ["E-commerce", "Branding", "Marketing", "Operations"],
    image:
      "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "KHH Global Projects",
    dates: "2023 – Present",
    description:
      "Co-founder of a real estate project focused on short-term rentals in Morocco. Managing Airbnb properties remotely using automation tools to optimize bookings, customer communication, and profitability.",
    tags: ["Real Estate", "Automation", "Remote Management"],
    image:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "Domaine Harrach",
    dates: "2019 – Present",
    description:
      "Co-founder of a family-owned agricultural project in Morocco focused on organic fruit production. Participating in project structuring, crop planning, and long-term operational decisions.",
    tags: ["Agriculture", "Sustainability", "Entrepreneurship"],
    image:
      "https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "TLFH",
    dates: "2021 – 2024",
    description:
      "Associate and Operations Manager in a B2B transport company. Responsible for route planning, driver coordination, delivery tracking, client relations, and operational process optimization.",
    tags: ["Logistics", "Operations", "Team Management"],
    image:
      "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "Wash Center",
    dates: "2022 – 2023",
    description:
      "Associate in an automotive cleaning company serving private and professional clients. Contributed to project launch, team organization, daily operations, and local marketing.",
    tags: ["Services", "Operations", "Management"],
    image:
      "https://images.pexels.com/photos/6873089/pexels-photo-6873089.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "Turfu Driving",
    dates: "2020 – 2023",
    description:
      "Founder of a digital vehicle rental company. Built the project from scratch, implemented CRM tools, managed digital marketing, fleet operations, and customer experience optimization.",
    tags: ["Entrepreneurship", "CRM", "Digital Marketing", "Automation"],
    image:
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
  {
    title: "0’240 Fast-Food",
    dates: "2020 – 2022",
    description:
      "Founder of a fast-food restaurant. Managed the full lifecycle of the business including concept creation, recruitment, suppliers, budgeting, daily operations, and customer relations.",
    tags: ["Entrepreneurship", "Operations", "Team Management"],
    image:
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    links: [],
  },
]

function getPrimaryHref(project: Project) {
  return project.links?.[0]?.href || "#projects"
}

export function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-6 w-full">
      <div className="space-y-2 text-center">
        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
          My Projects
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Selected projects & ventures
        </h2>
        <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Entrepreneurial, operational, and digital projects built across different industries and countries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[900px] mx-auto w-full">
        {projects.map((project, index) => {
          const href = getPrimaryHref(project)
          const clickable = href !== "#projects"

          return (
            <Card
              key={index}
              className={cn(
                "group relative flex flex-col overflow-hidden border h-full",
                "transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5",
                "focus-within:ring-2 focus-within:ring-foreground/10",
              )}
            >
              {/* Whole-card click overlay (only if a real link exists) */}
              {clickable && (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="absolute inset-0 z-10 rounded-lg"
                />
              )}

              {/* Image (uniform look) */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 450px"
                  className={cn(
                    "object-cover object-center",
                    "transition-transform duration-500",
                    "group-hover:scale-[1.03]",
                  )}
                />
                {/* subtle overlay for consistency */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>

              <CardHeader className="px-3 relative z-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base truncate">
                      {project.title}
                    </CardTitle>
                    <time className="text-xs text-muted-foreground">
                      {project.dates}
                    </time>
                  </div>

                  {clickable && (
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs text-muted-foreground",
                        "opacity-0 translate-y-0.5 transition-all duration-300",
                        "group-hover:opacity-100 group-hover:translate-y-0",
                      )}
                      aria-hidden="true"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                <CardDescription className="text-xs">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto px-3 relative z-0">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {/* Keep link badges visible & clickable above overlay */}
              <CardFooter className="px-3 pb-3 relative z-20">
                {project.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto"
                  >
                    <Badge variant="outline" className="text-[10px]">
                      {link.type}
                    </Badge>
                  </Link>
                ))}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
