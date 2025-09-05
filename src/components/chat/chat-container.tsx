import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import type { Message } from '@/types/chat'

interface ChatContainerProps {
  messages: Message[]
  isLoading: boolean
  onSendMessage: (message: string) => Promise<void>
}

export function ChatContainer({ messages, isLoading, onSendMessage }: ChatContainerProps) {
  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-background shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">Chat IA - BNCC Computação</h2>
          <p className="text-sm text-muted-foreground">
            Tire suas dúvidas sobre BNCC e assuntos relacionados à computação
          </p>
        </div>
      </div>

      <MessageList messages={messages} />

      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  )
}