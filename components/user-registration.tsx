"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Sparkles } from "lucide-react"
import { saveUserName } from "@/lib/user-storage"
import { useLanguage } from "@/contexts/language-context"

interface UserRegistrationProps {
  onComplete: (name: string) => void
}

export default function UserRegistration({ onComplete }: UserRegistrationProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedName = name.trim()

    // Basic validation
    if (!trimmedName) {
      setError(language === "es" ? "Por favor ingresa tu nombre" : "Please enter your name")
      return
    }

    if (trimmedName.length < 2) {
      setError(language === "es" ? "El nombre debe tener al menos 2 caracteres" : "Name must be at least 2 characters")
      return
    }

    if (trimmedName.length > 30) {
      setError(language === "es" ? "El nombre no puede tener más de 30 caracteres" : "Name cannot exceed 30 characters")
      return
    }

    // Save the name
    saveUserName(trimmedName)
    onComplete(trimmedName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {language === "es" ? "¡Bienvenido!" : "Welcome!"}
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {language === "es"
              ? "Ingresa tu nombre para comenzar a jugar y registrar tus puntajes"
              : "Enter your name to start playing and track your scores"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                {language === "es" ? "Tu nombre" : "Your name"}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={language === "es" ? "Ingresa tu nombre" : "Enter your name"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                className={`text-base ${error ? "border-red-400" : ""}`}
                autoFocus
                maxLength={30}
              />
              {error && <p className="text-sm text-red-600 flex items-center gap-1">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-base transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {language === "es" ? "Comenzar a jugar" : "Start Playing"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {language === "es"
                ? "Tu nombre se guardará localmente en tu navegador"
                : "Your name will be saved locally in your browser"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
