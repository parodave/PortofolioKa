"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"

const skills = [
  "Technical Maintenance",
  "Electrical Maintenance",
  "Preventive & Corrective Maintenance",
  "Troubleshooting",
  "Industrial Safety",
  "Field Operations",
  "Operations Coordination",
  "Team Management",
  "Workflow Organization",
  "Task Prioritization",
  "Decision Making Under Pressure",
  "Supabase",
  "API Integration",
  "GitHub",
  "Shopify",
  "AI Tools",
  "Automation Tools",
  "Project Management",
  "Process Optimization",
  "Digital Systems Integration",
  "E-commerce",
  "Digital Marketing",
  "SEO",
  "Prompt Engineering",
]

// Optionnel: petit texte tooltip (tu peux modifier plus tard)
const TOOLTIP: Record<string, string> = {
  "Technical Maintenance": "Hands-on maintenance, diagnostics, reliability.",
  "Electrical Maintenance": "Electrical systems, inspections, safe interventions.",
  "Preventive & Corrective Maintenance": "PM plans, corrective actions, uptime.",
  Troubleshooting: "Root-cause analysis, fast incident resolution.",
  "Industrial Safety": "Safety-first mindset, procedures, compliance.",
  "Field Operations": "On-site execution, coordination, real-world constraints.",
  "Operations Coordination": "Planning, follow-up, smooth daily operations.",
  "Team Management": "Coordination, accountability, delivery under pressure.",
  "Workflow Organization": "Priorities, structure, repeatable processes.",
  "Task Prioritization": "Focus on impact, time-critical execution.",
  "Decision Making Under Pressure": "Fast decisions with risk awareness.",
  Supabase: "DB, auth, APIs, quick product building.",
  "API Integration": "Connect services, automate workflows.",
  GitHub: "Version control, branching, collaboration.",
  Shopify: "Store setup, theme edits, operational e-commerce.",
  "AI Tools": "AI-assisted workflows for speed and quality.",
  "Automation Tools": "Automations to reduce manual work.",
  "Project Management": "Scope, execution, delivery tracking.",
  "Process Optimization": "Make systems faster, cleaner, measurable.",
  "Digital Systems Integration": "Connect tools, data, operations.",
  "E-commerce": "Conversion-first online commerce execution.",
  "Digital Marketing": "Acquisition, content, growth loops.",
  SEO: "Search visibility, content structure, basics.",
  "Prompt Engineering": "Clear prompts, reliable outputs, iteration.",
}

type TooltipState = {
  open: boolean
  label: string
  text: string
  x: number
  y: number
}

export function Skills() {
  const reduceMotion = useReducedMotion()
  const [tip, setTip] = React.useState<TooltipState>({
    open: false,
    label: "",
    text: "",
    x: 0,
    y: 0,
  })

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.03, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 },
    show: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  }

  const openTooltip = (label: string, e: React.MouseEvent | React.FocusEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top - 10
    setTip({
      open: true,
      label,
      text: TOOLTIP[label] || label,
      x,
      y,
    })
  }

  const closeTooltip = () => setTip((p) => ({ ...p, open: false }))

  // reposition au scroll/resize si tooltip ouvert
  React.useEffect(() => {
    if (!tip.open) return
    const onMove = () => closeTooltip()
    window.addEventListener("scroll", onMove, { passive: true })
    window.addEventListener("resize", onMove)
    return () => {
      window.removeEventListener("scroll", onMove)
      window.removeEventListener("resize", onMove)
    }
  }, [tip.open])

  return (
    <section id="skills" className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Skills</h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-1"
      >
        {skills.map((skill) => (
          <motion.div key={skill} variants={item}>
            <Badge
              variant="secondary"
              tabIndex={0}
              onMouseEnter={(e) => openTooltip(skill, e)}
              onMouseLeave={closeTooltip}
              onFocus={(e) => openTooltip(skill, e)}
              onBlur={closeTooltip}
              className="
                relative
                group
                text-xs
                cursor-default
                select-none
                outline-none
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:scale-[1.03]
                hover:bg-background
                hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                active:translate-y-0
                active:scale-100

                focus-visible:ring-2
                focus-visible:ring-foreground/70
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
              aria-label={skill}
            >
              <span className="relative z-10">{skill}</span>

              {/* subtle premium glow */}
              <span
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-full
                  opacity-0
                  blur-md
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                  bg-foreground/10
                "
              />
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Tooltip premium (noir/blanc cohérent) */}
      {tip.open && (
        <div
          role="tooltip"
          className="
            fixed
            z-50
            -translate-x-1/2
            -translate-y-full
            rounded-md
            border
            bg-foreground
            px-2.5
            py-1.5
            text-[11px]
            font-medium
            text-background
            shadow-lg
            pointer-events-none
            max-w-[260px]
            whitespace-normal
          "
          style={{ left: tip.x, top: tip.y }}
        >
          {tip.text}
          <div
            aria-hidden
            className="
              absolute
              left-1/2
              top-full
              h-2
              w-2
              -translate-x-1/2
              -translate-y-1/2
              rotate-45
              border-r
              border-b
              border-border
              bg-foreground
            "
          />
        </div>
      )}
    </section>
  )
}
