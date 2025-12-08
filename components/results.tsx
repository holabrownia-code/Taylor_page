"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, Target, RotateCcw, Share2, Medal, ArrowLeft } from "lucide-react"
import { getUserName } from "@/lib/user-storage"

type Era =
  | "debut"
  | "fearless"
  | "speak-now"
  | "red"
  | "1989"
  | "reputation"
  | "lover"
  | "folklore"
  | "evermore"
  | "midnights"
  | "ttpd"
  | "showgirl"
type Difficulty = "beginner" | "medium" | "advanced"

interface ResultsProps {
  results: {
    score: number
    totalQuestions: number
    correctAnswers: number
    timeSpent: number
  }
  country: Era
  difficulty: Difficulty
  onPlayAgain: () => void
  onShowLeaderboard: () => void
  onShowProgress: () => void
}

const eraColors = {
  debut: { bg: "from-[#3A5D23]/20 via-[#4A7D33]/15 to-[#3A5D23]/20", card: "bg-[#3A5D23]/10", accent: "#3A5D23" },
  fearless: { bg: "from-[#D4AF37]/20 via-[#E4BF47]/15 to-[#D4AF37]/20", card: "bg-[#D4AF37]/10", accent: "#D4AF37" },
  "speak-now": { bg: "from-[#8E44AD]/20 via-[#9E54BD]/15 to-[#8E44AD]/20", card: "bg-[#8E44AD]/10", accent: "#8E44AD" },
  red: { bg: "from-[#B22222]/20 via-[#C23232]/15 to-[#B22222]/20", card: "bg-[#B22222]/10", accent: "#B22222" },
  "1989": { bg: "from-[#87CEEB]/20 via-[#97DEFB]/15 to-[#87CEEB]/20", card: "bg-[#87CEEB]/10", accent: "#87CEEB" },
  reputation: { bg: "from-[#2C2C2C]/30 via-[#3C3C3C]/20 to-[#2C2C2C]/30", card: "bg-[#2C2C2C]/15", accent: "#2C2C2C" },
  lover: { bg: "from-[#FFB6C1]/20 via-[#FFC6D1]/15 to-[#FFB6C1]/20", card: "bg-[#FFB6C1]/10", accent: "#FFB6C1" },
  folklore: { bg: "from-[#C0C0C0]/20 via-[#D0D0D0]/15 to-[#C0C0C0]/20", card: "bg-[#C0C0C0]/10", accent: "#C0C0C0" },
  evermore: { bg: "from-[#A0522D]/20 via-[#B0623D]/15 to-[#A0522D]/20", card: "bg-[#A0522D]/10", accent: "#A0522D" },
  midnights: { bg: "from-[#191970]/25 via-[#292980]/18 to-[#191970]/25", card: "bg-[#191970]/12", accent: "#191970" },
  ttpd: { bg: "from-[#5E1A1A]/25 via-[#6E2A2A]/18 to-[#5E1A1A]/25", card: "bg-[#5E1A1A]/12", accent: "#5E1A1A" },
  showgirl: { bg: "from-[#FF7F00]/20 via-[#FF8F10]/15 to-[#FF7F00]/20", card: "bg-[#FF7F00]/10", accent: "#FF7F00" },
}

