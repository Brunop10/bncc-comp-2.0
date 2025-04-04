import { ItemDTO } from '@/dtos/item-dto'
import { useState } from 'react'

import bnccData from '@/assets/data.json'

interface FilterData {
  codigo?: string
  etapa?: string
}

export function useData() {
  const [data, setData] = useState<ItemDTO[]>(bnccData as ItemDTO[])

  function filterData({ codigo, etapa }: FilterData) {
    const filteredData = bnccData
      .filter((item) => codigo ? item.codigo.toLowerCase().includes(codigo.toLowerCase()) : true)
      .filter((item) => etapa ? item.etapa.toLowerCase().includes(etapa.toLowerCase()) : true)

    setData(filteredData)
  }

  function resetData() {
    setData(bnccData)
  }

  function getListOfSteps() {
    return Array.from(new Set(bnccData.map(item => item.etapa)))
  }

  function getItemByCode(code: string) {
    console.log('aaa =>', code)
    const item = bnccData.find(item => item.codigo.toLowerCase() === code.toLowerCase()) ?? null
    console.log('bbb =>', item)
    return item
  }

  return {
    data,
    filterData,
    resetData,
    getListOfSteps,
    getItemByCode,
  }
}
