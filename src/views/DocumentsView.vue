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
          <span class="material-icons-outlined upload-icon">folder_open</span>
          <span class="upload-text">
            {{ selectedFile ? selectedFile.name : 'Click to select or drag and drop a file' }}
          </span>
          <span class="upload-hint">PDF, TXT, DOCX files supported</span>
        </label>
      </div>

      <button v-if="selectedFile" @click="uploadFile" :disabled="uploading" class="upload-button">
        {{ uploading ? 'UPLOADING...' : 'UPLOAD FILE' }}
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
    selectedFile.value = target?.files[0] ?? null
    uploadSuccess.value = false
    uploadError.value = ''
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    selectedFile.value = event.dataTransfer?.files[0] ?? null
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
  background: var(--bg-card);
  padding: 40px;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
  transition: color 0.3s ease;
}

.page-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
  margin: -8px 0 8px 0;
  transition: color 0.3s ease;
}

.upload-area {
  border: 2px dashed var(--border-secondary);
  border-radius: 12px;
  padding: 48px 32px;
  text-align: center;
  background: var(--bg-input);
  transition: all 0.2s ease;
  cursor: pointer;
}

.upload-area:hover {
  border-color: var(--text-tertiary);
}

.upload-area.drag-over {
  border-color: var(--border-focus);
  background: rgba(96, 165, 250, 0.05);
}

:root.dark .upload-area.drag-over {
  border-color: var(--border-focus);
  background: rgba(239, 108, 0, 0.1);
}

.file-input-hidden {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.upload-icon {
  font-size: 3.5rem;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

.upload-text {
  color: var(--text-secondary);
  font-size: 1.125rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.upload-hint {
  color: var(--text-tertiary);
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.upload-button {
  width: 100%;
  padding: 14px 32px;
  background: var(--bg-button);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  transition: all 0.3s ease;
  font-family: 'Carlito', 'Calibri', sans-serif;
}

.upload-button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-box {
  padding: 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
}

:root.dark .success-box {
  background: rgba(22, 163, 74, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
  color: #86efac;
}

.error-box {
  padding: 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

:root.dark .error-box {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
  color: #fca5a5;
}
</style>
