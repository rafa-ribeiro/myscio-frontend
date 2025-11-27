<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="app-layout">
    <Sidebar class="app-layout__sidebar" />
    <main class="main-content app-layout__content">
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
  grid-template-areas: 'sidebar . content .';
  grid-template-columns: 260px 1fr 800px 1fr;
  min-height: 100vh;
}

.app-layout__sidebar {
  grid-area: sidebar;
}

.app-layout__content {
  grid-area: content;
}

.main-content {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped></style>
