<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">MyScio</h2>
      <p class="sidebar-subtitle">Documentation</p>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="material-symbols-outlined nav-icon">search</span>
        <span class="nav-text">Search</span>
      </router-link>

      <router-link to="/documents" class="nav-item" active-class="active">
        <span class="material-symbols-outlined nav-icon">folder</span>
        <span class="nav-text">Documents</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 256px;
  background: linear-gradient(to bottom, #a7d9d3 0%, #4d8b8b 100%);
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header {
  margin-bottom: 40px;
  width: 100%;
}

.sidebar-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.025em;
  margin: 0;
}

.sidebar-subtitle {
  font-size: 0.875rem;
  color: #374151;
  margin-top: 4px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1f2937;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: white;
  background: rgba(45, 139, 139, 0.5);
}

.nav-item.active {
  color: white;
  background: rgba(45, 139, 139, 0.5);
}

.nav-icon {
  font-size: 1.5rem;
}

.nav-text {
  font-size: 1.125rem;
  font-weight: 500;
}
</style>
