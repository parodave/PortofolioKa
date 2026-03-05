"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Country } from "@/app/travels/page"

interface CountryPanelProps {
  country: Country | null
  onClose: () => void
}

export function CountryPanel({ country, onClose }: CountryPanelProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!country) return null

  const flagUrl = `https://flagcdn.com/w640/${country.code}.png`

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-96 z-30 animate-in slide-in-from-right duration-300">
      <div className="h-full bg-black/80 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{country.name}</h2>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Globe2 className="h-4 w-4" />
              <span>{country.region}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative h-48 rounded-xl overflow-hidden mb-6 border border-white/10 bg-gradient-to-br from-white/5 to-white/10">
          <Image
            src={flagUrl || "/placeholder.svg"}
            alt={`Flag of ${country.name}`}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, 384px"
          />
          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
          )}
          {/* Subtle overlay gradient for premium look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">Mon expérience</h3>
          <p className="text-white/80 leading-relaxed">{country.description}</p>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Coordonnées</span>
            <span className="text-white/80 font-mono">
              {country.lat.toFixed(2)}°, {country.lng.toFixed(2)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