export default function Results({
  results,
  country,
  difficulty,
  onPlayAgain,
  onShowLeaderboard,
  onShowProgress,
}: ResultsProps) {
  const { score, totalQuestions, correctAnswers, timeSpent } = results
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100)

  useEffect(() => {
    const userName = getUserName() || "Anonymous"

    const leaderboardData = {
      score,
      country,
      difficulty,
      accuracy,
      timeSpent,
      date: new Date().toISOString(),
      id: Date.now().toString(),
      userName, // Add user name to leaderboard entry
    }

    const existingData = localStorage.getItem("trivia-leaderboard")
    const leaderboard = existingData ? JSON.parse(existingData) : []
    leaderboard.push(leaderboardData)

    // Keep only top 50 scores
    leaderboard.sort((a: any, b: any) => b.score - a.score)
    const topScores = leaderboard.slice(0, 50)

    localStorage.setItem("trivia-leaderboard", JSON.stringify(topScores))
  }, [score, country, difficulty, accuracy, timeSpent])

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: "Excellent", color: "text-yellow-400", icon: Medal }
    if (accuracy >= 75) return { level: "Great", color: "text-green-400", icon: Trophy }
    if (accuracy >= 60) return { level: "Good", color: "text-blue-400", icon: Target }
    return { level: "Keep Trying", color: "text-gray-400", icon: RotateCcw }
  }

  const getCountryName = () => {
    switch (country) {
      case "debut":
        return "Taylor Swift (Debut)"
      case "fearless":
        return "Fearless"
      case "speak-now":
        return "Speak Now"
      case "red":
        return "Red"
      case "1989":
        return "1989"
      case "reputation":
        return "Reputation"
      case "lover":
        return "Lover"
      case "folklore":
        return "Folklore"
      case "evermore":
        return "Evermore"
      case "midnights":
        return "Midnights"
      case "ttpd":
        return "The Tortured Poets Department"
      case "showgirl":
        return "The Life of a Showgirl"
      default:
        return country
    }
  }

  const performance = getPerformanceLevel()
  const PerformanceIcon = performance.icon

  const shareResults = () => {
    const text = `I just scored ${score} points on Taylor Swift Trivia! 🎵\n${correctAnswers}/${totalQuestions} correct answers about ${getCountryName()} (${difficulty} level)\nAccuracy: ${accuracy}%\n\nCan you beat my score?`

    if (navigator.share) {
      navigator.share({
        title: "Taylor Swift Trivia Results",
        text: text,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(text + `\n\nPlay at: ${window.location.origin}`)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <div className={`bg-gradient-to-br ${eraColors[country].bg} font-sans min-h-screen`}>
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PerformanceIcon className={`h-16 w-16 ${performance.color}`} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Game Complete!</h1>
            <p className={`text-2xl font-semibold ${performance.color}`}>{performance.level}</p>
          </div>

          <Card className={`mb-8 shadow-soft-lg ${eraColors[country].card} backdrop-blur-sm border-0`}>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div>
                  <CardTitle className="text-2xl capitalize text-gray-900">{getCountryName()}</CardTitle>
                  <Badge variant="secondary" className="capitalize bg-gray-800 text-white border-0 mt-2">
                    {difficulty === "beginner" ? "Principiante" : difficulty === "medium" ? "Intermedio" : "Avanzado"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <Trophy className="h-8 w-8 mx-auto text-yellow-600" />
                  <div className="text-2xl font-bold text-gray-900">{score}</div>
                  <div className="text-sm text-gray-700">Final Score</div>
                </div>
                <div className="space-y-2">
                  <Target className="h-8 w-8 mx-auto text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {correctAnswers}/{totalQuestions}
                  </div>
                  <div className="text-sm text-gray-700">Correct</div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 w-8 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{accuracy}%</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
                  <div className="text-sm text-gray-700">Accuracy</div>
                </div>
                <div className="space-y-2">
                  <Clock className="h-8 w-8 mx-auto text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-700">Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`mb-8 shadow-soft-lg ${eraColors[country].card} backdrop-blur-sm border-gray-300`}>
            <CardHeader>
              <CardTitle className="text-center text-gray-900 text-xl">Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Base Score ({correctAnswers} × 100)</span>
                  <span className="font-bold text-gray-900 text-lg">{correctAnswers * 100}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Time Bonus</span>
                  <span className="font-bold text-green-600 text-lg">+{score - correctAnswers * 100}</span>
                </div>
                <hr className="border-gray-400" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900">Total Score</span>
                  <span className="text-yellow-600">{score}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <Button
              onClick={() => (window.location.href = "/")}
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white hover:shadow-soft px-8 py-4 rounded-md font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={onPlayAgain}
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white hover:shadow-soft px-8 py-4 rounded-md font-semibold"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={onShowLeaderboard}
              variant="outline"
              size="lg"
              className="w-full bg-white/50 text-gray-900 border-gray-400 hover:bg-white/70 hover:shadow-soft px-8 py-4 rounded-md font-semibold"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Leaderboard
            </Button>
            <Button
              onClick={onShowProgress}
              variant="outline"
              size="lg"
              className="w-full bg-white/50 text-gray-900 border-gray-400 hover:bg-white/70 hover:shadow-soft px-8 py-4 rounded-md font-semibold"
            >
              <Target className="h-5 w-5 mr-2" />
              Mi Progreso
            </Button>
            <Button
              onClick={shareResults}
              variant="outline"
              size="lg"
              className="w-full bg-white/50 text-gray-900 border-gray-400 hover:bg-white/70 hover:shadow-soft px-8 py-4 rounded-md font-semibold"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </Button>
          </div>

          {/* Brownie Watermark */}
          <div className="text-center">
            <p className="text-gray-700 text-sm">
              Powered by{" "}
              <a
                href="https://brownie.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-yellow-600 font-semibold transition-colors duration-200 underline decoration-dotted underline-offset-2"
              >
                Brownie
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
