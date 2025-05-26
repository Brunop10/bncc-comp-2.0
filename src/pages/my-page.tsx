import { AbilityCard } from "@/components/ability-card";
import { Description } from "@/components/description";
import { Heading } from "@/components/heading";
import { AbilityDTO } from "@/dtos/ability-dto";
import { useEffect, useState } from "react";

export function MyPage() {
  // const { getFavorites } = useStorage()

  const [favorites] = useState<AbilityDTO[]>([])

  function filterByFavorites() {
    // const favoritesIds = getFavorites()
    // setFavorites(bnccItems.filter(item => favoritesIds.some(fav => fav === item)))
  }

  useEffect(() => {
    filterByFavorites()
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <Heading title="Favoritos" />
        <Description value="Aqui você pode visualizar e acessar rapidamente os itens que marcou como favoritos." />
      </div>

      <div className="flex flex-col gap-2">
        {favorites.map(favorite => (
          <AbilityCard
            key={favorite.codigo}
            item={favorite}
          />
        ))}
        {/* {isLoading && Array.from({ length: 3 }).map((_, idx) => (
          <AbilityCardSkeleton key={idx} />
        ))}
        {!isLoading && !favorites.length && (
          <div className="flex justify-center px-4 py-2 bg-muted border rounded-md">
            <span className="text-muted-foreground text-sm">Nenhuma habilidade salva</span>
          </div> 
        )} */}
      </div>
    </div>
  );
}