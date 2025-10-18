import { Button } from "@/components/ui/button"
import { useAppEvaluation } from "./context"

export function AppEvaluationGuide() {
  const { isGuideOpen, closeGuide, guideTaskIndex, tasks } = useAppEvaluation()
  if (!isGuideOpen) return null

  const task = guideTaskIndex >= 0 && guideTaskIndex < tasks.length ? tasks[guideTaskIndex] : null
  const title = task?.toastTitle ?? `Tarefa ${guideTaskIndex + 1}`

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Guia da tarefa</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          {task && (
            <>
              <p className="font-medium">{title}</p>
              {Array.isArray(task.instruction) ? (
                <>
                  <p className="text-[13px] text-gray-600">Passo a passo</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    {task.instruction.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </>
              ) : (
                <p>{task.instruction}</p>
              )}

              <div className="mt-3">
                <p className="text-[13px] text-gray-600">Orientações gerais</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Leia o guia acima.</li>
                  <li>Execute a tarefa na interface.</li>
                  <li>Clique em “Avaliar” no aviso da tarefa quando concluir.</li>
                  <li>Responda ao questionário e avance para a próxima tarefa.</li>
                  <li>Se precisar rever detalhes, use os ícones de ajuda no canto inferior direito.</li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={closeGuide}>Fazer tarefa</Button>
        </div>
      </div>
    </div>
  )
}