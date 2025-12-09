"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Send } from "lucide-react"

export default function SuggestionsForm() {
    const { language, translations } = useLanguage()
    const t = translations[language]
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-2xl mx-auto bg-black/40 border-white/10 backdrop-blur-md">
                <CardContent className="pt-6 text-center py-12">
                    <div className="mb-6 flex justify-center">
                        <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Sparkles className="h-10 w-10 text-green-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.successMessage}</h3>
                    <Button
                        onClick={() => setIsSuccess(false)}
                        className="mt-6 bg-white text-black hover:bg-gray-200"
                    >
                        {t.backButton}
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto bg-black/40 border-white/10 backdrop-blur-md text-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    {t.suggestionsTitle}
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                    {t.suggestionsSubtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">{t.formName}</Label>
                        <Input
                            id="name"
                            placeholder="Taylor Swift"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">{t.formEmail}</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            placeholder="swiftie@example.com"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
                        />
                        <p className="text-xs text-gray-500">{t.formEmailPrivacy}</p>
                    </div>

                    {/* Suggestion Type */}
                    <div className="space-y-2">
                        <Label>{t.formType}</Label>
                        <RadioGroup defaultValue="improvement" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <RadioGroupItem value="improvement" id="improvement" className="peer sr-only" />
                                <Label
                                    htmlFor="improvement"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:text-white peer-data-[state=checked]:border-pink-500 [&:has([data-state=checked])]:border-pink-500 cursor-pointer transition-all"
                                >
                                    <span className="text-sm font-medium text-center">{t.formTypeImprovement}</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="new-game" id="new-game" className="peer sr-only" />
                                <Label
                                    htmlFor="new-game"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:text-white peer-data-[state=checked]:border-purple-500 [&:has([data-state=checked])]:border-purple-500 cursor-pointer transition-all"
                                >
                                    <span className="text-sm font-medium text-center">{t.formTypeNewGame}</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="other" id="other" className="peer sr-only" />
                                <Label
                                    htmlFor="other"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:text-white peer-data-[state=checked]:border-indigo-500 [&:has([data-state=checked])]:border-indigo-500 cursor-pointer transition-all"
                                >
                                    <span className="text-sm font-medium text-center">{t.formTypeOther}</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">{t.formTitle}</Label>
                        <Input
                            id="title"
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                        <Label htmlFor="details">{t.formDetails}</Label>
                        <Textarea
                            id="details"
                            required
                            className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-pink-500"
                        />
                    </div>

                    {/* Difficulty Slider */}
                    <div className="space-y-4 pt-2">
                        <Label>{t.formDifficulty}</Label>
                        <div className="px-2">
                            <Slider
                                defaultValue={[50]}
                                max={100}
                                step={50}
                                className="py-4"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>{t.formDifficultyEasy}</span>
                                <span>{t.formDifficultyMedium}</span>
                                <span>{t.formDifficultyHard}</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Sparkles className="animate-spin h-4 w-4" /> {t.submitting}
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Send className="h-4 w-4" /> {t.submit}
                            </span>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
