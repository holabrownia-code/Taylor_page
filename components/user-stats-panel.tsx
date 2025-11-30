"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserProfile, getGameStats, getLeaderboard } from "@/lib/stats-storage"
import { Trophy, BarChart3, User, Award } from "lucide-react"
import StatsDisplay from "@/components/stats-display"
import LeaderboardDisplay from "@/components/leaderboard-display"

interface UserStatsPanelProps {
  language: "es" | "en"
}

export default function UserStatsPanel({ language }: UserStatsPanelProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "stats" | "leaderboard">("profile")
  const [profile, setProfile] = useState(getUserProfile())
  const [stats, setStats] = useState(getGameStats())
  const [leaderboard, setLeaderboard] = useState(getLeaderboard())

  useEffect(() => {
    // Refresh data when component mounts or tab changes
    setProfile(getUserProfile())
    setStats(getGameStats())
    setLeaderboard(getLeaderboard())
  }, [activeTab])

  const t = {
    es: {
      profile: "Perfil",
      stats: "Estadísticas",
      leaderboard: "Clasificación",
      level: "Nivel",
      totalPoints: "Puntos Totales",
      achievements: "Logros",
      memberSince: "Miembro desde",
    },
    en: {
      profile: "Profile",
      stats: "Statistics",
      leaderboard: "Leaderboard",
      level: "Level",
      totalPoints: "Total Points",
      achievements: "Achievements",
      memberSince: "Member since",
    },
  }

  if (!profile) return null

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          onClick={() => setActiveTab("profile")}
          variant={activeTab === "profile" ? "default" : "outline"}
          className="gap-2"
        >
          <User className="h-4 w-4" />
          {t[language].profile}
        </Button>
        <Button
          onClick={() => setActiveTab("stats")}
          variant={activeTab === "stats" ? "default" : "outline"}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          {t[language].stats}
        </Button>
        <Button
          onClick={() => setActiveTab("leaderboard")}
          variant={activeTab === "leaderboard" ? "default" : "outline"}
          className="gap-2"
        >
          <Trophy className="h-4 w-4" />
          {t[language].leaderboard}
        </Button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex flex-col items-center gap-6">
            <div className="text-8xl">{profile.avatar}</div>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{profile.username}</h2>
              <p className="text-muted-foreground">
                {t[language].memberSince}: {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <Card className="p-4 text-center bg-white">
                <p className="text-sm text-muted-foreground mb-1">{t[language].level}</p>
                <p className="text-3xl font-bold text-purple-600">{profile.level}</p>
              </Card>
              <Card className="p-4 text-center bg-white">
                <p className="text-sm text-muted-foreground mb-1">{t[language].totalPoints}</p>
                <p className="text-3xl font-bold text-pink-600">{profile.totalPoints}</p>
              </Card>
            </div>

            {profile.achievements.length > 0 && (
              <div className="w-full max-w-md">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {t[language].achievements}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-semibold"
                    >
                      🏆 {achievement}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && <StatsDisplay stats={stats} language={language} />}

      {/* Leaderboard Tab */}
      {activeTab === "leaderboard" && <LeaderboardDisplay entries={leaderboard} language={language} />}
    </div>
  )
}
