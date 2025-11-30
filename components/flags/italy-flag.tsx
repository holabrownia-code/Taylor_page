interface ItalyFlagProps {
  className?: string
}

export default function ItalyFlag({ className = "w-8 h-6" }: ItalyFlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className}>
      <rect width="1" height="2" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#CE2B37" />
    </svg>
  )
}
