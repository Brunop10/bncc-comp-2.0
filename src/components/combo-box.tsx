import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { twMerge } from "tailwind-merge"

interface Item {
  value: string
  label: string
}

interface ComboboxProps {
  placeholder?: string
  searchLabel?: string
  value: string
  onChange: (value: string) => void
  items: Item[]
  className?: string
  disabled?: boolean
}

export function Combobox({
  items,
  value,
  onChange,
  placeholder,
  searchLabel,
  className,
  disabled = false
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={twMerge(
            "w-[180px] justify-between",
            className
          )}
          disabled={disabled}
        >
          <span className="truncate">
            {value
              ? value === 'all'
                ? 'Todos'
                : items.find((item) => item.value === value)?.label ?? placeholder ?? 'Selecione'
              : placeholder ?? 'Selecione'}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={searchLabel ?? 'Buscar item...'}
            className="h-9"
          />

          <CommandList>
            <CommandEmpty>Nenhum item encontrado</CommandEmpty>

            <CommandGroup>
              <CommandItem
                value='all'
                onSelect={() => {
                  onChange('all')
                  setOpen(false)
                }}
              >
                Todos
                <Check
                  className={cn(
                    "ml-auto",
                    value === 'all' ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    onChange(item.value)
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
