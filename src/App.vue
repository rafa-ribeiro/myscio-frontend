<!-- <script setup lang="ts">
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
.app-layout {
  /* display: flex; */
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: transparent;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>

<style scoped></style> -->

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
/* .app-layout {
  display: flex;
  min-height: 100vh;
  background: transparent;
} */

.app-layout {
  /* display: flex; */
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: transparent;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
