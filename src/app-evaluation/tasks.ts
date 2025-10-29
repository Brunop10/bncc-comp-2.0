export type TaskId = 'task1' | 'task2' | 'task3' | 'task4' | 'task5' | 'task6' | 'task7' | 'task8' | 'task9'

export type Task = {
  id: TaskId
  information?: string
  questions?: string[]
  textQuestions?: string[]
  toastTitle: string
  onlyEvaluation?: boolean
}

export function buildDefaultTasks(): Task[] {
  return [
    {
      id: 'task1',
      information: 'Após acessar a habilidade, certifique-se de expandir todos os itens na página para ver todos os detalhes.',
      questions: [
        'Foi fácil localizar e acessar os detalhes da habilidade.',
        'A imagem ilustrativa contida nos detalhes facilitou a compreensão da habilidade.'
      ],
      toastTitle: 'Acesse uma habilidade do eixo “Cultura Digital” e visualize todos seus detalhes'
    },
    {
      id: 'task2',
      information: 'Siga um fluxo semelhante ao da tarefa anterior mas agora visualize algum dos exemplos da habilidade sugerida',
      questions: [
        'O caminho até encontrar um exemplo é intuitivo e autoexplicativo.'
      ],
      toastTitle: 'Acesse um exemplo de uma habilidade da educação infantil'
    },
    {
      id: 'task3',
      information: 'Procure habilidades que contenham termos do seu interesse (por exemplo grafos, privacidade, etc...), utilize a busca por voz e repita essa tarefa variando os termos. Caso não consiga usar o recurso, tente permitir acesso ao microfone ou troque o navegador utilizado (Firefox não tem suporte).',
      questions: [
        'O recurso de busca por voz funcionou adequadamente.',
      ],
      toastTitle: 'Utilize a busca por voz para encontrar habilidades contendo termos do seu interesse'
    },
    {
      id: 'task4',
      information: 'Acesse qualquer habilidade e utilize o ícone de som para leitura automática de textos descritivos.',
      questions: [
        'Tanto o recurso de busca por voz como o de leitura agregam na acessibilidade do sistema.',
      ],
      toastTitle: 'Utilize o recurso leitura de texto nos detalhes de uma habilidade'
    },
    {
      id: 'task5',
      information: 'Acesse o chat de IA especializado nas habilidade da BNCC Computação, faça alguma pergunta e teste os recursos (salvar, limpar, etc...). Recomendamos também não fazer um número exagerado de perguntas pois existe um limite diário gratuito de uso.',
      questions: [
        'As respostas geradas pelo chat foram consistentes ao contexto.',
        'Tive dificuldade de usar a interface e os recursos do chat.'
      ],
      toastTitle: 'Utilize o chat de IA',
    },
    {
      id: 'task6',
      information: 'Acesse qualquer habilidade que você considere importante, salve-a e visualize-a na sua página.',
      questions: [
        'O recurso de salvamento de habilidades é fácil e útil para mim.'
      ],
      toastTitle: 'Salve uma habilidade'
    },
    {
      id: 'task7',
      information: 'Acesse a página de contribuição e compartilhe um exemplo possível para uma habilidade da BNCC Computação. Se você quiser enviar algo genérico apenas para testar o formulário, pode fazer isso também, todos os exemplos passam por uma curadoria antes de serem disponibilizados no aplicativo.',
      questions: [
        'O formulário de contribuição com a comunidade é fácil e atendeu minhas expectativas.'
      ],
      toastTitle: 'Contribua com um exemplo para uma habilidade'
    },
    {
      id: 'task8',
      textQuestions: [
        'Você teve alguma dificuldade específica ou encontrou algum problema claro de funcionamento na aplicação?',
        'Você tem alguma sugestão de melhoria para algum item do sistema?',
        'A experiência de avaliação guiada por tarefas foi um desafio ou algo agregador? (comente)'
      ],
      toastTitle: 'Responda as perguntas opcionais descritivas sobre a sua experiência com o aplicativo',
      onlyEvaluation: true
    },
    {
      id: 'task9',
      questions: [
        'As capacidades do aplicativo atendem às minhas necessidades.',
        'Usar esse aplicativo é uma experiência frustrante.',
        'O aplicativo foi fácil de usar.',
        'Tenho que gastar muito tempo corrigindo problemas neste aplicativo.',
      ],
      toastTitle: 'Responda a avaliação geral final do aplicativo',
      onlyEvaluation: true
    }
  ]
}