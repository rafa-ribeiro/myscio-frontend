import { searchDocuments } from '@/services/backend'

export interface SearchResponse {
  result: string
}

export const performSearch = async (query: string): Promise<SearchResponse> => {
  try {
    const result = await searchDocuments(query)
    const search_response: SearchResponse = { result: result.response }
    return search_response
  } catch (error) {
    console.error('Error searching documents:', error)
    throw error
  }
}
