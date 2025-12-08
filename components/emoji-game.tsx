"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { emojiSongs, type EmojiSong } from "@/data/emoji-songs"
import { Filter, CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

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
  const { language } = useLanguage()

  const translations = {
    es: {
      title: "Adivina la Canción por Emojis",
      subtitle: "¿Puedes adivinar qué canción de Taylor Swift representan estos emojis?",
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
      hintButton: "Ver Pista",
      hideHint: "Ocultar Pista",
      playAgain: "Jugar de Nuevo",
    },
    en: {
      title: "Guess the Song by Emojis",
      subtitle: "Can you guess which Taylor Swift song these emojis represent?",
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
      hintButton: "Show Hint",
      hideHint: "Hide Hint",
      playAgain: "Play Again",
    },
  }

  const t = translations[language]

  // --- helper: pick random from pool matching difficulty (uses your song.difficulty values) ---
  const pickRandomSong = (difficulty: Difficulty | null) => {
    let pool = emojiSongs
    if (difficulty && difficulty !== "Aleatorio") {
      pool = emojiSongs.filter((s) => {
        // Your data uses Spanish difficulty strings: "Facil","Medio","Dificil"
        return s.difficulty?.toLowerCase() === difficulty.toLowerCase()
      })
    }
    if (!pool || pool.length === 0) {
      // fallback to full list
      pool = emojiSongs
    }
    const idx = Math.floor(Math.random() * pool.length)
    return pool[idx]
  }

  const loadSong = () => {
    const s = pickRandomSong(selectedDifficulty)
    setCurrentSong(s || null)
    setUserGuess("")
    setShowAnswer(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  useEffect(() => {
    if (gameView === "playing") {
      loadSong()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameView])

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty)
    setGameView("playing")
  }

  const normalize = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")

  const handleSubmit = () => {
    if (!currentSong) return
    const guess = normalize(userGuess)
    const answer = normalize(currentSong.song) // your field is `song`
    const correct =
      guess === answer ||
      // also accept when the guess contains the main words of the answer (loose match)
      answer.split(" ").every((w) => guess.includes(w) || w.length <= 2)
    setIsCorrect(correct)
    setShowAnswer(true)
    setAttempts((a) => a + 1)
    if (correct) setScore((s) => s + 1)
  }

  const nextSong = () => {
    loadSong()
  }

  const restart = () => {
    setGameView("difficulty")
    setScore(0)
    setAttempts(0)
    setCurrentSong(null)
    setSelectedDifficulty(null)
  }

  // --- DIFFICULTY VIEW ---
  if (gameView === "difficulty") {
    return (
      <div className="min-h-[40vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <Card className="p-6 md:p-10 bg-white/10 backdrop-blur-md max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <Filter className="h-10 w-10 mx-auto text-white mb-3" />
            <h2 className="text-2xl font-semibold text-white">{t.selectDifficulty}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => handleDifficultySelect("Facil")} className="h-20 text-lg bg-green-500 hover:bg-green-600 text-white">
              😊 {t.easy}
            </Button>
            <Button onClick={() => handleDifficultySelect("Medio")} className="h-20 text-lg bg-yellow-500 hover:bg-yellow-600 text-white">
              🤔 {t.medium}
            </Button>
            <Button onClick={() => handleDifficultySelect("Dificil")} className="h-20 text-lg bg-red-500 hover:bg-red-600 text-white">
              🔥 {t.hard}
            </Button>
            <Button onClick={() => handleDifficultySelect("Aleatorio")} className="h-20 text-lg bg-purple-500 hover:bg-purple-600 text-white">
              🎲 {t.random}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // --- PLAYING VIEW ---
  if (gameView === "playing" && currentSong) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 md:p-10 bg-white/10 backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentSong.emojis}</div>
            <p className="text-white/90 mb-4">{language === "es" ? "Introduce el título de la canción" : "Type the song title"}</p>
          </div>

          <Input
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder={t.placeholder}
            className="text-center mb-4"
          />

          {!showAnswer ? (
            <Button onClick={handleSubmit} className="w-full bg-white/20 text-white mb-3">
              {t.submit}
            </Button>
          ) : null}

          <Button onClick={() => setShowHint((v) => !v)} className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-3">
            <Lightbulb className="mr-2 h-4 w-4" />
            {showHint ? t.hideHint : t.hintButton}
          </Button>

          {showHint && (
            <div className="text-white/80 mb-3">
              <strong>{language === "es" ? "Pista:" : "Hint:"}</strong> {currentSong.explanation}
              <br />
              <span className="text-sm opacity-80">
                {language === "es" ? "Álbum:" : "Album:"} {currentSong.era}
              </span>
            </div>
          )}

          {showAnswer && (
            <div className="mt-4 text-center">
              {isCorrect ? (
                <div className="text-green-300 text-xl font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 /> {t.correct}
                </div>
              ) : (
                <div className="text-red-300 text-xl font-bold flex items-center justify-center gap-2">
                  <XCircle /> {t.incorrect}
                </div>
              )}

              <p className="text-white/90 mt-2">
                <strong>{t.answer}:</strong> {currentSong.song}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button onClick={nextSong} className="w-full bg-white/20 text-white">
                  <ArrowRight className="mr-2" /> {t.next}
                </Button>
                <Button onClick={restart} variant="ghost" className="w-full text-white border-white/20">
                  {t.playAgain}
                </Button>
              </div>
            </div>
          )}

          <p className="text-white/70 mt-6 text-center">
            {language === "es" ? "Puntuación" : "Score"}: {score} / {attempts}
          </p>
        </Card>
      </div>
    )
  }

  return null
}
