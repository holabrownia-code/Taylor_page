interface BrazilFlagProps {
  className?: string
}

export default function BrazilFlag({ className = "w-12 h-8" }: BrazilFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Green background */}
      <rect x="0" y="0" width="48" height="32" fill="#009739" />
      {/* Yellow diamond */}
      <polygon points="24,4 44,16 24,28 4,16" fill="#FEDD00" />
      {/* Blue circle */}
      <circle cx="24" cy="16" r="6" fill="#012169" />
      {/* Stars and banner (simplified) */}
      <rect x="18" y="15" width="12" height="2" fill="#FEDD00" rx="1" />
    </svg>
  )
}
