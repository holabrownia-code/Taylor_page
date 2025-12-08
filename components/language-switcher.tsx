"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 text-white hover:bg-white/10 px-4 py-2 rounded-md transition-all duration-200 ${className}`}
    >
      <Languages className="h-4 w-4" />
      {language === "es" ? "EN" : "ES"}
    </Button>
  )
}
