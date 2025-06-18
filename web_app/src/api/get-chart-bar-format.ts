import { api } from '../lib/axios'

export interface GetChartBarFormatProps {
  chartBarFile: File
}

export interface ChartBarData {
  name: string
  count: number
}

export interface AuthorsCountInterface {
  authors: {
    author: string
    count: number
  }[]
}

export interface KeywordsCountInterface {
  keywords: {
    keyword: string
    count: number
  }[]
}

export interface SourcesCountInterface {
  sources: {
    source: string
    count: number
  }[]
}

export interface YearsCountInterface {
  years: {
    year: string
    count: number
  }[]
}

export async function GetChartBarFormat({
  chartBarFile,
}: GetChartBarFormatProps) {
  const formData = new FormData()
  formData.append('chartBarFile', chartBarFile)

  const response = await api.post('/chart_bar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
  })

  const [authors, keywords, sources, years] = await response.data

  return {
    authors,
    keywords,
    sources,
    years,
  }
}
