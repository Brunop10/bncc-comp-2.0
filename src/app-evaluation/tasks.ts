export type TaskId = 'task1' | 'task2' | 'task3' | 'task4' | 'task5'

export type Task = {
  id: TaskId
  instruction: string | string[]
  information: string
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
        "Clique em um exemplo para ver."
      ],
      information: 'A imagem ilustrativa contida nos detalhes de uma habilidade foi gerada por IA e passou por uma curadoria prévia.',
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
        'Utilize o comando "Voz" para buscar uma habilidade.',
        'Acesse uma habilidade assim como fez na tarefa anterior.',
        'Utilize o recurso de descrição por voz clicando no ícone de som em algum item descritivo da habilidade.'
      ],
      information: 'Se você não tiver acesso ao recurso de voz tente permitir o uso do microfone ou se o mesmo não estiver disponível, tente mudar o navegador para o Chrome ou Safari.',
      questions: [
        'Os recursos de busca e descrição por voz funcionaram corretamente?',
        'Você usaria esses recursos novamente?'
      ],
      textQuestions: [
        'Encontrou algum erro ou tem alguma sugestão de melhoria para esses dois recursos? (opcional)'
      ],
      toastTitle: 'Tarefa 2: Usar recursos de voz',
      toastDescription: 'Faça uma busca por voz e utilize o recurso de descrição falada em algum conteúdo textual da habilidade.',
    },
    {
      id: 'task3',
      instruction: [
        'Acesse a página "Chat IA".',
        'Teste o chat de IA integrado na página, tire dúvidas sobre a BNCC Computação, habilidades, conceitos de computação relacionados e verifique a resposta.',
        'Salve uma conversa, usando o botão salvar na parte inferior da página',
        'Teste os demais recursos da página que achar útil.'
      ],
      questions: [
        'As respostas geradas pelo chat foram úteis para resolver suas dúvidas?',
        'Você usaria o nosso chat de IA novamente?'
      ],
      information: 'O nosso chat é previamente contextualizado a cada resposta com conteúdos de habilidades da BNCC Computação, por isso pode demorar um pouco para responder. Por se tratar de uma IA pode ter comportamento não determinístico. Recomendamos também não fazer um número exagerado de perguntas pois existe um limite diário gratuito de uso',
      textQuestions: [
        'Você teve alguma dificuldade para usar o chat ou tem alguma sugestão de melhoria? (opcional)'
      ],
      toastTitle: 'Tarefa 3: Testar chat de IA',
      toastDescription: 'Faça testes de uso na página do recurso integrado de chat de IA.',
    },
    {
      id: 'task4',
      instruction: [
        'Entre nos detalhes de uma habilidade e clique em "Salvar"',
        'Acesse "Minha Página" e verifique se a habilidade foi salva como favorita.',
        'Clique em "Contribuir com a comunidade", veja os campos que devem ser preenchidos',
        'Preencha os campos e envie um exemplo opcionalmente.',
      ],
      information: 'Os exemplos enviados em "Contribuir com a comunidade" são avaliados previamente antes de serem disponibilizados na página da habilidade, por isso nesse caso de avaliação pode se enviar um teste que não irá afetar na aplicação final.',
      questions: [
        'Você usaria o recurso de salvar habilidade como favorita novamente?',
        'O recurso de contribuir com a comunidade foi útil para você?',
      ],
      textQuestions: [
        'Tem alguma sugestão de melhoria em algum destes dois recursos? (opcional)'
      ],
      toastTitle: 'Tarefa 4: Teste outros recursos da aplicação',
      toastDescription: 'Salve uma habilidade como favorita, visite "Minha Página", acesse também "Contribuir com a comunidade" e envie um exemplo opcionalmente',
    },
    {
      id: 'task5',
      instruction: [
        'Instale a aplicação em seu dispositivo e permita notificações para receber aviso sobre futuras atualizações.',
        'Desligue seu wi-fi e dados móveis para testar as funcionalidades de PWA offline.',
        'Navegue por habilidades que você tenha acessado previamente e veja que estão carregadas mesmo offline.',
        'Teste os recursos de salvar habilidade como favorita e contribuir com a comunidade offline.',
        'Se você salvou alguma conversa com o chat de IA você pode vê-la mesmo offline.'
      ],
      information: 'Para usar as funcionalidades de PWA, instale a aplicação em seu dispositivo e teste-as offline.',
      questions: [
        'Foi fácil instalar e usar a aplicação?',
        'Você considera os recursos de PWA e funcionamento offline úteis?'
      ],
      textQuestions: [
        'Enfrentou alguma dificuldade de entendimento ou uso dos recursos de PWA? (opcional)'
      ],
      toastTitle: 'Tarefa 5: Teste de funcionalidades de PWA',
      toastDescription: 'Use todos os recursos instalando a aplicação em seu dispositivo e testando-os offline.',
    },
  ]
}