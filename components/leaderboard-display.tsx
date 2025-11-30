"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/stats-storage"

interface LeaderboardDisplayProps {
  entries: LeaderboardEntry[]
  language: "es" | "en"
}

export default function LeaderboardDisplay({ entries, language }: LeaderboardDisplayProps) {
  const t = {
    es: {
      title: "Tabla de Clasificación Local",
      rank: "Rango",
      player: "Jugador",
      score: "Puntuación",
      accuracy: "Precisión",
      noEntries: "Aún no hay entradas en la tabla de clasificación",
    },
    en: {
      title: "Local Leaderboard",
      rank: "Rank",
      player: "Player",
      score: "Score",
      accuracy: "Accuracy",
      noEntries: "No leaderboard entries yet",
    },
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (index === 1) return <Medal className="h-6 w-6 text-gray-400" />
    if (index === 2) return <Award className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
  }

  if (entries.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">{t[language].noEntries}</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Trophy className="h-6 w-6" />
        {t[language].title}
      </h2>

      <div className="space-y-3">
        {entries.slice(0, 10).map((entry, index) => (
          <Card
            key={`${entry.username}-${entry.date}`}
            className={`p-4 transition-all duration-200 hover:shadow-lg ${
              index < 3 ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 flex justify-center">{getRankIcon(index)}</div>
                <div className="text-4xl">{entry.avatar}</div>
                <div>
                  <p className="font-bold text-lg">{entry.username}</p>
                  <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-700">{entry.score}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.accuracy}% {t[language].accuracy}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
