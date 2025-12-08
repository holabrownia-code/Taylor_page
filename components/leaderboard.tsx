"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, ArrowLeft, Clock, Target, User } from "lucide-react"

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
  difficulty: "beginner" | "medium" | "advanced"
  accuracy: number
  timeSpent: number
  date: string
  userName?: string // Add optional userName field
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
      filter === "usa" ||
      filter === "debut" ||
      filter === "fearless" ||
      filter === "speaknow" ||
      filter === "red" ||
      filter === "1989" ||
      filter === "reputation" ||
      filter === "lover" ||
      filter === "folklore" ||
      filter === "evermore" ||
      filter === "midnights" ||
      filter === "ttpd" ||
      filter === "showgirl"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans">
      <div className="container mx-auto px-4 py-8">
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">{t.title}</h1>
            <p className="text-purple-100">{t.subtitle}</p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-2 bg-white/10 p-2 rounded-lg">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20">
                {t.all}
              </TabsTrigger>
              <TabsTrigger value="beginner" className="text-white data-[state=active]:bg-white/20">
                {t.beginner}
              </TabsTrigger>
              <TabsTrigger value="medium" className="text-white data-[state=active]:bg-white/20">
                {t.medium}
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-white/20">
                {t.advanced}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredData.length === 0 ? (
                <Card className="bg-white/95 backdrop-blur-sm border-0">
                  <CardContent className="text-center py-12">
                    <Trophy className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noScores}</h3>
                    <p className="text-gray-600">{t.firstScore}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((entry, index) => (
                    <Card
                      key={entry.id}
                      className={`transition-all hover:shadow-xl ${
                        index < 3
                          ? "border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-white"
                          : "bg-white/95 backdrop-blur-sm border-0"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12">{getRankIcon(index)}</div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                                <User className="h-4 w-4 text-purple-600" />
                                <span className="font-semibold text-purple-900 text-sm">
                                  {entry.userName || "Anonymous"}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold capitalize text-gray-900">
                                    {getCountryName(entry.country)}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="capitalize text-xs bg-purple-100 text-purple-900"
                                  >
                                    {getDifficultyLabel(entry.difficulty, language)}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">{formatDate(entry.date)}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-right">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-700">{entry.accuracy}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">{formatTime(entry.timeSpent)}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-900">{entry.score}</div>
                              <div className="text-xs text-gray-600">{t.points}</div>
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

function getCountryName(country: string): string {
  const names: Record<string, string> = {
    debut: "Debut",
    fearless: "Fearless",
    speaknow: "Speak Now",
    red: "Red",
    "1989": "1989",
    reputation: "Reputation",
    lover: "Lover",
    folklore: "Folklore",
    evermore: "Evermore",
    midnights: "Midnights",
    ttpd: "TTPD",
    showgirl: "Showgirl",
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
  }
  return names[country] || country
}

function getDifficultyLabel(difficulty: string, language: "es" | "en"): string {
  const labels: Record<string, Record<string, string>> = {
    beginner: { es: "Principiante", en: "Beginner" },
    medium: { es: "Intermedio", en: "Medium" },
    advanced: { es: "Avanzado", en: "Advanced" },
  }
  return labels[difficulty]?.[language] || difficulty
}
