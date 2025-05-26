import { getAbilities } from "@/api/get-abilities";
import { AbilityCard } from "@/components/ability-card";
import { AbilityCardSkeleton } from "@/components/ability-card-skeleton";
import { Description } from "@/components/description";
import { Heading } from "@/components/heading";
import { useStorage } from "@/hooks/use-storage";
import { useQuery } from "@tanstack/react-query";

export function MyPage() {
  const { getFavorites } = useStorage()

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
        {abilities.map(ability => (
          <AbilityCard
            key={ability.codigo}
            ability={ability}
          />
        ))}
        
        {isLoading && Array.from({ length: 3 }).map((_, idx) => (
          <AbilityCardSkeleton key={idx} />
        ))}

        {!isLoading && !abilities.length && (
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
