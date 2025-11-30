export default function DebutIcon({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gradient-to-br from-emerald-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md`}
    >
      <span>DEBUT</span>
    </div>
  )
}
