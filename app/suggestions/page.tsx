"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import SuggestionsForm from "@/components/suggestions-form"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function SuggestionsPage() {
    const router = useRouter()
    const { language, translations } = useLanguage()
    const t = translations[language]

    return (
        <div className="min-h-screen bg-[#1c1414] text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
            {/* Background Particles/Stars Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/images/sparkles-bg.png')] bg-cover bg-center opacity-40 mix-blend-screen animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c1414]/50 to-[#1c1414]"></div>
            </div>

            {/* Language Switcher */}
            <div className="fixed top-4 right-4 z-50">
                <LanguageSwitcher />
            </div>

            <main className="container mx-auto px-4 py-8 relative z-10">
                <Button
                    variant="ghost"
                    className="mb-8 text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t.backButton}
                </Button>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black italic font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            Mastermind Suggestions
                        </h1>
                    </div>

                    <SuggestionsForm />
                </div>
            </main>
        </div>
    )
}
