import { api } from '../lib/axios'

export interface GetGraphFormatProps {
  graphFile: File
}

export async function GetGraphFormat({ graphFile }: GetGraphFormatProps) {
  const formData = new FormData()
  formData.append('graphFile', graphFile)

  const response = await api.post('/graph', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
  })

  return response.data
}
