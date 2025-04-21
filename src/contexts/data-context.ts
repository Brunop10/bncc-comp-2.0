import type { ItemDTO } from "@/dtos/item-dto"
import { createContext, use } from "react"

export type DataContextData = {
  items: ItemDTO[]
  isLoading: boolean
  fetchItems: () => Promise<void>
}

export const DataContext = createContext({} as DataContextData)

export const useData = () => use(DataContext)
