<template>
  <div class="documents-container">
    <h1>Upload Documents</h1>
    <p class="upload-instruction">Select a file to upload to your knowledge base</p>

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
        class="file-input"
        id="file-upload"
      />

      <label for="file-upload" class="upload-label">
        <span class="upload-icon">📁</span>
        <span class="upload-text">
          {{ selectedFile ? selectedFile.name : 'Click to select or drag and drop a file' }}
        </span>
        <span class="upload-hint">PDF, TXT, DOCX files supported</span>
      </label>
    </div>

    <button v-if="selectedFile" @click="uploadFile" :disabled="uploading" class="upload-button">
      {{ uploading ? 'Uploading...' : 'Upload File' }}
    </button>

    <div v-if="uploadSuccess" class="success-message">✓ File uploaded successfully!</div>

    <div v-if="uploadError" class="error-message">
      {{ uploadError }}
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
  padding: 40px;
  color: #e0e0e0;
  max-width: 800px;
  margin: 0 auto;
}

.documents-container h1 {
  color: #4a7;
  margin-bottom: 10px;
  font-size: 2rem;
}

.upload-instruction {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.upload-area {
  border: 2px dashed #3a3a3a;
  border-radius: 12px;
  padding: 60px 40px;
  text-align: center;
  background: #1a1a1a;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #4a7;
  background: #222;
}

.upload-area.drag-over {
  border-color: #4a7;
  background: #222;
  box-shadow: 0 0 20px rgba(68, 170, 119, 0.3);
}

.file-input {
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
}

.upload-text {
  color: #e0e0e0;
  font-size: 1.2rem;
  font-weight: 500;
}

.upload-hint {
  color: #666;
  font-size: 0.9rem;
}

.upload-button {
  margin-top: 30px;
  padding: 14px 32px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #4a7;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(68, 170, 119, 0.3);
  width: 100%;
}

.upload-button:hover:not(:disabled) {
  background-color: #5b8;
  box-shadow: 0 6px 15px rgba(68, 170, 119, 0.5);
  transform: translateY(-2px);
}

.upload-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 16px;
  background: rgba(68, 170, 119, 0.15);
  color: #4a7;
  border-radius: 8px;
  border: 1px solid rgba(68, 170, 119, 0.3);
  text-align: center;
  font-weight: 500;
}

.error-message {
  margin-top: 20px;
  padding: 16px;
  background: rgba(220, 53, 69, 0.15);
  color: #ff6b7a;
  border-radius: 8px;
  border: 1px solid rgba(220, 53, 69, 0.3);
  text-align: center;
}
</style>
