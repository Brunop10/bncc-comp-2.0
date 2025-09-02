import { useState } from 'react'
import type { GeminiResponse } from '@/types/chat'
import type { AbilityDTO } from '@/dtos/ability-dto'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

interface SendMessageOptions {
  message: string
  context?: AbilityDTO[]
}

export function useGeminiAPI() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBNCCPrompt = (userMessage: string, abilities: AbilityDTO[] = []): string => {
    const systemPrompt = 
`Você é um assistente especializado EXCLUSIVAMENTE em BNCC (Base Nacional Comum Curricular) na área de Computação. 

**REGRAS IMPORTANTES:**
1. APENAS responda perguntas relacionadas a:
   - BNCC Computação
   - Educação computacional
   - Pensamento Computacional
   - Mundo Digital
   - Cultura Digital
   - Programação e algoritmos no contexto educacional
   - Tecnologia na educação

2. Se a pergunta NÃO for sobre esses temas, responda EXATAMENTE:
   "Por favor, utilize o chat para questionar assuntos relacionados à computação ou BNCC apenas. Estou aqui para ajudar com temas educacionais de computação!"

3. NUNCA responda perguntas sobre:
   - Outros assuntos não relacionados à educação computacional
   - Temas gerais não educacionais
   - Assuntos pessoais
   - Outras disciplinas que não sejam computação

**Suas características quando a pergunta for válida:**
- Especialista em educação computacional
- Conhece profundamente os três eixos da BNCC Computação
- Fornece respostas práticas e educativas
- Usa linguagem clara e acessível
- Sempre contextualiza com exemplos práticos educacionais

**Contexto atual das habilidades BNCC:**`

    if (abilities.length > 0) {
      console.group('🎯 DEBUG: gemini API BNCC encontrado')
      console.log('📊 Total de habilidades:', abilities.length)
      
      abilities.forEach((ability, index) => {
        console.log(`\n--- Habilidade ${index + 1} ---`)
        console.log('🔢 Código:', ability.codigo)
        console.log('🎯 Eixo:', ability.eixo)
        console.log('📅 Ano:', ability.ano)
        console.log('🎯 Objetivo:', ability.objetivo_ou_habilidade)
        console.log('📝 Descrição:', ability.descr_objetivo_ou_habilidade)
        if (ability.explicacao) {
          console.log('💡 Explicação:', ability.explicacao)
        }
      })
      
      console.log('\n📋 Contexto formatado que será enviado:')
      console.groupEnd()
    } else {
      console.log('⚠️ DEBUG: Nenhuma habilidade BNCC encontrada como contexto')
    }

    const contextSection = abilities.length > 0 ? `
Habilidades relevantes encontradas:
${abilities.map(ability => `
**${ability.codigo}** - ${ability.objetivo_ou_habilidade}
- Ano: ${ability.ano}
- Eixo: ${ability.eixo}
- Descrição: ${ability.descr_objetivo_ou_habilidade}
- Explicação: ${ability.explicacao}
`).join('')}
` : 'Nenhuma habilidade específica encontrada no contexto.'

    return `${systemPrompt}
${contextSection}

**Pergunta do usuário:** ${userMessage}

**Instruções:** 
1. PRIMEIRO, verifique se a pergunta é sobre computação/BNCC
2. Se NÃO for, use a resposta padrão de redirecionamento
3. Se for válida, responda considerando o contexto das habilidades BNCC fornecidas
4. Cite as habilidades relevantes quando aplicável
5. Entenda que todo esse prompt comporta-se como um RAG e o usuário faz apenas a pergunta
6. Mantenha o foco educacional e prático`
  }

  const sendMessage = async ({ message, context = [] }: SendMessageOptions): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      
      if (!apiKey) {
        throw new Error('API key do Gemini não configurada')
      }

      const prompt = createBNCCPrompt(message, context)

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data: GeminiResponse = await response.json()
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('Nenhuma resposta recebida da API')
      }

      return data.candidates[0].content.parts[0].text
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendMessage,
    isLoading,
    error
  }
}