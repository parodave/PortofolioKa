"use client"

import Link from "next/link"
import { Globe } from "@/components/magicui/globe"

export function NavDecor() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="pointer-events-auto">
          <Link
            href="/travels"
            aria-label="Go to Travels"
            className="fixed left-10 top-24 block"
          >
            <div className="relative h-[110px] w-[110px] sm:h-[160px] sm:w-[160px] md:h-[220px] md:w-[220px] overflow-hidden rounded-full">
              <Globe
                className="absolute inset-0 h-full w-full"
                config={{
                  dark: 0,
                  baseColor: [0.97, 0.97, 0.97],
                  glowColor: [1, 1, 1],
                  markerColor: [1, 0.55, 0.2],
                  diffuse: 1.25,
                  mapBrightness: 1.75,
                  mapSamples: 20000,
                  theta: 0.25,
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.18)]" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
