import { api } from '../lib/axios'

export interface SendFilesProps {
  scopusFile: File
  wosFile: File
}

export async function SendFiles({ scopusFile, wosFile }: SendFilesProps) {
  const formData = new FormData()
  formData.append('scopusFile', scopusFile)
  formData.append('wosFile', wosFile)

  const response = await api.post('/process', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  })

  return response.data
}
