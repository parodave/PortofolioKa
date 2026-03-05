"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExperienceTooltip } from "@/components/work/ExperienceTooltip"
import Link from "next/link"

type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  logo?: string
  href?: string
}

type TooltipState = {
  visible: boolean
  x: number
  y: number
  title: string
  company: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    company: "Rino Recycling",
    role: "Recycling Maintenance Technician",
    period: "Oct 2024 – Apr 2025",
    location: "Brisbane, Australia",
    logo: "/logo/rinorecycling.png",
    href: "https://www.rinorecycling.com.au",
  },
  {
    company: "Cœur d’Essonne Agglomération",
    role: "Library Assistant & Delivery Driver",
    period: "Sep 2019 – Apr 2024",
    location: "Sainte-Geneviève-des-Bois, France",
    logo: "/logo/coeur-essonne.jpeg",
    href: "https://www.coeuressonne.fr",
  },
  {
    company: "Sofitel (Accor)",
    role: "Dishwasher, Kitchen Assistant & Waiter",
    period: "Apr 2019 – Aug 2019",
    location: "Ajaccio, Corsica",
    logo: "/logo/sofitel.png",
    href: "https://sofitel.accor.com/en/hotels/0587.html",
  },
  {
    company: "Aximum",
    role: "Maintenance Technician",
    period: "Mar 2018 – Mar 2019",
    location: "Nanterre, France",
    logo: "/logo/aximum.png",
    href: "https://www.aximum.com/en",
  },
  {
    company: "Cœur d’Essonne Agglomération",
    role: "Environmental Technician",
    period: "Mar 2017 – Feb 2018",
    location: "Sainte-Geneviève-des-Bois, France",
    logo: "/logo/coeur-essonne.jpeg",
    href: "https://www.coeuressonne.fr",
  },
  {
    company: "SNCF Réseau",
    role: "Station Sales Agent",
    period: "Oct 2016 – Feb 2017",
    location: "Brétigny-sur-Orge, France",
    logo: "/logo/sncf.png",
    href: "https://www.sncf-reseau.com",
  },
  {
    company: "Frankel",
    role: "Sales Representative",
    period: "Jun 2016 – Sep 2016",
    location: "Morangis, France",
    logo: "/logo/frankel.png",
    href: "https://www.kaiserkraft.fr",
  },
  {
    company: "Eiffage",
    role: "Internship – Electrical Maintenance Technician",
    period: "Oct 2013 – Dec 2013",
    location: "Saint-Michel-sur-Orge, France",
    logo: "/logo/eiffage.png",
    href: "https://www.eiffage.com/en",
  },
  {
    company: "EDF",
    role: "Internship – Electrical Maintenance Technician",
    period: "Oct 2012 – Dec 2012",
    location: "Les Ulis, France",
    logo: "/logo/edf.png",
    href: "https://www.edf.fr/en",
  },
]

const variousWork = {
  title: "Various Work Experiences",
  period: "Short-term",
  logo: "/logo/various-work.png",
  lines: [
    "Multi-skilled municipal agent (Longpont-sur-Orge): facility maintenance, municipal logistics, technical tasks.",
    "Delivery driver (Khalyge, Afterwork): parcel deliveries, route planning, tight deadlines.",
  ],
}

const experienceDescriptions: Record<string, string> = {
  "Rino Recycling":
    "Worked as a recycling maintenance technician in Brisbane. Responsible for equipment maintenance, safety procedures, and operational reliability in a demanding industrial environment.",
  "Cœur d’Essonne Agglomération":
    "Worked as a library assistant and delivery driver. Managed logistics, book distribution between libraries, and daily interaction with the public.",
  "Sofitel (Accor)":
    "Worked in hospitality as a dishwasher and kitchen assistant in Ajaccio. Assisted kitchen operations, maintained hygiene standards, and supported the culinary team.",
  Aximum:
    "Maintenance technician responsible for infrastructure maintenance and technical interventions on public road equipment.",
  "SNCF Réseau":
    "Station sales agent responsible for assisting passengers, ticket sales, and customer service in a busy railway environment.",
  Frankel:
    "Sales representative responsible for client relations, product presentation, and sales support.",
  Eiffage:
    "Electrical maintenance internship focused on industrial electrical systems and preventive maintenance.",
  EDF:
    "Internship in electrical maintenance where I assisted technicians in diagnostics, repair, and monitoring of electrical installations.",
  "Various Work Experiences":
    "Short-term municipal logistics and maintenance roles including facility upkeep, parcel deliveries, and operational support.",
}

