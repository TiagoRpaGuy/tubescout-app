"use client"

import { useEffect, useRef } from "react"

export function MouseSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 77, 77, 0.08), transparent 80%)`
      }
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at 50% 50%, rgba(255, 77, 77, 0.08), transparent 80%)`,
      }}
    />
  )
}
