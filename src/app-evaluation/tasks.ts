export type TaskId = 'task1' | 'task2' | 'task3' | 'task4' | 'task5'

export type Task = {
  id: TaskId
  instruction: string | string[]
  questions: string[]
  textQuestions?: string[]
  toastTitle: string
  toastDescription: string
}

export function buildDefaultTasks(): Task[] {
  return [
    {
      id: 'task1',
      instruction: [
        "Busque por uma habilidade da BNCC Computação (via 'Explorar por ano', 'Explorar por eixo' ou pesquisa direta).",
        "Clique em 'ver detalhes' para acessar os conteúdos da habilidade.",
        "Expanda todos os itens para ver os detalhes da habilidade.",
        "Clique em um exemplo para ver mais detalhes."
      ],
      questions: [
        'Foi fácil localizar e acessar os detalhes da habilidade e ver um exemplo vinculado a ela?',
        'A imagem ilustrativa contida nos detalhes da habilidade ajudou de forma positiva a compreensão?'
      ],
      textQuestions: [
        'Tem alguma sugestão de melhoria sobre como apresentamos habilidades e exemplos? (opcional)'
      ],
      toastTitle: 'Tarefa 1: Acessar habilidade e exemplo',
      toastDescription: 'Acesse uma habilidade, expanda todos os itens para ver os detalhes e clique em um exemplo vinculado a ela.',
    },
    {
      id: 'task2',
      instruction: [
        'OBS: Se você não tiver acesso ao recurso de voz tente permitir o uso do microfone ou se o mesmo não estiver disponível, tente mudar o navegador para o Chrome ou Safari.',
        'Acesse a página "Inicio".',
        'Utilize o comando "Voz" para buscar uma habilidade.',
        'Acesse uma habilidade assim como fez na tarefa anterior.',
        'Utilize o recurso de descrição por voz clicando no ícone de som em algum item descritivo da habilidade.'
      ],
      questions: [
        'Os recursos de busca e descrição por voz foram úteis para localizar a habilidade desejada?',
        'Você usaria esses recursos novamente?'
      ],
      textQuestions: [
        'Encontrou algum erro ou tem alguma sugestão de melhoria para esses dois recursos? (opcional)'
      ],
      toastTitle: 'Tarefa 2: Utilizar recursos de busca e descrição por voz',
      toastDescription: 'Faça uma busca por voz e utilize o recurso de descrição falada em algum conteúdo textual da habilidade.',
    },
    {
      id: 'task3',
      instruction: [
        '',
      ],
      questions: [
        '?'
      ],
      textQuestions: [
        '? (opcional)'
      ],
      toastTitle: 'Tarefa 3: ',
      toastDescription: '',
    },
    {
      id: 'task4',
      instruction: [
        '',
      ],
      questions: [
        '?'
      ],
      textQuestions: [
        '? (opcional)'
      ],
      toastTitle: 'Tarefa 4: ',
      toastDescription: '',
    },
    {
      id: 'task5',
      instruction: [
        '',
      ],
      questions: [
        '?'
      ],
      textQuestions: [
        '? (opcional)'
      ],
      toastTitle: 'Tarefa 5: ',
      toastDescription: '',
    },
  ]
}