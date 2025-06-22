import { HomeIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";

import logo from '@/assets/logo-white.png'

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
      <Link to="/" className="flex gap-2 items-center">
        <img src={logo} alt="" className="h-14" />
        <h1 className="text-xl font-bold w-10 leading-tight">BNCC Computação</h1>
      </Link>

      {!isHome && (
        <Button
          size='sm'
          type="button"
          onClick={handleNavigateToHome}
          className="p-2 rounded-md hover:bg-secondary-foreground/10 border border-muted"
        >
          <HomeIcon className="size-5" />
          Início
        </Button>
      )}
    </div>
  </header>
  )
}
