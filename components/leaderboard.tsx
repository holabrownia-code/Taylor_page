"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, ArrowLeft, Clock, Target } from "lucide-react"
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
import UsaFlag from "@/components/flags/usa-flag"

interface LeaderboardEntry {
  id: string
  score: number
  country:
    | "chile"
    | "peru"
    | "brazil"
    | "argentina"
    | "colombia"
    | "spain"
    | "england"
    | "france"
    | "germany"
    | "italy"
    | "mexico"
    | "usa"
  difficulty: "beginner" | "medium" | "advanced"
  accuracy: number
  timeSpent: number
  date: string
}

interface LeaderboardProps {
  onBackToHome: () => void
  language?: "es" | "en"
}

const translations = {
  es: {
    title: "Clasificación",
    subtitle: "Los mejores jugadores de GeoTrivia",
    backButton: "Volver al Inicio",
    all: "Todos",
    chile: "Chile",
    peru: "Perú",
    brazil: "Brasil",
    argentina: "Argentina",
    colombia: "Colombia",
    spain: "España",
    england: "Inglaterra",
    france: "Francia",
    germany: "Alemania",
    italy: "Italia",
    mexico: "México",
    usa: "USA",
    beginner: "Principiante",
    medium: "Intermedio",
    advanced: "Avanzado",
    noScores: "Aún no hay puntajes",
    firstScore: "¡Sé el primero en establecer un puntaje alto!",
    points: "puntos",
  },
  en: {
    title: "Leaderboard",
    subtitle: "Top GeoTrivia players",
    backButton: "Back to Home",
    all: "All",
    chile: "Chile",
    peru: "Peru",
    brazil: "Brazil",
    argentina: "Argentina",
    colombia: "Colombia",
    spain: "Spain",
    england: "England",
    france: "France",
    germany: "Germany",
    italy: "Italy",
    mexico: "Mexico",
    usa: "USA",
    beginner: "Beginner",
    medium: "Medium",
    advanced: "Advanced",
    noScores: "No scores yet",
    firstScore: "Be the first to set a high score!",
    points: "points",
  },
}

export default function Leaderboard({ onBackToHome, language = "es" }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const t = translations[language]

  useEffect(() => {
    const data = localStorage.getItem("trivia-leaderboard")
    if (data) {
      try {
        const parsed = JSON.parse(data)
        // Sort by score descending, then by date (most recent first)
        const sorted = parsed.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
          if (b.score !== a.score) {
            return b.score - a.score
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        setLeaderboardData(sorted)
      } catch (error) {
        console.error("Error parsing leaderboard data:", error)
        setLeaderboardData([])
      }
    }
  }, [])

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
  }

  const filterData = (data: LeaderboardEntry[], filter: string) => {
    let filtered = data

    if (
      filter === "chile" ||
      filter === "peru" ||
      filter === "brazil" ||
      filter === "argentina" ||
      filter === "colombia" ||
      filter === "spain" ||
      filter === "england" ||
      filter === "france" ||
      filter === "germany" ||
      filter === "italy" ||
      filter === "mexico" ||
      filter === "usa"
    ) {
      filtered = data.filter((entry) => entry.country === filter)
    } else if (filter === "beginner" || filter === "medium" || filter === "advanced") {
      filtered = data.filter((entry) => entry.difficulty === filter)
    }

    // Always sort by score descending, then by date
    return filtered.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }

  const filteredData = filterData(leaderboardData, activeTab)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center gap-2 rounded-md hover:bg-primary-100"
          >
            <ArrowLeft className="h-4 w-4 text-primary-100" />
            {t.backButton}
          </Button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t.title}</h1>
            <p className="text-primary-100">{t.subtitle}</p>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-12">
              <TabsTrigger value="all" className="rounded-md hover:bg-primary-100">
                {t.all}
              </TabsTrigger>
              <TabsTrigger value="chile" className="rounded-md hover:bg-primary-100">
                {t.chile}
              </TabsTrigger>
              <TabsTrigger value="peru" className="rounded-md hover:bg-primary-100">
                {t.peru}
              </TabsTrigger>
              <TabsTrigger value="brazil" className="rounded-md hover:bg-primary-100">
                {t.brazil}
              </TabsTrigger>
              <TabsTrigger value="argentina" className="rounded-md hover:bg-primary-100">
                {t.argentina}
              </TabsTrigger>
              <TabsTrigger value="colombia" className="rounded-md hover:bg-primary-100">
                {t.colombia}
              </TabsTrigger>
              <TabsTrigger value="spain" className="rounded-md hover:bg-primary-100">
                {t.spain}
              </TabsTrigger>
              <TabsTrigger value="england" className="rounded-md hover:bg-primary-100">
                {t.england}
              </TabsTrigger>
              <TabsTrigger value="france" className="rounded-md hover:bg-primary-100">
                {t.france}
              </TabsTrigger>
              <TabsTrigger value="germany" className="rounded-md hover:bg-primary-100">
                {t.germany}
              </TabsTrigger>
              <TabsTrigger value="italy" className="rounded-md hover:bg-primary-100">
                {t.italy}
              </TabsTrigger>
              <TabsTrigger value="mexico" className="rounded-md hover:bg-primary-100">
                {t.mexico}
              </TabsTrigger>
              <TabsTrigger value="usa" className="rounded-md hover:bg-primary-100">
                {t.usa}
              </TabsTrigger>
              <TabsTrigger value="beginner" className="rounded-md hover:bg-primary-100">
                {t.beginner}
              </TabsTrigger>
              <TabsTrigger value="medium" className="rounded-md hover:bg-primary-100">
                {t.medium}
              </TabsTrigger>
              <TabsTrigger value="advanced" className="rounded-md hover:bg-primary-100">
                {t.advanced}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredData.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Trophy className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-primary-100 mb-2">{t.noScores}</h3>
                    <p className="text-primary-200">{t.firstScore}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((entry, index) => (
                    <Card
                      key={entry.id}
                      className={`transition-all hover:shadow-md ${index < 3 ? "border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-white" : "bg-white/95 backdrop-blur-sm shadow-soft border-0"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12">{getRankIcon(index)}</div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-6 rounded overflow-hidden">
                                {entry.country === "chile" ? (
                                  <ChileFlag />
                                ) : entry.country === "peru" ? (
                                  <PeruFlag />
                                ) : entry.country === "brazil" ? (
                                  <BrazilFlag />
                                ) : entry.country === "argentina" ? (
                                  <ArgentinaFlag />
                                ) : entry.country === "colombia" ? (
                                  <ColombiaFlag />
                                ) : entry.country === "spain" ? (
                                  <SpainFlag />
                                ) : entry.country === "england" ? (
                                  <EnglandFlag />
                                ) : entry.country === "france" ? (
                                  <FranceFlag />
                                ) : entry.country === "germany" ? (
                                  <GermanyFlag />
                                ) : entry.country === "italy" ? (
                                  <ItalyFlag />
                                ) : entry.country === "mexico" ? (
                                  <MexicoFlag />
                                ) : entry.country === "usa" ? (
                                  <UsaFlag />
                                ) : null}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold capitalize text-white">{entry.country}</span>
                                  <Badge variant="secondary" className="capitalize text-xs text-primary-100">
                                    {entry.difficulty}
                                  </Badge>
                                </div>
                                <div className="text-sm text-primary-200">{formatDate(entry.date)}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-right">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-primary-100">{entry.accuracy}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-primary-100">
                                {formatTime(entry.timeSpent)}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">{entry.score}</div>
                              <div className="text-xs text-primary-200">{t.points}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
