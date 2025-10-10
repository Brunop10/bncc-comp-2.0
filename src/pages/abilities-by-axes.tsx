
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { LoadingBook } from "@/components/ui/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AbilityCard } from "@/components/ability-card";
import { useQuery } from "@tanstack/react-query";
import { getAbilities } from "@/api/get-abilities";
import { useSearchParams } from "react-router";
import { OfflinePlaceholder } from "@/components/ui/offline-placeholder";
import { useNetworkStatus } from "@/context/network-context";

export function AbilitiesByAxes() {

  const [searchParams, setSearchParams] = useSearchParams()
  const { isOnline } = useNetworkStatus();

  const axesFilter = searchParams.get('eixo') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: ['abilities', axesFilter],
    queryFn: () => getAbilities({ axe: axesFilter }),
    enabled: !!axesFilter.length
  })

  const abilities = data?.abilities ?? []

  const axes = ['Pensamento Computacional', 'Mundo Digital', 'Cultura Digital']

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
                  setSearchParams(state => {
                    state.set('eixo', option)
                    return state
                  })
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

  function handleReset() {
    setSearchParams(state => {
      state.delete('eixo')
      return state
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Explorar por eixo" />
        <Description value="Liste os objetivos e habilidades do por eixo." />
      </div>

      {!axesFilter && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione o eixo</CardTitle>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(axes, axesFilter, 2)}
          </CardContent>
        </Card>
      )}

      {axesFilter && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <h3 className="font-medium">Filtro por: {axesFilter}</h3>
            <Button onClick={handleReset} variant='outline'>
              Alterar filtro
            </Button>
          </div>

          {!isOnline && !isLoading && abilities.length === 0 && (
            <OfflinePlaceholder
              title="Sem rede"
              description="Conecte-se para buscar habilidades"
              size="xl"
            />
          )}
          {isOnline && isLoading && (
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
          {!isLoading && isOnline && abilities.length === 0 && (
            <div className="flex justify-center px-4 py-2 bg-muted border rounded-md">
              <span className="text-muted-foreground text-sm">
                Nenhuma habilidade disponível
              </span>
            </div> 
          )}
        </div>
      )}
    </div>
  )
}
