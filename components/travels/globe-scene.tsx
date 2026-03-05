"use client"

import { useRef, useMemo, useState, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, useTexture } from "@react-three/drei"
import * as THREE from "three"
import type { Country } from "@/app/travels/page"

interface GlobeSceneProps {
  countries: Country[]
  onCountryClick: (country: Country) => void
  onCountryHover: (country: Country | null) => void
  hoveredCountry: Country | null
}

function latLngToPosition(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z]
}

function Particles() {
  const count = 1000
  const particlesRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#94a3b8" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function PulseRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3
      ringRef.current.scale.setScalar(scale)
      const material = ringRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.5 - Math.sin(state.clock.elapsedTime * 4) * 0.3
    }
  })
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.06, 0.08, 32]} />
      {/* CHANGEMENT ICI : Bleu foncé au lieu d'orange */}
      <meshBasicMaterial color="#1e3a8a" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  )
}

function CountryMarker({
  country,
  isHovered,
  onHover,
  onClick,
}: {
  country: Country
  isHovered: boolean
  onHover: (country: Country | null) => void
  onClick: (country: Country) => void
}) {
  const position = useMemo(() => latLngToPosition(country.lat, country.lng, 2.04), [country.lat, country.lng])

  return (
    <group position={position}>
      {/* Halo autour du point */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.08 : 0.05, 16, 16]} />
        {/* CHANGEMENT ICI : Bleu foncé (#1e3a8a) et Bleu un peu plus clair au survol (#2563eb) */}
        <meshBasicMaterial color={isHovered ? "#2563eb" : "#1e3a8a"} transparent opacity={0.8} />
      </mesh>
      
      {/* Point blanc au centre (on garde le blanc pour le contraste) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(country)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = "auto"
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick(country)
        }}
      >
        <sphereGeometry args={[isHovered ? 0.045 : 0.03, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {isHovered && <PulseRing />}
    </group>
  )
}

function Continents() {
  const texture = useTexture("/assets/3d/texture_earth.jpg")

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.needsUpdate = true
    }
  }, [texture])

  const material = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending, 
      color: "#ffffff",
      side: THREE.DoubleSide
    })
  }, [texture])

  return (
    <Sphere args={[2.005, 64, 64]}>
      <primitive object={material} attach="material" />
    </Sphere>
  )
}

function Globe({ countries, onCountryClick, onCountryHover, hoveredCountry }: GlobeSceneProps) {
  const globeRef = useRef<THREE.Group>(null)
  const [isHoveringMarker, setIsHoveringMarker] = useState(false)

  useFrame((state) => {
    if (globeRef.current && !isHoveringMarker) {
      globeRef.current.rotation.y += 0.001
    }
  })

  const handleMarkerHover = (country: Country | null) => {
    setIsHoveringMarker(country !== null)
    onCountryHover(country)
  }

  return (
    <group ref={globeRef}>
      {/* 1. EAU (Sphère de base) - Bleu Ciel */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#bae6fd" 
          emissive="#e0f2fe"
          emissiveIntensity={0.2}
          shininess={10}
        />
      </Sphere>

      {/* 2. CONTINENTS */}
      <Continents />

      {/* 3. GRILLE LÉGÈRE */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#64748b" wireframe transparent opacity={0.1} />
      </Sphere>

      {/* 4. MARQUEURS */}
      {countries.map((country) => (
        <CountryMarker
          key={country.name}
          country={country}
          isHovered={hoveredCountry?.name === country.name}
          onHover={handleMarkerHover}
          onClick={onCountryClick}
        />
      ))}
    </group>
  )
}

function Scene(props: GlobeSceneProps) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#bae6fd" />
      
      <Particles />
      <Globe {...props} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={8}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        autoRotate={false}
      />
    </>
  )
}

export function GlobeScene(props: GlobeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  )
}
