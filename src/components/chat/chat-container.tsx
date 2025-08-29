import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useChat } from '@/hooks/use-chat'

export function ChatContainer() {
  const { messages, isLoading, sendMessage, clearChat } = useChat()

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">Chat IA - BNCC</h2>
          <p className="text-sm text-muted-foreground">
            Tire suas dúvidas sobre BNCC e computação
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      <MessageList messages={messages} />
      
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  )
}