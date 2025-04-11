import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface CardButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
  title: string
  url: string
}

export function CardButton({ icon, title, url, ...props }: CardButtonProps) {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate(url) as void
  }

  return (
    <Button
      {...props}
      onClick={handleNavigate}
      className="rounded-xl p-4 gap-3 shadow-sm bg-white flex flex-col border-r-gray-100 items-center justify-center aspect-square size-full hover:bg-white hover:shadow-md hover:transition-shadow cursor-pointer"
    >
      <div className="p-4 rounded-xl bg-primary-foreground">
        {icon}
      </div>

      <span className="text-base text-secondary-foreground">{title}</span>
    </Button>
  )
}
