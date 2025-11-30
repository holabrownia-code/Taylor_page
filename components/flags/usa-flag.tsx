interface USAFlagProps {
  className?: string
}

export default function USAFlag({ className = "w-12 h-8" }: USAFlagProps) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Red stripes */}
      <rect x="0" y="0" width="48" height="32" fill="#B22234" />
      {/* White stripes */}
      <rect x="0" y="2.46" width="48" height="2.46" fill="white" />
      <rect x="0" y="7.38" width="48" height="2.46" fill="white" />
      <rect x="0" y="12.31" width="48" height="2.46" fill="white" />
      <rect x="0" y="17.23" width="48" height="2.46" fill="white" />
      <rect x="0" y="22.15" width="48" height="2.46" fill="white" />
      <rect x="0" y="27.08" width="48" height="2.46" fill="white" />
      {/* Blue canton */}
      <rect x="0" y="0" width="19.2" height="17.23" fill="#3C3B6E" />
      {/* Stars (simplified) */}
      <g fill="white">
        <circle cx="3" cy="3" r="0.8" />
        <circle cx="6" cy="3" r="0.8" />
        <circle cx="9" cy="3" r="0.8" />
        <circle cx="12" cy="3" r="0.8" />
        <circle cx="15" cy="3" r="0.8" />
        <circle cx="4.5" cy="6" r="0.8" />
        <circle cx="7.5" cy="6" r="0.8" />
        <circle cx="10.5" cy="6" r="0.8" />
        <circle cx="13.5" cy="6" r="0.8" />
      </g>
    </svg>
  )
}
