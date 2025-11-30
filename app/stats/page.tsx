"use client"

import { useLanguage } from "@/contexts/language-context"
import UserStatsPanel from "@/components/user-stats-panel"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Home } from "lucide-react"

export default function StatsPage() {
  const { language } = useLanguage()
  const router = useRouter()

  // Letras del banner según idioma
  const titleLetters = language === "es" 
    ? ["E", "S", "T", "A", "D", "Í", "S", "T", "I", "C", "A", "S"] 
    : ["S", "T", "A", "T", "I", "S", "T", "I", "C", "S"]

  // Dividimos en dos filas aproximadamente iguales
  const firstRow = titleLetters.slice(0, Math.ceil(titleLetters.length / 2))
  const secondRow = titleLetters.slice(Math.ceil(titleLetters.length / 2))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 flex flex-col items-center gap-6">
          {/* Banner centrado */}
          <div className="flex flex-col items-center gap-2 bg-transparent p-4 rounded-lg">
            <div className="flex gap-2 justify-center">
              {firstRow.map((letter, index) => (
                <div key={index} className="beaded-letter text-sm md:text-base">
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              {secondRow.map((letter, index) => (
                <div key={index} className="beaded-letter text-sm md:text-base">
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {/* Botón de regreso a inicio */}
          <Button onClick={() => router.push("/")} variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            {language === "es" ? "Inicio" : "Home"}
          </Button>
        </div>

        {/* Panel de estadísticas */}
        <UserStatsPanel language={language} />
      </div>
    </div>
  )
}
