"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type PrimaryColor = string

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  primaryColor: PrimaryColor
  setPrimaryColor: (color: PrimaryColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>("#4f46e5") // Indigo-600 default

  // Carregar preferências do localStorage na inicialização
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    const storedPrimaryColor = localStorage.getItem("primaryColor")

    if (storedTheme) {
      setTheme(storedTheme)
    }

    if (storedPrimaryColor) {
      setPrimaryColor(storedPrimaryColor)
    }
  }, [])

  // Atualizar o localStorage e aplicar o tema quando as preferências mudarem
  useEffect(() => {
    localStorage.setItem("theme", theme)
    localStorage.setItem("primaryColor", primaryColor)

    // Aplicar o tema ao elemento HTML
    const htmlElement = document.documentElement

    if (theme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    // Aplicar a cor primária como variável CSS
    htmlElement.style.setProperty("--primary-color", primaryColor)

    // Definir a versão RGB da cor primária
    htmlElement.style.setProperty("--primary-rgb", hexToRgb(primaryColor))

    // Gerar variações da cor primária (mais clara e mais escura)
    // Estas são simplificações - em produção, você pode usar uma biblioteca de cores
    htmlElement.style.setProperty("--primary-color-light", adjustColorBrightness(primaryColor, 20))
    htmlElement.style.setProperty("--primary-color-dark", adjustColorBrightness(primaryColor, -20))
  }, [theme, primaryColor])

  // Função auxiliar para converter hex para RGB
  const hexToRgb = (hex: string): string => {
    // Remover o # se existir
    hex = hex.replace("#", "")

    // Converter para RGB
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    return `${r}, ${g}, ${b}`
  }

  // Função auxiliar para ajustar o brilho de uma cor
  const adjustColorBrightness = (hex: string, percent: number): string => {
    // Converter hex para RGB
    let r = Number.parseInt(hex.substring(1, 3), 16)
    let g = Number.parseInt(hex.substring(3, 5), 16)
    let b = Number.parseInt(hex.substring(5, 7), 16)

    // Ajustar brilho
    r = Math.min(255, Math.max(0, r + (r * percent) / 100))
    g = Math.min(255, Math.max(0, g + (g * percent) / 100))
    b = Math.min(255, Math.max(0, b + (b * percent) / 100))

    // Converter de volta para hex
    return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
