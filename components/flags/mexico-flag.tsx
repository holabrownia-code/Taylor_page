interface MexicoFlagProps {
  className?: string
}

export default function MexicoFlag({ className = "w-12 h-8" }: MexicoFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Green stripe */}
      <rect x="0" y="0" width="16" height="32" fill="#006847" />
      {/* White stripe */}
      <rect x="16" y="0" width="16" height="32" fill="white" />
      {/* Red stripe */}
      <rect x="32" y="0" width="16" height="32" fill="#CE1126" />
      {/* Eagle emblem (simplified) */}
      <circle cx="24" cy="16" r="6" fill="#8B4513" opacity="0.7" />
      <circle cx="24" cy="16" r="3" fill="#FFD700" />
    </svg>
  )
}
