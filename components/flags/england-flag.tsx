interface EnglandFlagProps {
  className?: string
}

export default function EnglandFlag({ className = "w-8 h-6" }: EnglandFlagProps) {
  return (
    <svg viewBox="0 0 5 3" className={className}>
      <rect width="5" height="3" fill="#FFFFFF" />
      <rect width="5" height="0.6" y="1.2" fill="#CE1124" />
      <rect width="0.6" height="3" x="2.2" fill="#CE1124" />
    </svg>
  )
}
