interface ColombiaFlagProps {
  className?: string
}

export default function ColombiaFlag({ className = "w-8 h-6" }: ColombiaFlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className}>
      <rect width="3" height="1" fill="#FFCD00" />
      <rect width="3" height="0.5" y="1" fill="#003893" />
      <rect width="3" height="0.5" y="1.5" fill="#CE1126" />
    </svg>
  )
}
