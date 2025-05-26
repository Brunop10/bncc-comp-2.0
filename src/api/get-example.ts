import type { ExampleDTO } from "@/dtos/example-dto";
import { api } from "@/lib/axios";

interface GetExampleParams {
  code?: string
}

interface GetExampleResponse {
  example: ExampleDTO;
}

export async function getExample({ code }: GetExampleParams) {
  const response = await api.get<GetExampleResponse>("", {
    params: {
      resource: "getExample",
      codigo_exemplo: code
    }
  })

  return response.data
}
