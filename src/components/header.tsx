import { HomeIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  function handleNavigateToHome() {
    navigate('/') as void
  }

  return (
    <header className="sticky top-0 z-10 bg-primary text-white p-4 shadow-md h-20">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">BNCC Computação</h1>

      {!isHome && (
        <Button
          size='icon'
          type="button"
          onClick={handleNavigateToHome}
          className="p-2 rounded-md hover:bg-secondary-foreground/10"
        >
          <HomeIcon className="size-5" />
        </Button>
      )}
    </div>
  </header>
  )
}
