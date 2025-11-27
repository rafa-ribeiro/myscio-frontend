import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/v1/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchDocuments = async (query: string) => {
  const payload = {
    prompt: query,
  }

  const response = await apiClient.post('/documents/search', payload)
  return response.data
}

export const uploadDocument = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export default apiClient
