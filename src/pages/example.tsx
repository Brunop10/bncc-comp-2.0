import { getExample } from "@/api/get-example"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeftCircle, ExternalLink, MonitorIcon, TagIcon } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import dayjs from 'dayjs'
import { ExampleLoading } from "@/components/ui/example-loading"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { OfflinePlaceholder } from "@/components/ui/offline-placeholder"
import { useNetworkStatus } from "@/context/network-context"

export function Example() {
  const navigate = useNavigate()
  const { id: code } = useParams<{ id: string }>()
  const { isOnline } = useNetworkStatus()

  const { data, isLoading, error } = useQuery({
    queryKey: ['example', code],
    queryFn: () => getExample({ code }),
  })

  function handleGoBack() {
    if (window.history.length > 2) {
      void navigate(-1)
    } else {
      void navigate(`/detalhes/${data?.example.bncc_codigo_principal}`)
    }
  }

  useEffect(() => {
    if (error) {
      void navigate(-1)
    }
  }, [error, navigate])

  const example = data?.example ?? null


  return (
    <div className="flex flex-col gap-2">
      <Button
        variant='link'
        className="w-fit"
        onClick={handleGoBack}
      >
        <ChevronLeftCircle />
        Voltar para habilidade
      </Button>

      {!isOnline && !isLoading && !example && (
        <OfflinePlaceholder
          title="Sem rede"
          description="Conecte-se para carregar o exemplo"
          size="xl"
        />
      )}

      {isLoading && isOnline && (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <ExampleLoading size="xl" />
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-primary">
              Carregando o exemplo...
            </p>
            <p className="text-base text-muted-foreground">
              Aguarde enquanto buscamos as informações
            </p>
          </div>
        </div>
      )}

      {!isLoading && example && (
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>{example.titulo || 'Sem titulo'}</CardTitle>
            <div className="flex gap-2">
              <Badge variant='secondary' className="capitalize gap-2">
                <MonitorIcon />
                {example.classificacao}
              </Badge>

              <Badge variant='outline'>{example.bncc_codigo_principal}</Badge>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: example.descricao ?? ''}}
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <TagIcon className="size-4" />
                <h2 className="font-semibold">Tags</h2>
              </div>

              <div className="flex gap-2">
                {!!example.tags.length && example.tags.split(',').map(tag => (
                  <Badge key={tag} variant='outline'>{tag.trim()}</Badge>
                ))}

                {!example.tags.length && (
                  <span className="text-xs text-muted-foreground">
                    Nenhuma tag vinculada
                  </span>
                )}
              </div>
            </div>

            <Separator orientation="horizontal" />

            {example.link && (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Link de Referência</h2>
                <Link
                  to={example.link.startsWith('https') 
                    ? example.link 
                    : `https://${example.link}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex gap-2 items-center text-blue-600 hover:underline hover:underline-offset-2"
                >
                  <ExternalLink className="size-4" />
                  Acessar recurso externo
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Fonte</h2>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground">{example.fonte}</span>
                {example.data_envio && (
                  <span className="text-muted-foreground text-sm flex gap-1 items-center">
                    <strong className="font-medium">Enviado em:</strong>
                    {dayjs(example.data_envio).format('DD/MM/YYYY HH:mm')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
