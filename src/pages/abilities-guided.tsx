import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ChevronRight, Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { useState } from "react";

import { useData } from "@/hooks/use-data";
import { useNavigate } from "react-router";
import { useStorage } from "@/hooks/use-storage";
import { ItemDTO } from "@/dtos/item-dto";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  etapa: string;
  eixo: string;
  ano: string;
  tipo: string;
  texto: string;
}

export function AbilitiesGuided() {
  const navigate = useNavigate()
  const { data, getListOfSteps, getListOfAxes, getListOfTypes, filterData, resetData } = useData()
  const { getFavorites, addFavorite, removeFavorite } = useStorage()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    etapa: 'Todas',
    eixo: 'Todos',
    ano: 'Todos',
    tipo: 'Todos',
    texto: '',
  });

  function handleFilterChange(key: keyof FilterState, value: string) {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  function renderOptionButtons(
    options: string[],
    selectedValue: string,
    filterKey: keyof FilterState,
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
                className="flex-1 uppercase"
                onClick={() => handleFilterChange(filterKey, option)}
              >
                {option}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const steps = getListOfSteps()
  const axes = getListOfAxes()
  const types = getListOfTypes()

  function handleFilter() {
    filterData({
      etapa: filters.etapa !== 'Todas' ? filters.etapa : undefined,
      eixo: filters.eixo !== 'Todos' ? filters.eixo : undefined,
      tipo: filters.tipo !== 'Todos' ? filters.tipo : undefined
    })
  }

  async function handleGoToDetails(code: string) {
    await navigate(`/detalhes/${code}`)
  }

  function handleToggleFavorite(item: ItemDTO) {
    const favorites = getFavorites()
    const isFavorite = favorites.some(favorite => favorite === item.codigo)

    if (isFavorite) {
      removeFavorite(item.codigo);
    } else {
      addFavorite(item.codigo);
    }
  }

  function handleNextStep() {
    setCurrentStep(prev => {
      if (prev === 3) {
        handleFilter()
      }

      return prev + 1
    })
  }

  function handleResetFilters() {
    resetData()
    setFilters({
      etapa: 'Todas',
      eixo: 'Todos',
      ano: 'Todos',
      tipo: 'Todos',
      texto: '',
    })
    setCurrentStep(1)
  }

  return (
    <div className="px-8 space-y-8">
      <div className="space-y-1">
        <Heading title="Objetivos e Habilidades" />
        <Description value="Explore os objetivos e habilidades relacionados à BNCC na área de Computação. Utilize os filtros disponíveis para refinar sua busca por etapa educacional, eixo temático ou tipo, e encontre as informações desejadas de forma rápida e eficiente." />
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione a etapa educacional</CardTitle>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(steps, filters.etapa, 'etapa', 2)}
          </CardContent>

          <CardFooter className="justify-end">
            <Button onClick={handleNextStep}>Próximo</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione o eixo</CardTitle>
            <div>
              <strong>Filtros selecionados</strong>
              <div className="flex flex-wrap gap-1">
                {filters.etapa !== 'Todas' && (
                  <Badge variant='secondary'>Etapa: {filters.etapa.toLowerCase()}</Badge>
                )}
                {filters.eixo !== 'Todos' && (
                  <Badge variant='secondary'>Eixo: {filters.eixo.toLowerCase()}</Badge>
                )}
                {filters.tipo !== 'Todos' && (
                  <Badge variant='secondary'>Tipo: {filters.tipo.toLowerCase()}</Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(axes, filters.eixo, 'eixo', 2)}
          </CardContent>

          <CardFooter className="justify-end">
            <Button onClick={handleNextStep}>Próximo</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione o tipo</CardTitle>
            <div>
              <strong>Filtros selecionados</strong>
              <div className="flex flex-wrap gap-1">
                {filters.etapa !== 'Todas' && (
                  <Badge variant='secondary'>Etapa: {filters.etapa.toLowerCase()}</Badge>
                )}
                {filters.eixo !== 'Todos' && (
                  <Badge variant='secondary'>Eixo: {filters.eixo.toLowerCase()}</Badge>
                )}
                {filters.tipo !== 'Todos' && (
                  <Badge variant='secondary'>Tipo: {filters.tipo.toLowerCase()}</Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(types, filters.tipo, 'tipo', 2)}
          </CardContent>

          <CardFooter className="justify-end">
            <Button onClick={handleNextStep}>Buscar</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 4 && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtros Aplicados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1">
              {filters.etapa !== 'Todas' && (
                <Badge variant='secondary'>Etapa: {filters.etapa.toLowerCase()}</Badge>
              )}
              {filters.eixo !== 'Todos' && (
                <Badge variant='secondary'>Eixo: {filters.eixo.toLowerCase()}</Badge>
              )}
              {filters.tipo !== 'Todos' && (
                <Badge variant='secondary'>Tipo: {filters.tipo.toLowerCase()}</Badge>
              )}
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleResetFilters}>Limpar filtros</Button>
            </CardFooter>
          </Card>

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
              {data.map((item) => {
                const favorites = getFavorites()
                const isFavorite = !!favorites.find(fav => fav === item.codigo)

                return (
                  <TableRow key={item.codigo}>
                    <TableCell className="font-medium">{item.codigo}</TableCell>
                    <TableCell>{item.etapa}</TableCell>
                    <TableCell>{item.objetivo_ou_habilidade}</TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <Button
                        size='icon'
                        variant='outline'
                        className="cursor-pointer"
                        data-fav={isFavorite}
                        onClick={() => handleToggleFavorite(item)}
                      >
                        {!isFavorite ? <Heart /> : <HeartOff />}
                      </Button>
    
                      <Button
                        variant='outline'
                        className="cursor-pointer"
                        onClick={() => { void handleGoToDetails(item.codigo); }}
                      >
                        <span>Ver detalhes</span>
                        <ChevronRight />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}

              {!data.length && (
                <TableRow>
                  <TableCell colSpan={4}>Nenhum item encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* <Pagination
            onPageChange={() => {}}
            pageIndex={0}
            perPage={20}
            totalCount={1000}
          /> */}
        </div>
      )}
    </div>
  )
}
