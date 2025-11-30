interface SpainFlagProps {
  className?: string
}

export default function SpainFlag({ className = "w-8 h-6" }: SpainFlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className}>
      <rect width="3" height="2" fill="#C60B1E" />
      <rect width="3" height="1" y="0.5" fill="#FFC400" />
    </svg>
  )
}
