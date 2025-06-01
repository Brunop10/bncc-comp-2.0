import { api } from "@/lib/axios";

interface GetExampleParams {
  title: string
  bnccCode: string
  description: string
  classification: string
  link: string
  tags: string
  source: string
  collaboratorName: string
  collaboratorEmail: string
  collaboratorPhone: string
}

export async function getExample({
  title,
  bnccCode,
  description,
  classification,
  link,
  tags,
  source,
  collaboratorName,
  collaboratorEmail,
  collaboratorPhone
}: GetExampleParams) {
  await api.post("", {
    resource: "addExample",
    payload: {
      titulo: title,
      bncc_codigo_principal: bnccCode,
      descricao: description,
      classificacao: classification,
      link: link,
      tags: tags,
      fonte: source,
      nome_colaborador: collaboratorName,
      email_colaborador: collaboratorEmail,
      telefone_colaborador: collaboratorPhone
    }
  })
}
