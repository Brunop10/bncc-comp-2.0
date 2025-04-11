import { CardButton } from "@/components/card-button";
import { CardButtonHorizontal } from "@/components/card-button-horizontal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkIcon, FileSpreadsheetIcon, InfoIcon, LayersIcon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate('/habilidades') as void
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex relative">
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 size-4" />
        <Input
          placeholder="Buscar por palavra-chave"
          className="pl-10 bg-gray-100 border-gray-200 h-10"
        />
        <Button
          size='sm'
          variant='default'
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleNavigate}
        >
          Buscar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CardButton
          icon={<FileSpreadsheetIcon className="size-6 text-primary" />}
          title="Explore por ano"
          url="/guia/ano"
        />
        <CardButton
          icon={<LayersIcon className="size-6 text-primary" />}
          title="Explore por eixo"
          url="/guia/eixow"
        />
      </div>

      <CardButtonHorizontal
        icon={<BookmarkIcon className="size-6 text-primary" />}
        title="Meus itens salvos"
        description="Acesse o conteúdo rapidamente"
      />

      <CardButtonHorizontal
        icon={<InfoIcon className="size-6 text-primary" />}
        title="Sobre"
      />
    </div>
  )
}
