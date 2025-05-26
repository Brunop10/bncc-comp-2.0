import { AbilityDTO } from "@/dtos/ability-dto";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { COLLEGE_YEARS } from "@/utils/college-years";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

interface AbilityCardProps {
  ability: AbilityDTO
}

export function AbilityCard({ ability }: AbilityCardProps) {
  const navigate = useNavigate()

  function handleNavigateToDetails() {
    void navigate(`/detalhes/${ability.codigo}`)
  }

  return (
    <button className="w-full">
      <Card className="flex flex-col gap-4">
        <CardHeader className="gap-4">
          <div className="flex justify-between gap-2">
            <Badge variant='secondary'>{ability.objetivo_ou_habilidade}</Badge>
            <strong className="font-medium text-sm">{ability.codigo}</strong>
          </div>

          <div className="gap-0.5 flex flex-col w-full items-start">
            <CardDescription className="text-xs">
              {ability.etapa.split('-')[0].trim()}
            </CardDescription>

            <CardTitle className="text-left uppercase text-base leading-none">
              {COLLEGE_YEARS[ability.ano]}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="gap-1 flex flex-col w-full items-start">
          <strong className="font-semibold text-md text-primary">
            {ability.eixo}
          </strong>
          <p className="text-xs text-left line-clamp-2">
            {ability.descr_objetivo_ou_habilidade}
          </p>
        </CardContent>

        <CardFooter className="gap-2">
          <Button
            size='sm'
            type="button"
            className="cursor-pointer flex-1"
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