import type { ItemDTO } from '@/dtos/item-dto'
import { env } from '@/env'
import axios from 'axios'

export type GoogleSheetsUrlResponse = {
  range: string
  majorDimension: 'ROWS' | 'COLUMNS'
  values: string[][]
}

export async function getGoogleSheetsData() {
  const response = await axios.get<GoogleSheetsUrlResponse>(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.VITE_GOOGLE_SHEET_ID}/values/Página1!A2:K?key=${env.VITE_GOOGLE_API_KEY}`)

  return {
    ...response.data,
    values: response.data.values.map(row => {
      const data: ItemDTO = {
        ano: row[0],
        etapa: row[1],
        eixo: row[2],
        obj_conhecimento_1: row[3],
        obj_conhecimento_2: row[4],
        habilidade_superior: row[5],
        codigo: row[6],
        objetivo_ou_habilidade: row[7],
        descr_objetivo_ou_habilidade: row[8],
        explicacao: row[9],
        exemplos: row[10],
      }

      return data
    })
  }
}
