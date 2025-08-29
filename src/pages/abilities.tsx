import { EraserIcon, SearchIcon, MicIcon, MicOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/combo-box";
import { LoadingBook } from "@/components/ui/loading";

import { AbilityCard } from "@/components/ability-card";
import { useQuery } from "@tanstack/react-query";
import { getAbilities } from "@/api/get-abilities";
import { getAbilitiesCodes } from "@/api/get-abilities-codes";
import { useSearchParams } from "react-router";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useSpeechToText } from "@/hooks/use-speech-to-text";

const formSchema = z.object({
  search: z.string(),
  code: z.string(),
  year: z.string(),
  axe: z.string()
})

type FormData = z.infer<typeof formSchema>

export function Abilities() {

  const { control, register, handleSubmit, setValue, reset } = useForm<FormData>({
    values: {
      search: '',
      code: 'all',
      axe: 'all',
      year: 'all'
    }
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } = useSpeechToText()

  const searchFilter = searchParams.get('pesquisa') ?? undefined
  const codeFilter = searchParams.get('codigo') ?? undefined
  const axesFilter = searchParams.get('eixo') ?? undefined
  const yearFilter = searchParams.get('ano') ?? undefined

  const collegeYearsOptions = Object.entries(COLLEGE_YEARS)
    .map(([value, label]) => ({
      value,
      label,
    }
  ))

  const axesOptions = [
    'Pensamento Computacional',
    'Mundo Digital',
    'Cultura Digital'
  ].map(item => ({
    value: item,
    label: item,
  }))

  const { data: codesData } = useQuery({
    queryKey: ['abilities-codes'],
    queryFn: getAbilitiesCodes
  })

  const codesOptions = codesData?.codes?.map(code => ({
    value: code,
    label: code
  })) ?? []

  const { data, isLoading } = useQuery({
    queryKey: ['abilities', searchFilter, codeFilter, axesFilter, yearFilter],
    queryFn: () => getAbilities({ 
      keywords: searchFilter,
      code: codeFilter,
      axe: axesFilter,
      year: yearFilter
    })
  })

  const abilities = data?.abilities ?? []

  // const steps = getListOfSteps().map(item => ({ label: item, value: item }))

  function handleFilter(data: FormData) {
    setSearchParams(state => {
      if (data.search) {
        state.set('pesquisa', data.search)
      } else {
        state.delete('pesquisa')
      }

      if (data.code !== 'all') {
        state.set('codigo', data.code)
      } else {
        state.delete('codigo')
      }

      if (data.axe !== 'all') {
        state.set('eixo', data.axe)
      } else {
        state.delete('eixo')
      }

      if (data.year !== 'all') {
        state.set('ano', data.year)
      } else {
        state.delete('ano')
      }

      return state
    })
  }

  function handleResetFilters() {
    reset()
    setSearchParams(state => {
      state.delete('pesquisa')
      state.delete('codigo')
      state.delete('ano')
      state.delete('eixo')
      return state
    })
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
    if (searchFilter) {
      setValue('search', searchFilter)
    }
    if (codeFilter) {
      setValue('code', codeFilter)
    }
  }, [searchFilter, codeFilter])

  useEffect(() => {
    if (transcript) {
      setValue('search', transcript)
    }
  }, [transcript, setValue])

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Objetivos e Habilidades" />
        <Description value="Utilize a tabela abaixo para buscar informações relacionadas à BNCC na área de Computação. Filtre os dados por palavra-chave, código ou etapa para encontrar os objetivos e habilidades desejados." />
      </div>

      <form 
        onSubmit={handleSubmit(handleFilter)}
        className="flex gap-2 flex-col"
      >
        <div className="relative">
          <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 size-4" />
          <Input
            placeholder={isListening ? "Fale agora..." : "Filtrar por palavra-chave ou código"}
            className={`pl-10 pr-12 bg-white ${isListening ? 'border-red-300 bg-red-50' : ''}`}
            {...register('search')}
          />
          {isSupported && (
            <Button
              type="button"
              size="sm"
              variant={isListening ? "destructive" : "outline"}
              className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer px-2"
              onClick={handleVoiceSearch}
              title={isListening ? "Parar gravação" : "Buscar por voz"}
            >
              {isListening ? <MicOffIcon className="size-4" /> : <MicIcon className="size-4" />}
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Combobox
                  items={codesOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecionar código específico"
                  className="w-full sm:flex-1"
                />
              )}
            />
            
            <Controller
              control={control}
              name="year"
              render={({ field }) => (
                <Combobox
                  items={collegeYearsOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Filtra por ano"
                  className="w-full sm:flex-1"
                />
              )}
            />

            <Controller
              control={control}
              name="axe"
              render={({ field }) => (
                <Combobox
                  items={axesOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Filtra por etapa"
                  className="w-full sm:flex-1"
                />
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant='outline'
              className="flex-1 sm:w-fit"
            >
              <SearchIcon />
            </Button>

            <Button
              variant='outline'
              onClick={handleResetFilters}
              className="flex-1 sm:w-fit"
            >
              <EraserIcon />
            </Button>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <LoadingBook size="xl" />
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-primary">
                Carregando objetivos e habilidades...
              </p>
              <p className="text-base text-muted-foreground">
                Aguarde enquanto buscamos as informações
              </p>
            </div>
          </div>
        )}

        {!isLoading && abilities.map(ability => (
          <AbilityCard key={ability.codigo} ability={ability} />
        ))}

        {!isLoading && !abilities.length && (
          <div className="flex justify-center px-4 py-2 bg-muted border rounded-md">
            <span className="text-muted-foreground text-sm">
              Nenhuma habilidade disponível
            </span>
          </div> 
        )}
      </div>
    </div>
  )
}
