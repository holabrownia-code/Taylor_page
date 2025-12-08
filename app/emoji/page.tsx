"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import EmojiGame from "@/components/emoji-game"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

// 🔥 IMPORTAR REGISTRO + STORAGE
import UserRegistration from "@/components/user-registration"
import { getUserName } from "@/lib/user-storage"

export default function EmojiPage() {
  const { language } = useLanguage()
  const router = useRouter()

  const [userName, setUserName] = useState<string | null>(null)
  const [isCheckingUser, setIsCheckingUser] = useState(true)

  useEffect(() => {
    const existingName = getUserName()
    setUserName(existingName)
    setIsCheckingUser(false)
  }, [])

  const handleRegistrationComplete = (name: string) => {
    setUserName(name)
  }

  // ⏳ Pantalla de carga
  if (isCheckingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // ❗ Si NO hay usuario, mostrar registro
  if (!userName) {
    return <UserRegistration onComplete={handleRegistrationComplete} />
  }

  // 🎮 Si ya hay usuario, mostrar el juego
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

      <div className="max-w-4xl mx-auto px-4">
        <EmojiGame />
      </div>
    </div>
  )
}
