interface FranceFlagProps {
  className?: string
}

export default function FranceFlag({ className = "w-8 h-6" }: FranceFlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className}>
      <rect width="1" height="2" fill="#002654" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#CE1126" />
    </svg>
  )
}
