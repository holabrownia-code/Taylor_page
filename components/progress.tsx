"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, Target, Clock, Globe } from "lucide-react"
import ChileFlag from "@/components/flags/chile-flag"
import PeruFlag from "@/components/flags/peru-flag"
import BrazilFlag from "@/components/flags/brazil-flag"
import ArgentinaFlag from "@/components/flags/argentina-flag"
import ColombiaFlag from "@/components/flags/colombia-flag"
import SpainFlag from "@/components/flags/spain-flag"
import EnglandFlag from "@/components/flags/england-flag"
import FranceFlag from "@/components/flags/france-flag"
import GermanyFlag from "@/components/flags/germany-flag"
import ItalyFlag from "@/components/flags/italy-flag"
import MexicoFlag from "@/components/flags/mexico-flag"
import USAFlag from "@/components/flags/usa-flag"

interface ProgressProps {
  onBackToHome: () => void
  language?: "es" | "en"
}

interface CountryProgress {
  id: string
  name: { es: string; en: string }
  flag: React.ReactNode
  completed: number
  total: number
  bestScore: number
  gamesPlayed: number
  averageAccuracy: number
}

const translations = {
  es: {
    title: "Mi Progreso",
    subtitle: "Visualiza tu progreso por región y país",
    backButton: "Volver al Inicio",
    americas: "Américas",
    europe: "Europa",
    completed: "Completado",
    bestScore: "Mejor Puntaje",
    gamesPlayed: "Partidas Jugadas",
    accuracy: "Precisión Promedio",
    noProgress: "¡Aún no has jugado!",
    startPlaying: "Comienza a jugar para ver tu progreso aquí",
    generalSummary: "Resumen General",
    completedQuestions: "Preguntas Completadas",
    totalGames: "Total de Partidas",
    averageAccuracy: "Precisión Promedio",
    excellent: "Excelente",
    good: "Bueno",
    regular: "Regular",
    beginner: "Principiante",
    notPlayed: "Sin jugar",
  },
  en: {
    title: "My Progress",
    subtitle: "View your progress by region and country",
    backButton: "Back to Home",
    americas: "Americas",
    europe: "Europe",
    completed: "Completed",
    bestScore: "Best Score",
    gamesPlayed: "Games Played",
    accuracy: "Average Accuracy",
    noProgress: "You haven't played yet!",
    startPlaying: "Start playing to see your progress here",
    generalSummary: "General Summary",
    completedQuestions: "Completed Questions",
    totalGames: "Total Games",
    averageAccuracy: "Average Accuracy",
    excellent: "Excellent",
    good: "Good",
    regular: "Regular",
    beginner: "Beginner",
    notPlayed: "Not played",
  },
}

