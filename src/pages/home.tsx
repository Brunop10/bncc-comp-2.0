import { CardButton } from "@/components/card-button";
import { CardButtonHorizontal } from "@/components/card-button-horizontal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookAIcon, BookmarkIcon, FileSpreadsheetIcon, HelpingHandIcon, InfoIcon, LayersIcon, SearchIcon, MicIcon, MicOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useSpeechToText } from "@/hooks/use-speech-to-text";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string()
})

type FormData = z.infer<typeof formSchema>

export function Home() {
  const form = useForm<FormData>()
  const navigate = useNavigate()
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } = useSpeechToText()

  function handleNavigate({ search }: FormData) {
    const path = search 
      ? `/habilidades?pesquisa=${search}`
      : '/habilidades'

    navigate(path) as void
  }

  function handleVoiceSearch() {
    if (isListening) {
      stopListening()
    } else {
      resetTranscript()
      startListening()
    }
  }

  useEffect(() => {
    if (transcript) {
      form.setValue('search', transcript)
    }
  }, [transcript, form])

  return (
    <div className="space-y-6 w-full">
      <form
        onSubmit={form.handleSubmit(handleNavigate)}
        className="flex relative"
      >
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 size-4" />
        <Input
          placeholder={isListening ? "Fale agora..." : "Buscar por palavra-chave"}
          className={`pl-10 pr-20 bg-gray-100 border-gray-200 h-10 ${isListening ? 'border-red-300 bg-red-50' : ''}`}
          {...form.register('search')}
        />
        {isSupported && (
          <Button
            type="button"
            size="sm"
            variant={isListening ? "destructive" : "outline"}
            className="absolute right-20 top-1/2 -translate-y-1/2 cursor-pointer px-2"
            onClick={handleVoiceSearch}
            title={isListening ? "Parar gravação" : "Buscar por voz"}
          >
            {isListening ? <MicOffIcon className="size-4" /> : <MicIcon className="size-4" />}
          </Button>
        )}
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
        icon={
          <div className="relative size-6">
            <BookAIcon className=" absolute size-4 text-primary -top-0.5 left-[60%] -translate-x-[50%] rotate-12" />
            <HelpingHandIcon className="absolute -bottom-2 size-6 text-primary left-[50%] -translate-x-[50%]" />
          </div>
        }
        title="Contribuir com a comunidade"
        description="Compartilhe seus materiais em formato de exemplos às habilidades e ajude outros professores."
        url="/contribuir"
      />

      <CardButtonHorizontal
        icon={<InfoIcon className="size-6 text-primary" />}
        title="Sobre"
        url="/sobre"
      />
    </div>
  )
}
