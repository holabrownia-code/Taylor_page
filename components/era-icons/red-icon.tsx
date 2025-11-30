export default function RedIcon({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gradient-to-br from-red-500 to-red-800 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md`}
    >
      <span>RED</span>
    </div>
  )
}
