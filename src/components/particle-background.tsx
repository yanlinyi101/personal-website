"use client"

import React, { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"

export const particleOptions = {
  background: { color: { value: "transparent" } },
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: ["#2F80ED", "#ffffff"] },
    links: { enable: true, distance: 120, opacity: 0.25, width: 1 },
    move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    opacity: { value: 0.4 },
    size: { value: { min: 1, max: 3 } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.3 } }
  },
  detectRetina: true
}

interface ParticleBackgroundProps {
  className?: string
}

export function ParticleBackground({ className }: ParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Do something when particles are loaded
  }, [])

  return (
    <div className={`absolute inset-0 z-0 ${className || ""}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
        className="h-full w-full"
      />
    </div>
  )
} 