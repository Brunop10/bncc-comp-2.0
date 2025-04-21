import { useEffect, useState, type PropsWithChildren } from "react";
import { DataContext } from '@/contexts/data-context'
import { ItemDTO } from "@/dtos/item-dto";
import { getGoogleSheetsData } from "@/lib/sheets";

export function DataProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ItemDTO[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchItems() {
    setIsLoading(true)
    try {
      const response = await getGoogleSheetsData()
      setItems(response.values)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems().catch((error) => {
      console.error('Error during data fetching:', error)
    })
  }, [])

  return (
    <DataContext.Provider
      value={{
        items,
        isLoading,
        fetchItems,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}