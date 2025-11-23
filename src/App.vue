<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(180deg, #101010 30%, #2d2d2d 100%);
  min-height: 100vh;
  overflow-x: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
  background: transparent;
}

.app-layout {
  display: grid;
  grid-template-columns: 15% 85%; /* 15% sidebar, 85% conteúdo */
  min-height: 100vh;
}

.main-content {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped></style>
