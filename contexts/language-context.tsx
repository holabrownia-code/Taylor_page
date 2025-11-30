"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  translations: {
    es: Record<string, string>
    en: Record<string, string>
  }
}

const translations = {
  es: {
    title: "Trivia de Taylor Swift",
    subtitle:
      "Descubre el universo de Taylor Swift a través de preguntas fascinantes sobre sus eras, canciones e historia",
    playNow: "Jugar Ahora",
    myProgress: "Mi Progreso",
    leaderboard: "Clasificación",
    countries: "Eras",
    progress: "Progreso",
    countriesCount: "10 Eras",
    countriesDesc: "Explora todas las eras de Taylor",
    questionsCount: "300+ Preguntas",
    questionsDesc: "Contenido sobre música y cultura pop",
    levelsCount: "3 Niveles",
    levelsDesc: "Desde principiante hasta Swiftie experto",
    readyChallenge: "¿Lista para el desafío?",
    testKnowledge: "Pon a prueba tus conocimientos y descubre cuánto sabes sobre Taylor Swift",
    startAdventure: "Comenzar Aventura",
    chooseDestination: "Elige tu Era",
    selectCountry: "Selecciona una era y nivel de dificultad para comenzar",
    backButton: "Volver",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Swiftie Experto",
    selectDifficulty: "Selecciona Dificultad",
    readyForChallenge: "¿Lista para el Desafío?",
    testKnowledgeDesc:
      "Pon a prueba tus conocimientos sobre las eras de Taylor Swift, sus canciones y su impacto cultural. ¡Cada era tiene sus secretos esperando ser descubiertos!",
    countriesAvailable: "10 Eras Disponibles",
    difficultyLevels: "3 Niveles de Dificultad",
    uniqueQuestions: "300+ Preguntas Únicas",
  },
  en: {
    title: "Taylor Swift Trivia",
    subtitle: "Discover Taylor Swift's universe through fascinating questions about her eras, songs and history",
    playNow: "Play Now",
    myProgress: "My Progress",
    leaderboard: "Leaderboard",
    countries: "Eras",
    progress: "Progress",
    countriesCount: "10 Eras",
    countriesDesc: "Explore all of Taylor's eras",
    questionsCount: "300+ Questions",
    questionsDesc: "Content about music and pop culture",
    levelsCount: "3 Levels",
    levelsDesc: "From beginner to expert Swiftie",
    readyChallenge: "Ready for the challenge?",
    testKnowledge: "Test your knowledge and discover how much you know about Taylor Swift",
    startAdventure: "Start Adventure",
    chooseDestination: "Choose your Era",
    selectCountry: "Select an era and difficulty level to begin",
    backButton: "Back",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Expert Swiftie",
    selectDifficulty: "Select Difficulty",
    readyForChallenge: "Ready for the Challenge?",
    testKnowledgeDesc:
      "Test your knowledge about Taylor Swift's eras, her songs and cultural impact. Each era has its secrets waiting to be discovered!",
    countriesAvailable: "10 Eras Available",
    difficultyLevels: "3 Difficulty Levels",
    uniqueQuestions: "300+ Unique Questions",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("trivia-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
    setIsLoaded(true)
  }, [])

  // Save language to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("trivia-language", newLanguage)
  }

  // Don't render children until language is loaded from localStorage
  if (!isLoaded) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, translations }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
