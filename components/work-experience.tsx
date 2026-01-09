"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  logo?: string
  href?: string
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

export function WorkExperience() {
  return (
    <section id="work" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Work Experience</h2>

      <div className="flex flex-col">
        {experiences.map((exp, index) => {
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
            >
              {Row}
            </Link>
          )
        })}

        <div className="flex items-start gap-3 py-3 mt-2">
          <Avatar className="size-12 border bg-muted">
            <AvatarImage
              src={variousWork.logo}
              alt={variousWork.title}
              className="object-contain p-1"
            />
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
    </section>
  )
}
