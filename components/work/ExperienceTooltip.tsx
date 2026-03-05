"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

type ExperienceTooltipProps = {
  title: string
  company: string
  description: string
  position: { x: number; y: number }
  visible: boolean
}

export function ExperienceTooltip({
  title,
  company,
  description,
  position,
  visible,
}: ExperienceTooltipProps) {
  const [isMounted, setIsMounted] = useState(false)
  const safeDescription = description?.trim() || "Details coming soon."

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="fixed pointer-events-none z-[9999] w-[320px] max-w-[calc(100vw-24px)] rounded-2xl border border-black bg-white p-4 text-black shadow-xl dark:border-white/10 dark:bg-black dark:text-white"
          style={{ left: position.x, top: position.y }}
        >
          <p className="font-semibold leading-tight">{title}</p>
          {company ? <p className="mt-0.5 text-xs opacity-70">{company}</p> : null}
          <p className="mt-2 text-sm leading-relaxed opacity-90">{safeDescription}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
