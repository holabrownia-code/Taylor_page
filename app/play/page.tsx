"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star } from "lucide-react"
import Game from "@/components/game"
import Results from "@/components/results"
import LanguageSwitcher from "@/components/language-switcher"
import UserRegistration from "@/components/user-registration"
import { useLanguage } from "@/contexts/language-context"
import { getUserName } from "@/lib/user-storage"
import { saveTriviaGameResult } from "@/lib/stats-storage"
import Image from "next/image"

type Difficulty = "beginner" | "medium" | "advanced"
type Era =
  | "debut"
  | "fearless"
  | "speaknow"
  | "red"
  | "1989"
  | "reputation"
  | "lover"
  | "folklore"
  | "evermore"
  | "midnights"
  | "ttpd"
  | "showgirl"
type View = "selection" | "game" | "results"

export default function PlayPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const [currentView, setCurrentView] = useState<View>("selection")
  const [selectedEra, setSelectedEra] = useState<Era | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
  const [gameResults, setGameResults] = useState<any>(null)
  const { language, translations } = useLanguage()
  const router = useRouter()

  const t = translations[language]

  useEffect(() => {
    const existingName = getUserName()
    setUserName(existingName)
    setIsCheckingUser(false)
  }, [])

  const handleRegistrationComplete = (name: string) => {
    setUserName(name)
  }

  const eras = [
    {
      id: "debut" as const,
      name: { es: "Taylor Swift (Debut)", en: "Taylor Swift (Debut)" },
      color: "#3A5D23",
      year: "2006",
      image: "/images/eras/debut.png",
      description: {
        es: "Inicios, inocencia, sueños adolescentes",
        en: "Beginnings, innocence, teenage dreams",
      },
    },
    {
      id: "fearless" as const,
      name: { es: "Fearless", en: "Fearless" },
      color: "#D4AF37",
      year: "2008",
      image: "/images/eras/fearless.png",
      description: {
        es: "Romances jóvenes, magia del primer amor",
        en: "Young romances, magic of first love",
      },
    },
    {
      id: "speaknow" as const,
      name: { es: "Speak Now", en: "Speak Now" },
      color: "#8E44AD",
      year: "2010",
      image: "/images/eras/speak-now.png",
      description: {
        es: "Autenticidad, confesiones, narrativas íntimas",
        en: "Authenticity, confessions, intimate narratives",
      },
    },
    {
      id: "red" as const,
      name: { es: "Red", en: "Red" },
      color: "#B22222",
      year: "2012",
      image: "/images/eras/red.png",
      description: {
        es: "Pasiones intensas, rupturas, emociones profundas",
        en: "Intense passions, breakups, deep emotions",
      },
    },
    {
      id: "1989" as const,
      name: { es: "1989", en: "1989" },
      color: "#87CEEB",
      year: "2014",
      image: "/images/eras/1989.png",
      description: {
        es: "Renacimiento pop, libertad, vida urbana",
        en: "Pop rebirth, freedom, urban life",
      },
    },
    {
      id: "reputation" as const,
      name: { es: "Reputation", en: "Reputation" },
      color: "#2C2C2C",
      year: "2017",
      image: "/images/eras/reputation.png",
      description: {
        es: "Identidad pública, conflicto, oscuridad",
        en: "Public identity, conflict, darkness",
      },
    },
    {
      id: "lover" as const,
      name: { es: "Lover", en: "Lover" },
      color: "#FFB6C1",
      year: "2019",
      image: "/images/eras/lover.png",
      description: {
        es: "Amor, esperanza, romance renovado",
        en: "Love, hope, renewed romance",
      },
    },
    {
      id: "folklore" as const,
      name: { es: "Folklore", en: "Folklore" },
      color: "#C0C0C0",
      year: "2020",
      image: "/images/eras/folklore.png",
      description: {
        es: "Historias íntimas, introspección, calma",
        en: "Intimate stories, introspection, calm",
      },
    },
    {
      id: "evermore" as const,
      name: { es: "Evermore", en: "Evermore" },
      color: "#A0522D",
      year: "2020",
      image: "/images/eras/evermore.png",
      description: {
        es: "Melancolía, narrativas rurales, dualidad luz/oscuridad",
        en: "Melancholy, rural narratives, light/dark duality",
      },
    },
    {
      id: "midnights" as const,
      name: { es: "Midnights", en: "Midnights" },
      color: "#191970",
      year: "2022",
      image: "/images/eras/midnights.png",
      description: {
        es: "Reflexiones nocturnas, ansiedad, fama",
        en: "Midnight reflections, anxiety, fame",
      },
    },
    {
      id: "ttpd" as const,
      name: { es: "The Tortured Poets Department", en: "The Tortured Poets Department" },
      color: "#5E1A1A",
      year: "2024",
      image: "/images/eras/ttpd.png",
      description: {
        es: "Dolor, introspección, confesiones crudas",
        en: "Pain, introspection, raw confessions",
      },
    },
    {
      id: "showgirl" as const,
      name: { es: "The Life of a Showgirl", en: "The Life of a Showgirl" },
      color: "#FF7F00",
      year: "2024",
      image: "/images/eras/showgirl.png",
      description: {
        es: "Glamour, espectáculo, la vida detrás del telón",
        en: "Glamour, show business, life behind the curtain",
      },
    },
  ]

  const startGame = (era: Era, difficulty: Difficulty) => {
    setSelectedEra(era)
    setSelectedDifficulty(difficulty)
    setCurrentView("game")
  }

  const handleGameComplete = (results: any) => {
    if (selectedEra) {
      saveTriviaGameResult(results, selectedEra)
    }
    setGameResults(results)
    setCurrentView("results")
  }

  const goBack = () => {
    router.push("/")
  }

  const goToSelection = () => {
    setCurrentView("selection")
    setSelectedEra(null)
    setSelectedDifficulty(null)
    setGameResults(null)
  }

  if (isCheckingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!userName) {
    return <UserRegistration onComplete={handleRegistrationComplete} />
  }

  if (currentView === "game" && selectedEra && selectedDifficulty) {
    return (
      <Game
        country={selectedEra}
        difficulty={selectedDifficulty}
        onGameComplete={handleGameComplete}
        onBackToHome={goToSelection}
      />
    )
  }

  if (currentView === "results" && gameResults && selectedEra && selectedDifficulty) {
    return (
      <Results
        results={gameResults}
        country={selectedEra}
        difficulty={selectedDifficulty}
        onPlayAgain={() => startGame(selectedEra, selectedDifficulty)}
        onShowLeaderboard={() => router.push("/?view=leaderboard")}
        onShowProgress={() => router.push("/?view=progress")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-400/20"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={goBack}
              variant="ghost"
              className="flex items-center gap-2 text-white hover:bg-white/10 px-6 py-3 rounded-md transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              {t.backButton}
            </Button>

            {/* Banner con imagen */}
            <div className="flex justify-center w-full">
              <Image
                src="/images/taylor-swift-940x250.png"
                alt="Taylor Swift Trivia Banner"
                width={400}
                height={100}
                className="object-contain"
              />
            </div>

            <div className="w-32"></div>
          </div>

          {/* 🔥 TEXTO AGREGADO DEBAJO DEL BANNER */}
          <p className="text-center text-white text-lg md:text-xl font-medium mt-4">
            {language === "es"
              ? "Selecciona una era de Taylor Swift y pon a prueba tus conocimientos"
              : "Select a Taylor Swift era and test your knowledge"}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {eras.map((era) => (
            <Card
              key={era.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/95 backdrop-blur-sm hover:scale-[1.02] overflow-hidden relative"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={era.image || "/placeholder.svg"}
                  alt={era.name[language]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: era.color }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-bold" style={{ color: era.color }}>
                    {era.year}
                  </span>
                </div>
              </div>

              <CardHeader className="text-center pb-4 pt-6 relative z-10">
                <CardTitle className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {era.name[language]}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed px-2 group-hover:text-gray-700 transition-colors duration-300">
                  {era.description[language]}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-8 relative z-10">
                <div className="space-y-3">
                  <div className="text-center mb-4">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {t.selectDifficulty}
                    </span>
                  </div>

                  <Button
                    onClick={() => startGame(era.id, "beginner")}
                    variant="outline"
                    size="sm"
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200 hover:border-green-300 hover:shadow-md transition-all duration-300 font-semibold py-3 rounded-lg group-hover:scale-105"
                  >
                    <Star className="h-4 w-4 mr-2 fill-current" />
                    {t.beginner}
                  </Button>

                  <Button
                    onClick={() => startGame(era.id, "medium")}
                    variant="outline"
                    size="sm"
                    className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 font-semibold py-3 rounded-lg group-hover:scale-105"
                  >
                    <Star className="h-4 w-4 mr-2 fill-current" />
                    {t.medium}
                  </Button>

                  <Button
                    onClick={() => startGame(era.id, "advanced")}
                    variant="outline"
                    size="sm"
                    className="w-full bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-300 font-semibold py-3 rounded-lg group-hover:scale-105"
                  >
                    <Star className="h-4 w-4 mr-2 fill-current" />
                    {t.advanced}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
