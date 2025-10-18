export type TaskId = 'openDetails' | 'expandAllCollapsibles' | 'openExample' | 'voiceSearch' | 'ttsReading'

export type Task = {
  id: TaskId
  instruction: string
  questions: string[]
  textQuestions?: string[]
  toastTitle: string
}

export function buildDefaultTasks(): Task[] {
  return [
    {
      id: 'openDetails',
      instruction:
        "Acesse uma habilidade na página de detalhes (via 'Explorar por ano' ou 'Explorar por eixo').",
      questions: [
        'Quão fácil foi localizar e acessar os detalhes?'
      ],
      toastTitle: 'Tarefa 1: Acessar detalhes de uma habilidade',
    },
    {
      id: 'expandAllCollapsibles',
      instruction:
        'Na página de detalhes de habilidade, expanda todos os itens para ver os conteúdos.',
      questions: [
        'Como você avalia as informações apresentadas sobre a habilidade?',
        'A imagem de exemplo ajudou de forma positiva a compreensão?'
      ],
      toastTitle: 'Tarefa 2: Expandir itens na página de detalhes de habilidade',
    },
    {
      id: 'openExample',
      instruction:
        'Acesse um exemplo da habilidade pela seção “Exemplos” na página de detalhes de habilidade.',
      questions: [
        'Quão fácil você achou acessar um exemplo da habilidade?'
      ],
      textQuestions: [
        'Tem alguma sugestão de melhoria sobre como apresentamos habilidades e exemplos? (opcional)'
      ],
      toastTitle: 'Tarefa 3: Acessar um exemplo da habilidade',
    },
    {
      id: 'voiceSearch',
      instruction:
        "Volte para a página “Início”, toque em 'Voz' e faça uma busca por habilidade usando fala.",
      questions: ["Como você avalia a disponibilidade do recurso de busca por voz?"],
      toastTitle: 'Tarefa 4: Buscar habilidade por voz',
    },
    {
      id: 'ttsReading',
      instruction:
        "Acesse novamente os detalhes de uma habilidade e toque no ícone de som em um item descritivo para ouvir o texto por IA. Depois, pause ou finalize a leitura.",
      questions: ["Como você avalia a disponibilidade do recurso de leitura por voz?"],
      toastTitle: 'Tarefa 5: Ler conteúdo com TTS (voz)'
    }
  ]
}