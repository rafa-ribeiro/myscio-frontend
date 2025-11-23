<template>
  <div class="container" :class="{ 'chat-mode': hasResults }">
    <div v-if="hasResults" class="chat-history">
      <div v-for="(item, index) in history" :key="index" class="chat-item">
        <div class="question-item">
          <p>{{ item.question }}</p>
        </div>
        <div class="answer-item">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>

    <div class="search-container" :class="{ 'fixed-bottom': hasResults }">
      <input
        v-model="query"
        type="text"
        class="search-box"
        placeholder="Search on my documents..."
        @keyup.enter="search"
      />

      <button class="search-button" @click="search" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>

      <div v-if="error" class="error">{{ error }}</div>
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
/* .container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
} */

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
}

.container.chat-mode {
  justify-content: flex-start;
  padding-top: 20px;
}

.chat-history {
  width: 100%;
  max-width: 800px;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 140px;
}

.chat-item {
  margin-bottom: 20px;
}

.question-item {
  background: #1a1a1a;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #2a2a2a;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.question-item p {
  color: #e0e0e0;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

.answer-item {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #3a3a3a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.answer-item p {
  color: #f0f0f0;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.answer-item:hover {
  border-color: #4a7;
  box-shadow: 0 2px 12px rgba(68, 170, 119, 0.2);
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

search-container.fixed-bottom {
  position: fixed;
  bottom: 20px;
  left: var(--sidebar-width);
  right: 0;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.5);
}

.search-box {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid #3a3a3a;
  border-radius: 8px;
  outline: none;
  transition: 0.3s all;
  background: #2a2a2a;
  color: #e0e0e0;
  font-family: inherit;
}

.search-box::placeholder {
  color: #888;
}

.search-box:focus {
  border-color: #4a7;
  background: #333;
  box-shadow: 0 0 10px rgba(68, 170, 119, 0.3);
}

.search-button {
  margin-top: 30px;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #4a7;
  color: white;
  cursor: pointer;
  transition: 0.3s all;
  box-shadow: 0 4px 10px rgba(68, 170, 119, 0.3);
}

.search-button:hover:not(:disabled) {
  background-color: #5b8;
  box-shadow: 0 6px 15px rgba(68, 170, 119, 0.5);
  transform: translateY(-2px);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  margin-top: 12px;
  padding: 12px 20px;
  background: rgba(220, 53, 69, 0.15);
  color: #ff6b7a;
  border-radius: 8px;
  border: 1px solid rgba(220, 53, 69, 0.3);
}
</style>
