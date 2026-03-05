"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const education = [
  {
    school: "Duke Language School",
    degree: "Full-time English Studies",
    period: "May 2025 – Sep 2025",
    logo: "/logo/duke-language-school.png",
    href: "https://dukelanguage.com",
  },
  {
    school: "Patong Language School",
    degree: "Student of English",
    period: "Jun 2024 – Sep 2024",
    logo: "/logo/patong-language-school.png",
    href: "https://www.phuket-languageschool.com",
  },
  {
    school: "Le Wagon",
    degree: "Web Application Developer Bootcamp",
    period: "Feb 2023 – Jul 2023",
    logo: "/logo/le-wagon.png",
    href: "https://www.lewagon.com",
  },
  {
    school: "Lycée Parc de Vilgénis",
    degree: "BTS Business and Sales Technician",
    period: "2014 – 2016",
    logo: "/logo/lycee-parc-vilgenis.png",
    href: "https://www.lyceevilgenis.fr/",
  },
  {
    school: "Lycée Léonard de Vinci",
    degree: "High School Diploma – Electrical/Electronic",
    period: "2011 – 2014",
    logo: "/logo/lycee-leonard-de-vinci.png",
    href: "https://lyc-vinci-st-michel.ac-versailles.fr/",
  },
]

export function Education() {
  return (
    <section id="education" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Education</h2>

      <div className="flex flex-col">
        {education.map((edu, index) => (
          <Link
            key={index}
            href={edu.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2 group"
          >
            <Avatar className="size-12 border bg-muted">
              <AvatarImage
                src={edu.logo}
                alt={edu.school}
                className="object-contain p-1"
              />
              <AvatarFallback className="text-xs font-semibold">
                {edu.school[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm group-hover:underline">
                  {edu.school}
                </h3>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {edu.degree}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
