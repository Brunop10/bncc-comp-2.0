import { useState } from 'react'
import { useChat } from '@/hooks/use-chat'
import { ChatContainer } from '@/components/chat/chat-container'
import { SaveChatDialog } from '@/components/chat/save-chat-dialog'
import { SavedChatsSelector } from '@/components/chat/saved-chats-selector'
import { Button } from '@/components/ui/button'
import { Save, Trash2, MessageCircle, ExternalLink, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Heading } from '@/components/heading'
import { Description } from '@/components/description'

export function Chat() {
  const { 
    messages, 
    isLoading,
    sendMessage,
    clearChat,
    saveCurrentChat,
    savedChats,
    loadSavedChat,
    deleteSavedChat,
    refreshTrigger,
    getCurrentLoadedChat
  } = useChat()
  
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showSessionWarning, setShowSessionWarning] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const handleSaveChat = async (name: string) => {
    try {
      await saveCurrentChat(name)
      setShowSaveDialog(false)
    } catch (error) {
      console.error('Erro ao salvar chat:', error)
    }
  }

  const handleLoadChat = (chatId: string) => {
    loadSavedChat(chatId)
    setShowSessionWarning(false)
  }

  const handleDeleteChat = (chatId: string) => {
    deleteSavedChat(chatId)
  }

  const handleClearChat = () => {
    clearChat()
    setShowSessionWarning(true)
  }

  const currentLoadedChat = getCurrentLoadedChat()
  const saveButtonText = currentLoadedChat 
    ? `Salvar "${currentLoadedChat.name}"` 
    : `Salvar`

  return (
    <div className="space-y-6" key={refreshTrigger}>
      <div className="space-y-2">
        <Heading title="Chat IA">Chat IA</Heading>
        <Description value="
          Converse com nossa IA especializada nas habilidades da BNCC computação. 
          Faça perguntas, tire dúvidas e obtenha explicações didáticas."/>     
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto text-left border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800"
            >
              <span className="text-sm font-medium">
                Opção alternativa de chat
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
                    Caso enfrente problemas com o chat integrado, você pode usar uma versão alternativa no ChatGPT feita por Christian Brackmann:
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

      {showSessionWarning && messages.length === 0 && (
        <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MessageCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-amber-800 text-sm">
              <strong>Atenção:</strong> As conversas são perdidas quando você fecha o navegador. 
              Use o botão "Salvar" para preservar conversas importantes.
            </div>
          </div>
        </div>
      )}

      {savedChats.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Chats Salvos ({savedChats.length})</h3>
          <SavedChatsSelector
            savedChats={savedChats}
            onLoadChat={handleLoadChat}
            onDeleteChat={handleDeleteChat}
          />
        </div>
      )}

      <ChatContainer 
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />

      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setShowSaveDialog(true)}
          disabled={messages.length === 0}
          variant="outline"
          size="sm"
          className="hover:bg-green-50 hover:border-green-300 hover:text-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveButtonText}
        </Button>
        
        <Button
          onClick={handleClearChat}
          disabled={messages.length === 0}
          variant="outline"
          size="sm"
          className="hover:bg-red-50 hover:border-red-300 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      </div>

      <SaveChatDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSaveChat}
        defaultName={currentLoadedChat?.name}
        isUpdate={!!currentLoadedChat}
      />
    </div>
  )
}