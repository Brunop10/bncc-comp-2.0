import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Bot, User, Loader2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Message as MessageType } from '@/types/chat'

interface MessageProps {
  message: MessageType
}

function parseMarkdown(text: string) {
  let parsed = text.replace(/^###### (.*$)/gim, '<h6 class="text-xs font-medium mb-1 mt-1">$1</h6>')
  
  parsed = parsed.replace(/^##### (.*$)/gim, '<h5 class="text-sm font-medium mb-1 mt-1">$1</h5>')
  
  parsed = parsed.replace(/^#### (.*$)/gim, '<h4 class="text-base font-semibold mb-2 mt-1">$1</h4>')
  
  parsed = parsed.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-1">$1</h3>')
  
  parsed = parsed.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-2 mt-2">$1</h2>')
  
  parsed = parsed.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-3 mt-2">$1</h1>')
  
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  parsed = parsed.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')

  parsed = parsed.replace(/\n\n/g, '</p><p class="mt-2">')
  
  parsed = parsed.replace(/\n/g, '<br>')
  
  return `<div>${parsed}</div>`
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'
  const isLoading = message.isLoading
  const [isExpanded, setIsExpanded] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar mensagem:', error)
    }
  }

  const isLongMessage = message.content.length > 300

  return (
    <div className={cn(
      'flex gap-3 p-4',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      <div className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
        isUser 
          ? 'bg-purple-700 text-white' 
          : 'bg-muted'
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className={cn(
        'flex flex-col space-y-2 text-sm max-w-[80%]',
        isUser ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'rounded-lg px-3 py-2 shadow-sm',
          isUser 
            ? 'bg-purple-300 text-white ml-auto' 
            : 'bg-muted'
        )}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Gerando resposta...</span>
            </div>
          ) : (
            <div>
              <div 
                className={cn(
                  "whitespace-pre-wrap prose prose-sm max-w-none prose-headings:text-inherit prose-strong:text-inherit prose-em:text-inherit transition-all duration-200",
                  !isExpanded && isLongMessage && "max-h-12 overflow-hidden"
                )}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
              />
              
              {!isUser && !isLoading && (
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200">
                  {isLongMessage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleExpand}
                      className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          Recolher
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          Expandir
                        </>
                      )}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className={cn(
          'text-xs text-muted-foreground',
          isUser ? 'text-right' : 'text-left'
        )}>
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  )
}