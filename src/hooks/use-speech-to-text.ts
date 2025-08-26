import { useState, useCallback, useRef, useEffect } from 'react'

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
        confidence: number
      }
    }
  }
  resultIndex: number
}

interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  onstart: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: { error: string }) => void
  onend: () => void
  start: () => void
  stop: () => void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export function useSpeechToText() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startListening = useCallback(() => {
    if (isListening || recognitionRef.current) {
      return
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (!SpeechRecognition) {
        console.error('SpeechRecognition não suportado neste navegador')
        return
      }

      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'pt-BR'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const current = event.resultIndex
          const transcript = event.results[current][0].transcript
          setTranscript(transcript)
        } catch (error) {
          console.error('Erro ao processar resultado de voz:', error)
        }
      }

      recognition.onerror = (event) => {
        console.error('Erro no reconhecimento de voz:', event.error)
        setIsListening(false)
        recognitionRef.current = null
      }

      recognition.onend = () => {
        setIsListening(false)
        recognitionRef.current = null
      }

      recognitionRef.current = recognition
      
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.start()
        }
      }, 100)
      
    } catch (error) {
      console.error('Erro ao inicializar reconhecimento de voz:', error)
      setIsListening(false)
      recognitionRef.current = null
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error('Erro ao parar reconhecimento de voz:', error)
      } finally {
        setIsListening(false)
        recognitionRef.current = null
      }
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          console.error('Erro ao limpar reconhecimento de voz:', error)
        } finally {
          recognitionRef.current = null
        }
      }
    }
  }, [])

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  }
}