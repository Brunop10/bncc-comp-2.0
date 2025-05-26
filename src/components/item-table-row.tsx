import { ChevronRight, Heart, HeartOff } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { AbilityDTO } from "@/dtos/ability-dto";
import { useNavigate } from "react-router";
import { useStorage } from "@/hooks/use-storage";
import { useEffect, useState } from "react";

interface ItemTableRowProps {
  ability: AbilityDTO
}

export function ItemTableRow({ ability }: ItemTableRowProps) {
  const navigate = useNavigate()

  const { findByCode, addFavorite, removeFavorite } = useStorage()

  const [isFavorited, setIsFavorited] = useState(false)

  function handleToggleFavorite() {
    if (!isFavorited) {
      addFavorite(ability.codigo)
      setIsFavorited(true)
    } else {
      removeFavorite(ability.codigo)
      setIsFavorited(false)
    }
  }

  function handleGoToDetails() {
    navigate(`/detalhes/${ability.codigo}`) as void
  }

  useEffect(() => {
    const isFav = findByCode(ability.codigo)
    setIsFavorited(isFav)
  }, [])

  return (
    <TableRow key={ability.codigo}>
      <TableCell className="font-medium">{ability.codigo}</TableCell>
      <TableCell>{ability.etapa}</TableCell>
      <TableCell>{ability.objetivo_ou_habilidade}</TableCell>
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