import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useAppEvaluation } from "./context"

export function AppEvaluationBootstrap() {
  const { openOverlay } = useAppEvaluation()
  const shownRef = useRef(false)

  useEffect(() => {
    if (shownRef.current) return
    shownRef.current = true
    showToast()
  }, [])

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