import { useState } from 'react'
import { WifiOff, X } from 'lucide-react'

export function OfflineBanner({ className, dismissible = true, onClose }: { className?: string, dismissible?: boolean, onClose?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null

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
        Sem conexão com a internet. <p/>Apenas conteúdos já acessados no dispositivo serão carregados.
      </span>
      {dismissible && (
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className="ml-auto inline-flex items-center justify-center rounded-full border bg-white/80 hover:bg-white text-yellow-900 shadow-sm w-6 h-6"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  )
}