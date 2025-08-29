import { ChatContainer } from '@/components/chat/chat-container'
import { Heading } from '@/components/heading'
import { Description } from '@/components/description'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible'
import { useState } from 'react'

export function Chat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Chat IA">Chat IA</Heading>
        <Description value="
          Converse com nossa IA especializada em BNCC e computação. 
          Faça perguntas, tire dúvidas e obtenha explicações didáticas."/>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto text-left border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-800"
            >
              <span className="text-sm font-medium">
                🚨 Está enfrentando problemas com o nosso chat? Clique aqui
              </span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`} 
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">
                    Chat Alternativo
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Caso enfrente problemas com o chat integrado, você pode usar uma versão alternativa no ChatGPT:
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    onClick={() => window.open('https://chatgpt.com/g/g-3Y1GjGKu2-bncc-computacao', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir ChatGPT BNCC Computação
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>   
      <ChatContainer />
    </div>
  )
}