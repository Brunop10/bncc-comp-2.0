import { useState } from 'react'
import type { GeminiResponse } from '@/types/chat'
import type { AbilityDTO } from '@/dtos/ability-dto'
import { getAbilities } from '@/api/get-abilities'

//const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent'

interface SendMessageOptions {
  message: string
}

const extractCodes = (message: string): string[] => {
  const codePattern = /\b[A-Z]{2}\d{2}[A-Z]{2}\d{2}\b/g
  const matches = message.match(codePattern) || []
  return matches.map(code => code.toUpperCase())
}

const extractKeywords = (message: string): string => {
  const cleanMessage = message.toLowerCase().replace(/[^\w\s]/g, ' ')
  
  const bnccKeywords = [
    'algoritmo', 'programação', 'código', 'computacional', 'digital',
    'dados', 'informação', 'tecnologia', 'internet', 'software',
    'hardware', 'rede', 'segurança', 'privacidade', 'ética',
    'pensamento', 'lógica', 'resolução', 'problema', 'abstração',
    'decomposição', 'padrão', 'automatizar', 'bncc', 'competência', 
    'objetivo', 'grafos', 'listas', 'árvore', 'matrizes',
  ]
  
  const words = cleanMessage.split(/\s+/).filter(word => word.length > 2)
  
  const relevantWords = words.filter(word => 
    bnccKeywords.some(keyword => 
      word.includes(keyword) || keyword.includes(word)
    )
  )
  
  if (relevantWords.length === 0) {
    return words.slice(0, 3).join(' ')
  }
  
  return relevantWords.slice(0, 15).join(' ')
}

const extractYears = (message: string): number | null => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('primeiro ao quinto') ||
      lowerMessage.includes('1º ao 5º') ||
      lowerMessage.includes('anos iniciais') || 
      lowerMessage.includes('ensino fundamental i') ||
      lowerMessage.includes('fundamental anos iniciais')) {
    return 15;
  }
  else if (lowerMessage.includes('sexto ao nono') ||
           lowerMessage.includes('6º ao 9º') ||
           lowerMessage.includes('anos finais') || 
           lowerMessage.includes('ensino fundamental ii') ||
           lowerMessage.includes('fundamental anos finais')) {
    return 69;
  }
  else if (lowerMessage.includes('educação infantil') || 
           lowerMessage.includes('infantil') ||
           lowerMessage.includes('pré-escola') ||
           lowerMessage.includes('creche')) {
    return 0;
  }
  else if (lowerMessage.includes('9º ano') || lowerMessage.includes('nono ano')) {
    return 9;
  }
  else if (lowerMessage.includes('8º ano') || lowerMessage.includes('oitavo ano')) {
    return 8;
  }
  else if (lowerMessage.includes('7º ano') || lowerMessage.includes('sétimo ano')) {
    return 7;
  }
  else if (lowerMessage.includes('6º ano') || lowerMessage.includes('sexto ano')) {
    return 6;
  }
  else if (lowerMessage.includes('5º ano') || lowerMessage.includes('quinto ano')) {
    return 5;
  }
  else if (lowerMessage.includes('4º ano') || lowerMessage.includes('quarto ano')) {
    return 4;
  }
  else if (lowerMessage.includes('3º ano') || lowerMessage.includes('terceiro ano')) {
    return 3;
  }
  else if (lowerMessage.includes('2º ano') || lowerMessage.includes('segundo ano')) {
    return 2;
  }
  else if (lowerMessage.includes('1º ano') || lowerMessage.includes('primeiro ano')) {
    return 1;
  }

  return null;
};
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

