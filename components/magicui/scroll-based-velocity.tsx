"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface ScrollVelocityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ScrollVelocityContainer({ className, children, ...props }: ScrollVelocityContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  return (
    <ScrollVelocityContext.Provider value={{ smoothVelocity, containerRef }}>
      <div ref={containerRef} className={cn("overflow-hidden", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  )
}

interface ScrollVelocityContextType {
  smoothVelocity: ReturnType<typeof useSpring>
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ScrollVelocityContext = React.createContext<ScrollVelocityContextType | null>(null)

function useScrollVelocity() {
  const context = React.useContext(ScrollVelocityContext)
  if (!context) {
    throw new Error("useScrollVelocity must be used within a ScrollVelocityContainer")
  }
  return context
}

interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
}

export function ScrollVelocityRow({
  className,
  children,
  baseVelocity = 5,
  direction = 1,
  ...props
}: ScrollVelocityRowProps) {
  const { smoothVelocity } = useScrollVelocity()
  const baseX = useMotionValue(0)
  const x = useTransform(baseX, (v) => `${v}%`)

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const directionFactor = React.useRef<number>(direction)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -direction
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = direction
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)

    if (baseX.get() < -100) {
      baseX.set(0)
    } else if (baseX.get() > 0) {
      baseX.set(-100)
    }
  })

  return (
    <div className={cn("flex flex-nowrap overflow-hidden", className)} {...props}>
      <motion.div className="flex flex-nowrap gap-8 whitespace-nowrap" style={{ x }}>
        <span className="flex items-center gap-8">{children}</span>
        <span className="flex items-center gap-8">{children}</span>
        <span className="flex items-center gap-8">{children}</span>
        <span className="flex items-center gap-8">{children}</span>
      </motion.div>
    </div>
  )
}
