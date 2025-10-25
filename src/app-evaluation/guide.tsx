import { Button } from "@/components/ui/button"
import { useAppEvaluation } from "./context"
import { X } from "lucide-react"

export function AppEvaluationGuide() {
  const { isGuideOpen, closeGuide, guideTaskIndex, tasks } = useAppEvaluation()
  if (!isGuideOpen) return null

  const task = guideTaskIndex >= 0 && guideTaskIndex < tasks.length ? tasks[guideTaskIndex] : null
  const title = task?.toastTitle ?? `Tarefa ${guideTaskIndex + 1}`

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Guia da tarefa {guideTaskIndex + 1}</h2>
          <button
            type="button"
            onClick={closeGuide}
            aria-label="Fechar guia da tarefa"
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          {task && (
            <>
              <p className="font-medium">{title}</p>

              <div className="mt-2">
                <p className="text-[13px] text-gray-600">Informações sobre a tarefa</p>
                <p>{task.information}</p>
              </div>

              <div className="mt-3">
                <p className="text-[13px] text-gray-600">Orientações gerais</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Leia as informações acima.</li>
                  <li>Execute a tarefa na interface.</li>
                  <li>Clique no botão “Avaliar tarefa atual” ao concluir.</li>
                  <li>Avalie e avance para a próxima tarefa.</li>
                  <li>Se quiser ver a lista total de tarefas ou rever informações sobre a tarefa atual, use os ícones de ajuda no canto inferior direito.</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={closeGuide}>Fazer tarefa</Button>
        </div>
      </div>
    </div>
  )
}