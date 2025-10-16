import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FeedbackDialog } from './feedback-dialog'

export function FeedbackTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="secondary" onClick={() => setOpen(true)} className="shadow-lg">
          <MessageSquare className="mr-2 h-4 w-4" />
          Avaliar
        </Button>
      </div>
      <FeedbackDialog isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}