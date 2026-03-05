"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import PortfolioCopilot from "@/components/assistant/PortfolioCopilot"
import {
  MoonIcon,
  SunIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FolderIcon,
  PenLineIcon,
  Globe2Icon,
  MailIcon,
  BotIcon,
  LibraryIcon,
} from "lucide-react"

const navItems = [
  { href: "#hero", icon: HomeIcon, label: "Home" },
  { href: "#about", icon: UserIcon, label: "About" },
  { href: "#work", icon: BriefcaseIcon, label: "Work" },
  { href: "#education", icon: GraduationCapIcon, label: "Education" },
  { href: "#projects", icon: FolderIcon, label: "Projects" },
  { href: "#contact", icon: MailIcon, label: "Contact" },
]

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  useEffect(() => {
    if (!isCopilotOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCopilotOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isCopilotOpen])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{item.label}</span>
              </a>
            </Button>
          ))}

          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
            <Link href="/blog">
              <PenLineIcon className="h-4 w-4" />
              <span className="sr-only">Blog</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
            <Link href="/books">
              <LibraryIcon className="h-4 w-4" />
              <span className="sr-only">Bibliothèque</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
            <Link href="/travels">
              <Globe2Icon className="h-4 w-4" />
              <span className="sr-only">Travels</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            aria-label="Assistant"
            onClick={() => setIsCopilotOpen(true)}
            type="button"
          >
            <BotIcon className="h-4 w-4" />
            <span className="sr-only">Assistant</span>
          </Button>

          <div className="mx-1 h-6 w-px bg-border" />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={toggleTheme}
            type="button"
          >
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isCopilotOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCopilotOpen(false)}
            role="presentation"
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-card/95 shadow-xl"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio Copilot"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 rounded-full"
                onClick={() => setIsCopilotOpen(false)}
                aria-label="Fermer le Portfolio Copilot"
              >
                <XIcon className="h-4 w-4" />
              </Button>

              <PortfolioCopilot className="border-0 bg-transparent shadow-none" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
