import { Button } from "@/components/ui/button"
import { useAppEvaluation } from "./context"

export function AppEvaluationFinish() {
  const { isFinishOpen, closeFinish } = useAppEvaluation()
  if (!isFinishOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Avaliação concluída</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          <p>Obrigado por participar! Suas respostas foram registradas.</p>
          <p>Elas nos ajudam a melhorar a plataforma e priorizar evoluções.</p>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button onClick={closeFinish}>Fechar</Button>
        </div>
      </div>
    </div>
  )
}