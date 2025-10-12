import { useState, useCallback, useEffect } from 'react'
import { useGeminiAPI } from './use-gemini-api'
import type { Message, ChatState, SavedChat } from '@/types/chat'
import { STORAGE_KEYS } from '@/utils/storage-keys'
import { useNetworkStatus } from '@/context/network-context'

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

  const loadSavedChatsFromStorage = (): SavedChat[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_CHATS)
      if (!saved) return []
      
      const parsedChats = JSON.parse(saved) as SavedChat[]
      return parsedChats.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
    } catch (error) {
      console.error('Erro ao carregar chats salvos:', error)
      return []
    }
  }

  const [state, setState] = useState<ChatState>({
    messages: loadChatHistory(),
    isLoading: false,
    error: null
  })
  const [savedChats, setSavedChats] = useState<SavedChat[]>(() => loadSavedChatsFromStorage())
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [currentLoadedChatId, setCurrentLoadedChatId] = useState<string | null>(null)

  const { sendMessage: sendToGemini } = useGeminiAPI()

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(state.messages))
    } catch (error) {
      console.error('Erro ao salvar histórico do chat:', error)
    }
  }, [state.messages])

  const forceUpdate = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const getSavedChats = useCallback((): SavedChat[] => {
    return savedChats
  }, [savedChats])

  const saveCurrentChat = useCallback((name: string, forceNew: boolean = false) => {
    if (state.messages.length === 0) return

    try {
      if (currentLoadedChatId && !forceNew) {
        const existingChatIndex = savedChats.findIndex(c => c.id === currentLoadedChatId)
        if (existingChatIndex !== -1) {
          const updatedChats = [...savedChats]
          updatedChats[existingChatIndex] = {
            ...updatedChats[existingChatIndex],
            name, 
            messages: state.messages,
            updatedAt: new Date()
          }
          
          localStorage.setItem(STORAGE_KEYS.SAVED_CHATS, JSON.stringify(updatedChats))
          setSavedChats(updatedChats)
          forceUpdate()
          return currentLoadedChatId
        }
      }
      
      const newChat: SavedChat = {
        id: crypto.randomUUID(),
        name,
        messages: state.messages,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const updatedChats = [...savedChats, newChat]
      localStorage.setItem(STORAGE_KEYS.SAVED_CHATS, JSON.stringify(updatedChats))
      setSavedChats(updatedChats)
      setCurrentLoadedChatId(newChat.id)
      forceUpdate()
      
      return newChat.id
    } catch (error) {
      console.error('Erro ao salvar chat:', error)
      throw error
    }
  }, [state.messages, savedChats, currentLoadedChatId, forceUpdate])

  const loadSavedChat = useCallback((chatId: string) => {
    try {
      const chat = savedChats.find(c => c.id === chatId)
      
      if (chat) {
        setState({
          messages: chat.messages,
          isLoading: false,
          error: null
        })
        sessionStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(chat.messages))
        setCurrentLoadedChatId(chatId) 
        forceUpdate()
      }
    } catch (error) {
      console.error('Erro ao carregar chat salvo:', error)
    }
  }, [savedChats, forceUpdate])

  const deleteSavedChat = useCallback((chatId: string) => {
    try {
      const updatedChats = savedChats.filter(c => c.id !== chatId)
      localStorage.setItem(STORAGE_KEYS.SAVED_CHATS, JSON.stringify(updatedChats))
      setSavedChats(updatedChats)
      
      if (currentLoadedChatId === chatId) {
        setCurrentLoadedChatId(null)
      }
      
      forceUpdate()
    } catch (error) {
      console.error('Erro ao deletar chat salvo:', error)
    }
  }, [savedChats, currentLoadedChatId, forceUpdate])

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

  const { isOnline } = useNetworkStatus()

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage = content.trim()
    console.log('💬 Enviando mensagem:', userMessage)
    addMessage({ content: userMessage, role: 'user' })

    const assistantMessageId = addMessage({ 
      content: '', 
      role: 'assistant', 
      isLoading: true 
    })

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    if (!isOnline) {
      updateMessage(assistantMessageId, {
        content: 'Sem conexão para conversar com o chat. Tente novamente quando estiver online.',
        isLoading: false
      })
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    try {
      const response = await sendToGemini({ 
        message: userMessage
      })
      
      updateMessage(assistantMessageId, {
        content: response,
        isLoading: false
      })
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      
      updateMessage(assistantMessageId, {
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        isLoading: false
      })
      
      setState(prev => ({ ...prev, error: errorMessage }))
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [addMessage, updateMessage, sendToGemini, isOnline])

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null
    })
    setCurrentLoadedChatId(null) 
    try {
      sessionStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY)
    } catch (error) {
      console.error('Erro ao limpar histórico do chat:', error)
    }
    forceUpdate()
  }, [forceUpdate])

  const getCurrentLoadedChat = useCallback(() => {
    return currentLoadedChatId ? savedChats.find(c => c.id === currentLoadedChatId) : null
  }, [currentLoadedChatId, savedChats])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
    savedChats,
    saveCurrentChat,
    getSavedChats,
    loadSavedChat,
    deleteSavedChat,
    refreshTrigger, 
    currentLoadedChatId,
    getCurrentLoadedChat 
  }
}