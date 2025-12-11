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
