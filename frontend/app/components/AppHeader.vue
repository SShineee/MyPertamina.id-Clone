<script setup lang="ts">
interface SubmenuItem {
  label: string
  to?: string
  href?: string
  external?: boolean
}

interface SubmenuLink {
  label: string
  to?: string
  href?: string
  external?: boolean
}

interface SubmenuGroup {
  key: string
  label: string
  links: SubmenuLink[]
}

interface NavItem {
  key: string
  label: string
  to?: string
  submenu?: { title: string; items?: SubmenuItem[]; groups?: SubmenuGroup[] }
}

const route = useRoute()
const logoFailed = ref(false)

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
        { label: 'Keuntungan MyPertamina', to: '/about/keuntungan-mypertamina' },
        { label: 'MyPertamina Channel', to: '/about/mypertamina-channel' },
      ],
    },
  },
  { key: 'program-promo', label: 'Program & Promo', to: '/promo-event' },
  {
    key: 'produk',
    label: 'Produk',
    submenu: {
      title: 'Produk',
      items: [
        { label: 'Pertamax Turbo', to: '/product/gasoline/pertamax-turbo' },
        { label: 'Pertamax Green 95', to: '/product/gasoline/pertamax-green-95' },
        { label: 'Pertamax', to: '/product/gasoline/pertamax' },
        { label: 'Pertamina Dex', to: '/product/diesel/pertamina-dex' },
        { label: 'Dexlite', to: '/product/diesel/dexlite' },
        { label: 'Bright Gas', to: '/product/lpg/bright-gas' },
        { label: 'Lubricants', href: 'https://www.pertaminalubricants.com/', external: true },
        { label: 'E-Voucher MyPertamina', to: '/product/e-voucher' },
      ],
    },
  },
  {
    key: 'subsidi-tepat',
    label: 'Subsidi Tepat',
    submenu: {
      title: 'Subsidi Tepat',
      groups: [
        {
          key: 'bbm',
          label: 'Subsidi Tepat BBM',
          links: [
            { label: 'Pendaftaran Subsidi Tepat BBM', href: 'https://subsiditepat.mypertamina.id/', external: true },
            { label: 'Subsidi Tepat via MyPertamina', to: '/subsidi-tepat/subsidi-tepat-via-mypertamina' },
            {
              label: 'FAQ Subsidi Tepat BBM',
              href: 'https://subsiditepat.mypertamina.id/pertanyaan-umum-subsidi-tepat',
              external: true,
            },
          ],
        },
        {
          key: 'lpg',
          label: 'Subsidi Tepat LPG 3kg',
          links: [
            { label: 'FAQ Subsidi Tepat LPG', href: 'https://subsiditepatlpg.mypertamina.id/infolpg3kg', external: true },
          ],
        },
      ],
    },
  },
  {
    key: 'lokasi',
    label: 'Lokasi',
    submenu: {
      title: 'SPBU Pertamina',
      items: [
        { label: 'SPBU Pertamina', to: '/spbu-location/spbu-pertamina' },
        { label: 'SPBU Pertamina Green Energy Station (GES)', to: '/spbu-location/ges' },
        { label: 'Pertamax Green 95', to: '/spbu-location/pertamax-green-95' },
        { label: 'Bright Store', to: '/spbu-location/bright-store' },
        { label: 'Bright Cafe', to: '/spbu-location/bright-cafe' },
        { label: 'Outlet / Agen LPG', to: '/spbu-location/lpg' },
      ],
    },
  },
  {
    key: 'sustainability',
    label: 'Sustainability',
    submenu: {
      title: 'Sustainability',
      items: [
        { label: 'SPBU Green Energy Station', to: '/sustainability/green-energy-station' },
        { label: 'Kumpulkan Minyak Jelantah', to: '/sustainability/kumpulkan-minyak-jelantah' },
        { label: 'Laporan Keberlanjutan', to: '/sustainability/laporan' },
      ],
    },
  },
  { key: 'kontak', label: 'Kontak', to: '/contact' },
]

const openKey = ref<string | null>(null)
const openGroupKey = ref<string | null>(null)
const headerEl = ref<HTMLElement | null>(null)
const panelTop = ref(0)

const currentSubmenu = computed(() => navItems.find((item) => item.key === openKey.value)?.submenu ?? null)
const activeGroup = computed(() => currentSubmenu.value?.groups?.find((group) => group.key === openGroupKey.value) ?? null)

function isActive(to: string) {
  return route.path === to
}

function openDropdown(key: string) {
  openKey.value = key
  openGroupKey.value = null
}

