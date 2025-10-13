
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Description } from "@/components/description";
import { LoadingBook } from "@/components/ui/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { AbilityCard } from "@/components/ability-card";
import { useQuery } from "@tanstack/react-query";
import { getAbilities } from "@/api/get-abilities";
import { useSearchParams } from "react-router";
import { OfflinePlaceholder } from "@/components/ui/offline-placeholder";
import { useNetworkStatus } from "@/context/network-context";

export function AbilitiesByYear() {

  const [searchParams, setSearchParams] = useSearchParams()
  const { isOnline } = useNetworkStatus();

  const yearFilter = searchParams.get('ano') ?? ''

  const { data, isLoading } = useQuery({
    queryKey: ['abilities', yearFilter],
    queryFn: () => getAbilities({ year: yearFilter }),
    enabled: !!yearFilter.length
  })

  const abilities = data?.abilities ?? []

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
                  setSearchParams(state => {
                    state.set('ano', option)
                    return state
                  })
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
    setSearchParams(state => {
      state.delete('ano')
      return state
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Explorar por ano" />
        <Description value="Explore os objetivos e habilidades relacionados a um ano específico." />
      </div>

      {!yearFilter && (
        <Card>
          <CardHeader>
            <CardTitle>Selecione a etapa educacional</CardTitle>
          </CardHeader>

          <CardContent>
            {renderOptionButtons(collegeYears, yearFilter, 2)}
          </CardContent>
        </Card>
      )}

      {yearFilter && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center justify-between">
            <h3 className="font-medium">
              Filtro por: {COLLEGE_YEARS[yearFilter]}
            </h3>
            <Button
              onClick={handleReset}
              variant='outline'
            >
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
