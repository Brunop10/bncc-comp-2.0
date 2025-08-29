import { useState, useCallback } from 'react'
import { useGeminiAPI } from './use-gemini-api'
import type { Message, ChatState } from '@/types/chat'

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  })

  const { sendMessage: sendToGemini } = useGeminiAPI()

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

    addMessage({ content: content.trim(), role: 'user' })

    const assistantMessageId = addMessage({ 
      content: '', 
      role: 'assistant', 
      isLoading: true 
    })

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await sendToGemini(content)
      
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
    }
  }, [addMessage, updateMessage, sendToGemini])

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null
    })
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat
  }
}