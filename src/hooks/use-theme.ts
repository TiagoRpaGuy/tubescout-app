"use client"

import { useState, useCallback, useEffect } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  // Lazy initialization: load from localStorage only once on mount
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null
      return stored || "dark"
    }
    return "dark"
  })

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    } else {
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
    }
  }, [])

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, setTheme }
}
