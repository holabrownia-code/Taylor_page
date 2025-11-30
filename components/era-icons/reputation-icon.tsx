export default function ReputationIcon({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center font-bold text-green-400 text-xs shadow-md border border-green-400`}
    >
      <span>REPUTATION</span>
    </div>
  )
}
