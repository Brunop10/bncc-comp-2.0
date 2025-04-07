import { Description } from "@/components/description";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemDTO } from "@/dtos/item-dto";
import { useData } from "@/hooks/use-data";
import { useStorage } from "@/hooks/use-storage";
import { ArrowRight, HeartOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function Favorites() {
  const { data } = useData()
  const { getFavorites, removeFavorite } = useStorage()

  const [favorites, setFavorites] = useState<ItemDTO[]>([])

  function filterByFavorites() {
    const favoritesIds = getFavorites()
    setFavorites(data.filter(item => favoritesIds.some(fav => fav === item.codigo)))
  }

  function handleRemoveFavorite(code: string) {
    removeFavorite(code)
    filterByFavorites()
  }

  useEffect(() => {
    filterByFavorites()
  }, [])

  return (
    <div className="px-8 space-y-8">
      <div className="space-y-1">
        <Heading title="Favoritos" />
        <Description value="Aqui você pode visualizar e acessar rapidamente os itens que marcou como favoritos." />
      </div>

      <div className="grid grid-cols-3">
        {favorites.map(favorite => (
          <Card key={favorite.codigo}>
            <CardHeader className="flex justify-between gap-2">
              <div>
                <CardTitle>{favorite.codigo}</CardTitle>
                <CardDescription>{favorite.etapa}</CardDescription>
              </div>

              <Button size='icon' variant='secondary' className="cursor-pointer" onClick={() => handleRemoveFavorite(favorite.codigo)}>
                <HeartOff />
              </Button>
            </CardHeader>

            <CardFooter>
              <Link to={`/detalhes/${favorite.codigo}`} className="flex gap-1 items-center hover:underline">Visualizar detalhes <ArrowRight className="size-4"/></Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}