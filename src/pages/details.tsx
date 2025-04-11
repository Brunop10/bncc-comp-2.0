import { DetailsCollapsibleItem } from "@/components/details-collapsible-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { ItemDTO } from "@/dtos/item-dto";
import { useData } from "@/hooks/use-data";
import { useStorage } from "@/hooks/use-storage";
import { BookmarkIcon, ChevronLeftCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function Details() {
  const navigate = useNavigate()
  const { code } = useParams<{ code: string }>()
  const { getItemByCode } = useData()
  const { findByCode, addFavorite, removeFavorite } = useStorage()

  const [data, setData] = useState<ItemDTO | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  
  function handleToggleFavorite() {
    if(!code) return

    if (!isFavorited) {
      addFavorite(code)
      setIsFavorited(true)
    } else {
      removeFavorite(code)
      setIsFavorited(false)
    }
  }

  function handleGoBack() {
    navigate(-1) as void
  }

  useEffect(() => {
    if(!code) return
    const item = getItemByCode(code)
    setData(item)

    const isFav = findByCode(code)
    setIsFavorited(isFav)
  }, [code])
 
  return (
    <div className="space-y-4">
      <div>
        <Button
          variant='link'
          className="flex gap-2 w-min flex-nowrap text-nowrap items-center hover:underline hover:underline-offset-2 cursor-pointer"
          onClick={handleGoBack}
        >
          <ChevronLeftCircle className="size-4" />
          Voltar para lista
        </Button>
      </div>

      {data && (
        <div className="space-y-4">
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <Card className="@container/card w-full gap-2">
              <CardHeader className="flex flex-wrap gap-1 justify-between">
                <Badge>{data.ano.split('').map(item => `${item}º`).join(' ao ')} ano</Badge>
                <Button size='sm' variant='outline' onClick={handleToggleFavorite} className="w-26">
                  {!isFavorited ? (
                    <>
                      <BookmarkIcon />
                      Salvar
                    </>
                  ) : (
                    <>
                      <BookmarkIcon className="fill-sidebar-accent-foreground" />
                      Salvo
                    </>
                  )}
                </Button>
              </CardHeader>
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

          <DetailsCollapsibleItem
            label="Descrição"
            description={data.descr_objetivo_ou_habilidade}
          />

          <DetailsCollapsibleItem
            label="Definição"
            description={data.explicacao}
          />
          
          <DetailsCollapsibleItem
            label="Habilidade superior"
            description={data.habilidade_superior}
          />

          <DetailsCollapsibleItem
            label="Exemplos"
            description={data.exemplos}
          />
        </div>
      )}
    </div>
  )
}
