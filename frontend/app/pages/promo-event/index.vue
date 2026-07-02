<script setup lang="ts">
interface PromoItem {
  id: number
  category: string | null
  slug: string | null
  title: string
  description: string | null
  image_url: string | null
  created_at: string
}

const CATEGORIES = ['Semua', 'Event', 'Feature', 'Program Loyalty', 'Program Promo', 'Subsidi Tepat', 'Updates']

const selectedCategory = ref('Semua')
const searchInput = ref('')
const appliedSearch = ref('')

const queryParams = computed(() => {
  const params: Record<string, string> = { type: 'promo', activeOnly: 'true' }
  if (selectedCategory.value !== 'Semua') params.category = selectedCategory.value
  if (appliedSearch.value) params.search = appliedSearch.value
  return params
})

const { data: res, pending } = await useApi<{ data: PromoItem[] }>('/contents', {
  query: queryParams,
})

const promos = computed(() => res.value?.data ?? [])

function selectCategory(category: string) {
  selectedCategory.value = category
}

function submitSearch() {
  appliedSearch.value = searchInput.value.trim()
}
</script>

<template>
  <div>
    <AppHeader />

    <section class="intro">
      <div class="container">
        <h1 class="title"><span class="highlight">Program &amp; Promo</span> Istimewa dari MyPertamina</h1>
        <p class="description">
          Jangan lewatkan kesempatan mendapatkan penawaran dari berbagai program seru dan promo menarik seperti
          potongan harga, bonus saldo, cashback, voucher partner, dan merchandise eksklusif dari MyPertamina.
        </p>

        <div class="toolbar">
          <div class="category-filter">
            <button
              v-for="category in CATEGORIES"
              :key="category"
              type="button"
              class="category-pill"
              :class="{ active: selectedCategory === category }"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>

          <form class="search" @submit.prevent="submitSearch">
            <input v-model="searchInput" type="search" placeholder="Cari" aria-label="Cari promo" @keyup.enter="submitSearch" />
            <button type="submit" aria-label="Cari" class="search-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5" />
                <path d="M11.5 11.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section class="container grid-section">
      <p v-if="pending">Memuat promo...</p>
      <div v-else-if="promos.length" class="promo-grid">
        <NuxtLink v-for="promo in promos" :key="promo.id" :to="`/promo-event/${promo.slug}`" class="promo-link">
          <PromoCard
            :title="promo.title"
            :category="promo.category ?? 'Promo'"
            :image-url="promo.image_url"
            :published-at="promo.created_at"
          />
        </NuxtLink>
      </div>
      <p v-else class="empty-state">Tidak ada promo yang cocok dengan pencarian/filter kamu.</p>
    </section>
  </div>
</template>

<style scoped>
.intro {
  background: linear-gradient(120deg, #fdf1f6 0%, #f3f0fa 50%, #eef2fb 100%);
  padding: 3rem 0 2rem;
}
.title {
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
}
.title .highlight {
  color: #1d4ed8;
}
.description {
  margin: 0 0 1.75rem;
  font-size: 1.05rem;
  color: #374151;
  max-width: 900px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.category-pill {
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}
.category-pill.active {
  background: #1d4ed8;
  border-color: #1d4ed8;
  color: #fff;
}
.search {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.search input {
  width: 220px;
  padding: 0.6rem 2.5rem 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 0.9rem;
}
.search-button {
  position: absolute;
  right: 0.4rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.3rem;
}

.grid-section {
  padding: 2.5rem 0 3.5rem;
}
.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem 1.75rem;
}
.promo-link {
  text-decoration: none;
  color: inherit;
}
.empty-state {
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: #6b7280;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}
</style>