function toggleDropdown(key: string) {
  if (openKey.value === key) {
    closeDropdown()
  } else {
    openDropdown(key)
  }
}

function openGroup(key: string) {
  openGroupKey.value = key
}

function closeDropdown() {
  openKey.value = null
  openGroupKey.value = null
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
    <div class="header-inner">
      <NuxtLink to="/" class="logo" aria-label="MyPertamina">
        <img
          v-if="!logoFailed"
          src="/images/branding/mypertamina-logo.png"
          alt="MyPertamina"
          class="logo-image"
          @error="logoFailed = true"
        />
        <template v-else>
          <span class="logo-mark">My</span>
          <span class="logo-word">PERTAMINA</span>
        </template>
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
            @click="toggleDropdown(item.key)"
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

    <template v-if="currentSubmenu">
      <div class="dropdown-backdrop" :style="{ top: panelTop + 'px' }" @click="closeDropdown" />

      <div v-if="currentSubmenu.groups" class="drawer-stack" :style="{ top: panelTop + 'px' }">
        <aside class="drawer-panel">
          <div class="dropdown-heading drawer-heading">
            <h2>{{ currentSubmenu.title.toUpperCase() }}</h2>
            <button type="button" class="dropdown-close" aria-label="Tutup submenu" @click="closeDropdown">✕</button>
          </div>
          <ul class="group-list">
            <li v-for="group in currentSubmenu.groups" :key="group.key">
              <button
                type="button"
                class="group-item"
                :class="{ active: openGroupKey === group.key }"
                @click="openGroup(group.key)"
              >
                <span>{{ group.label }}</span>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                  <path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </li>
          </ul>
        </aside>

        <Transition name="slide-right">
          <aside v-if="activeGroup" class="drawer-panel">
            <div class="dropdown-heading drawer-heading">
              <h2>{{ activeGroup.label.toUpperCase() }}</h2>
              <button type="button" class="dropdown-close" aria-label="Tutup submenu" @click="closeDropdown">✕</button>
            </div>
            <ul class="dropdown-list">
              <li v-for="link in activeGroup.links" :key="link.label">
                <a v-if="link.external" :href="link.href" target="_blank" rel="noopener noreferrer" @click="closeDropdown">{{
                  link.label
                }}</a>
                <NuxtLink v-else :to="link.to" @click="closeDropdown">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </aside>
        </Transition>
      </div>

      <aside v-else class="dropdown-panel" :style="{ top: panelTop + 'px' }">
        <div class="dropdown-heading">
          <h2>{{ currentSubmenu.title.toUpperCase() }}</h2>
          <button type="button" class="dropdown-close" aria-label="Tutup submenu" @click="closeDropdown">✕</button>
        </div>
        <ul class="dropdown-list">
          <li v-for="sub in currentSubmenu.items" :key="sub.label">
            <a
              v-if="sub.href"
              :href="sub.href"
              v-bind="sub.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
              @click="closeDropdown"
              >{{ sub.label }}</a
            >
            <NuxtLink v-else :to="sub.to!" @click="closeDropdown">{{ sub.label }}</NuxtLink>
          </li>
        </ul>
      </aside>
    </template>
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
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
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
.logo-image {
  height: 32px;
  width: auto;
  display: block;
}
.logo-mark {
  background: #b91c1c;
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
  color: #1d4ed8;
  letter-spacing: 0.02em;
}
.nav {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.15rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav::-webkit-scrollbar {
  display: none;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.45rem 0.65rem;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
  background: none;
  cursor: pointer;
  font-family: inherit;
}
.nav-link:hover {
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
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
.nav-trigger.active:hover {
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
  gap: 0.5rem;
}
.dropdown-list a {
  display: block;
  color: #111827;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.dropdown-list a:hover {
  color: #b91c1c;
  background: #f3f4f6;
}

.drawer-stack {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 21;
  display: flex;
  align-items: stretch;
}
.drawer-panel {
  width: min(320px, 85vw);
  background: #fff;
  padding: 2rem 1.75rem;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
}
.drawer-heading {
  border-bottom-color: #1d4ed8;
}
.drawer-heading h2 {
  color: #1d4ed8;
}
.group-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.group-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #f3f4f6;
  color: #111827;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
}
.group-item.active {
  background: #1d4ed8;
  color: #fff;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}

@media (max-width: 640px) {
  .drawer-stack {
    right: 0;
  }
  .drawer-panel {
    width: 100vw;
  }
  .drawer-stack .drawer-panel:first-child {
    position: absolute;
    inset: 0;
  }
  .drawer-stack .drawer-panel:last-child {
    position: relative;
  }
}
</style>
