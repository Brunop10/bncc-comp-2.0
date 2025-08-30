import { CardButton } from "@/components/card-button";
import { CardButtonHorizontal } from "@/components/card-button-horizontal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookAIcon, BookmarkIcon, FileSpreadsheetIcon, HelpingHandIcon, InfoIcon, LayersIcon, SearchIcon, MicIcon, MicOffIcon, XIcon, MessageCircle } from "lucide-react";
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
    if (!search) {
      navigate('/habilidades')
      return
    }

    const codePattern = /^[A-Za-z]+\d+/
    const isCode = codePattern.test(search.trim())

    const path = isCode 
      ? `/habilidades?codigo=${encodeURIComponent(search.trim())}`
      : `/habilidades?pesquisa=${encodeURIComponent(search)}`

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

  function handleResetSearch() {
    form.reset()
    resetTranscript()
  }

  useEffect(() => {
    if (transcript) {
      form.setValue('search', transcript)
    }
  }, [transcript, form])

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <form
          onSubmit={form.handleSubmit(handleNavigate)}
          className="flex relative"
        >
          <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 size-4" />
          <Input
            placeholder={isListening ? "Fale agora..." : "Buscar por palavra ou código"}
            className={`pl-10 pr-16 bg-gray-100 border-gray-200 h-10 placeholder:text-sm sm:placeholder:text-base placeholder:truncate ${isListening ? 'border-red-300 bg-red-50' : ''}`}
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
        
        <div className="flex gap-2 justify-end">
          {form.watch('search') && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="cursor-pointer px-2"
              onClick={handleResetSearch}
              title="Limpar pesquisa"
            >
              <XIcon className="size-3.5 mr-1" />
              Limpar
            </Button>
          )}
          {isSupported && (
            <Button
              type="button"
              size="sm"
              variant={isListening ? "destructive" : "outline"}
              className="cursor-pointer px-2"
              onClick={handleVoiceSearch}
              title={isListening ? "Parar gravação" : "Buscar por voz"}
            >
              {isListening ? <MicOffIcon className="size-4 mr-1" /> : <MicIcon className="size-4 mr-1" />}
              {isListening ? "Parar" : "Voz"}
            </Button>
          )}
        </div>
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
        icon={<MessageCircle className="size-6 text-primary" />}
        title="Chat IA"
        description="Converse com nossa IA especializada em BNCC e computação"
        url="/chat"
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
