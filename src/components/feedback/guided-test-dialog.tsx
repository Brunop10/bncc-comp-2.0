import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface GuidedTestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function GuidedTestDialog({ isOpen, onClose }: GuidedTestDialogProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // Estados locais apenas para a amostra visual (nada é salvo)
  const [foundChat, setFoundChat] = useState<boolean | null>(null)
  const [answerHelpful, setAnswerHelpful] = useState<boolean | null>(null)
  const [saveClarity, setSaveClarity] = useState<number | null>(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setFoundChat(null)
      setAnswerHelpful(null)
      setSaveClarity(null)
      setComment('')
    }
  }, [isOpen])

  function goToChat() {
    navigate('/chat')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Passo a passo: Chat IA</DialogTitle>
          <DialogDescription>
            Um teste rápido e opcional para explorar o chat integrado.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Passo 1 — Acessar o Chat</Label>
              <p className="text-sm text-muted-foreground">
                Abra a página de chat, explore a interface e identifique onde enviar mensagens.
              </p>
              <div className="flex gap-2">
                <Button onClick={goToChat}>Ir para o Chat</Button>
                <Button variant="outline" onClick={() => setStep(2)}>Já estou no chat</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Você encontrou o chat facilmente?</Label>
              <div className="flex gap-2">
                <Button
                  variant={foundChat === true ? 'default' : 'outline'}
                  onClick={() => setFoundChat(true)}
                >
                  👍 Sim
                </Button>
                <Button
                  variant={foundChat === false ? 'default' : 'outline'}
                  onClick={() => setFoundChat(false)}
                >
                  👎 Não
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Continuar</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Passo 2 — Conversar</Label>
              <p className="text-sm text-muted-foreground">
                Envie uma pergunta sobre BNCC/Computação. Ex.: “Como a habilidade CT1 se aplica no 6º ano?”
              </p>
              <div className="flex gap-2">
                <Button onClick={goToChat}>Abrir chat</Button>
                <Button variant="outline" onClick={() => setStep(3)}>Já fiz minha pergunta</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">A resposta do chat foi útil?</Label>
              <div className="flex gap-2">
                <Button
                  variant={answerHelpful === true ? 'default' : 'outline'}
                  onClick={() => setAnswerHelpful(true)}
                >
                  👍 Sim
                </Button>
                <Button
                  variant={answerHelpful === false ? 'default' : 'outline'}
                  onClick={() => setAnswerHelpful(false)}
                >
                  👎 Não
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={() => setStep(3)}>Continuar</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Passo 3 — Salvar conversa</Label>
              <p className="text-sm text-muted-foreground">
                Se quiser, salve a conversa (menu do chat). Depois, deixe uma avaliação rápida.
              </p>
              <div className="flex gap-2">
                <Button onClick={goToChat}>Abrir chat</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">O fluxo de salvar ficou claro?</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSaveClarity(n)}
                    className={
                      'h-10 w-10 rounded-md border text-sm ' +
                      (saveClarity === n ? 'bg-primary text-primary-foreground' : 'bg-background')
                    }
                    aria-pressed={saveClarity === n}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Comentário (opcional)</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Alguma sugestão rápida?"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Fechar</Button>
              <Button onClick={onClose}>Concluir</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}