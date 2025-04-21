
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { useState } from "react";

import { useData } from "@/hooks/use-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AbilityCard } from "@/components/ability-card";
import { AbilityCardSkeleton } from "@/components/ability-card-skeleton";

export function AbilitiesByAxes() {
  const { bnccItems, isLoading, getListOfAxes, filterData, } = useData()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [axesFilter, setAxesFilter] = useState<string>('')


  function renderOptionButtons(
    options: string[],
    selectedValue: string,
    maxPerRow = 3
  ) {
    const rows = [];
    for (let i = 0; i < options.length; i += maxPerRow) {
      rows.push(options.slice(i, i + maxPerRow));
    }

    return (
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-2">
            {row.map(option => (
              <Button
                key={option}
                variant={selectedValue === option ? "default" : "outline"}
                className="flex-1 uppercase cursor-pointer"
                onClick={() => {
                  setAxesFilter(option)
                  handleFilter(option)
                  setCurrentStep(prev => prev + 1)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const axes = getListOfAxes()

  function handleFilter(filter?: string) {
    filterData({
      eixo: filter ?? axesFilter,
    })
  }

  function handleReset() {
    setCurrentStep(1)
    setAxesFilter('')
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Explorar por eixo" />
        <Description value="Liste os objetivos e habilidades do por eixo." />
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione o eixo</CardTitle>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(axes, axesFilter, 2)}
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <h3 className="font-medium">Filtro por: {axesFilter}</h3>
            <Button onClick={handleReset} variant='outline'>Alterar filtro</Button>
          </div>

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
      )}
    </div>
  )
}