export default function MyProgress({ onBackToHome, language = "es" }: ProgressProps) {
  const [selectedRegion, setSelectedRegion] = useState<"americas" | "europe">("americas")
  const [americasProgress, setAmericasProgress] = useState<CountryProgress[]>([])
  const [europeProgress, setEuropeProgress] = useState<CountryProgress[]>([])

  // Ensure we have a valid language and translations
  const currentLanguage = language || "es"
  const t = translations[currentLanguage] || translations.es

  useEffect(() => {
    const leaderboardData = localStorage.getItem("trivia-leaderboard")
    let gameResults: any[] = []

    if (leaderboardData) {
      try {
        gameResults = JSON.parse(leaderboardData)
      } catch (error) {
        console.error("Error parsing leaderboard data:", error)
      }
    }

    // Americas countries
    const americasCountries = [
      { id: "usa", name: { es: "Estados Unidos", en: "United States" }, flag: <USAFlag className="w-12 h-8" /> },
      { id: "mexico", name: { es: "México", en: "Mexico" }, flag: <MexicoFlag className="w-12 h-8" /> },
      { id: "chile", name: { es: "Chile", en: "Chile" }, flag: <ChileFlag className="w-12 h-8" /> },
      { id: "peru", name: { es: "Perú", en: "Peru" }, flag: <PeruFlag className="w-12 h-8" /> },
      { id: "brazil", name: { es: "Brasil", en: "Brazil" }, flag: <BrazilFlag className="w-12 h-8" /> },
      { id: "argentina", name: { es: "Argentina", en: "Argentina" }, flag: <ArgentinaFlag className="w-12 h-8" /> },
      { id: "colombia", name: { es: "Colombia", en: "Colombia" }, flag: <ColombiaFlag className="w-12 h-8" /> },
    ]

    // Europe countries
    const europeCountries = [
      { id: "spain", name: { es: "España", en: "Spain" }, flag: <SpainFlag className="w-12 h-8" /> },
      { id: "england", name: { es: "Inglaterra", en: "England" }, flag: <EnglandFlag className="w-12 h-8" /> },
      { id: "france", name: { es: "Francia", en: "France" }, flag: <FranceFlag className="w-12 h-8" /> },
      { id: "germany", name: { es: "Alemania", en: "Germany" }, flag: <GermanyFlag className="w-12 h-8" /> },
      { id: "italy", name: { es: "Italia", en: "Italy" }, flag: <ItalyFlag className="w-12 h-8" /> },
    ]

    // Calculate progress for each country
    const calculateCountryProgress = (countries: any[]) => {
      return countries.map((country) => {
        const countryGames = gameResults.filter((game) => game.country === country.id)

        if (countryGames.length === 0) {
          return {
            ...country,
            completed: 0,
            total: 30,
            bestScore: 0,
            gamesPlayed: 0,
            averageAccuracy: 0,
          }
        }

        const bestScore = Math.max(...countryGames.map((game) => game.score))
        const averageAccuracy = Math.round(
          countryGames.reduce((sum, game) => sum + game.accuracy, 0) / countryGames.length,
        )

        // Estimate completed questions based on games played and average accuracy
        const estimatedCompleted = Math.min(30, Math.round(((countryGames.length * averageAccuracy) / 100) * 10))

        return {
          ...country,
          completed: estimatedCompleted,
          total: 30,
          bestScore,
          gamesPlayed: countryGames.length,
          averageAccuracy,
        }
      })
    }

    setAmericasProgress(calculateCountryProgress(americasCountries))
    setEuropeProgress(calculateCountryProgress(europeCountries))
  }, [])

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 40) return "bg-orange-500"
    if (percentage > 0) return "bg-red-500"
    return "bg-gray-300"
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return "text-green-600"
    if (accuracy >= 70) return "text-yellow-600"
    if (accuracy >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getBadgeText = (percentage: number) => {
    if (percentage >= 80) return t.excellent
    if (percentage >= 60) return t.good
    if (percentage >= 40) return t.regular
    if (percentage > 0) return t.beginner
    return t.notPlayed
  }

  const currentProgress = selectedRegion === "americas" ? americasProgress : europeProgress

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 font-sans">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center gap-2 text-white hover:bg-white/10 px-6 py-3 rounded-md transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            {t.backButton}
          </Button>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-xl text-primary-100">{t.subtitle}</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Region Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <Button
              variant={selectedRegion === "americas" ? "default" : "ghost"}
              onClick={() => setSelectedRegion("americas")}
              className={`px-6 py-3 rounded-md transition-all duration-200 ${
                selectedRegion === "americas" ? "bg-white text-primary-900" : "text-white hover:bg-white/10"
              }`}
            >
              <Globe className="h-5 w-5 mr-2" />
              {t.americas}
            </Button>
            <Button
              variant={selectedRegion === "europe" ? "default" : "ghost"}
              onClick={() => setSelectedRegion("europe")}
              className={`px-6 py-3 rounded-md transition-all duration-200 ml-2 ${
                selectedRegion === "europe" ? "bg-white text-primary-900" : "text-white hover:bg-white/10"
              }`}
            >
              <Globe className="h-5 w-5 mr-2" />
              {t.europe}
            </Button>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {currentProgress.map((country) => {
            const completionPercentage = Math.round((country.completed / country.total) * 100)
            const hasProgress = country.gamesPlayed > 0

            return (
              <Card
                key={country.id}
                className="bg-white/95 backdrop-blur-sm border-0 shadow-soft-lg hover:shadow-soft transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-50 rounded-lg">{country.flag}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary-900">{country.name[currentLanguage]}</h3>
                        <p className="text-primary-600">
                          {country.completed}/{country.total} {t.completed}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-900">{completionPercentage}%</div>
                      <Badge
                        variant="secondary"
                        className={`${getProgressColor(completionPercentage)} text-white border-0`}
                      >
                        {getBadgeText(completionPercentage)}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <Progress
                      value={completionPercentage}
                      className="h-4 bg-primary-100 rounded-full overflow-hidden"
                    />
                  </div>

                  {hasProgress ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                        <div>
                          <div className="text-lg font-bold text-primary-900">{country.bestScore}</div>
                          <div className="text-sm text-primary-600">{t.bestScore}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-blue-600" />
                        <div>
                          <div className="text-lg font-bold text-primary-900">{country.gamesPlayed}</div>
                          <div className="text-sm text-primary-600">{t.gamesPlayed}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-green-600" />
                        <div>
                          <div className={`text-lg font-bold ${getAccuracyColor(country.averageAccuracy)}`}>
                            {country.averageAccuracy}%
                          </div>
                          <div className="text-sm text-primary-600">{t.accuracy}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-primary-400 mb-2">
                        <Globe className="h-12 w-12 mx-auto opacity-50" />
                      </div>
                      <h4 className="text-lg font-semibold text-primary-600 mb-1">{t.noProgress}</h4>
                      <p className="text-primary-500 text-sm">{t.startPlaying}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {selectedRegion === "americas" ? t.americas : t.europe} - {t.generalSummary}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {currentProgress.reduce((sum, country) => sum + country.completed, 0)}
                  </div>
                  <div className="text-primary-200">{t.completedQuestions}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    {currentProgress.reduce((sum, country) => sum + country.gamesPlayed, 0)}
                  </div>
                  <div className="text-primary-200">{t.totalGames}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">
                    {Math.round(
                      currentProgress
                        .filter((c) => c.gamesPlayed > 0)
                        .reduce((sum, country) => sum + country.averageAccuracy, 0) /
                        currentProgress.filter((c) => c.gamesPlayed > 0).length || 0,
                    )}
                    %
                  </div>
                  <div className="text-primary-200">{t.averageAccuracy}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
