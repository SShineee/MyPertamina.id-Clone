<script setup lang="ts">
const route = useRoute()
const { user, logout } = useAuth()

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/profile', label: 'Akun Saya', icon: 'user' },
  { to: '/vehicles', label: 'Kendaraan', icon: 'car' },
  { to: '/transactions', label: 'Transaksi', icon: 'receipt' },
  { to: '/vouchers', label: 'Voucher', icon: 'ticket' },
  { to: '/notifications', label: 'Notifikasi', icon: 'bell' },
]

const initials = computed(() => {
  const n = user.value?.name?.trim() || 'U'
  return n
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
})

function onLogout() {
  logout()
  navigateTo('/')
}
</script>

<template>
  <aside class="acc-sidebar">
    <div class="acc-user">
      <div class="acc-avatar">{{ initials }}</div>
      <div class="acc-user-meta">
        <p class="acc-name">{{ user?.name || 'Pengguna' }}</p>
        <p class="acc-phone">{{ user?.phone || '-' }}</p>
      </div>
    </div>

    <nav class="acc-nav" aria-label="Menu akun">
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="acc-link" :class="{ active: route.path === item.to }">
        <span class="acc-ic" aria-hidden="true">
          <svg v-if="item.icon === 'grid'" viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>
          <svg v-else-if="item.icon === 'user'" viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <svg v-else-if="item.icon === 'car'" viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M4 13l1.5-4.5A2 2 0 0 1 7.4 7h9.2a2 2 0 0 1 1.9 1.5L20 13v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H7.5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7.5" cy="15" r="1" fill="currentColor"/><circle cx="16.5" cy="15" r="1" fill="currentColor"/></svg>
          <svg v-else-if="item.icon === 'receipt'" viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <svg v-else-if="item.icon === 'ticket'" viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" stroke="currentColor" stroke-width="1.8"/><path d="M14 7v10" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2 2"/></svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </span>
        {{ item.label }}
      </NuxtLink>
    </nav>

    <button type="button" class="acc-logout" @click="onLogout">
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true"><path d="M15 12H4m0 0 3.5-3.5M4 12l3.5 3.5M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Keluar
    </button>
  </aside>
</template>

<style scoped>
.acc-sidebar {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 84px;
}
.acc-user {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}
.acc-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1d4ed8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.acc-user-meta {
  min-width: 0;
}
.acc-name {
  margin: 0;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.acc-phone {
  margin: 0.15rem 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.acc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.acc-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 0.65rem;
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.acc-link:hover {
  background: #f3f4f6;
}
.acc-link.active {
  background: #eff6ff;
  color: #1d4ed8;
}
.acc-ic {
  display: inline-flex;
  color: currentColor;
}
.acc-logout {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.85rem;
  border-radius: 0.65rem;
  border: 1px solid #fecaca;
  background: #fff;
  color: #b91c1c;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  margin-top: 0.25rem;
}
.acc-logout:hover {
  background: #fef2f2;
}

@media (max-width: 860px) {
  .acc-sidebar {
    position: static;
  }
  .acc-nav {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .acc-link {
    flex: 1 1 auto;
  }
}
</style>
