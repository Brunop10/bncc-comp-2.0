import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SaveChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
  defaultName?: string
  isUpdate?: boolean
}

export function SaveChatDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  defaultName = '',
  isUpdate = false 
}: SaveChatDialogProps) {
  const [name, setName] = useState(defaultName)

  useEffect(() => {
    setName(defaultName)
  }, [defaultName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim())
      setName('')
    }
  }

  const handleClose = () => {
    setName('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Atualizar Chat' : 'Salvar Chat'}
          </DialogTitle>
          <DialogDescription>
            {isUpdate 
              ? 'Atualize o nome do chat se desejar ou mantenha o atual.'
              : 'Digite um nome para salvar este chat e poder acessá-lo depois.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chat-name">Nome do chat</Label>
            <Input
              id="chat-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Dúvidas sobre algoritmos"
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {isUpdate ? 'Atualizar' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}