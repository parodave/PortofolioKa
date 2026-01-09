"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimationFrame } from "framer-motion"
import { type CSSProperties, type ReactNode, useState } from "react"

interface SparkleProps {
  id: string
  createdAt: number
  color: string
  size: number
  style: CSSProperties
}

const DEFAULT_SPARKLE_COLORS = { first: "#9E7AFF", second: "#FE8BBB" }

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
  colors = DEFAULT_SPARKLE_COLORS,
}: {
  children: ReactNode
  className?: string
  sparklesCount?: number
  colors?: { first: string; second: string }
}) {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([])
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  useAnimationFrame((time) => {
    if (prefersReducedMotion) return

    const now = Date.now()
    const sparkle = generateSparkle(colors)

    const existingSparkles = sparkles.filter((sp) => now - sp.createdAt < 750)

    if (existingSparkles.length < sparklesCount) {
      setSparkles([...existingSparkles, sparkle])
    } else {
      setSparkles(existingSparkles)
    }
  })

  return (
    <span className={cn("relative inline-block font-bold", className)}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  )
}

function generateSparkle(colors: { first: string; second: string }): SparkleProps {
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color: Math.random() > 0.5 ? colors.first : colors.second,
    size: Math.random() * 10 + 10,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      zIndex: 20,
    },
  }
}

function Sparkle({ id, color, size, style }: SparkleProps) {
  return (
    <motion.span
      key={id}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 180],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      style={{
        position: "absolute",
        display: "block",
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </motion.span>
  )
}
