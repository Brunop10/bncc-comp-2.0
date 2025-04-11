import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { useState } from "react";

import { useData } from "@/hooks/use-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemTableRow } from "@/components/item-table-row";

export function AbilitiesByAxes() {
  const { data, getListOfAxes, filterData, } = useData()

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
                  setCurrentStep(prev => prev + 1)
                  handleFilter()
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

  function handleFilter() {
    filterData({
      eixo: axesFilter,
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

          <Table className="px-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead className="w-[280px]">Etapa</TableHead>
                <TableHead className="w-full" >Objetivo/Habilidade</TableHead>
                <TableHead className="w-10">Detalhes</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => <ItemTableRow item={item} />)}

              {!data.length && (
                <TableRow>
                  <TableCell colSpan={4}>Nenhum item encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
