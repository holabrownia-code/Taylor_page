"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Clock } from "lucide-react"

interface CountryProgress {
  country: string
  totalGames: number
  bestScore: number
  averageAccuracy: number
  lastPlayed: string
}

interface WorldMapProps {
  userProgress: Record<string, CountryProgress>
}

export default function WorldMap({ userProgress }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const getCountryColor = (countryCode: string) => {
    const progress = userProgress[countryCode]
    if (!progress || progress.totalGames === 0) {
      return "#E5E7EB" // Gris claro para países no jugados
    }

    const accuracy = progress.averageAccuracy
    if (accuracy >= 80) return "#10B981" // Verde para puntaje alto
    if (accuracy >= 40) return "#F59E0B" // Amarillo para puntaje medio
    return "#EF4444" // Rojo para puntaje bajo
  }

  const handleCountryHover = (countryCode: string, event: React.MouseEvent) => {
    setHoveredCountry(countryCode)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  const handleCountryLeave = () => {
    setHoveredCountry(null)
  }

  const getCountryName = (countryCode: string) => {
    const names: Record<string, string> = {
      chile: "Chile",
      peru: "Perú",
      brazil: "Brasil",
      argentina: "Argentina",
    }
    return names[countryCode] || countryCode
  }

  return (
    <div className="relative">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-soft-lg overflow-hidden">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-primary-900 mb-2">Mapa de Progreso Sudamericano</CardTitle>
          <p className="text-primary-700">Explora tu conocimiento geográfico por países</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="relative bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-8 overflow-hidden">
            {/* South America SVG Map - Accurate geographical shape */}
            <svg
              viewBox="0 0 500 600"
              className="w-full h-auto max-h-[600px] mx-auto"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
            >
              {/* Ocean Background */}
              <rect width="500" height="600" fill="#B8E6FF" />

              {/* Venezuela */}
              <path
                d="M 150 80 L 220 70 L 280 85 L 290 110 L 270 130 L 240 135 L 200 130 L 170 120 L 140 100 Z"
                fill="#6B46C1"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="215" y="105" textAnchor="middle" className="fill-white text-sm font-bold">
                VENEZUELA
              </text>

              {/* Guyana */}
              <path
                d="M 280 85 L 310 80 L 320 95 L 315 110 L 290 110 Z"
                fill="#10B981"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="305" y="95" textAnchor="middle" className="fill-white text-xs font-bold">
                GUYANA
              </text>

              {/* Suriname */}
              <path
                d="M 320 95 L 340 90 L 345 105 L 335 115 L 315 110 Z"
                fill="#F59E0B"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="330" y="100" textAnchor="middle" className="fill-white text-xs font-bold">
                SURINAME
              </text>

              {/* French Guiana */}
              <path
                d="M 345 105 L 365 100 L 370 115 L 360 125 L 335 115 Z"
                fill="#EF4444"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />

              {/* Colombia */}
              <path
                d="M 100 90 L 150 80 L 170 120 L 160 150 L 140 170 L 120 160 L 110 140 L 90 120 Z"
                fill="#8B5CF6"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="130" y="125" textAnchor="middle" className="fill-white text-sm font-bold">
                COLOMBIA
              </text>

              {/* Ecuador */}
              <path
                d="M 90 120 L 120 160 L 110 180 L 90 190 L 70 180 L 75 150 Z"
                fill="#F97316"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="90" y="165" textAnchor="middle" className="fill-white text-xs font-bold">
                ECUADOR
              </text>

              {/* Brazil - Large accurate shape */}
              <path
                d="M 200 130 L 270 130 L 315 110 L 360 125 L 380 150 L 400 180 L 420 220 L 430 260 L 425 300 L 410 340 L 390 370 L 360 390 L 320 400 L 280 395 L 250 385 L 220 370 L 200 350 L 190 320 L 185 290 L 180 260 L 175 230 L 170 200 L 175 170 L 185 150 Z"
                fill={getCountryColor("brazil")}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:stroke-4"
                onMouseEnter={(e) => handleCountryHover("brazil", e)}
                onMouseLeave={handleCountryLeave}
              />
              <text x="300" y="260" textAnchor="middle" className="fill-white text-2xl font-bold">
                B R A Z I L
              </text>

              {/* Peru */}
              <path
                d="M 90 190 L 140 170 L 175 170 L 185 200 L 180 230 L 175 260 L 165 290 L 150 310 L 130 300 L 110 280 L 95 250 L 85 220 Z"
                fill={getCountryColor("peru")}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:stroke-4"
                onMouseEnter={(e) => handleCountryHover("peru", e)}
                onMouseLeave={handleCountryLeave}
              />
              <text x="130" y="240" textAnchor="middle" className="fill-white text-lg font-bold">
                P E R U
              </text>

              {/* Bolivia */}
              <path
                d="M 150 310 L 185 290 L 200 320 L 220 340 L 210 370 L 190 380 L 170 375 L 150 360 L 140 340 Z"
                fill="#EAB308"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="175" y="345" textAnchor="middle" className="fill-black text-lg font-bold">
                B O L I V I A
              </text>

              {/* Paraguay */}
              <path
                d="M 220 370 L 250 385 L 260 400 L 250 420 L 230 425 L 210 415 L 190 380 Z"
                fill="#EC4899"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="225" y="400" textAnchor="middle" className="fill-white text-sm font-bold">
                PARAGUAY
              </text>

              {/* Uruguay */}
              <path
                d="M 280 395 L 320 400 L 330 420 L 320 435 L 300 440 L 280 430 L 270 415 Z"
                fill="#10B981"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
              />
              <text x="300" y="420" textAnchor="middle" className="fill-white text-xs font-bold">
                URUGUAY
              </text>

              {/* Chile - Long accurate coastal strip */}
              <path
                d="M 85 220 L 95 250 L 110 280 L 130 300 L 140 340 L 150 360 L 145 390 L 140 420 L 135 450 L 130 480 L 125 510 L 120 540 L 115 570 L 110 575 L 105 570 L 108 540 L 112 510 L 117 480 L 122 450 L 127 420 L 132 390 L 135 360 L 130 340 L 125 320 L 120 300 L 115 280 L 105 260 L 95 240 L 80 225 Z"
                fill={getCountryColor("chile")}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:stroke-4"
                onMouseEnter={(e) => handleCountryHover("chile", e)}
                onMouseLeave={handleCountryLeave}
              />
              <text
                x="100"
                y="400"
                textAnchor="middle"
                className="fill-white text-lg font-bold"
                transform="rotate(-90 100 400)"
              >
                C H I L E
              </text>

              {/* Argentina - Large southern area with accurate shape */}
              <path
                d="M 145 390 L 190 380 L 230 425 L 270 415 L 320 435 L 360 390 L 380 420 L 370 450 L 350 480 L 320 510 L 290 530 L 260 545 L 230 555 L 200 560 L 170 555 L 150 540 L 135 520 L 130 500 L 135 480 L 140 450 L 142 420 Z"
                fill={getCountryColor("argentina")}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:stroke-4"
                onMouseEnter={(e) => handleCountryHover("argentina", e)}
                onMouseLeave={handleCountryLeave}
              />
              <text x="250" y="480" textAnchor="middle" className="fill-white text-2xl font-bold">
                A R G E N T I N A
              </text>

              {/* Falkland Islands (small) */}
              <circle cx="280" cy="570" r="3" fill="#3B82F6" stroke="#fff" strokeWidth="1" />
            </svg>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-primary-800">Excelente (80-100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-primary-800">Bueno (40-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-primary-800">Necesita práctica (0-39%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium text-primary-800">Sin jugar</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip */}
      {hoveredCountry && (
        <div
          className="fixed z-50 bg-primary-900 text-white p-4 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10,
          }}
        >
          <div className="text-lg font-bold mb-2">{getCountryName(hoveredCountry)}</div>
          {userProgress[hoveredCountry] && userProgress[hoveredCountry].totalGames > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Mejor puntaje: {userProgress[hoveredCountry].bestScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-sm">Precisión: {userProgress[hoveredCountry].averageAccuracy}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Partidas: {userProgress[hoveredCountry].totalGames}</span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-300">¡Aún no has jugado aquí!</div>
          )}
        </div>
      )}
    </div>
  )
}
