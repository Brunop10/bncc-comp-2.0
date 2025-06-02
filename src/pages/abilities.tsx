import { EraserIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/combo-box";

import { AbilityCard } from "@/components/ability-card";
import { AbilityCardSkeleton } from "@/components/ability-card-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAbilities } from "@/api/get-abilities";
import { useSearchParams } from "react-router";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  search: z.string(),
  year: z.string(),
  axe: z.string()
})

type FormData = z.infer<typeof formSchema>

export function Abilities() {

  const { control, register, handleSubmit, reset } = useForm<FormData>({
    values: {
      search: '',
      axe: 'all',
      year: 'all'
    }
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const searchFilter = searchParams.get('pesquisa') ?? undefined
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

  const { data, isLoading } = useQuery({
    queryKey: ['abilities', searchFilter, axesFilter, yearFilter],
    queryFn: () => getAbilities({ 
      keywords: searchFilter,
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
      state.delete('ano')
      state.delete('eixo')
      return state
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Objetivos e Habilidades" />
        <Description value="Utilize a tabela abaixo para buscar informações relacionadas à BNCC na área de Computação. Filtre os dados por código ou etapa para encontrar os objetivos e habilidades desejados." />
      </div>

      <form 
        onSubmit={handleSubmit(handleFilter)}
        className="flex gap-2 flex-col"
      >
        <Input
          placeholder="Filtrar por palavra-chave"
          className="w-full bg-white"
          {...register('search')}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
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
        {abilities.map(ability => (
          <AbilityCard key={ability.codigo} ability={ability} />
        ))}

        {isLoading && Array.from({ length: 3 }).map((_, idx) => (
          <AbilityCardSkeleton key={idx} />
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
