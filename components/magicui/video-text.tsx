"use client"

import { cn } from "@/lib/utils"

interface VideoTextProps {
  src: string
  children: string
  className?: string
}

export function VideoText({ src, children, className }: VideoTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      {/* Video background */}
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
        <source src={src} type="video/mp4" />
      </video>
      {/* Text with video showing through */}
      <span
        className="relative font-bold text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {/* This creates the mask effect */}
        <span className="invisible">{children}</span>
      </span>
      {/* Actual text with mix-blend for video reveal */}
      <span
        className="absolute inset-0 flex items-center justify-start font-bold mix-blend-screen bg-black"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {children}
      </span>
    </div>
  )
}
