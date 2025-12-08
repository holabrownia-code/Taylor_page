// Simple user storage for quiz players

const USER_STORAGE_KEY = "trivia-user-name"

export interface User {
  name: string
  registeredAt: number
}

export const saveUserName = (name: string): void => {
  const user: User = {
    name: name.trim(),
    registeredAt: Date.now(),
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export const getUserName = (): string | null => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY)
    if (!data) return null
    const user: User = JSON.parse(data)
    return user.name
  } catch (error) {
    console.error("Error reading user name:", error)
    return null
  }
}

export const clearUserName = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY)
}
