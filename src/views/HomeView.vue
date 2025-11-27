<template>
  <div class="home-container" :class="{ 'has-results': hasResults }">
    <!-- Chat History -->
    <div v-if="hasResults" class="chat-history">
      <div v-for="(item, index) in history" :key="index" class="chat-item">
        <!-- Question -->
        <div class="question-box">
          <p>{{ item.question }}</p>
        </div>

        <!-- Answer -->
        <div class="answer-box">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Search Container -->
    <div class="search-wrapper" :class="{ 'fixed-bottom': hasResults }">
      <h1 v-if="!hasResults" class="main-title">Document Search</h1>

      <div class="input-wrapper">
        <span class="material-symbols-outlined search-icon">search</span>
        <input
          v-model="query"
          @keyup.enter="search"
          class="search-input"
          placeholder="Search on my documents..."
          type="text"
        />
      </div>

      <button @click="search" :disabled="loading" class="search-button">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>

      <div v-if="error" class="error-box">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { performSearch, type SearchResponse } from '@/services/search_documents'
import { AxiosError } from 'axios'
import { ref, computed } from 'vue'

interface HistoryItem {
  question: string
  answer: string
}

const query = ref('')
const loading = ref(false)
const error = ref('')
const history = ref<HistoryItem[]>([])

const hasResults = computed(() => history.value.length > 0)

async function search() {
  if (!query.value.trim()) {
    error.value = 'Please enter a valid question.'
    return
  }

  const currentQuery = query.value

  try {
    loading.value = true
    error.value = ''

    const response: SearchResponse = await performSearch(currentQuery)

    history.value.push({
      question: currentQuery,
      answer: response.result,
    })

    query.value = ''
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      error.value = err.response?.data?.message || 'Error searching documents'
    } else {
      error.value = 'Error searching documents'
    }
    console.error('Search error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
  transition: all 0.3s ease;
}

.home-container.has-results {
  justify-content: flex-start;
  padding-top: 32px;
}

.chat-history {
  width: 100%;
  max-width: 768px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 180px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chat-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-box {
  background: #f3f4f6;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.question-box p {
  color: #1f2937;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.answer-box {
  background: radial-gradient(circle at center, #ffffff 0%, #f0f2f5 100%);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

.answer-box p {
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.search-wrapper {
  width: 100%;
  max-width: 672px;
  background: radial-gradient(circle at center, #ffffff 0%, #f0f2f5 100%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 32px;
  transition: all 0.3s ease;
}

.search-wrapper.fixed-bottom {
  position: sticky;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 672px;
  z-index: 100;
}

.main-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin: 0 0 24px 0;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1.875rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 64px;
  padding-left: 64px;
  padding-right: 24px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1.25rem;
  color: #1f2937;
  font-family: 'Sora', sans-serif;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.search-button {
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

.search-button:hover:not(:disabled) {
  box-shadow: 0 6px 16px rgba(255, 123, 0, 0.4);
  transform: translateY(-2px);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.error-box {
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 12px;
  text-align: center;
  font-size: 0.875rem;
}
</style>
