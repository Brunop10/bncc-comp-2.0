import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface CardButtonHorizontalProps extends ComponentProps<'button'> {
  icon: ReactNode
  title: string
  description?: string
  url?: string
}

export function CardButtonHorizontal({
  icon,
  title,
  description,
  url,
  ...props
}: CardButtonHorizontalProps) {
  const navigate = useNavigate()

  function handleNavigate() {
    if(!url) return
    navigate(url) as void
  }

  return (
    <Button
      {...props}
      onClick={handleNavigate}
      className="rounded-xl p-4 shadow-sm bg-white flex gap-4 h-auto border-r-gray-100 justify-start w-full hover:bg-white hover:shadow-md hover:transition-shadow cursor-pointer"
    >
      <div className="p-4 rounded-xl bg-primary-foreground">
        {icon}
      </div>

      <div className="flex flex-col w-full items-start">
        <span className="text-lg text-secondary-foreground">{title}</span>
        <span className="text-sm text-muted-foreground text-wrap text-left">
          {description}
          </span>
      </div>
    </Button>
  )
}
