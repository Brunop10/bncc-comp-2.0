import { useState, type ReactNode } from 'react'
import { WifiOff, X } from 'lucide-react'

export function OfflineBanner({ className, dismissible = true, onClose, message, variant = 'warning' }: { className?: string, dismissible?: boolean, onClose?: () => void, message?: ReactNode, variant?: 'warning' | 'info' }) {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null

  const styles = variant === 'info'
    ? { border: 'border-blue-300', bg: 'bg-blue-100/80', text: 'text-blue-900' }
    : { border: 'border-yellow-300', bg: 'bg-yellow-100/80', text: 'text-yellow-900' }

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        `flex items-center gap-2 rounded-md border ${styles.border} ` +
        `${styles.bg} px-3 py-2 ${styles.text} shadow-sm ` +
        `backdrop-blur ${className ?? ''}`
      }
    >
      {dismissible && (
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className={`inline-flex items-center justify-center rounded-full border bg-white/80 hover:bg-white ${styles.text} shadow-sm w-6 h-6`}
        >
          <X className="size-3" />
        </button>
      )}
      <span className="text-sm">
        {message ?? (
          <>
            Sem conexão com a internet. <p/>Apenas conteúdos já acessados no dispositivo serão carregados.
          </>
        )}
      </span>
      <WifiOff className="size-4 shrink-0 ml-auto" />
    </div>
  )
}