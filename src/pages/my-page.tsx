import { AbilityCard } from "@/components/ability-card";
import { Description } from "@/components/description";
import { Heading } from "@/components/heading";
import { ItemDTO } from "@/dtos/item-dto";
import { useData } from "@/hooks/use-data";
import { useStorage } from "@/hooks/use-storage";
import { useEffect, useState } from "react";

export function MyPage() {
  const { data } = useData()
  const { getFavorites } = useStorage()

  const [favorites, setFavorites] = useState<ItemDTO[]>([])

  function filterByFavorites() {
    const favoritesIds = getFavorites()
    setFavorites(data.filter(item => favoritesIds.some(fav => fav === item.codigo)))
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
      </div>
    </div>
  );
}