const TOOLTIP_OFFSET = 14
const TOOLTIP_WIDTH = 340
const TOOLTIP_HEIGHT = 180

const clampTooltipPosition = (x: number, y: number) => {
  if (typeof window === "undefined") {
    return { x, y }
  }

  return {
    x: Math.min(x + TOOLTIP_OFFSET, window.innerWidth - TOOLTIP_WIDTH),
    y: Math.min(y + TOOLTIP_OFFSET, window.innerHeight - TOOLTIP_HEIGHT),
  }
}

export function WorkExperience() {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    company: "",
    description: "",
  })

  const isHoverEnabled =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches

  const showTooltip = (x: number, y: number, title: string, company: string, description: string) => {
    if (!isHoverEnabled) return

    const position = clampTooltipPosition(x, y)

    setTooltip({
      visible: true,
      x: position.x,
      y: position.y,
      title,
      company,
      description: description?.trim() || "Details coming soon.",
    })
  }

  const moveTooltip = (x: number, y: number) => {
    if (!isHoverEnabled) return

    const position = clampTooltipPosition(x, y)

    setTooltip((prev) => ({
      ...prev,
      x: position.x,
      y: position.y,
    }))
  }

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }

  return (
    <section id="work" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Work Experience</h2>

      <div className="flex flex-col">
        {experiences.map((exp, index) => {
          const description = experienceDescriptions[exp.company] || "Details coming soon."
          const Row = (
            <>
              <Avatar className="size-12 border bg-muted">
                <AvatarImage src={exp.logo || "/placeholder.svg"} alt={exp.company} className="object-cover" />
                <AvatarFallback className="text-xs font-medium">
                  {exp.company.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm group-hover:underline">{exp.company}</h3>
                  <span className="text-xs text-muted-foreground tabular-nums">{exp.period}</span>
                </div>

                <p className="text-xs text-muted-foreground">{exp.role}</p>
                <p className="text-[11px] text-muted-foreground">{exp.location}</p>
              </div>
            </>
          )

          const className = "flex items-center gap-3 py-2 group"

          return (
            <Link
              key={index}
              href={exp.href || "#"}
              target={exp.href ? "_blank" : undefined}
              rel={exp.href ? "noopener noreferrer" : undefined}
              className={className}
              onMouseEnter={(event) =>
                showTooltip(event.clientX, event.clientY, exp.role, exp.company, description)
              }
              onMouseMove={(event) => moveTooltip(event.clientX, event.clientY)}
              onMouseLeave={hideTooltip}
            >
              {Row}
            </Link>
          )
        })}

        <div
          className="flex items-start gap-3 py-3 mt-2"
          onMouseEnter={(event) =>
            showTooltip(
              event.clientX,
              event.clientY,
              variousWork.title,
              "",
              experienceDescriptions[variousWork.title] || "Details coming soon.",
            )
          }
          onMouseMove={(event) => moveTooltip(event.clientX, event.clientY)}
          onMouseLeave={hideTooltip}
        >
          <Avatar className="size-12 border bg-muted">
            <AvatarImage src={variousWork.logo} alt={variousWork.title} className="object-contain p-1" />
            <AvatarFallback className="text-xs font-medium">V</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-sm">{variousWork.title}</h3>
              <span className="text-xs text-muted-foreground tabular-nums">{variousWork.period}</span>
            </div>

            {variousWork.lines.map((line) => (
              <p key={line} className="text-xs text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ExperienceTooltip
        title={tooltip.title}
        company={tooltip.company}
        description={tooltip.description}
        position={{ x: tooltip.x, y: tooltip.y }}
        visible={tooltip.visible}
      />
    </section>
  )
}
