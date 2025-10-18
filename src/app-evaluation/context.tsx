import { createContext, useContext, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Task, TaskId, buildDefaultTasks } from './tasks'

type TaskStatus = {
  completed: boolean
  evaluated: boolean
}

type AppEvaluationContextValue = {
  isOverlayOpen: boolean
  openOverlay: () => void
  closeOverlay: () => void

  isFinishOpen: boolean
  openFinish: () => void
  closeFinish: () => void

  participantName: string
  participantAge: number | null
  setParticipantName: (name: string) => void
  setParticipantAge: (age: number | null) => void

  active: boolean
  progress: number
  completed: boolean
  startEvaluation: () => void
  stopEvaluation: () => void
  setProgress: (pct: number) => void
  markCompleted: () => void

  isGuideOpen: boolean
  guideTaskIndex: number
  openGuide: (taskIndex: number) => void
  closeGuide: () => void

  currentTask: TaskId | null
  taskIndex: number
  tasks: Task[]
  taskStatus: TaskStatus[]
  completeCurrentTask: () => void

  questionnaireOpen: boolean
  questions: string[]
  openQuestionnaire: (qs?: string[]) => void
  closeQuestionnaire: () => void
  submitQuestionnaire: (answers: number[], comments?: string[]) => void
}

const AppEvaluationContext = createContext<AppEvaluationContextValue | null>(null)

