interface ChileFlagProps {
  className?: string
}

export default function ChileFlag({ className = "w-12 h-8" }: ChileFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Blue square */}
      <rect x="0" y="0" width="16" height="16" fill="#0039A6" />
      {/* White star */}
      <polygon
        points="8,4 9.5,7.5 13,7.5 10.25,9.75 11.75,13.25 8,11 4.25,13.25 5.75,9.75 3,7.5 6.5,7.5"
        fill="white"
      />
      {/* White stripe */}
      <rect x="16" y="0" width="32" height="16" fill="white" />
      {/* Red stripe */}
      <rect x="0" y="16" width="48" height="16" fill="#D52B1E" />
    </svg>
  )
}
