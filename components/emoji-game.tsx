"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { emojiSongs, type EmojiSong } from "@/data/emoji-songs"
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Music, Lightbulb, Filter, Trophy, Share2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { updateEmojiGameStats, completeEmojiGame, checkAndAwardAchievements, getUserProfile, getGameStats, getLeaderboard } from "@/lib/stats-storage"
import StatsDisplay from "@/components/stats-display"
import LeaderboardDisplay from "@/components/leaderboard-display"

type Difficulty = "Facil" | "Medio" | "Dificil" | "Aleatorio"
type GameView = "difficulty" | "playing" | "results"

export default function EmojiGame() {
  const [gameView, setGameView] = useState<GameView>("difficulty")
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
  const [currentSong, setCurrentSong] = useState<EmojiSong | null>(null)
  const [userGuess, setUserGuess] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [usedSongs, setUsedSongs] = useState<Set<string>>(new Set())
  const [streak, setStreak] = useState(0)
  const [newAchievements, setNewAchievements] = useState<string[]>([])
  const { language } = useLanguage()

  const translations = {
    es: {
      title: "Adivina la Canción por Emojis",
      subtitle: "Can you figure out which Taylor Swift song these emojis represent?",
      selectDifficulty: "Selecciona la Dificultad",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      random: "Aleatorio",
      placeholder: "Escribe el nombre de la canción...",
      submit: "Enviar Respuesta",
      next: "Siguiente Canción",
      correct: "¡Correcto!",
      incorrect: "Incorrecto",
      answer: "Respuesta",
      era: "Era",
      explanation: "Explicación",
      score: "Puntuación",
      hint: "Pista",
      hintButton: "Ver Pista",
      hideHint: "Ocultar Pista",
      difficulty: "Dificultad",
      changeDifficulty: "Cambiar Dificultad",
      gameComplete: "¡Juego Completado!",
      finalScore: "Puntuación Final",
      accuracy: "Precisión",
      newAchievements: "¡Nuevos Logros Desbloqueados!",
      playAgain: "Jugar de Nuevo",
      share: "Compartir",
    },
    en: {
      title: "Guess the Song by Emojis",
      subtitle: "Select a Taylor Swift era and test your knowledge",
      selectDifficulty: "Select Difficulty",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      random: "Random",
      placeholder: "Type the song name...",
      submit: "Submit Answer",
      next: "Next Song",
      correct: "Correct!",
      incorrect: "Incorrect",
      answer: "Answer",
      era: "Era",
      explanation: "Explanation",
      score: "Score",
      hint: "Hint",
      hintButton: "Show Hint",
      hideHint: "Hide Hint",
      difficulty: "Difficulty",
      changeDifficulty: "Change Difficulty",
      gameComplete: "Game Complete!",
      finalScore: "Final Score",
      accuracy: "Accuracy",
      newAchievements: "New Achievements Unlocked!",
      playAgain: "Play Again",
      share: "Share",
    },
  }

  const t = translations[language]

  // --- Helper functions (load song, check answer, etc) ---
  // (Aquí van todas tus funciones checkAnswer, loadRandomSong, handleSubmit, handleNext, restartGame...)

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty)
    setGameView("playing")
  }

  // --- VISTA DE SELECCIÓN DE DIFICULTAD ---
  if (gameView === "difficulty") {
    return (
      <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <img
                src="/images/emoji-era-guessing.png"
                alt="EMOJI ERA Guessing"
                className="w-full max-w-2xl h-auto drop-shadow-lg"
              />
            </div>
            <p className="text-lg text-white/90 mb-8">{t.subtitle}</p>
          </div>

          <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/10 backdrop-blur-md">
            <div className="text-center mb-8">
              <Filter className="h-12 w-12 mx-auto mb-4 text-white" />
              <h2 className="text-2xl font-bold mb-2 text-white">{t.selectDifficulty}</h2>
              <p className="text-white/80">
                {language === "es"
                  ? "Elige el nivel de dificultad para comenzar"
                  : "Choose your difficulty level to start"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleDifficultySelect("Facil")}
                className="h-24 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg bg-green-500 hover:bg-green-600 text-white"
              >
                😊 {t.easy}
              </Button>

              <Button
                onClick={() => handleDifficultySelect("Medio")}
                className="h-24 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                🤔 {t.medium}
              </Button>

              <Button
                onClick={() => handleDifficultySelect("Dificil")}
                className="h-24 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg bg-red-500 hover:bg-red-600 text-white"
              >
                🔥 {t.hard}
              </Button>

              <Button
                onClick={() => handleDifficultySelect("Aleatorio")}
                className="h-24 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                🎲 {t.random}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // --- Otras vistas (playing y results) quedan igual, solo cambiarías background y card a vidrio)
  return null
}
