"use client"

import type React from "react"

import { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { Github, Linkedin, Instagram, Globe } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FiverrIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.479.86 1.074.86.469 0 .781-.206.927-.557l1.492.157c-.293.975-1.104 1.573-2.442 1.573-1.639 0-2.696-1.027-2.696-2.584 0-1.549 1.056-2.584 2.64-2.584 1.59 0 2.626.992 2.626 2.584 0 .166-.018.37-.018.381-.02.06-.104.17-.244.17zm-1.329-1.026c-.058-.498-.429-.845-.973-.845-.52 0-.915.347-.973.845h1.946zm-4.12 2.084c-.195.195-.527.303-.922.303h-.469c-.518 0-.761-.254-.761-.764V8.508h1.61v3.016h.527c.43 0 .701-.188.701-.586V8.508h1.61v2.596c0 .976-.566 1.696-1.442 2.196l.997 1.288h-1.82l-.031-.046v.046zm-4.79.647c-1.639 0-2.696-1.027-2.696-2.584 0-1.549 1.057-2.584 2.696-2.584 1.638 0 2.696 1.035 2.696 2.584 0 1.557-1.058 2.584-2.696 2.584zm0-1.389c.645 0 1.074-.44 1.074-1.195 0-.764-.43-1.204-1.074-1.204-.645 0-1.075.44-1.075 1.204 0 .755.43 1.195 1.075 1.195zm-2.993-4.397v4.874H.384V8.508h1.61v.74c.264-.574.625-.74 1.162-.74h.528v1.316h-.528c-.546 0-.84.41-.84 1.092z" />
    </svg>
  )
}

const Circle = forwardRef<
  HTMLAnchorElement,
  { className?: string; children?: React.ReactNode; href?: string; label?: string }
>(({ className, children, href, label }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]",
        className,
      )}
    >
      {children}
    </a>
  )
})
Circle.displayName = "Circle"

export function SocialBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const linkedinRef = useRef<HTMLAnchorElement>(null)
  const instagramRef = useRef<HTMLAnchorElement>(null)
  const xRef = useRef<HTMLAnchorElement>(null)
  const githubRef = useRef<HTMLAnchorElement>(null)
  const fiverrRef = useRef<HTMLAnchorElement>(null)
  const websiteRef = useRef<HTMLAnchorElement>(null)

  return (
    <div
      className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-lg"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        {/* Left column - 3 social icons */}
        <div className="flex flex-col justify-center gap-4">
          <Circle ref={linkedinRef} href="https://www.linkedin.com/in/karim-h-497634248/" label="LinkedIn">
            <Linkedin className="size-5 text-[#0A66C2]" />
          </Circle>
          <Circle ref={instagramRef} href="https://instagram.com" label="Instagram">
            <Instagram className="size-5 text-[#E4405F]" />
          </Circle>
          <Circle ref={xRef} href="https://x.com/parodave000?s=21" label="X (Twitter)">
            <XIcon className="size-5" />
          </Circle>
        </div>

        {/* Center - Main profile node */}
        <div className="flex flex-col justify-center">
          <div
            ref={centerRef}
            className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)]"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              KH
            </span>
          </div>
        </div>

        {/* Right column - 3 social icons */}
        <div className="flex flex-col justify-center gap-4">
          <Circle ref={githubRef} href="https://github.com/parodave" label="GitHub">
            <Github className="size-5" />
          </Circle>
          <Circle ref={fiverrRef} href="https://fiverr.com" label="Fiverr">
            <FiverrIcon className="size-5 text-[#1DBF73]" />
          </Circle>
          <Circle ref={websiteRef} href="https://krglobalsolutionsltd.com" label="KR Global">
            <Globe className="size-5 text-primary" />
          </Circle>
        </div>
      </div>

      {/* Animated beams from left nodes to center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={linkedinRef}
        toRef={centerRef}
        curvature={-40}
        gradientStartColor="#0A66C2"
        gradientStopColor="#06b6d4"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={instagramRef}
        toRef={centerRef}
        gradientStartColor="#E4405F"
        gradientStopColor="#F77737"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={xRef}
        toRef={centerRef}
        curvature={40}
        gradientStartColor="#ffffff"
        gradientStopColor="#a1a1aa"
      />

      {/* Animated beams from center to right nodes */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={githubRef}
        curvature={-40}
        gradientStartColor="#06b6d4"
        gradientStopColor="#a1a1aa"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={fiverrRef}
        gradientStartColor="#06b6d4"
        gradientStopColor="#1DBF73"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={websiteRef}
        curvature={40}
        gradientStartColor="#06b6d4"
        gradientStopColor="#3b82f6"
      />
    </div>
  )
}
