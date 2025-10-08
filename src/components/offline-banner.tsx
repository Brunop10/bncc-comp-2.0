import { WifiOff } from 'lucide-react'

export function OfflineBanner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        `flex items-center gap-2 rounded-md border border-yellow-300 ` +
        `bg-yellow-100/80 px-3 py-2 text-yellow-900 shadow-sm ` +
        `backdrop-blur ${className ?? ''}`
      }
    >
      <WifiOff className="size-4 shrink-0" />
      <span className="text-sm">
        Sem conexão com a internet. <p/>Apenas conteúdos já salvos no dispositivo serão exibidos.
      </span>
    </div>
  )
}