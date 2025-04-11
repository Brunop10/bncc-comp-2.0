import { ItemDTO } from "@/dtos/item-dto";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

interface AbilityCardProps {
  item: ItemDTO
}

export function AbilityCard({ item }: AbilityCardProps) {
  const navigate = useNavigate()


  function handleNavigateToDetails() {
    navigate(`/detalhes/${item.codigo}`) as void
  }

  return (
    <button>
      <Card className="flex flex-col gap-4">
        <CardHeader className="gap-4">
          <div className="flex justify-between gap-2">
            <Badge variant='secondary'>{item.objetivo_ou_habilidade}</Badge>
            <strong className="font-medium text-sm">{item.codigo}</strong>
          </div>

          <div className="gap-0.5 flex flex-col w-full items-start">
            <CardTitle className="text-left">{item.etapa}</CardTitle>
            <CardDescription>{COLLEGE_YEARS[item.ano]}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="gap-1 flex flex-col w-full items-start">
          <strong className="font-semibold text-xs text-primary">{item.eixo}</strong>
          <p className="text-xs text-left line-clamp-2">{item.descr_objetivo_ou_habilidade}</p>
        </CardContent>

        <CardFooter>
          <Button
            size='sm'
            className="w-full cursor-pointer"
            onClick={handleNavigateToDetails}
          >
            Ver detalhes
            <ChevronRight />
          </Button>
        </CardFooter>
      </Card>
    </button>
  );
}