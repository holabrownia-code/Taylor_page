"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Trophy, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { getRandomQuestions } from "@/data/questions"

type Country =
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
type Difficulty = "beginner" | "medium" | "advanced"

interface GameProps {
  country: Country
  difficulty: Difficulty
  onGameComplete: (results: {
    score: number
    totalQuestions: number
    correctAnswers: number
    timeSpent: number
  }) => void
  onBackToHome: () => void
}

const eraColors = {
  debut: { bg: "from-[#3A5D23]/20 via-[#4A7D33]/15 to-[#3A5D23]/20", card: "bg-[#3A5D23]/10", accent: "#3A5D23" },
  fearless: { bg: "from-[#D4AF37]/20 via-[#E4BF47]/15 to-[#D4AF37]/20", card: "bg-[#D4AF37]/10", accent: "#D4AF37" },
  speaknow: { bg: "from-[#8E44AD]/20 via-[#9E54BD]/15 to-[#8E44AD]/20", card: "bg-[#8E44AD]/10", accent: "#8E44AD" },
  red: { bg: "from-[#B22222]/20 via-[#C23232]/15 to-[#B22222]/20", card: "bg-[#B22222]/10", accent: "#B22222" },
  "1989": { bg: "from-[#87CEEB]/20 via-[#97DEFB]/15 to-[#87CEEB]/20", card: "bg-[#87CEEB]/10", accent: "#87CEEB" },
  reputation: { bg: "from-[#2C2C2C]/30 via-[#3C3C3C]/20 to-[#2C2C2C]/30", card: "bg-[#2C2C2C]/15", accent: "#2C2C2C" },
  lover: { bg: "from-[#FFB6C1]/20 via-[#FFC6D1]/15 to-[#FFB6C1]/20", card: "bg-[#FFB6C1]/10", accent: "#FFB6C1" },
  folklore: { bg: "from-[#C0C0C0]/20 via-[#D0D0D0]/15 to-[#C0C0C0]/20", card: "bg-[#C0C0C0]/10", accent: "#C0C0C0" },
  evermore: { bg: "from-[#A0522D]/20 via-[#B0623D]/15 to-[#A0522D]/20", card: "bg-[#A0522D]/10", accent: "#A0522D" },
  midnights: { bg: "from-[#191970]/25 via-[#292980]/18 to-[#191970]/25", card: "bg-[#191970]/12", accent: "#191970" },
  ttpd: { bg: "from-[#5E1A1A]/25 via-[#6E2A2A]/18 to-[#5E1A1A]/25", card: "bg-[#5E1A1A]/12", accent: "#5E1A1A" },
}

