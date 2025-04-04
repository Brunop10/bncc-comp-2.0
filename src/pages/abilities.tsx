import { Pagination } from "@/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { EllipsisVerticalIcon, EraserIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Combobox } from "@/components/combo-box";

import { useData } from "@/hooks/use-data";
import { useNavigate } from "react-router";

export function Abilities() {
  const navigate = useNavigate()
  const { data, getListOfSteps, filterData, resetData } = useData()

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

  async function handleGoToDetails(code: string) {
    await navigate(`/detalhes/${code}`)
  }

  return (
    <div className="px-8 space-y-8">
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
          />

          <Combobox
            items={steps}
            value={stepSelected}
            onChange={setStepSelected}
            placeholder="Filtra por etapa"
            className="w-full sm:w-[140px] md:w-[200px]"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2">
          <Button variant='outline' onClick={handleFilter} className="w-full sm:w-fit">
            <SearchIcon />
            <span className="md:sr-only lg:not-sr-only">Filtrar</span>
          </Button>

          <Button variant='outline' onClick={handleResetFilters} className="w-full sm:w-fit">
            <EraserIcon />
            <span className="md:sr-only lg:not-sr-only">Limpar filtros</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Table className="px-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead className="w-[280px]">Etapa</TableHead>
              <TableHead className="w-[200px]" >Objetivo/Habilidade</TableHead>
              <TableHead className="text-right">Detalhes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.codigo}>
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell>{item.etapa}</TableCell>
                <TableCell>{item.objetivo_ou_habilidade}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size='icon'
                    variant='outline'
                    className="cursor-pointer"
                    onClick={() => { void handleGoToDetails(item.codigo); }}
                  >
                    <EllipsisVerticalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          onPageChange={() => {}}
          pageIndex={0}
          perPage={20}
          totalCount={1000}
        />
      </div>
    </div>
  )
}
