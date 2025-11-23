import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/v1/api',
  timeout: 10000,
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

export default apiClient
