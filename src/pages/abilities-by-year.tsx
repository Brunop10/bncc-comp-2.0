
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { useEffect, useState } from "react";

import { useData } from "@/hooks/use-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { AbilityCard } from "@/components/ability-card";

export function AbilitiesByYear() {
  const { data, filterData } = useData()

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [yearFilter, setYearFilter] = useState<string>('')

  const collegeYears = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '69'];

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
                  setYearFilter(option)
                  setCurrentStep(prev => prev + 1)
                }}
              >
                {COLLEGE_YEARS[option]}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  function handleReset() {
    setCurrentStep(1)
    setYearFilter('')
  }

  useEffect(() => {
    function handleFilter() {
      filterData({
        ano: yearFilter 
      })
    }

    handleFilter()
  }, [yearFilter])

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Explorar por ano" />
        <Description value="Explore os objetivos e habilidades relacionados à um ano específico." />
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione a etapa educacional</CardTitle>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(collegeYears, yearFilter, 2)}
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <h3 className="font-medium">Filtro por: {COLLEGE_YEARS[yearFilter]}</h3>
            <Button onClick={handleReset} variant='outline'>Alterar filtro</Button>
          </div>

          {data.map(item => <AbilityCard key={item.codigo} item={item} />)}

          {!data.length && (
            <span className="text-muted-foreground">
              Nenhum item encontrado.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
