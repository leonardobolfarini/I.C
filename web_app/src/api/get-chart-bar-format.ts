import { api } from '../lib/axios'
import { GetChartBarFormatProps } from '../lib/types'

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