const SYSTEM_INSTRUCTION = 
`Você é um assistente especializado em BNCC (Base Nacional Comum Curricular) de Computação.

**IDIOMA OBRIGATÓRIO:**
- Responda SEMPRE em Português do Brasil (PT-BR), mesmo que os termos técnicos ou o contexto contenham palavras em outros idiomas.

**REGRAS IMPORTANTES:**
1. Se a pergunta NÃO for sobre computação, programação, pensamento computacional, tecnologia ou BNCC, responda: "Sou especializado em BNCC de Computação. Para outras questões, consulte fontes específicas da área."
2. SEMPRE use as informações específicas das habilidades fornecidas no contexto quando disponíveis.
3. Para habilidades específicas (códigos como EF03CO01), OBRIGATORIAMENTE use a descrição e explicação fornecidas.
4. Seja prático, educacional e cite exemplos concretos baseados nas informações específicas.
5. NUNCA diga que não tem informações se elas estão no contexto.
6. Conecte sempre que possível com os eixos: Pensamento Computacional, Mundo Digital e Cultura Digital.`

export function useGeminiAPI() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBNCCContext = async (message: string): Promise<AbilityDTO[]> => {
    try {
      console.log('🔍 Buscando contexto BNCC para:', message)
      
      const codes = extractCodes(message)
      const year = extractYears(message) 
      const axes = extractAxes(message)
      const keywords = extractKeywords(message)
      
      let result
      
      if (codes.length > 0) {
        console.log('🎯 Estratégia: busca por códigos', codes)
        result = await getAbilities({ codes })
      } else if (year !== null) { 
        console.log('🎯 Estratégia: busca por ano', year)
        result = await getAbilities({ year: year.toString() })
      } else if (axes.length > 0) {
        console.log('🎯 Estratégia: busca por eixo', axes[0])
        result = await getAbilities({ axe: axes[0] })
      } else if (keywords.length > 0) {
        console.log('🎯 Estratégia: busca por palavras-chave', keywords)
        result = await getAbilities({ keywords })
      } else {
        console.log('⚠️ Nenhuma estratégia aplicável - retornando vazio')
        return []
      }
      
      const abilities = result?.abilities?.slice(0, 15) || []
      console.log('✅ Contexto BNCC encontrado:', abilities.length, 'habilidades')
      return abilities
      
    } catch (error) {
      console.error('❌ Erro ao buscar contexto BNCC:', error)
      return []
    }
  }

  const sendMessage = async ({ message }: SendMessageOptions): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const bnccAbilities = await fetchBNCCContext(message)
      
      const contextAndMessage = createContextAndMessage(message, bnccAbilities)
      
      console.log('🚀 Enviando para Gemini com contexto:', bnccAbilities.length, 'habilidades')
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('API key do Gemini não configurada')
      }

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: [{
            parts: [{ text: contextAndMessage }]
          }], 
          generationConfig: {
          temperature: 0.7, 
          topP: 0.8,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data: GeminiResponse = await response.json()
      const parts = data.candidates?.[0]?.content?.parts
      const responseText = parts?.length
        ? parts[parts.length - 1]?.text || parts[0]?.text
        : 'Resposta não disponível'
      
      return responseText
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const createContextAndMessage = (userMessage: string, abilities: AbilityDTO[] = []) => {
    console.log('🎯 createContextAndMessage chamada com:', {
      userMessage,
      abilitiesCount: abilities.length,
      abilities
    })
  
    if (abilities.length > 0) {
      const contextSection = `**INFORMAÇÕES ESPECÍFICAS ENCONTRADAS:**
${abilities.map(ability => `
**${ability.codigo}** - ${ability.objetivo_ou_habilidade}
- **Ano:** ${ability.ano}
- **Eixo:** ${ability.eixo}
- **Descrição:** ${ability.descr_objetivo_ou_habilidade}
- **Explicação:** ${ability.explicacao}
`).join('\n')}
`
      
      console.log('✅ Contexto BNCC criado')
      return `${contextSection}\n**PERGUNTA DO USUÁRIO:** ${userMessage}`
    } else {
      console.log('⚠️ Nenhuma habilidade encontrada - enviando apenas a pergunta')
      return `**PERGUNTA DO USUÁRIO:** ${userMessage}`
    }
  }

  return {
    sendMessage,
    isLoading,
    error
  }
}