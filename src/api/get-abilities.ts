import type { AbilityDTO } from "@/dtos/ability-dto";
import { api } from "@/lib/axios";

interface GetAbilitiesParams {
  code?: string
}

interface GetAbilitiesResponse {
  abilities: AbilityDTO[]
}

export async function getAbilities({ code }: GetAbilitiesParams) {
  const response = await api.get<GetAbilitiesResponse>("", {
    params: {
      resource: "fetchAbilities",
      codigo: code
    }
  })

  return response.data
}
