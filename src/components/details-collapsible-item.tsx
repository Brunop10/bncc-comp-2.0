import { ChevronRight, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Heading } from "./heading";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import type { PropsWithChildren } from "react";

interface DetailsCollapsibleItemProps extends PropsWithChildren {
  label: string
  textContent?: string
}

export function DetailsCollapsibleItem({
  label,
  children,
  textContent
}: DetailsCollapsibleItemProps) {
  const { speak, stop, pause, resume, isSpeaking, isPaused, isSupported } = useTextToSpeech()

  const getTextForTTS = (): string | null => {
    if (textContent) return textContent
    if (typeof children === 'string') return children
    return null
  }

  function handleTTSToggle() {
    const text = getTextForTTS()
    if (!text) return

    if (isSpeaking && !isPaused) {
      pause()
    } else if (isSpeaking && isPaused) {
      resume()
    } else {
      speak(text)
    }
  }

  function handleTTSStop() {
    stop()
  }

  return (
    <Collapsible className="group flex flex-col gap-2 w-full">
      <CollapsibleTrigger className="flex justify-between gap-2 items-center bg-primary-foreground border w-full rounded-lg px-4 py-2">
        <Heading title={label} className="font-semibold text-lg" />
        <div className="flex items-center gap-2">
          {isSupported && getTextForTTS() && (
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="p-1 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  handleTTSToggle()
                }}
                title={isSpeaking && !isPaused ? "Pausar leitura" : isPaused ? "Continuar leitura" : "Ler texto"}
              >
                {isSpeaking && !isPaused ? (
                  <Pause className="size-4" />
                ) : isPaused ? (
                  <Play className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </Button>
              {isSpeaking && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="p-1 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTTSStop()
                  }}
                  title="Parar leitura"
                >
                  <VolumeX className="size-4" />
                </Button>
              )}
            </div>
          )}
          <ChevronRight className="transition-transform group-data-[state=open]:rotate-90 size-4" />
        </div>
      </CollapsibleTrigger>

      {children && (
         <CollapsibleContent className="text-foreground px-4">
          {children}
        </CollapsibleContent>
      )}

      {!children && (
        <CollapsibleContent className="text-muted-foreground px-4">
          Nenhum conteúdo disponível.
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}