"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Music, Users, Trophy, Sparkles } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { language, translations } = useLanguage()
  const router = useRouter()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-[#1c1414] text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
      {/* Background Particles/Stars Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/images/sparkles-bg.png')] bg-cover bg-center opacity-40 mix-blend-screen animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c1414]/50 to-[#1c1414]"></div>
      </div>

      {/* Language Switcher - Fixed positioning to ensure visibility */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 flex flex-col items-center">
          <div className="max-w-2xl w-full mb-6 transform hover:scale-105 transition-transform duration-500">
            <img
              src="/images/swiftie-tests-title.png"
              alt="SWIFTIE Tests"
              className="w-full h-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]"
            />
          </div>
          <p className="text-gray-300 text-xl font-medium tracking-wide">{t.testKnowledgeTitle}</p>
        </header>

        {/* Game Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Trivia Card */}
          <div
            onClick={() => router.push("/play")}
            className="group relative bg-[#1a1a1a] border-2 border-white/10 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] cursor-pointer"
          >
            <div
              className="aspect-square relative flex flex-col items-center justify-center p-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/trivia-game-card${language === 'en' ? '-en' : ''}.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              {/* Removed Button and Overlay Text as requested, image is the button now */}
            </div>
          </div>

          {/* Emoji Game Card */}
          <div
            onClick={() => router.push("/emoji")}
            className="group relative bg-[#1a1a1a] border-2 border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer"
          >
            <div
              className="aspect-square relative flex flex-col items-center justify-center p-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/emoji-game-card${language === 'en' ? '-en' : ''}.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              {/* Removed Button and Overlay Text as requested, image is the button now */}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 group">
            <div className="bg-pink-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
              <Music className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">{t.countriesCount}</h3>
            <p className="text-gray-400">{t.countriesDesc}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 group">
            <div className="bg-purple-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Users className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">{t.questionsCount}</h3>
            <p className="text-gray-400">{t.questionsDesc}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 group">
            <div className="bg-indigo-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
              <Trophy className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">{t.levelsCount}</h3>
            <p className="text-gray-400">{t.levelsDesc}</p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl font-black italic font-serif">{t.moreGames}</h2>
            <div className="h-0.5 flex-grow bg-gradient-to-r from-white/50 to-transparent"></div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{t.yourIdeas}</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {t.feedbackIntro}
              </p>
              <ul className="space-y-3 text-gray-400 mb-8 ml-2">
                <li className="flex items-start">
                  <span className="mr-2 text-pink-500">•</span>
                  {t.feedbackQ1}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-purple-500">•</span>
                  <span>{t.feedbackQ2} <span className="text-gray-500 italic">{t.feedbackQ2Sub}</span></span>
                </li>
              </ul>
              <p className="text-gray-300 mb-8 font-medium">
                {t.thanks} <Sparkles className="inline w-5 h-5 text-yellow-400 animate-pulse" />
              </p>

              <div className="text-center md:text-left">
                <Button
                  className="bg-white text-black hover:bg-gray-200 font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  onClick={() => router.push('/suggestions')}
                >
                  {t.sendSuggestion}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#150f15] border-t border-white/5 py-8 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          {t.poweredBy} <span className="font-bold text-white hover:text-pink-400 transition-colors cursor-pointer">Brownia</span>
        </p>
      </footer>
    </div>
  )
}
