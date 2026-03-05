"use client"

import { Suspense, useState } from "react"
import dynamic from "next/dynamic"
import { TravelsNavbar } from "@/components/travels/travels-navbar"
import { CountryPanel } from "@/components/travels/country-panel"
import { LoadingScreen } from "@/components/travels/loading-screen"

// Import dynamique du globe
const GlobeScene = dynamic(() => import("@/components/travels/globe-scene").then((mod) => mod.GlobeScene), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

export interface Country {
  name: string
  lat: number
  lng: number
  description: string
  region: string
  code: string
}

export const visitedCountries: Country[] = [
  { name: "France", lat: 46.6034, lng: 1.8883, description: "Mon pays natal, le berceau de mon parcours entrepreneurial.", region: "Europe", code: "fr" },
  { name: "Spain", lat: 40.4637, lng: -3.7492, description: "Culture vibrante et architecture époustouflante.", region: "Europe", code: "es" },
  { name: "Germany", lat: 51.1657, lng: 10.4515, description: "Innovation et histoire industrielle.", region: "Europe", code: "de" },
  { name: "Netherlands", lat: 52.1326, lng: 5.2913, description: "Design avant-gardiste et esprit entrepreneurial.", region: "Europe", code: "nl" },
  { name: "Belgium", lat: 50.5039, lng: 4.4699, description: "Au carrefour de l'Europe.", region: "Europe", code: "be" },
  { name: "Switzerland", lat: 46.8182, lng: 8.2275, description: "Précision, nature et innovation.", region: "Europe", code: "ch" },
  { name: "Morocco", lat: 31.7917, lng: -7.0926, description: "Traditions ancestrales et hospitalité légendaire.", region: "Africa", code: "ma" },
  { name: "Algeria", lat: 28.0339, lng: 1.6596, description: "Mes racines, ma culture, mon identité.", region: "Africa", code: "dz" },
  { name: "Thailand", lat: 15.87, lng: 100.9925, description: "Le sourire de l'Asie et ses temples majestueux.", region: "Asia", code: "th" },
  { name: "Vietnam", lat: 14.0583, lng: 108.2772, description: "Histoire riche et cuisine inoubliable.", region: "Asia", code: "vn" },
  { name: "Laos", lat: 19.8563, lng: 102.4955, description: "Sérénité et beauté naturelle préservée.", region: "Asia", code: "la" },
  { name: "Malaysia", lat: 4.2105, lng: 101.9758, description: "Diversité culturelle et modernité.", region: "Asia", code: "my" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, description: "L'excellence urbaine et l'innovation tech.", region: "Asia", code: "sg" },
  { name: "Indonesia", lat: -0.7893, lng: 113.9213, description: "Archipel de merveilles et de biodiversité.", region: "Asia", code: "id" },
  { name: "China", lat: 35.8617, lng: 104.1954, description: "Civilisation millénaire et ambition futuriste.", region: "Asia", code: "cn" },
  { name: "United Arab Emirates", lat: 23.4241, lng: 53.8478, description: "Vision du futur et ambition sans limite.", region: "Middle East", code: "ae" },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, description: "Transformation et nouvelles opportunités.", region: "Middle East", code: "sa" },
  { name: "Qatar", lat: 25.3548, lng: 51.1839, description: "Innovation et rayonnement international.", region: "Middle East", code: "qa" },
  { name: "Australia", lat: -25.2744, lng: 133.7751, description: "Immensité, nature sauvage et qualité de vie.", region: "Oceania", code: "au" },
  { name: "Corsica", lat: 42.0396, lng: 9.0129, description: "L'île de beauté, un joyau méditerranéen.", region: "Europe", code: "fr" },
]

export default function TravelsPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)

  return (
    // CHANGEMENT 1: bg-white au lieu de bg-black
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <Suspense fallback={<LoadingScreen />}>
        <GlobeScene
          countries={visitedCountries}
          onCountryClick={setSelectedCountry}
          onCountryHover={setHoveredCountry}
          hoveredCountry={hoveredCountry}
        />
      </Suspense>

      <TravelsNavbar />

      <div className="absolute top-8 left-8 z-10">
        {/* CHANGEMENT 2: text-black au lieu de text-white */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Karim Travels</h1>
        <p className="text-gray-500 text-sm md:text-base max-w-xs">
          {visitedCountries.length} countries explored across the globe
        </p>
      </div>

      <CountryPanel country={selectedCountry} onClose={() => setSelectedCountry(null)} />

      {hoveredCountry && !selectedCountry && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          {/* CHANGEMENT 3: Étiquette adaptée au fond blanc (ombre + bordure fine) */}
          <div className="bg-white/90 backdrop-blur-md border border-black/10 shadow-lg rounded-xl px-4 py-2 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-black font-medium text-sm">{hoveredCountry.name}</p>
            <p className="text-gray-500 text-xs">{hoveredCountry.region}</p>
          </div>
        </div>
      )}
    </div>
  )
}
