"use client"

import { cn } from "@/lib/utils"

export function Ripple({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <span
        className="
          pointer-events-none absolute left-1/2 top-1/2
          size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full
          border border-black/15 dark:border-white/15
          animate-[ripple_2.8s_ease-out_infinite]
        "
      />
      <span
        className="
          pointer-events-none absolute left-1/2 top-1/2
          size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full
          border border-black/15 dark:border-white/15
          animate-[ripple_2.8s_ease-out_infinite]
          [animation-delay:0.7s]
        "
      />
      <span
        className="
          pointer-events-none absolute left-1/2 top-1/2
          size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full
          border border-black/15 dark:border-white/15
          animate-[ripple_2.8s_ease-out_infinite]
          [animation-delay:1.4s]
        "
      />
    </div>
  )
}