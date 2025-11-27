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
        <span class="material-icons-outlined search-icon">search</span>
        <input
          v-model="query"
          @keyup.enter="search"
          class="search-input"
          placeholder="Search on my documents..."
          type="text"
        />
      </div>

      <button @click="search" :disabled="loading" class="search-button">
        {{ loading ? 'SEARCHING...' : 'SEARCH' }}
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
  background: var(--bg-question);
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.question-box p {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.answer-box {
  background: var(--bg-answer);
  padding: 24px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
}

.answer-box p {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.search-wrapper {
  width: 100%;
  max-width: 672px;
  background: var(--bg-card);
  padding: 40px;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-primary);
}

.search-wrapper.fixed-bottom {
  position: fixed;
  bottom: 32px;
  left: 256px;
  right: 0;
  margin: 0 auto;
  max-width: 672px;
  z-index: 100;
}

.main-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  font-size: 1.5rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 56px;
  padding-left: 52px;
  padding-right: 16px;
  background: var(--bg-input);
  border: 1px solid var(--border-secondary);
  border-radius: 12px;
  font-size: 1rem;
  color: var(--text-primary);
  font-family: 'Carlito', 'Calibri', sans-serif;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.search-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

:root.dark .search-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(239, 108, 0, 0.2);
}

.search-button {
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

.search-button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(249, 149, 83, 0.4);
}

:root.dark .search-button:hover:not(:disabled) {
  box-shadow: 0 6px 16px rgba(239, 108, 0, 0.5);
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-box {
  padding: 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 12px;
  text-align: center;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

:root.dark .error-box {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.3);
  color: #fca5a5;
}
</style>
