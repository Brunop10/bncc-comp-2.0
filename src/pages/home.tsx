import { CardButton } from "@/components/card-button";
import { CardButtonHorizontal } from "@/components/card-button-horizontal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkIcon, FileSpreadsheetIcon, InfoIcon, LayersIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  search: z.string()
})

type FormData = z.infer<typeof formSchema>

export function Home() {
  const form = useForm<FormData>()
  const navigate = useNavigate()

  function handleNavigate({ search }: FormData) {
    const path = search 
      ? `/habilidades?pesquisa=${search}`
      : '/habilidades'

    navigate(path) as void
  }

  return (
    <div className="space-y-6 w-full">
      <form
        onSubmit={form.handleSubmit(handleNavigate)}
        className="flex relative"
      >
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 size-4" />
        <Input
          placeholder="Buscar por palavra-chave"
          className="pl-10 bg-gray-100 border-gray-200 h-10"
          {...form.register('search')}
        />
        <Button
          size='sm'
          variant='default'
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          Buscar
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-4">
        <CardButton
          icon={<FileSpreadsheetIcon className="size-6 text-primary" />}
          title="Explore por ano"
          url="/guia/ano"
        />
        <CardButton
          icon={<LayersIcon className="size-6 text-primary" />}
          title="Explore por eixo"
          url="/guia/eixo"
        />
      </div>

      <CardButtonHorizontal
        icon={<BookmarkIcon className="size-6 text-primary" />}
        title="Minha página"
        description="Acesse rapidamente seus itens salvos"
        url="/minha-pagina"
      />

      <CardButtonHorizontal
        icon={<InfoIcon className="size-6 text-primary" />}
        title="Sobre"
        url="/sobre"
      />
    </div>
  )
}
