"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, ArrowLeftIcon, PenLineIcon } from "lucide-react"

export function BlogNavbar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-md px-2 py-1.5 shadow-lg">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Retour au portfolio</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
          <Link href="/blog">
            <PenLineIcon className="h-4 w-4" />
            <span className="sr-only">Blog</span>
          </Link>
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={toggleTheme}>
          {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  )
}
