
import { BookA, BookOpen, Heart, Home } from "lucide-react"

export const items = [
  {
    title: "Início",
    url: "/",
    icon: Home,
    shown: true,
  },
  {
    title: "Habilidades",
    url: "/habilidades",
    icon: BookOpen,
    shown: true,
  },
  {
    title: "Habilidades (Guiado)",
    url: "/habilidades-guiado",
    icon: BookOpen,
    shown: true,
  },
  {
    title: "Favoritos",
    url: "/favoritos",
    icon: Heart,
    shown: true,
  },
  {
    title: "Detalhes",
    url: "/detalhes",
    icon: BookA,
    shown: false,
  }
]
