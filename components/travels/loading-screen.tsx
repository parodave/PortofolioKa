"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-2 border-white/20 rounded-full" />
        <div
          className="absolute inset-0 w-16 h-16 border-2 border-t-blue-500 rounded-full animate-spin"
          style={{ animationDuration: "1s" }}
        />
      </div>

      <h2 className="text-white text-xl font-medium mb-4">Loading Globe</h2>

      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-white/40 text-sm mt-3">{Math.min(Math.round(progress), 100)}%</p>
    </div>
  )
}
