import { api } from "@/lib/axios";

interface GetAbilitiesCodesResponse {
  codes: string[]
}

export async function getAbilitiesCodes() {
  const response = await api.get<GetAbilitiesCodesResponse>("", {
    params: {
      resource: "fetchAbilitiesCodes",
    }
  })

  return response.data
}
