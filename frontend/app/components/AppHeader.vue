<script setup lang="ts">
interface SubmenuItem {
  label: string
  to: string
}

interface NavItem {
  key: string
  label: string
  to?: string
  submenu?: { title: string; items: SubmenuItem[] }
}

const route = useRoute()

const navItems: NavItem[] = [
  { key: 'beranda', label: 'Beranda', to: '/' },
  {
    key: 'tentang',
    label: 'Tentang MyPertamina',
    submenu: {
      title: 'Tentang MyPertamina',
      items: [
        { label: 'Informasi Harga BBM', to: '/about/product-price' },
        { label: 'Informasi Harga Bright Gas', to: '/about/bright-gas-price' },
        { label: 'Keuntungan MyPertamina', to: '/tentang-mypertamina/keuntungan-mypertamina' },
        { label: 'MyPertamina Channel', to: '/tentang-mypertamina/mypertamina-channel' },
      ],
    },
  },
  { key: 'program-promo', label: 'Program & Promo', to: '/program-promo' },
  {
    key: 'produk',
    label: 'Produk',
    submenu: {
      title: 'Produk',
      items: [
        { label: 'MyPertamina App', to: '/produk/mypertamina-app' },
        { label: 'Pertamina Fuel Card', to: '/produk/pertamina-fuel-card' },
        { label: 'LinkAja', to: '/produk/linkaja' },
        { label: 'Pertamina Points', to: '/produk/pertamina-points' },
      ],
    },
  },
  {
    key: 'subsidi-tepat',
    label: 'Subsidi Tepat',
    submenu: {
      title: 'Subsidi Tepat',
      items: [
        { label: 'Subsidi Tepat BBM', to: '/subsidi-tepat/bbm' },
        { label: 'Subsidi Tepat LPG 3 Kg', to: '/subsidi-tepat/lpg-3kg' },
        { label: 'Cara Daftar Subsidi Tepat', to: '/subsidi-tepat/cara-daftar' },
      ],
    },
  },
  {
    key: 'lokasi',
    label: 'Lokasi',
    submenu: {
      title: 'Lokasi',
      items: [
        { label: 'Cari SPBU Terdekat', to: '/lokasi/spbu' },
        { label: 'Cari Agen & Pangkalan LPG', to: '/lokasi/agen-lpg' },
        { label: 'Peta Sebaran Outlet', to: '/lokasi/peta-outlet' },
      ],
    },
  },
  {
    key: 'sustainability',
    label: 'Sustainability',
    submenu: {
      title: 'Sustainability',
      items: [
        { label: 'Environmental (Lingkungan)', to: '/sustainability/environmental' },
        { label: 'Social (Sosial)', to: '/sustainability/social' },
        { label: 'Governance (Tata Kelola)', to: '/sustainability/governance' },
        { label: 'Laporan Keberlanjutan', to: '/sustainability/laporan' },
      ],
    },
  },
  { key: 'kontak', label: 'Kontak', to: '/kontak' },
]

const openKey = ref<string | null>(null)
const headerEl = ref<HTMLElement | null>(null)
const panelTop = ref(0)

const currentSubmenu = computed(() => navItems.find((item) => item.key === openKey.value)?.submenu ?? null)

function isActive(to: string) {
  return route.path === to
}

function openDropdown(key: string) {
  openKey.value = key
}

function closeDropdown() {
  openKey.value = null
}

function updatePanelTop() {
  panelTop.value = headerEl.value?.offsetHeight ?? 0
}

onMounted(() => {
  updatePanelTop()
  window.addEventListener('resize', updatePanelTop)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePanelTop)
})
</script>

<template>
  <header ref="headerEl" class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo" aria-label="MyPertamina">
        <span class="logo-mark">My</span>
        <span class="logo-word">PERTAMINA</span>
      </NuxtLink>

      <nav class="nav" aria-label="Menu utama">
        <template v-for="item in navItems" :key="item.key">
          <NuxtLink
            v-if="!item.submenu"
            :to="item.to"
            class="nav-link"
            :class="{ active: isActive(item.to!) }"
          >
            {{ item.label }}
          </NuxtLink>
          <button
            v-else
            type="button"
            class="nav-link nav-trigger"
            :class="{ active: openKey === item.key }"
            aria-haspopup="true"
            :aria-expanded="openKey === item.key"
            @click="openDropdown(item.key)"
            @mouseenter="openDropdown(item.key)"
          >
            {{ item.label }}
            <svg
              class="chevron"
              :class="{ rotated: openKey === item.key }"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 3L5 7L9 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </template>
      </nav>
    </div>

    <div v-if="currentSubmenu" class="dropdown-backdrop" :style="{ top: panelTop + 'px' }" @click="closeDropdown" />

    <aside v-if="currentSubmenu" class="dropdown-panel" :style="{ top: panelTop + 'px' }">
      <div class="dropdown-heading">
        <h2>{{ currentSubmenu.title.toUpperCase() }}</h2>
        <button type="button" class="dropdown-close" aria-label="Tutup submenu" @click="closeDropdown">✕</button>
      </div>
      <ul class="dropdown-list">
        <li v-for="sub in currentSubmenu.items" :key="sub.to">
          <NuxtLink :to="sub.to" @click="closeDropdown">{{ sub.label }}</NuxtLink>
        </li>
      </ul>
    </aside>
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
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
  background: none;
  cursor: pointer;
  font-family: inherit;
}
.nav-link:hover {
  color: #b91c1c;
}
.nav-link.active {
  color: #b91c1c;
  border-color: #b91c1c;
  font-weight: 600;
}
.nav-trigger.active {
  color: #fff;
  background: #b91c1c;
  border-color: #b91c1c;
}
.chevron {
  transition: transform 0.15s ease;
}
.chevron.rotated {
  transform: rotate(180deg);
}

.dropdown-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 20;
}

.dropdown-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  width: min(400px, 90vw);
  background: #fff;
  z-index: 21;
  padding: 2rem 1.75rem;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
}
.dropdown-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #b91c1c;
}
.dropdown-heading h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #b91c1c;
  letter-spacing: 0.02em;
}
.dropdown-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #111827;
  line-height: 1;
  padding: 0.25rem;
}
.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.dropdown-list a {
  color: #111827;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}
.dropdown-list a:hover {
  color: #b91c1c;
}
</style>
