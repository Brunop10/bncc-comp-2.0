import { useAppEvaluation } from './context'
import { useEffect, useMemo, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { router } from '@/router'
import { X } from 'lucide-react'

export function AppEvaluationRating() {
  const { questionnaireOpen, questions, submitQuestionnaire, taskIndex, tasks, closeQuestionnaire } = useAppEvaluation()
  const [answers, setAnswers] = useState<number[]>([])
  const [comments, setComments] = useState<string[]>([])

  const safeQuestions = useMemo(() => questions ?? [], [questions])

  const activeTask = (taskIndex >= 0 && taskIndex < (tasks?.length ?? 0)) ? tasks[taskIndex] : undefined
  const textQuestions = useMemo(() => activeTask?.textQuestions ?? [], [activeTask])
  const headline = activeTask?.onlyEvaluation ? 'Avaliação' : `Avaliação da tarefa ${taskIndex + 1}`

  useEffect(() => {
    if (questionnaireOpen) {
      setAnswers(Array.from({ length: safeQuestions.length }, () => 0))
      setComments(Array.from({ length: textQuestions.length }, () => ''))
    }
  }, [questionnaireOpen, safeQuestions.length, textQuestions.length])

  if (!questionnaireOpen) return null
  const showTextQuestions = textQuestions.length > 0

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-md relative">
        <h2 className="text-xl font-semibold text-gray-900">{headline}</h2>
        <button
          type="button"
          onClick={closeQuestionnaire}
          aria-label="Fechar avaliação"
          className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <X className="h-5 w-5" />
        </button>
        {safeQuestions.length > 0 && (
          <p className="mt-1 text-xs text-gray-600">
            1 - Discordo totalmente<br />
            5 - Concordo totalmente 
          </p>
        )}
        <div className="mt-4 space-y-4">
          {safeQuestions.map((q, qi) => (
            <div key={qi} className="border rounded-lg p-3 bg-white/90">
              <p className="text-sm text-gray-800 mb-2">{q}</p>
              <div className="flex items-center justify-between gap-2">
                {[1,2,3,4,5].map(n => {
                  const selected = answers[qi] === n
                  return (
                    <button
                      key={n}
                      className={`h-10 w-10 rounded-full border flex items-center justify-center text-sm transition-colors ${selected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white hover:bg-gray-50'}`}
                      onClick={() => setAnswers(arr => {
                        const next = [...arr]
                        next[qi] = n
                        return next
                      })}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {showTextQuestions && textQuestions.map((tq, i) => (
            <div key={i} className="border rounded-lg p-3 bg-white/90">
              <Label htmlFor={`evaluation-comment-${i}`} className="text-sm text-gray-800">{tq}</Label>
              <Textarea
                id={`evaluation-comment-${i}`}
                placeholder="Escreva sua resposta (opcional)"
                className="mt-2"
                value={comments[i] ?? ''}
                onChange={(e) => setComments(prev => {
                  const next = prev.slice()
                  next[i] = e.target.value
                  return next
                })}
                rows={4}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            className="px-3 py-2 text-sm rounded bg-purple-600 text-white disabled:opacity-50"
            onClick={() => {
              submitQuestionnaire(answers, comments)
              router.navigate('/')
            }}
            disabled={answers.length !== safeQuestions.length || answers.some(a => !a)}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}