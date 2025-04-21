import { EraserIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Combobox } from "@/components/combo-box";

import { useData } from "@/hooks/use-data";
import { AbilityCard } from "@/components/ability-card";
import { AbilityCardSkeleton } from "@/components/ability-card-skeleton";

export function Abilities() {
  const { bnccItems, isLoading, getListOfSteps, filterData, resetData } = useData()

  const [codSelected, setCodSelected] = useState("")
  const [stepSelected, setStepSelected] = useState("")

  const steps = getListOfSteps().map(item => ({ label: item, value: item }))

  function handleFilter() {
    filterData({
      codigo: codSelected,
      etapa: stepSelected
    })
  }

  function handleResetFilters() {
    resetData()
    setCodSelected("")
    setStepSelected("")
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Objetivos e Habilidades" />
        <Description value="Utilize a tabela abaixo para buscar informações relacionadas à BNCC na área de Computação. Filtre os dados por código ou etapa para encontrar os objetivos e habilidades desejados." />
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={codSelected}
            onChange={e => setCodSelected(e.target.value)}
            placeholder="Filtrar por código"
            className="w-full sm:w-[200px]"
            disabled
          />

          <Combobox
            items={steps}
            value={stepSelected}
            onChange={setStepSelected}
            placeholder="Filtra por etapa"
            className="w-full sm:w-[140px] md:w-[200px]"
            disabled
          />
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2">
          <Button variant='outline' onClick={handleFilter} className="w-full sm:w-fit" disabled>
            <SearchIcon />
            {/* <span className="md:sr-only lg:not-sr-only">Filtrar</span> */}
          </Button>

          <Button variant='outline' onClick={handleResetFilters} className="w-full sm:w-fit" disabled>
            <EraserIcon />
            {/* <span className="md:sr-only lg:not-sr-only">Limpar filtros</span> */}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {bnccItems.map(item => <AbilityCard key={item.codigo} item={item} />)}
        {isLoading && Array.from({ length: 3 }).map((_, idx) => (
          <AbilityCardSkeleton key={idx} />
        ))}
        {!isLoading && !bnccItems.length && (
          <div className="flex justify-center px-4 py-2 bg-muted border rounded-md">
            <span className="text-muted-foreground text-sm">Nenhuma habilidade disponível</span>
          </div> 
        )}
      </div>
    </div>
  )
}
