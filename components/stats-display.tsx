"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Target, Zap, TrendingUp } from "lucide-react"
import type { GameStats } from "@/lib/stats-storage"

interface StatsDisplayProps {
  stats: GameStats
  language: "es" | "en"
}

export default function StatsDisplay({ stats, language }: StatsDisplayProps) {
  const t = {
    es: {
      emojiStats: "Estadísticas - Juego de Emojis",
      gamesPlayed: "Juegos Jugados",
      correctAnswers: "Respuestas Correctas",
      accuracy: "Precisión",
      bestStreak: "Mejor Racha",
      currentStreak: "Racha Actual",
    },
    en: {
      emojiStats: "Emoji Game Statistics",
      gamesPlayed: "Games Played",
      correctAnswers: "Correct Answers",
      accuracy: "Accuracy",
      bestStreak: "Best Streak",
      currentStreak: "Current Streak",
    },
  }

  const emojiStats = stats.emojiGame

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t[language].emojiStats}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <p className="text-3xl font-bold text-purple-700">{emojiStats.gamesPlayed}</p>
          <p className="text-sm text-muted-foreground">{t[language].gamesPlayed}</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <p className="text-3xl font-bold text-green-700">{emojiStats.correctAnswers}</p>
          <p className="text-sm text-muted-foreground">{t[language].correctAnswers}</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <p className="text-3xl font-bold text-blue-700">{Math.round(emojiStats.averageAccuracy)}%</p>
          <p className="text-sm text-muted-foreground">{t[language].accuracy}</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <Zap className="h-8 w-8 mx-auto mb-2 text-orange-600" />
          <p className="text-3xl font-bold text-orange-700">{emojiStats.bestStreak}</p>
          <p className="text-sm text-muted-foreground">{t[language].bestStreak}</p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
          <p className="text-3xl font-bold text-yellow-700">{emojiStats.currentStreak}</p>
          <p className="text-sm text-muted-foreground">{t[language].currentStreak}</p>
        </Card>
      </div>
    </div>
  )
}
