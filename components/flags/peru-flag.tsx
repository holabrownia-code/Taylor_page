interface PeruFlagProps {
  className?: string
}

export default function PeruFlag({ className = "w-12 h-8" }: PeruFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Red stripe left */}
      <rect x="0" y="0" width="16" height="32" fill="#D91023" />
      {/* White stripe center */}
      <rect x="16" y="0" width="16" height="32" fill="white" />
      {/* Red stripe right */}
      <rect x="32" y="0" width="16" height="32" fill="#D91023" />
    </svg>
  )
}
