import type { AbilityDTO } from "@/dtos/ability-dto";
import { api } from "@/lib/axios";

interface GetAbilitiesParams {
  code?: string
  axe?: string
  year?: string
  codes?: string[]
  keywords?: string
}

interface GetAbilitiesResponse {
  abilities: AbilityDTO[]
}

export async function getAbilities({
  code,
  axe,
  year,
  codes,
  keywords
}: GetAbilitiesParams) {
  console.log('🌐 API Call - getAbilities params:', { code, axe, year, codes, keywords })
  
  const response = await api.get<GetAbilitiesResponse>("", {
    params: {
      resource: "fetchAbilities",
      codigo: code,
      eixo: axe?.toUpperCase(),
      ano: year,
      codes: codes?.join(","),
      description: keywords
    }
  })

  console.log('📡 API Response:', {
    status: response.status,
    abilitiesCount: response.data?.abilities?.length || 0,
    abilities: response.data?.abilities?.map(a => a.codigo) || []
  })

  return response.data
}
