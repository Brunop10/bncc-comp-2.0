import { getAbilities } from "@/api/get-abilities";
import { AbilityCard } from "@/components/ability-card";
import { Description } from "@/components/description";
import { Heading } from "@/components/heading";
import { useStorage } from "@/hooks/use-storage";
import { useQuery } from "@tanstack/react-query";
import { LoadingBook } from "@/components/ui/loading";
import { OfflinePlaceholder } from "@/components/ui/offline-placeholder";
import { useNetworkStatus } from "@/context/network-context";

export function MyPage() {
  const { getFavorites } = useStorage()
  const { isOnline } = useNetworkStatus();

  const codes = getFavorites()

  const { data, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getAbilities({ codes }),
    enabled: !!codes.length
  })

  const abilities = data?.abilities ?? []

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Favoritos" />
        <Description value="Aqui você pode visualizar e acessar rapidamente os itens que marcou como favoritos." />
      </div>

      <div className="flex flex-col gap-2">
        {isLoading && isOnline && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <LoadingBook size="xl" />
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-primary">
                Carregando favoritos...
              </p>
              <p className="text-base text-muted-foreground">
                Aguarde enquanto buscamos seus objetivos e habilidades salvas 
              </p>
            </div>
          </div>
        )}

        {!isOnline && !isLoading && abilities.length === 0 && (
          <OfflinePlaceholder
            title="Sem rede"
            description="Conecte-se para carregar seus favoritos"
            size="xl"
          />
        )}

        {!isLoading && abilities.map(ability => (
          <AbilityCard
            key={ability.codigo}
            ability={ability}
          />
        ))}

        {!isLoading && isOnline && !abilities.length && (
          <div className="flex justify-center px-4 py-2 bg-muted border rounded-md">
            <span className="text-muted-foreground text-sm">
              Nenhuma habilidade salva
            </span>
          </div> 
        )}
      </div>
    </div>
  )
}
