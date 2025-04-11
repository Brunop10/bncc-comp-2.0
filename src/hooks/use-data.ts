import { ItemDTO } from '@/dtos/item-dto'
import { useState } from 'react'

import bnccData from '@/assets/data.json'

interface FilterData {
  codigo?: string
  etapa?: string
  eixo?: string
  tipo?: string
  ano?: string
}

export function useData() {
  const [data, setData] = useState<ItemDTO[]>(bnccData as ItemDTO[])

  function filterData({ codigo, etapa, eixo, tipo, ano }: FilterData) {
    console.log('Filtered Data:', ano)
    const filteredData = bnccData
      .filter((item) => codigo ? item.codigo.toLowerCase().includes(codigo.toLowerCase()) : true)
      .filter((item) => etapa ? item.etapa.toLowerCase().includes(etapa.toLowerCase()) : true)
      .filter((item) => eixo ? item.eixo.toLowerCase().includes(eixo.toLowerCase()) : true)
      .filter((item) => tipo ? item.objetivo_ou_habilidade.toLowerCase().includes(tipo.toLowerCase()) : true)
      .filter((item) => ano ? item.ano === ano : true)

    setData(filteredData)
  }

  function resetData() {
    setData(bnccData)
  }

  function getListOfSteps() {
    return Array.from(new Set(bnccData.map(item => item.etapa)))
  }

  function getListOfAxes() {
    return Array.from(new Set(bnccData.map(item => item.eixo)))
  }

  function getListOfTypes() {
    return Array.from(new Set(bnccData.map(item => item.objetivo_ou_habilidade)))
  }

  function getItemByCode(code: string) {
    const item = bnccData.find(item => item.codigo.toLowerCase() === code.toLowerCase()) ?? null
    return item
  }

  return {
    data,
    filterData,
    resetData,
    getListOfSteps,
    getListOfAxes,
    getListOfTypes,
    getItemByCode,
  }
}
