import { uploadDocument } from '@/services/backend'

export interface UploadResponse {
  success: boolean
  message: string
}

export const performUpload = async (file: File): Promise<UploadResponse> => {
  try {
    await uploadDocument(file)

    return {
      success: true,
      message: 'File uploaded successfully',
    }
  } catch (error) {
    console.error('Error uploading document:', error)
    throw error
  }
}
