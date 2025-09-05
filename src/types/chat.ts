export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

export interface SavedChat {
  id: string
  name: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface SaveChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
  defaultName?: string
  isUpdate?: boolean
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
    }
  }[]
}