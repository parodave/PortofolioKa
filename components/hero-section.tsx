"use client"

import { Mail, MapPin, Phone, Globe2 } from "lucide-react"
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/magicui/scroll-based-velocity"
import { SparklesText } from "@/components/magicui/sparkles-text"

const HI_TRANSLATIONS = ["Hi", "Salut", "Marhaba", "こんにちは", "你好"]
const IM_TRANSLATIONS = ["I'm", "Je suis", "Ana", "私は", "我是"]

export function HeroSection() {
  return (
    <section id="hero" className="flex flex-col gap-8">
      <div className="relative overflow-hidden py-4">
        <ScrollVelocityContainer className="mb-2">
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            {HI_TRANSLATIONS.map((text, i) => (
              <span key={i} className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground/90 tracking-tight">
                {text}
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={2} direction={-1}>
            {IM_TRANSLATIONS.map((text, i) => (
              <span
                key={i}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-muted-foreground tracking-tight"
              >
                {text}
              </span>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <SparklesText
            className="text-4xl sm:text-5xl md:text-6xl tracking-tight"
            sparklesCount={12}
            colors={{ first: "#9E7AFF", second: "#38BDF8" }}
          >
            Karim Hammouche
          </SparklesText>
        </div>

        <p className="text-muted-foreground max-w-md text-base sm:text-lg">
          I operate digital and real-world businesses, bridging field operations, automation, e-commerce, and AI-driven systems to build scalable, efficient structures.
        </p>

        <div className="flex flex-col gap-1.5 mt-2 text-sm text-muted-foreground">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Worldwide</span>
          </div>

          {/* Nationalities (new line under location) */}
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            <span className="flex flex-wrap items-center gap-2">
              <span aria-label="France" title="France" className="text-base leading-none">🇫🇷</span>
              <span>French,</span>
              <span aria-label="Morocco" title="Morocco" className="text-base leading-none">🇲🇦</span>
              <span>Moroccan,</span>
              <span aria-label="Algeria" title="Algeria" className="text-base leading-none">🇩🇿</span>
              <span>Algerian</span>
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:karim@karimhammouche.com" className="hover:text-foreground transition-colors">
              karim@karimhammouche.com
            </a>
          </div>

          {/* WhatsApp (clickable text, no button) */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a
              href="https://wa.me/33743561304"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="Available on WhatsApp"
              title="Available on WhatsApp"
            >
              Available on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
