import { ChevronRight } from "lucide-react";
import { Heading } from "./heading";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface DetailsCollapsibleItemProps {
  label: string
  description: string
}

export function DetailsCollapsibleItem({
  label,
  description
}: DetailsCollapsibleItemProps) {
  return (
    <Collapsible className="group flex flex-col gap-2 w-full">
      <CollapsibleTrigger className="flex justify-between gap-2 items-center bg-primary-foreground border w-full rounded-lg px-4 py-2">
        <Heading title={label} className="font-semibold text-lg" />
        <ChevronRight className="transition-transform group-data-[state=open]:rotate-90 size-4" />
      </CollapsibleTrigger>

      {description.trim().length > 0 && (
        <CollapsibleContent className="text-foreground px-4">
          {description}
        </CollapsibleContent>
      )}

      {description.trim().length === 0 && (
        <CollapsibleContent className="text-muted-foreground px-4">
          Nenhum conteúdo disponível.
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}