import { useState, useCallback, useEffect } from 'react'
import { useGeminiAPI } from './use-gemini-api'
import type { Message, ChatState } from '@/types/chat'
import { useBNCCContext } from './use-bncc-context'
import { STORAGE_KEYS } from '@/utils/storage-keys'

export function useChat() {
  const loadChatHistory = (): Message[] => {
    try {
      const savedHistory = sessionStorage.getItem(STORAGE_KEYS.CHAT_HISTORY)
      if (!savedHistory) return []
      
      const parsedHistory = JSON.parse(savedHistory) as Message[]
      return parsedHistory.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }))
    } catch (error) {
      console.error('Erro ao carregar histórico do chat:', error)
      return []
    }
  }

  const [state, setState] = useState<ChatState>({
    messages: loadChatHistory(),
    isLoading: false,
    error: null
  })
  const [currentUserMessage, setCurrentUserMessage] = useState('')

  const { sendMessage: sendToGemini } = useGeminiAPI()
  
  const { relevantAbilities, isLoading: contextLoading } = useBNCCContext({
    userMessage: currentUserMessage,
    enabled: currentUserMessage.length > 0
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(state.messages))
    } catch (error) {
      console.error('Erro ao salvar histórico do chat:', error)
    }
  }, [state.messages])

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }))

    return newMessage.id
  }, [])

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === id ? { ...msg, ...updates } : msg
      )
    }))
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage = content.trim()
    addMessage({ content: userMessage, role: 'user' })

    const assistantMessageId = addMessage({ 
      content: '', 
      role: 'assistant', 
      isLoading: true 
    })

    setState(prev => ({ ...prev, isLoading: true, error: null }))
    setCurrentUserMessage(userMessage)

    try {
      await new Promise<void>((resolve) => {
        const checkContext = () => {
          if (!contextLoading) {
            resolve()
          } else {
            setTimeout(checkContext, 100)
          }
        }
        checkContext()
      })

      console.log('🔍 DEBUG: Contexto final:', relevantAbilities.map(a => a.codigo))

      const response = await sendToGemini({ 
        message: userMessage,
        context: relevantAbilities
      })
      
      updateMessage(assistantMessageId, {
        content: response,
        isLoading: false
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      
      updateMessage(assistantMessageId, {
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        isLoading: false
      })
      
      setState(prev => ({ ...prev, error: errorMessage }))
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
      setCurrentUserMessage('') 
    }
  }, [addMessage, updateMessage, sendToGemini, relevantAbilities, contextLoading])

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null
    })
    setCurrentUserMessage('')
    try {
      sessionStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY)
    } catch (error) {
      console.error('Erro ao limpar histórico do chat:', error)
    }
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat
  }
}