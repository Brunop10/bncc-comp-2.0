import { getAbilities } from "@/api/get-abilities";
import { DetailsCollapsibleItem } from "@/components/details-collapsible-item";
import { ImageWithLoading } from "@/components/image-with-loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { OfflinePlaceholder } from "@/components/ui/offline-placeholder";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { useNetworkStatus } from "@/context/network-context";
import { useStorage } from "@/hooks/use-storage";
import { useQuery } from "@tanstack/react-query";
import { BookmarkIcon, ChevronLeftCircle, ExternalLinkIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export function Details() {
  const navigate = useNavigate()
  const { code } = useParams<{ code: string }>()
  const { findByCode, addFavorite, removeFavorite } = useStorage()
  const { isOnline } = useNetworkStatus()

  const [isFavorited, setIsFavorited] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['abilities', code],
    queryFn: () => getAbilities({ code })
  })

  const ability = data?.abilities[0] ?? null
  
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
    if (window.history.length > 2) {
      void navigate(-1)
    } else {
      void navigate('/habilidades')
    }
  }

  useEffect(() => {
    if (code) {
      const isFav = findByCode(code)
      setIsFavorited(isFav)
    }
  }, [code, findByCode])
 
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

      {!isOnline && !isLoading && !ability && (
        <OfflinePlaceholder
          title="Sem rede"
          description="Conecte-se para carregar os detalhes da habilidade"
          size="xl"
        />
      )}

      {isLoading && isOnline && (
        <div className="flex justify-center w-full">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}

      {ability && (
        <div className="space-y-4">
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <Card className="@container/card w-full gap-2">
              <CardHeader className="flex flex-wrap gap-1 justify-between">
                <Badge>{String(ability.ano).split('').map(item => `${item}º`).join(' ao ')} ano</Badge>
                <Button size='sm' variant='outline' onClick={handleToggleFavorite} className="w-28">
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
                      {ability.codigo}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Etapa
                    </TableCell>
                    <TableCell>
                      {ability.etapa}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      Eixo
                    </TableCell>
                    <TableCell>
                      {ability.eixo}
                    </TableCell>
                  </TableRow>
                </Table>
              </CardFooter>
            </Card>
          </div>

          <DetailsCollapsibleItem 
            label={ability.objetivo_ou_habilidade}
            textContent={ability.descr_objetivo_ou_habilidade}
          >
            <div>
              {ability.descr_objetivo_ou_habilidade}
              {ability.img_url_1 && (
                <ImageWithLoading
                  src={ability.img_url_1}
                  alt={`Ilustração para ${ability.objetivo_ou_habilidade}`}
                  className="max-w-full h-auto rounded-lg shadow-md max-h-96 object-contain"
                />
              )}
            </div>
          </DetailsCollapsibleItem>

          {ability.explicacao && (
            <DetailsCollapsibleItem label="Definição"> 
              {ability.explicacao}
            </DetailsCollapsibleItem>
          )}

          {ability.habilidade_superior && (
            <DetailsCollapsibleItem 
            label="Habilidade superior"
            textContent={ability.habilidade_superior}
            >
              <div>
                {ability.habilidade_superior}
              </div>
            </DetailsCollapsibleItem>
          )}
          
          {ability.exemplos.length > 0 && (
            <DetailsCollapsibleItem label="Exemplos">
              <div className="flex flex-col gap-2">
                {ability.exemplos.map((exemplo, idx) => (
                  <Link
                    to={`/detalhes/${code}/exemplos/${exemplo.codigo_exemplo}`}
                  >
                    <Button variant='outline' className="w-full justify-start">
                      <ExternalLinkIcon />
                      <span className="truncate">
                        {exemplo.titulo || `Exemplo ${idx + 1}`}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </DetailsCollapsibleItem>
          )}
        </div>
      )}
    </div>
  )
}
