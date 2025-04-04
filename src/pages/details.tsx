import { Heading } from "@/components/heading";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { ItemDTO } from "@/dtos/item-dto";
import { useData } from "@/hooks/use-data";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { ChevronLeftCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export function Details() {
  const { code } = useParams<{ code: string }>()
  const { getItemByCode } = useData()

  const [data, setData] = useState<ItemDTO | null>(null)

  useEffect(() => {
    if(!code) return
    const item = getItemByCode(code)
    setData(item)
  }, [code, getItemByCode])
 
  return (
    <div className="px-8 space-y-8">
      <div>
        <Link to='/habilidades' className="flex gap-2 w-min flex-nowrap text-nowrap items-center hover:underline hover:underline-offset-2">
          <ChevronLeftCircle className="size-4" />
          Voltar para habilidades
        </Link>
      </div>

      <Heading title="Detalhes" />

      {data && (
        <div className="space-y-4">
          <div className="flex gap-2 w-full">
            <Card className="@container/card w-[300px]">
              <CardHeader className="relative flex-1">
                <CardDescription>Ano</CardDescription>
                <CardTitle className="@[250px]/card:text-6xl text-6xl font-semibold w-full">
                  {data.ano.split('').join(' ao ')}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {COLLEGE_YEARS[data.ano]}
                </div>
              </CardFooter>
            </Card>

            <Card className="@container/card w-full">
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <Table>
                  <TableRow>
                    <TableCell>
                      Código
                    </TableCell>
                    <TableCell>
                      {data.codigo}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Etapa
                    </TableCell>
                    <TableCell>
                      {data.etapa}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Eixo
                    </TableCell>
                    <TableCell>
                      {data.eixo}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Tipo
                    </TableCell>
                    <TableCell className="uppercase">
                      {data.objetivo_ou_habilidade}
                    </TableCell>
                  </TableRow>
                </Table>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Heading title="Descrição" />

            <p className="text-muted-foreground">
              {data.descr_objetivo_ou_habilidade}
            </p>
          </div>

          {data.explicacao && (
            <div>
              <Heading title="Definição" />

              <p className="text-muted-foreground">
                {data.explicacao}
              </p>
            </div>
          )}

          {data.habilidade_superior && (
            <div>
              <Heading title="Habilidade superior" />

              <p className="text-muted-foreground">
                {data.habilidade_superior}
              </p>
            </div>
          )}

          <div>
            <Heading title="Exemplos" />

            <p className="text-muted-foreground">
              {data.exemplos}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
