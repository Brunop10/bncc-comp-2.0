import { useQuery } from '@tanstack/react-query'
import { getAbilities } from '@/api/get-abilities'
import type { AbilityDTO } from '@/dtos/ability-dto' 

interface BNCCContextResult {
  relevantAbilities: AbilityDTO[]
  isLoading: boolean
  error: Error | null
}

interface UseBNCCContextParams {
  userMessage: string
  enabled?: boolean
}

export function useBNCCContext({ userMessage, enabled = true }: UseBNCCContextParams): BNCCContextResult {
  const extractCodes = (message: string): string[] => {
    const codePattern = /\b[A-Z]{2}\d{2}[A-Z]{2}\d{2}\b/g
    const matches = message.match(codePattern) || []
    return matches.map(code => code.toUpperCase())
  }

  const extractKeywords = (message: string): string[] => {
    const cleanMessage = message.toLowerCase().replace(/[^\w\s]/g, ' ')
    
    const bnccKeywords = [
      'algoritmo', 'programação', 'código', 'computacional', 'digital',
      'dados', 'informação', 'tecnologia', 'internet', 'software',
      'hardware', 'rede', 'segurança', 'privacidade', 'ética',
      'pensamento', 'lógica', 'resolução', 'problema', 'abstração',
      'decomposição', 'padrão', 'automação', 'simulação', 'modelagem',
      'habilidade', 'bncc', 'competência', 'objetivo', 'grafos', 'listas',
      'arvore', 'matrizes',
    ]
    
    const words = cleanMessage.split(/\s+/).filter(word => word.length > 2)
    
    const relevantWords = words.filter(word => 
      bnccKeywords.some(keyword => 
        word.includes(keyword) || keyword.includes(word)
      )
    )
    
    if (relevantWords.length === 0) {
      return words.slice(0, 3)
    }
    
    return relevantWords.slice(0, 5)
  }

  const extractYears = (message: string): string[] => {
    const yearPatterns = [
      /\b([0-9])º\s*ano\b/gi,
      /\bano\s*([0-9])\b/gi,
      /\b([0-9])ª\s*série\b/gi,
      /\bsérie\s*([0-9])\b/gi,
      /\bensino\s*fundamental\b/gi,
      /\bensino\s*médio\b/gi
    ]
    
    const years: string[] = []
    
    yearPatterns.forEach(pattern => {
      const matches = message.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const yearMatch = match.match(/\d/)
          if (yearMatch) {
            years.push(yearMatch[0])
          }
        })
      }
    })
    
    if (message.toLowerCase().includes('educação infantil')) {
      years.push('0')
    }
    if (message.toLowerCase().includes('fundamental')) {
      years.push('1', '2', '3', '4', '5', '6', '7', '8', '9','15','69')
    }
    
    return [...new Set(years)]
  }

  const extractAxes = (message: string): string[] => {
    const axes: string[] = []
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('pensamento') || lowerMessage.includes('computacional') || 
        lowerMessage.includes('algoritmo') || lowerMessage.includes('lógica')) {
      axes.push('Pensamento Computacional')
    }
    
    if (lowerMessage.includes('mundo') || lowerMessage.includes('digital') || 
        lowerMessage.includes('tecnologia') || lowerMessage.includes('hardware') || 
        lowerMessage.includes('software')) {
      axes.push('Mundo Digital')
    }
    
    if (lowerMessage.includes('cultura') || lowerMessage.includes('ética') || 
        lowerMessage.includes('cidadania') || lowerMessage.includes('sociedade')) {
      axes.push('Cultura Digital')
    }
    
    return axes
  }

  const keywords = extractKeywords(userMessage)
  const codes = extractCodes(userMessage)
  const years = extractYears(userMessage)
  const axes = extractAxes(userMessage)

  const { data: codeResults, isLoading: codeLoading, error: codeError } = useQuery({
    queryKey: ['bncc-context-codes', codes],
    queryFn: async () => {
      const result = await getAbilities({ codes })
      return result
    },
    enabled: enabled && codes.length > 0
  })

  const { data: keywordResults, isLoading: keywordLoading } = useQuery({
    queryKey: ['bncc-context-keywords', keywords.join(' ')],
    queryFn: async () => {
      const result = await getAbilities({ keywords: keywords.join(' ') })
      return result
    },
    enabled: enabled && keywords.length > 0 && codes.length === 0
  })

  const { data: yearResults, isLoading: yearLoading } = useQuery({
    queryKey: ['bncc-context-year', years[0]],
    queryFn: async () => {
      const result = await getAbilities({ year: years[0] })
      return result
    },
    enabled: enabled && years.length > 0 && codes.length === 0 && keywords.length === 0
  })

  const { data: axeResults, isLoading: axeLoading } = useQuery({
    queryKey: ['bncc-context-axe', axes[0]],
    queryFn: async () => {
      const result = await getAbilities({ axe: axes[0] })
      return result
    },
    enabled: enabled && axes.length > 0 && codes.length === 0 && keywords.length === 0 && years.length === 0
  })

  const relevantAbilities: AbilityDTO[] = [
    ...(codeResults?.abilities || []),
    ...(keywordResults?.abilities || []),
    ...(yearResults?.abilities || []),
    ...(axeResults?.abilities || [])
  ]

  const uniqueAbilities = relevantAbilities.filter((ability, index, self) => 
    index === self.findIndex(a => a.codigo === ability.codigo)
  )

  const limitedAbilities = uniqueAbilities.slice(0, 5)

  const isLoading = codeLoading || keywordLoading || yearLoading || axeLoading
  const error = codeError as Error | null

  if (enabled && userMessage.trim()) {
    const searchStrategy = codes.length > 0 ? 'códigos' : 
                          keywords.length > 0 ? 'palavras-chave' :
                          years.length > 0 ? 'anos' :
                          axes.length > 0 ? 'eixos' : 'nenhum'
    
    console.log(`🔍 BNCC Context: "${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}" → Estratégia: ${searchStrategy} → Encontradas: ${limitedAbilities.length} habilidades${limitedAbilities.length > 0 ? ` [${limitedAbilities.map(a => a.codigo).join(', ')}]` : ''}`)
  }

  return {
    relevantAbilities: limitedAbilities,
    isLoading,
    error
  }
}