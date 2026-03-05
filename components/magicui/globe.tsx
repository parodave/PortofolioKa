"use client"

import React, { useEffect, useMemo, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"

type Props = {
  className?: string
  config?: Partial<COBEOptions>
}

/**
 * Globe (COBE) - Thème Clair
 * Fond blanc, eau bleu clair, continents visibles.
 */
export function Globe({ className, config }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const defaultConfig = useMemo<COBEOptions>(
    () => ({
      width: 600,
      height: 600,
      // Valeur par défaut pour le build serveur
      devicePixelRatio: 1, 

      phi: 0,
      theta: 0.25,

      // === CONFIGURATION DES COULEURS ===
      dark: 0,           // 0 = Thème clair (fond blanc)
      diffuse: 1.2,      // Luminosité globale
      mapSamples: 20000,
      mapBrightness: 4,  // Luminosité de la carte (pour bien voir les continents)

      // Couleurs (format RGB de 0 à 1)
      baseColor: [0.97, 0.97, 0.97], // Couleur des continents (Gris très clair)
      glowColor: [1, 1, 1],          // Couleur de la lueur autour (Blanc)
      markerColor: [1, 0.55, 0.2],   // Couleur des points (Orange)

      // Vos marqueurs (inchangés)
      markers: [
        { location: [51.5072, -0.1276], size: 0.06 },
        { location: [48.8566, 2.3522], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.06 },
      ],

      onRender: () => {},
    }),
    []
  )

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    let phi = 0
    let animationFrame = 0
    let globe: ReturnType<typeof createGlobe> | null = null

    const setSize = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))

      // Calcul sécurisé ici car useEffect ne tourne que sur le navigateur
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
    }

    setSize()

    const merged: COBEOptions = {
      ...defaultConfig,
      ...config,
      width: canvas.width,
      height: canvas.height,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      onRender: (state) => {
        // Vitesse de rotation
        phi += 0.003
        state.phi = phi
        state.width = canvas.width
        state.height = canvas.height
        config?.onRender?.(state)
      },
    }

    globe = createGlobe(canvas, merged)

    const ro = new ResizeObserver(() => setSize())
    ro.observe(container)

    const tick = () => {
      animationFrame = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(animationFrame)
      globe?.destroy()
      globe = null
    }
  }, [config, defaultConfig])

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-label="Globe"
        className="block h-full w-full"
        // Le fond du canvas est transparent, c'est le fond de la page (blanc) qui se verra.
        style={{ background: "transparent" }}
      />
    </div>
  )
}