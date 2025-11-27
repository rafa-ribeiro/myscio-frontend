<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">MyScio</h2>
      <p class="sidebar-subtitle">Documentation</p>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="material-icons-outlined nav-icon">search</span>
        <span class="nav-text">Search</span>
      </router-link>

      <router-link to="/documents" class="nav-item" active-class="active">
        <span class="material-icons-outlined nav-icon">folder_open</span>
        <span class="nav-text">Documents</span>
      </router-link>
    </nav>

    <div class="theme-toggle-container">
      <div class="theme-label">
        <span>Theme</span>
      </div>
      <button @click="toggleTheme" class="theme-button" type="button">
        <span class="material-icons-outlined">{{ themeIcon }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const themeIcon = ref('light_mode')

const toggleTheme = () => {
  const htmlEl = document.documentElement
  htmlEl.classList.toggle('dark')

  if (htmlEl.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
    themeIcon.value = 'dark_mode'
  } else {
    localStorage.setItem('theme', 'light')
    themeIcon.value = 'light_mode'
  }
}

onMounted(() => {
  const htmlEl = document.documentElement
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlEl.classList.add('dark')
    themeIcon.value = 'dark_mode'
  } else {
    htmlEl.classList.remove('dark')
    themeIcon.value = 'light_mode'
  }
})
</script>

<style scoped>
.sidebar {
  width: 256px;
  background: var(--bg-sidebar);
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  height: 100vh;
  transition: background 0.3s ease;
}

.sidebar-header {
  margin-bottom: 40px;
  width: 100%;
}

.sidebar-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-sidebar);
  letter-spacing: -0.025em;
  margin: 0;
}

.sidebar-subtitle {
  font-size: 0.875rem;
  color: var(--text-sidebar-secondary);
  margin-top: 4px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-sidebar-secondary);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--text-sidebar);
  background: rgba(0, 0, 0, 0.1);
}

.nav-item.active {
  color: var(--text-sidebar);
  background: rgba(0, 0, 0, 0.1);
}

.nav-icon {
  font-size: 1.25rem;
}

.nav-text {
  font-size: 1rem;
  font-weight: 500;
}

.theme-toggle-container {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
}

.theme-label {
  font-size: 0.875rem;
  color: var(--text-sidebar-secondary);
}

.theme-button {
  background: transparent;
  border: none;
  color: var(--text-sidebar-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-button:hover {
  color: var(--text-sidebar);
  background: rgba(0, 0, 0, 0.1);
}

.theme-button .material-icons-outlined {
  font-size: 1.25rem;
}
</style>
