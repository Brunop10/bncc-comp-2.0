import { useRef, useState } from "react"
import { useAppEvaluation } from "./context"
import { ListChecks, X } from "lucide-react"

export function AppEvaluationHud() {
  const { active, progress, tasks, taskStatus, taskIndex, stopEvaluation } = useAppEvaluation()
  const barRef = useRef<HTMLDivElement | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  if (!active) return null

  const total = tasks.length
  const completedCount = taskStatus.filter(s => s.completed).length
  const evaluatedCount = taskStatus.filter(s => s.evaluated).length

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none" id="app-evaluation-hud">
      <div className="pointer-events-auto fixed left-0 right-0 top-0" ref={barRef}>
        <div className="mx-2 mt-2">
          <div className="rounded-xl border bg-white/95 backdrop-blur shadow-lg overflow-hidden">
            <div className="h-1 bg-gray-200">
              <div className="h-1 bg-purple-900 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-4 right-4 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setPanelOpen(v => !v)}
          aria-expanded={panelOpen}
          aria-controls="evaluation-guide-panel"
          title={panelOpen ? 'Fechar guia da avaliação' : 'Abrir guia da avaliação'}
          className="rounded-full bg-purple-600 text-white shadow-lg border border-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 p-3"
        >
          {panelOpen ? <X className="h-5 w-5" /> : <ListChecks className="h-5 w-5" />}
        </button>

        {panelOpen && (
          <div
            id="evaluation-guide-panel"
            className="w-[92vw] max-w-sm rounded-xl border bg-white/95 backdrop-blur shadow-xl p-3 text-sm text-gray-800"
            role="dialog"
            aria-label="Guia da avaliação"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-gray-600">Guia da avaliação</p>
                <p className="text-xs text-gray-500">Tarefas: {completedCount}/{total} · Avaliadas: {evaluatedCount}/{total}</p>
              </div>
            </div>

            <div className="mt-3 space-y-2 max-h-64 overflow-auto pr-1">
              {tasks.map((t, i) => {
                const s = taskStatus[i]
                const isCurrent = i === taskIndex
                return (
                  <div key={t.id} className="rounded-lg border bg-white/90 p-2">
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 h-2 w-2 rounded-full ${s?.evaluated ? 'bg-purple-600' : s?.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <div className="flex-1">
                        <p className="text-[13px] leading-snug">{t.instruction}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 text-[11px] rounded bg-blue-100 text-blue-800 border border-blue-200">Atual</span>
                          )}
                          <span className={`px-1.5 py-0.5 text-[11px] rounded border ${s?.completed ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                            {s?.completed ? 'Concluída' : 'Pendente'}
                          </span>
                          <span className={`ml-1 px-1.5 py-0.5 text-[11px] rounded border ${s?.evaluated ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                            {s?.evaluated ? 'Avaliada' : 'Não avaliada'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={stopEvaluation}
                className="inline-flex items-center gap-1 rounded-md border border-red-700 bg-red-600 px-3 py-1.5 text-[13px] font-medium text-white shadow-sm hover:bg-red-700"
              >
                Desistir da avaliação
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}