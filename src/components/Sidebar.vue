<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>MyScio</h2>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="icon">🔍</span>
        <span>Search</span>
      </router-link>

      <router-link to="/documents" class="nav-item" active-class="active">
        <span class="icon">📄</span>
        <span>Documents</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 100%;
  height: 100vh;
  background: #1a1a1a;
  border-right: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  position: sticky;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #2a2a2a;
}

.sidebar-header h2 {
  color: #4a7;
  font-size: 1.5rem;
  margin: 0;
}

.sidebar-nav {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #888;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #222;
  color: #e0e0e0;
}

.nav-item.active {
  background: #222;
  color: #4a7;
  border-left-color: #4a7;
}

.icon {
  font-size: 1.2rem;
}
</style>
