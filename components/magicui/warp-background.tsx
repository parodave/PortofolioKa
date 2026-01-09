"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"
import { useMemo } from "react"

interface WarpBackgroundProps {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
  className?: string
}

export function WarpBackground({
  children,
  perspective = 100,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(var(--border))",
  className,
}: WarpBackgroundProps) {
  const beams = useMemo(() => {
    const beamsArray = []
    const sides = ["top", "right", "bottom", "left"]

    for (let i = 0; i < beamsPerSide; i++) {
      for (const side of sides) {
        beamsArray.push({
          id: `${side}-${i}`,
          side,
          delay: Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin,
          position: (100 / (beamsPerSide + 1)) * (i + 1),
        })
      }
    }
    return beamsArray
  }, [beamsPerSide, beamDelayMax, beamDelayMin])

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg border bg-background", className)}
      style={{ perspective: `${perspective}px` }}
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="pointer-events-none absolute bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          style={{
            ...(beam.side === "top" && {
              top: 0,
              left: `${beam.position}%`,
              width: `${beamSize}px`,
              height: "100%",
              transform: "translateX(-50%)",
            }),
            ...(beam.side === "bottom" && {
              bottom: 0,
              left: `${beam.position}%`,
              width: `${beamSize}px`,
              height: "100%",
              transform: "translateX(-50%)",
            }),
            ...(beam.side === "left" && {
              left: 0,
              top: `${beam.position}%`,
              height: `${beamSize}px`,
              width: "100%",
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)",
            }),
            ...(beam.side === "right" && {
              right: 0,
              top: `${beam.position}%`,
              height: `${beamSize}px`,
              width: "100%",
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)",
            }),
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            ...(beam.side === "top" && { y: ["-100%", "100%"] }),
            ...(beam.side === "bottom" && { y: ["100%", "-100%"] }),
            ...(beam.side === "left" && { x: ["-100%", "100%"] }),
            ...(beam.side === "right" && { x: ["100%", "-100%"] }),
          }}
          transition={{
            duration: beamDuration,
            repeat: Number.POSITIVE_INFINITY,
            delay: beam.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
