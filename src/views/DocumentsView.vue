<template>
  <div class="documents-container">
    <div class="upload-card">
      <h1 class="page-title">Upload Documents</h1>
      <p class="page-subtitle">Select a file to upload to your knowledge base</p>

      <div
        class="upload-area"
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <input
          type="file"
          ref="fileInput"
          @change="handleFileSelect"
          class="file-input-hidden"
          id="file-upload"
        />

        <label for="file-upload" class="upload-label">
          <span class="material-symbols-outlined upload-icon">folder_open</span>
          <span class="upload-text">
            {{ selectedFile ? selectedFile.name : 'Click to select or drag and drop a file' }}
          </span>
          <span class="upload-hint">PDF, TXT, DOCX files supported</span>
        </label>
      </div>

      <button v-if="selectedFile" @click="uploadFile" :disabled="uploading" class="upload-button">
        {{ uploading ? 'Uploading...' : 'Upload File' }}
      </button>

      <div v-if="uploadSuccess" class="success-box">✓ File uploaded successfully!</div>

      <div v-if="uploadError" class="error-box">
        {{ uploadError }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { performUpload } from '@/services/upload_documents'
import { AxiosError } from 'axios'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const uploading = ref(false)
const uploadSuccess = ref(false)
const uploadError = ref('')
const isDragging = ref(false)

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    uploadSuccess.value = false
    uploadError.value = ''
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    selectedFile.value = event.dataTransfer.files[0]
    uploadSuccess.value = false
    uploadError.value = ''
  }
}

async function uploadFile() {
  if (!selectedFile.value) return

  try {
    uploading.value = true
    uploadError.value = ''
    uploadSuccess.value = false

    await performUpload(selectedFile.value)

    uploadSuccess.value = true
    selectedFile.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      uploadError.value = error.response?.data?.message || 'Error uploading file'
    } else {
      uploadError.value = 'Error uploading file'
    }
    console.error('Upload error:', error)
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.documents-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

.upload-card {
  width: 100%;
  max-width: 672px;
  background: radial-gradient(circle at center, #ffffff 0%, #f0f2f5 100%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin: 0;
}

.page-subtitle {
  text-align: center;
  color: #4b5563;
  font-size: 1.125rem;
  margin: -16px 0 0 0;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 64px 40px;
  text-align: center;
  background: #f9fafb;
  transition: all 0.2s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #9ca3af;
  background: #f3f4f6;
}

.upload-area.drag-over {
  border-color: #60a5fa;
  background: #eff6ff;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.file-input-hidden {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

.upload-icon {
  font-size: 4rem;
  color: #9ca3af;
}

.upload-text {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 500;
}

.upload-hint {
  color: #6b7280;
  font-size: 0.875rem;
}

.upload-button {
  width: 100%;
  padding: 16px 32px;
  background: linear-gradient(to right, #ff7b00 0%, #e74c3c 100%);
  color: white;
  font-weight: 800;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 123, 0, 0.3);
  transition: all 0.3s ease;
  font-family: 'Sora', sans-serif;
}

.upload-button:hover:not(:disabled) {
  box-shadow: 0 6px 16px rgba(255, 123, 0, 0.4);
  transform: translateY(-2px);
}

.upload-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.success-box {
  padding: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
}

.error-box {
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 12px;
  text-align: center;
}
</style>
