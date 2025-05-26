import { getExample } from "@/api/get-example"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeftCircle, ExternalLink, MonitorIcon, TagIcon } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import dayjs from 'dayjs'
import { ExampleSkeleton } from "@/components/example-skeleton"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Example() {
  const navigate = useNavigate()
  const { id: code } = useParams<{ id: string }>()

   const { data, isLoading, error } = useQuery({
    queryKey: ['example', code],
    queryFn: () => getExample({ code }),
  })

  function handleGoBack() {
    void navigate(-1)
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

      {isLoading && <ExampleSkeleton />}

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
                  to={example.link ?? '#'}
                  referrerPolicy="no-referrer"
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
