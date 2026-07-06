<script setup lang="ts">
interface CategoryCard {
  key: string
  label: string
  color: string
  /** Path relatif di /public, mis. '/images/products/gasoline.png'. Kosongkan dulu, isi manual nanti. */
  image: string | null
  to?: string
  href?: string
  external?: boolean
}

const props = defineProps<{
  excludeKey?: string
}>()

const allCategories: CategoryCard[] = [
  { key: 'gasoline', label: 'Gasoline', color: '#dc2626', image: null, to: '/product/gasoline/pertamax-turbo' },
  { key: 'gasoil', label: 'Gasoil', color: '#16a34a', image: null, to: '/product/diesel/pertamina-dex' },
  { key: 'bright-gas', label: 'Bright Gas', color: '#c026d3', image: null, to: '/product/lpg/bright-gas' },
  {
    key: 'lubricants',
    label: 'Lubricants',
    color: '#111827',
    image: null,
    href: 'https://www.pertaminalubricants.com/',
    external: true,
  },
  { key: 'e-voucher', label: 'E-Voucher MyPertamina', color: '#2563eb', image: null, href: '#' },
]

const categories = computed(() => allCategories.filter((category) => category.key !== props.excludeKey))
</script>

<template>
  <section class="showcase">
    <h2><span class="highlight">Lihat Produk Pertamina</span> Lainnya</h2>
    <p class="showcase-subtitle">Masih banyak yang bisa kamu temukan di MyPertamina. Yuk, cek produk lainnya di sini!</p>

    <div class="category-grid">
      <template v-for="category in categories" :key="category.key">
        <NuxtLink v-if="category.to" :to="category.to" class="category-card" :style="{ '--card-color': category.color }">
          <img v-if="category.image" :src="category.image" :alt="category.label" class="category-image" />
          <div v-else class="category-image-placeholder" aria-hidden="true" />

          <div class="category-overlay" />

          <span class="category-label">{{ category.label.toUpperCase() }}</span>
          <span class="category-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </NuxtLink>

        <a
          v-else
          :href="category.href"
          class="category-card"
          :style="{ '--card-color': category.color }"
          v-bind="category.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
        >
          <img v-if="category.image" :src="category.image" :alt="category.label" class="category-image" />
          <div v-else class="category-image-placeholder" aria-hidden="true" />

          <div class="category-overlay" />

          <span class="category-label">{{ category.label.toUpperCase() }}</span>
          <span class="category-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </a>
      </template>
    </div>
  </section>
</template>

<style scoped>
.showcase h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.showcase h2 .highlight {
  color: #1d4ed8;
}
.showcase-subtitle {
  margin: 0 0 1.5rem;
  color: #6b7280;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
}
.category-card {
  position: relative;
  display: block;
  aspect-ratio: 5 / 8;
  border-radius: 1rem;
  overflow: hidden;
  background: var(--card-color);
  text-decoration: none;
}
.category-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category-image-placeholder {
  position: absolute;
  inset: 0;
  background: var(--card-color);
}
.category-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.45) 100%);
}
.category-label {
  position: absolute;
  left: 1rem;
  bottom: 1.1rem;
  z-index: 1;
  color: #fff;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  max-width: calc(100% - 3.5rem);
  line-height: 1.25;
}
.category-arrow {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 560px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
