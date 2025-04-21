import { ItemDTO } from '@/dtos/item-dto'
import { useEffect, useState } from 'react'
import { useData as UseDataContext } from '@/contexts/data-context'

interface FilterData {
  codigo?: string
  etapa?: string
  eixo?: string
  tipo?: string
  ano?: string
}

export function useData() {
  const { items, isLoading } = UseDataContext()

  const [bnccItems, setBnccItems] = useState<ItemDTO[]>([])

  function filterData({ codigo, etapa, eixo, tipo, ano }: FilterData) {
    const filteredData = items
      .filter((item) => codigo ? item.codigo.toLowerCase().includes(codigo.toLowerCase()) : true)
      .filter((item) => etapa ? item.etapa.toLowerCase().includes(etapa.toLowerCase()) : true)
      .filter((item) => eixo ? item.eixo.includes(eixo) : true)
      .filter((item) => tipo ? item.objetivo_ou_habilidade.toLowerCase().includes(tipo.toLowerCase()) : true)
      .filter((item) => ano ? item.ano === ano : true)

      setBnccItems(filteredData)
  }

  function resetData() {
    setBnccItems(items)
  }

  function getListOfSteps() {
    return Array.from(new Set(items.map(item => item.etapa)))
  }

  function getListOfAxes() {
    return Array.from(new Set(items.map(item => item.eixo)))
  }

  function getListOfTypes() {
    return Array.from(new Set(items.map(item => item.objetivo_ou_habilidade)))
  }

  function getItemByCode(code: string) {
    return items.find(item => item.codigo.toLowerCase() === code.toLowerCase()) ?? null
  }

  useEffect(() => {
    setBnccItems(items)
  }, [items])

  return {
    bnccItems,
    filterData,
    resetData,
    getListOfSteps,
    getListOfAxes,
    getListOfTypes,
    getItemByCode,
    isLoading,
  }
}
