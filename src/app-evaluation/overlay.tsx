import { useAppEvaluation } from "./context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AppEvaluationOverlay() {
  const {
    isOverlayOpen,
    closeOverlay,
    startEvaluation,
    participantName,
    participantAge,
    setParticipantName,
    setParticipantAge,
  } = useAppEvaluation()
  if (!isOverlayOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Avaliação da plataforma</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          <p>Você está prestes a iniciar uma avaliação guiada por tarefas.</p>
          <p>Siga as instruções e responda as avaliações.</p>
          <p>Qualquer dúvida sobre o fluxo pode ser consultada nos botões que irão aparecer no canto inferior direito.</p>
          <p>Sua participação orienta melhorias e você pode encerrar a qualquer momento.</p>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="participant-name">Nome (opcional)</Label>
            <Input
              id="participant-name"
              placeholder="Seu nome (opcional)"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="participant-age">Idade (opcional)</Label>
            <Input
              id="participant-age"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="Sua idade"
              value={participantAge ?? ''}
              onChange={(e) => {
                const v = e.target.value
                const n = Number.parseInt(v, 10)
                setParticipantAge(v === '' || Number.isNaN(n) ? null : Math.max(1, n))
              }}
            />
          </div>
          <p className="text-xs text-gray-500">As informações pessoais não serão divulgadas.</p>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={closeOverlay}>Fechar</Button>
          <Button onClick={startEvaluation}>Iniciar</Button>
        </div>
      </div>
    </div>
  )
}