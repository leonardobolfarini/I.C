import { api } from '../lib/axios'

export async function SendFiles(formData: FormData) {
  const response = await api.post('/process', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  })

  return response.data
}
