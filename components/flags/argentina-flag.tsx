interface ArgentinaFlagProps {
  className?: string
}

export default function ArgentinaFlag({ className = "w-12 h-8" }: ArgentinaFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Light blue stripe top */}
      <rect x="0" y="0" width="48" height="10.67" fill="#74ACDF" />
      {/* White stripe middle */}
      <rect x="0" y="10.67" width="48" height="10.67" fill="white" />
      {/* Light blue stripe bottom */}
      <rect x="0" y="21.33" width="48" height="10.67" fill="#74ACDF" />
      {/* Sun of May (simplified) */}
      <circle cx="24" cy="16" r="4" fill="#F6B40E" stroke="#ED8A00" strokeWidth="0.5" />
      {/* Sun rays (simplified) */}
      <g stroke="#ED8A00" strokeWidth="0.5" fill="#F6B40E">
        <polygon points="24,12 24.5,13.5 24,14 23.5,13.5" />
        <polygon points="28,16 26.5,16.5 26,16 26.5,15.5" />
        <polygon points="24,20 23.5,18.5 24,18 24.5,18.5" />
        <polygon points="20,16 21.5,15.5 22,16 21.5,16.5" />
      </g>
    </svg>
  )
}
