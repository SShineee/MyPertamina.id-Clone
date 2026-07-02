<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang MyPertamina', to: '/tentang-mypertamina' },
  { label: 'Program & Promo', to: '/program-promo' },
  { label: 'Produk', to: '/produk' },
  { label: 'Subsidi Tepat', to: '/subsidi-tepat' },
  { label: 'Lokasi', to: '/lokasi' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Kontak', to: '/kontak' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo" aria-label="MyPertamina">
        <span class="logo-mark">My</span>
        <span class="logo-word">PERTAMINA</span>
      </NuxtLink>

      <nav class="nav" aria-label="Menu utama">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.85rem 1.5rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-mark {
  background: linear-gradient(135deg, #ef4444, #1d4ed8);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.3rem 0.55rem;
  border-radius: 0.4rem;
  line-height: 1;
}
.logo-word {
  font-weight: 800;
  font-size: 1.05rem;
  color: #1e3a8a;
  letter-spacing: 0.02em;
}
.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.nav-link:hover {
  color: #1d4ed8;
}
.nav-link.active {
  color: #1d4ed8;
  border-color: #1d4ed8;
  font-weight: 600;
}
</style>
