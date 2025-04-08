import { ChevronRight, Heart, HeartOff } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { ItemDTO } from "@/dtos/item-dto";
import { useNavigate } from "react-router";
import { useStorage } from "@/hooks/use-storage";
import { useEffect, useState } from "react";

interface ItemTableRowProps {
  item: ItemDTO
}

export function ItemTableRow({ item }: ItemTableRowProps) {
  const navigate = useNavigate()

  const { findByCode, addFavorite, removeFavorite } = useStorage()

  const [isFavorited, setIsFavorited] = useState(false)

  function handleToggleFavorite() {
    if (!isFavorited) {
      addFavorite(item.codigo)
      setIsFavorited(true)
    } else {
      removeFavorite(item.codigo)
      setIsFavorited(false)
    }
  }

  function handleGoToDetails() {
    navigate(`/detalhes/${item.codigo}`) as void
  }

  useEffect(() => {
    const isFav = findByCode(item.codigo)
    setIsFavorited(isFav)
  }, [])

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
          data-isFav={isFavorited}
          onClick={handleToggleFavorite}
        >
          {!isFavorited ? <Heart /> : <HeartOff />}
        </Button>

        <Button
          variant='outline'
          className="cursor-pointer"
          onClick={handleGoToDetails}
        >
          <span>Ver detalhes</span>
          <ChevronRight />
        </Button>
      </TableCell>
    </TableRow>
  )
}