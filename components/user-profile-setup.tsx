"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { createUserProfile } from "@/lib/stats-storage"
import { Music, Sparkles } from "lucide-react"

interface UserProfileSetupProps {
  onComplete: () => void
  language: "es" | "en"
}

const avatars = ["🎤", "🎸", "🎹", "🎵", "🎶", "⭐", "💜", "💖", "✨", "🌟", "💫", "🦋"]

export default function UserProfileSetup({ onComplete, language }: UserProfileSetupProps) {
  const [username, setUsername] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("🎤")

  const t = {
    es: {
      title: "¡Bienvenido/a Swiftie!",
      subtitle: "Crea tu perfil para empezar",
      usernamePlaceholder: "Tu nombre de usuario",
      selectAvatar: "Elige tu avatar",
      start: "Comenzar Aventura",
      usernameRequired: "El nombre de usuario es requerido",
    },
    en: {
      title: "Welcome Swiftie!",
      subtitle: "Create your profile to get started",
      usernamePlaceholder: "Your username",
      selectAvatar: "Choose your avatar",
      start: "Start Adventure",
      usernameRequired: "Username is required",
    },
  }

  const handleSubmit = () => {
    if (!username.trim()) {
      alert(t[language].usernameRequired)
      return
    }
    createUserProfile(username.trim(), selectedAvatar)
    onComplete()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 p-4">
      <Card className="max-w-md w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t[language].title}
            </h1>
            <Sparkles className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-muted-foreground">{t[language].subtitle}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              {language === "es" ? "Nombre de Usuario" : "Username"}
            </label>
            <Input
              type="text"
              placeholder={t[language].usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-lg py-6"
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">{t[language].selectAvatar}</label>
            <div className="grid grid-cols-6 gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-4xl p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                    selectedAvatar === avatar
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 scale-110 shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {t[language].start}
          </Button>
        </div>
      </Card>
    </div>
  )
}
