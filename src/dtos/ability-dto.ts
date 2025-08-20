import type { ExampleDTO } from "./example-dto"

export interface AbilityDTO {
  ano: string
  etapa: string
  eixo: string
  obj_conhecimento_1: string
  obj_conhecimento_2: string
  habilidade_superior: string
  codigo: string
  objetivo_ou_habilidade: string
  descr_objetivo_ou_habilidade: string
  explicacao: string
  img_url?: string
  exemplos: ExampleDTO[]
}