export function AppEvaluationProvider({ children }: { children: React.ReactNode }) {
  const [isOverlayOpen, setOverlayOpen] = useState(false)
  const [isFinishOpen, setFinishOpen] = useState(false)
  const [participantName, setParticipantName] = useState<string>("")
  const [participantAge, setParticipantAge] = useState<number | null>(null)
  const [active, setActive] = useState(false)
  const [progress, setProgressState] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [tasks, setTasks] = useState<Task[]>([])
  const [taskIndex, setTaskIndex] = useState<number>(-1)
  const currentTask: TaskId | null = taskIndex >= 0 && taskIndex < tasks.length ? tasks[taskIndex].id : null

  const [taskStatus, setTaskStatus] = useState<TaskStatus[]>([])

  const questionnaireTimerRef = useRef<number | null>(null)

  const [questionnaireOpen, setQuestionnaireOpen] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])

  const [sessionAnswers, setSessionAnswers] = useState<number[]>([])
  const [sessionComments, setSessionComments] = useState<string[]>([])
  const [isGuideOpen, setGuideOpen] = useState(false)
  const [guideTaskIndex, setGuideTaskIndex] = useState<number>(-1)

  const completeCurrentTaskImpl = () => {
    const idx = taskIndex
    const task = idx >= 0 && idx < tasks.length ? tasks[idx] : null
    if (!task) return

    toast.dismiss(`evaluation-task-${idx + 1}`)

    if (taskStatus[idx]?.completed) {
      setQuestions(task.questions)
      setQuestionnaireOpen(true)
      return
    }

    setTaskStatus(prev => {
      const next = prev.slice()
      if (next[idx]) next[idx] = { ...next[idx], completed: true }
      return next
    })

    toast.success('Tarefa concluída', {
      description: 'Obrigado! Avalie esta tarefa agora.',
      position: 'top-center',
      duration: 3000,
    })

    if (questionnaireTimerRef.current != null) {
      clearTimeout(questionnaireTimerRef.current)
      questionnaireTimerRef.current = null
    }

    setQuestions(task.questions)
    setQuestionnaireOpen(true)
  }

  const value = useMemo<AppEvaluationContextValue>(() => ({
    isOverlayOpen,
    openOverlay: () => setOverlayOpen(true),
    closeOverlay: () => setOverlayOpen(false),
    isFinishOpen,
    openFinish: () => setFinishOpen(true),
    closeFinish: () => setFinishOpen(false),
    participantName,
    participantAge,
    setParticipantName,
    setParticipantAge,
    active,
    progress,
    completed,
    startEvaluation: () => {
      const pipeline: Task[] = buildDefaultTasks()
  
      setOverlayOpen(false)
      setFinishOpen(false)
      setActive(true)
      setProgressState(0)
      setCompleted(false)
      setTasks(pipeline)
      setTaskIndex(0)
      setTaskStatus(pipeline.map(() => ({ completed: false, evaluated: false })))
      setGuideTaskIndex(0)
      setGuideOpen(true)
    },
    stopEvaluation: () => {
      if (questionnaireTimerRef.current != null) {
        clearTimeout(questionnaireTimerRef.current)
        questionnaireTimerRef.current = null
      }

      toast.dismiss()
      setFinishOpen(false)
      setActive(false)
      setProgressState(0)
      setCompleted(false)
      setTasks([])
      setTaskIndex(-1)
      setTaskStatus([])
      setQuestionnaireOpen(false)
      setQuestions([])
      setSessionAnswers([])
      setSessionComments([])
      setGuideOpen(false)
      setGuideTaskIndex(-1)
    },
    setProgress: (pct: number) => setProgressState(Math.max(0, Math.min(100, Math.round(pct)))),
    markCompleted: () => { setCompleted(true); setProgressState(100) },

    isGuideOpen,
    guideTaskIndex,
    openGuide: (idx: number) => { setGuideTaskIndex(idx); setGuideOpen(true) },
    closeGuide: () => {
      setGuideOpen(false)
      const idx = taskIndex
      const task = idx >= 0 && idx < tasks.length ? tasks[idx] : null
      if (!task) return
      toast(
        task.toastTitle ?? `Tarefa ${idx + 1}`,
        {
          id: `evaluation-task-${idx + 1}`,
          description: task.toastDescription ?? (Array.isArray(task.instruction) ? task.instruction.join(' · ') : task.instruction),
          duration: Number.POSITIVE_INFINITY,
          position: 'top-center',
          closeButton: true,
          action: {
            label: 'Avaliar',
            onClick: () => completeCurrentTaskImpl(),
          },
        }
      )
    },
    currentTask,
    taskIndex,
    tasks,
    taskStatus,
    completeCurrentTask: () => {
      completeCurrentTaskImpl()
    },
    questionnaireOpen,
    questions,
    openQuestionnaire: (qs) => {
      if (qs?.length) setQuestions(qs)
      setQuestionnaireOpen(true)
    },
    closeQuestionnaire: () => setQuestionnaireOpen(false),
    submitQuestionnaire: (_answers: number[], comments?: string[]) => {

      const trimmed = (comments ?? []).map(c => (c ?? '').trim()).filter(c => c.length > 0)
      if (trimmed.length > 0) {

        console.log('[AppEvaluation] Comentários recebidos:', trimmed)
      }

      try {
        const trimmedComments = trimmed
        setSessionAnswers(prev => [...prev, ..._answers])
        setSessionComments(prev => [...prev, ...trimmedComments])
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('[AppEvaluation] Falha ao agregar respostas localmente:', err)
      }

      setQuestionnaireOpen(false)

      const currIndex = taskIndex

      setTaskStatus(prev => {
        const next = prev.slice()
        if (currIndex >= 0 && next[currIndex]) next[currIndex] = { ...next[currIndex], evaluated: true }
        return next
      })

      const nextIndex = taskIndex + 1
      const total = tasks.length
      const pct = Math.floor(((nextIndex) / total) * 100)
      setProgressState(pct)

      if (nextIndex < total) {
        setTaskIndex(nextIndex)
        setGuideTaskIndex(nextIndex)
        setGuideOpen(true)
      } else {
        setCompleted(true)
        setProgressState(100)
        setActive(false)
        
        try {
          const answersForSubmit = [...sessionAnswers, ..._answers]
          const commentsForSubmit = [...sessionComments, ...((comments ?? []).map(c => (c ?? '').trim()).filter(c => c.length > 0))]
          const singleRecord = {
            participantName,
            participantAge,
            answers: answersForSubmit,
            comments: commentsForSubmit,
            timestamp: new Date().toISOString(),
          }
          fetch('/api/evaluation/submit', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(singleRecord),
          }).catch(() => {})
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('[AppEvaluation] Falha ao enviar resultado único para Google Sheets:', err)
        }
  
        setTasks([])
        setTaskIndex(-1)
        setTaskStatus([])
        setSessionAnswers([])
        setSessionComments([])
        setFinishOpen(true)
      }
    },
  }), [isOverlayOpen, isFinishOpen, participantName, participantAge, active, progress, completed, taskIndex, tasks, taskStatus, questionnaireOpen, questions, sessionAnswers, sessionComments, isGuideOpen, guideTaskIndex])

  return (
    <AppEvaluationContext.Provider value={value}>{children}</AppEvaluationContext.Provider>
  )
}

export function useAppEvaluation() {
  const ctx = useContext(AppEvaluationContext)
  if (!ctx) throw new Error("useAppEvaluation must be used within AppEvaluationProvider")
  return ctx
}