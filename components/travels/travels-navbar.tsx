"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe2 } from "lucide-react"

export function TravelsNavbar() {
  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-2 py-1.5 shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Portfolio</span>
          </Link>
        </Button>

        <div className="w-px h-6 bg-white/10" />

        <div className="flex items-center gap-2 px-3">
          <Globe2 className="h-4 w-4 text-blue-400" />
          <span className="text-white/70 text-sm font-medium">Travels</span>
        </div>
      </div>
    </nav>
  )
}
