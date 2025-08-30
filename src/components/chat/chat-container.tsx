import { MessageList } from './message-list'
import { MessageInput } from './message-input'
import { useChat } from '@/hooks/use-chat'

export function ChatContainer() {
  const { messages, isLoading, sendMessage} = useChat()

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

      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  )
}