export default function Game({ country, difficulty, onGameComplete, onBackToHome }: GameProps) {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStartTime] = useState(Date.now())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Load random questions on component mount
  useEffect(() => {
    const randomQuestions = getRandomQuestions(country, difficulty, 10)
    setQuestions(randomQuestions)
  }, [country, difficulty])

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setTimeLeft(30)
    } else {
      // Game complete - calculate final results
      const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)

      // Get the current correct answers count, accounting for any pending state updates
      const finalCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0)

      // Debug logging
      console.log("=== GAME COMPLETION DEBUG ===")
      console.log("Current question index:", currentQuestionIndex)
      console.log("Total questions:", totalQuestions)
      console.log("Correct answers state:", correctAnswers)
      console.log("Is current answer correct:", isCorrect)
      console.log("Final correct answers:", finalCorrectAnswers)
      console.log("Final score:", score)
      console.log("=============================")

      onGameComplete({
        score,
        totalQuestions,
        correctAnswers: finalCorrectAnswers,
        timeSpent,
      })
    }
  }, [currentQuestionIndex, totalQuestions, score, correctAnswers, isCorrect, gameStartTime, onGameComplete])

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || showFeedback) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      const timeBonus = Math.max(0, timeLeft * 10)
      setScore((prev) => prev + 100 + timeBonus)
      setCorrectAnswers((prev) => prev + 1)
    }

    // Debug logging for each answer
    console.log("Answer selected:", {
      questionIndex: currentQuestionIndex,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: correct,
      currentCorrectCount: correctAnswers + (correct ? 1 : 0),
    })

    // Auto advance after 2 seconds
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback) {
      // Time's up - this is incorrect
      setShowFeedback(true)
      setIsCorrect(false)
      // No points for running out of time

      console.log("Time up for question:", currentQuestionIndex)

      setTimeout(() => {
        nextQuestion()
      }, 2000)
    }
  }, [timeLeft, showFeedback, nextQuestion, currentQuestionIndex])

  const getAnswerButtonClass = (index: number) => {
    if (!showFeedback) {
      return "hover:bg-primary-50 hover:border-primary-300 hover:shadow-soft transition-all duration-200 bg-white border-primary-200"
    }

    if (index === currentQuestion.correctAnswer) {
      return "bg-green-50 border-green-400 text-green-800 shadow-soft"
    }

    if (index === selectedAnswer && !isCorrect) {
      return "bg-red-50 border-red-400 text-red-800 shadow-soft"
    }

    return "opacity-50 bg-gray-50"
  }

  const getCountryName = () => {
    switch (country) {
      case "debut":
        return "Taylor Swift (Debut)"
      case "fearless":
        return "Fearless"
      case "speaknow":
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
      default:
        return country
    }
  }

  // Show loading if questions haven't loaded yet
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 font-sans flex items-center justify-center">
        <div className="text-white text-xl">Cargando preguntas...</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${eraColors[country].bg} font-sans`}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="flex items-center gap-3 text-gray-800 hover:bg-white/30 px-6 py-3 rounded-md transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al Inicio
          </Button>
          <div className="flex items-center gap-6">
            <Badge
              variant="outline"
              className="text-lg px-6 py-3 bg-white/40 border-white/50 text-gray-800 backdrop-blur-sm font-bold"
            >
              <Trophy className="h-5 w-5 mr-2" />
              {score}
            </Badge>
            <Badge
              variant="outline"
              className="text-lg px-6 py-3 bg-white/40 border-white/50 text-gray-800 backdrop-blur-sm font-bold"
            >
              {currentQuestionIndex + 1} / {totalQuestions}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <Progress
            value={(currentQuestionIndex / totalQuestions) * 100}
            className="h-4 bg-white/30 rounded-md overflow-hidden"
          />
        </div>

        {/* Game Card */}
        <Card className={`max-w-5xl mx-auto border-0 ${eraColors[country].card} backdrop-blur-md shadow-soft-lg`}>
          <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <CardTitle className="capitalize text-3xl text-primary-900 font-bold">{getCountryName()}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="capitalize mt-2 px-4 py-1 bg-primary-100 text-primary-800 font-semibold"
                  >
                    {difficulty === "beginner" ? "Principiante" : difficulty === "medium" ? "Intermedio" : "Avanzado"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary-50 px-6 py-4 rounded-md">
                <Clock className={`h-7 w-7 ${timeLeft <= 10 ? "text-red-500" : "text-primary-600"}`} />
                <span className={`text-3xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-primary-600"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            {/* Question */}
            <div className="text-center py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answers */}
            <div className="grid md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`p-6 h-auto text-left justify-start text-wrap rounded-md ${getAnswerButtonClass(index)}`}
                >
                  <span className="font-bold mr-4 text-xl text-primary-600">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-lg text-primary-800 leading-relaxed">{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-6 w-6 ml-auto text-green-600" />
                  )}
                  {showFeedback && index === selectedAnswer && !isCorrect && (
                    <XCircle className="h-6 w-6 ml-auto text-red-600" />
                  )}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`text-center p-6 rounded-md ${isCorrect
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
                  }`}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  ) : (
                    <XCircle className="h-7 w-7 text-red-600" />
                  )}
                  <span className="text-2xl font-bold">{isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</span>
                </div>
                {currentQuestion.explanation && (
                  <p className="text-base leading-relaxed">{currentQuestion.explanation}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
