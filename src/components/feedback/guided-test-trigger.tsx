import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GuidedTestDialog } from './guided-test-dialog'

export function GuidedTestTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="secondary" onClick={() => setOpen(true)} className="shadow-lg">
          <MessageSquare className="mr-2 h-4 w-4" />
          Testar Chat IA
        </Button>
      </div>
      <GuidedTestDialog isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}