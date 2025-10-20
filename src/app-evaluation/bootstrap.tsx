import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useAppEvaluation } from "./context"
import { STORAGE_KEYS } from "@/utils/storage-keys"

export function AppEvaluationBootstrap() {
  const { openOverlay, active, isFinishOpen, isOverlayOpen } = useAppEvaluation()
  const shownRef = useRef(false)

  useEffect(() => {
    if (shownRef.current) return
    shownRef.current = true
    let hasPersisted = false
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.APP_EVALUATION_STATE)
      if (raw) {
        const snap = JSON.parse(raw) || {}
        const notFinished = !snap?.completed && !snap?.isFinishOpen
        const hasProgress = Boolean(snap?.active) || (Number.isFinite(snap?.taskIndex) && snap.taskIndex >= 0) || (Array.isArray(snap?.taskStatus) && snap.taskStatus.length > 0)
        hasPersisted = notFinished && hasProgress
      }
    } catch {}

    if (active || isFinishOpen || isOverlayOpen || hasPersisted) return

    showToast()
  }, [active, isFinishOpen, isOverlayOpen])

  function showToast() {
    toast(
      "Iniciar avaliação da plataforma",
      {
        description: "Participe de uma breve avaliação guiada da plataforma e ajude-nos a melhorar.",
        duration: Infinity,
        action: {
          label: "Iniciar avaliação",
          onClick: () => openOverlay(),
        },
      }
    )
  }

  return null
}