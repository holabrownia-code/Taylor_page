interface GermanyFlagProps {
  className?: string
}

export default function GermanyFlag({ className = "w-8 h-6" }: GermanyFlagProps) {
  return (
    <svg viewBox="0 0 5 3" className={className}>
      <rect width="5" height="1" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  )
}
