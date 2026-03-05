"use client"

import { Download } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">About</h2>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Versatile professional with a strong background in technical maintenance, logistics, and field operations, built
        through hands-on experience in industrial and public service environments. I am used to working in demanding
        contexts where reliability, safety, and efficiency are critical.
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Alongside my technical and operational roles, I developed solid management and entrepreneurial skills through
        multiple business projects, including team coordination, process organization, and decision-making under
        pressure. I also built strong digital competencies, allowing me to combine operational thinking with structured,
        efficient execution.
      </p>

      {/* Download CV */}
      <div className="flex justify-center pt-4">
        <a
          href="/cv/Karim_Hammouche_CV_EN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition"
        >
          <Download className="h-4 w-4" />
          Download CV (EN)
        </a>
      </div>
    </section>
  )
}
