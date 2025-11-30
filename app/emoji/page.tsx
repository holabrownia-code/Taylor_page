"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import EmojiGame from "@/components/emoji-game"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher" // <-- Importar el switcher

export default function EmojiPage() {
  const { language } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans relative py-12">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Botón Home */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20 border-white/30"
        >
          🏠 {language === "es" ? "Inicio" : "Home"}
        </Button>
      </div>

      {/* Contenedor centrado para el juego */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-transparent">
          <EmojiGame />
        </div>
      </div>
    </div>
  )
}
