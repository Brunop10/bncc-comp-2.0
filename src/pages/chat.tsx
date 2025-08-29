import { ChatContainer } from '@/components/chat/chat-container'
import { Heading } from '@/components/heading'
import { Description } from '@/components/description'

export function Chat() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Chat IA">Chat IA</Heading>
        <Description value="
          Converse com nossa IA especializada em BNCC e computação. 
          Faça perguntas, tire dúvidas e obtenha explicações didáticas."/>
      </div>   
      <ChatContainer />
    </div>
  )
}