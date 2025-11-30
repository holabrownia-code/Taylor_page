"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Music, Users, Play, BarChart3, Sparkles } from "lucide-react"
import Progress from "@/components/progress"
import Leaderboard from "@/components/leaderboard"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

type View = "home" | "progress" | "leaderboard"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home")
  const { language, translations } = useLanguage()
  const router = useRouter()

  const t = translations[language]

  const goHome = () => {
    setCurrentView("home")
  }

  if (currentView === "progress") {
    return <Progress onBackToHome={goHome} language={language} />
  }

  if (currentView === "leaderboard") {
    return <Leaderboard onBackToHome={goHome} language={language} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-700 font-sans">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-400/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-float">
              <img
                src="/images/taylor-20swift-20-28940-20x-20500-20px-29-20-28940-20x-20500-20px-29-20-28940-20x-20250-20px-29.png"
                alt="Swiftie Tests"
                className="w-full max-w-2xl h-auto drop-shadow-2xl"
              />
            </div>

            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => router.push("/play")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2" />
                {t.playNow}
              </Button>
              <Button
                onClick={() => router.push("/emoji")}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <Music className="h-5 w-5 mr-2" />
                {language === "es" ? "Juego de Emojis" : "Emoji Game"}
              </Button>
              <Button
                onClick={() => router.push("/stats")}
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                size="lg"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                {language === "es" ? "Estadísticas" : "Statistics"}
              </Button>
              <Button
                onClick={() => setCurrentView("leaderboard")}
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                size="lg"
              >
                <Trophy className="h-5 w-5 mr-2" />
                {t.leaderboard}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => router.push("/play")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-purple-200 hover:text-white hover:bg-white/10"
            >
              <Music className="h-5 w-5" />
              <span className="font-medium">{t.countries}</span>
            </button>
            <button
              onClick={() => router.push("/emoji")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-purple-200 hover:text-white hover:bg-white/10"
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">{language === "es" ? "Emojis" : "Emojis"}</span>
            </button>
            <button
              onClick={() => router.push("/stats")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-purple-200 hover:text-white hover:bg-white/10"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">{language === "es" ? "Estadísticas" : "Statistics"}</span>
            </button>
            <button
              onClick={() => setCurrentView("leaderboard")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === "leaderboard"
                  ? "bg-white/20 text-white"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span className="font-medium">{t.leaderboard}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Music className="h-12 w-12 mx-auto mb-4 text-purple-300" />
              <CardTitle className="text-2xl font-bold">{language === "es" ? "12 Eras" : "12 Eras"}</CardTitle>
              <CardDescription className="text-purple-200">{t.countriesDesc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-300" />
              <CardTitle className="text-2xl font-bold">{t.questionsCount}</CardTitle>
              <CardDescription className="text-purple-200">{t.questionsDesc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-300" />
              <CardTitle className="text-2xl font-bold">{t.levelsCount}</CardTitle>
              <CardDescription className="text-purple-200">{t.levelsDesc}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900/50 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{t.readyChallenge}</h3>
            <p className="text-purple-200 mb-6">{t.testKnowledge}</p>
            <Button
              onClick={() => router.push("/play")}
              className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Play className="h-5 w-5 mr-2" />
              {t.startAdventure}
            </Button>
          </div>
        </div>
      </footer>

      {/* Brownie Watermark */}
      <div className="bg-purple-900/30 backdrop-blur-sm border-t border-white/5 py-4">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-purple-200 text-sm">
              Powered by{" "}
              <a
                href="https://brownie.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 font-semibold transition-colors duration-200 underline decoration-dotted underline-offset-2"
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
