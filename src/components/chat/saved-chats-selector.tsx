import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2, FolderOpen } from 'lucide-react'
import type { SavedChat } from '@/types/chat'

interface SavedChatsSelectorProps {
  savedChats: SavedChat[]
  onLoadChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
}

export function SavedChatsSelector({ 
  savedChats, 
  onLoadChat, 
  onDeleteChat 
}: SavedChatsSelectorProps) {
  const [selectedChatId, setSelectedChatId] = useState<string>('')

  const handleLoadChat = () => {
    if (selectedChatId) {
      onLoadChat(selectedChatId)
      setSelectedChatId('')
    }
  }

  const handleDeleteChat = () => {
    if (selectedChatId) {
      onDeleteChat(selectedChatId)
      setSelectedChatId('')
    }
  }

  if (savedChats.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2">
        Nenhuma conversa salva
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Select value={selectedChatId} onValueChange={setSelectedChatId}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Selecionar conversa salva" />
        </SelectTrigger>
        <SelectContent>
          {savedChats.map((chat) => (
            <SelectItem key={chat.id} value={chat.id}>
              <div className="flex flex-col">
                <span>{chat.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(chat.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLoadChat}
        disabled={!selectedChatId}
      >
        <FolderOpen className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleDeleteChat}
        disabled={!selectedChatId}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}