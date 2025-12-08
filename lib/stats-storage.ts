// Local storage management for game statistics

export interface UserProfile {
  username: string
  avatar: string
  createdAt: string
  totalPoints: number
  level: number
  achievements: string[]
}

export interface GameStats {
  emojiGame: {
    gamesPlayed: number
    correctAnswers: number
    totalAttempts: number
    bestStreak: number
    currentStreak: number
    averageAccuracy: number
  }
  triviaGame: {
    gamesPlayed: number
    correctAnswers: number
    totalAttempts: number
    bestScore: number
    completedEras: string[]
  }
}

export interface LeaderboardEntry {
  username: string
  avatar: string
  score: number
  accuracy: number
  date: string
}

const STORAGE_KEYS = {
  USER_PROFILE: "taylor_trivia_user_profile",
  GAME_STATS: "taylor_trivia_game_stats",
  LEADERBOARD: "taylor_trivia_leaderboard",
}

// User Profile Management
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
  return data ? JSON.parse(data) : null
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
}

export function createUserProfile(username: string, avatar: string): UserProfile {
  const profile: UserProfile = {
    username,
    avatar,
    createdAt: new Date().toISOString(),
    totalPoints: 0,
    level: 1,
    achievements: [],
  }
  saveUserProfile(profile)
  return profile
}

// Game Stats Management
export function getGameStats(): GameStats {
  if (typeof window === "undefined") {
    return getDefaultStats()
  }
  const data = localStorage.getItem(STORAGE_KEYS.GAME_STATS)
  return data ? JSON.parse(data) : getDefaultStats()
}

function getDefaultStats(): GameStats {
  return {
    emojiGame: {
      gamesPlayed: 0,
      correctAnswers: 0,
      totalAttempts: 0,
      bestStreak: 0,
      currentStreak: 0,
      averageAccuracy: 0,
    },
    triviaGame: {
      gamesPlayed: 0,
      correctAnswers: 0,
      totalAttempts: 0,
      bestScore: 0,
      completedEras: [],
    },
  }
}

export function saveGameStats(stats: GameStats): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.GAME_STATS, JSON.stringify(stats))
}

export function updateEmojiGameStats(correct: boolean, streak: number): void {
  const stats = getGameStats()
  stats.emojiGame.totalAttempts++
  if (correct) {
    stats.emojiGame.correctAnswers++
    stats.emojiGame.currentStreak = streak
    if (streak > stats.emojiGame.bestStreak) {
      stats.emojiGame.bestStreak = streak
    }
  } else {
    stats.emojiGame.currentStreak = 0
  }
  stats.emojiGame.averageAccuracy = (stats.emojiGame.correctAnswers / stats.emojiGame.totalAttempts) * 100
  saveGameStats(stats)

  // Update user points
  updateUserPoints(correct ? 10 : 0)
}

export function completeEmojiGame(score: number, totalQuestions: number): void {
  const stats = getGameStats()
  stats.emojiGame.gamesPlayed++
  saveGameStats(stats)

  // Add to leaderboard
  addToLeaderboard(score, totalQuestions)
}

export function updateTriviaGameStats(score: number, totalQuestions: number, era: string): void {
  const stats = getGameStats()
  stats.triviaGame.gamesPlayed++
  stats.triviaGame.totalAttempts += totalQuestions
  // Assuming score is roughly 100 per correct answer (ignoring time bonus for simplicity in this stat, or we could pass correct count)
  // But wait, the Game component passes correctAnswers count. Let's use that if possible, but the signature here only has score.
  // Let's update the signature in the next step or just use score for now.
  // Actually, let's look at how it's called.

  // Better implementation:
  // We need correct answers count to update stats.triviaGame.correctAnswers
  // But the current interface only has score.
  // Let's update the function signature to accept correctAnswers.
}

export function saveTriviaGameResult(results: {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
}, era: string): void {
  const stats = getGameStats()
  stats.triviaGame.gamesPlayed++
  stats.triviaGame.correctAnswers += results.correctAnswers
  stats.triviaGame.totalAttempts += results.totalQuestions

  if (results.score > stats.triviaGame.bestScore) {
    stats.triviaGame.bestScore = results.score
  }

  if (!stats.triviaGame.completedEras.includes(era)) {
    stats.triviaGame.completedEras.push(era)
  }

  saveGameStats(stats)

  // Update user points (e.g., score / 10)
  updateUserPoints(Math.floor(results.score / 10))

  // Add to leaderboard
  addToLeaderboard(results.score, results.totalQuestions)
}

// Leaderboard Management
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
  return data ? JSON.parse(data) : []
}

export function addToLeaderboard(score: number, totalQuestions: number): void {
  if (typeof window === "undefined") return
  const profile = getUserProfile()
  if (!profile) return

  const accuracy = (score / totalQuestions) * 100
  const entry: LeaderboardEntry = {
    username: profile.username,
    avatar: profile.avatar,
    score,
    accuracy: Math.round(accuracy),
    date: new Date().toISOString(),
  }

  const leaderboard = getLeaderboard()
  leaderboard.push(entry)
  leaderboard.sort((a, b) => b.score - a.score)

  // Keep only top 50 entries
  const topEntries = leaderboard.slice(0, 50)
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(topEntries))
}

// User Points and Level Management
export function updateUserPoints(points: number): void {
  const profile = getUserProfile()
  if (!profile) return

  profile.totalPoints += points

  // Level progression: every 100 points = 1 level
  const newLevel = Math.floor(profile.totalPoints / 100) + 1
  if (newLevel > profile.level) {
    profile.level = newLevel
  }

  saveUserProfile(profile)
}

// Achievement System
export function checkAndAwardAchievements(): string[] {
  const profile = getUserProfile()
  const stats = getGameStats()
  if (!profile || !stats) return []

  const newAchievements: string[] = []

  // Define achievements
  const achievements = [
    {
      id: "first_correct",
      name: "First Steps",
      condition: stats.emojiGame.correctAnswers >= 1,
    },
    {
      id: "streak_5",
      name: "On Fire",
      condition: stats.emojiGame.bestStreak >= 5,
    },
    {
      id: "streak_10",
      name: "Unstoppable",
      condition: stats.emojiGame.bestStreak >= 10,
    },
    {
      id: "games_10",
      name: "Dedicated Swiftie",
      condition: stats.emojiGame.gamesPlayed >= 10,
    },
    {
      id: "accuracy_90",
      name: "Perfectionist",
      condition: stats.emojiGame.averageAccuracy >= 90,
    },
    {
      id: "level_5",
      name: "Rising Star",
      condition: profile.level >= 5,
    },
    {
      id: "level_10",
      name: "Superstar",
      condition: profile.level >= 10,
    },
  ]

  achievements.forEach((achievement) => {
    if (achievement.condition && !profile.achievements.includes(achievement.id)) {
      profile.achievements.push(achievement.id)
      newAchievements.push(achievement.name)
    }
  })

  if (newAchievements.length > 0) {
    saveUserProfile(profile)
  }

  return newAchievements
}
