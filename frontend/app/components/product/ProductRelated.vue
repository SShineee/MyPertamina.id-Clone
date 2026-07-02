<script setup lang="ts">
interface RelatedProduct {
  id: number
  category: string
  slug: string
  name: string
  brand_color: string
  logo_url: string | null
  hero_background_url: string | null
}

const props = defineProps<{
  currentSlug: string
}>()

const { data: res } = await useApi<{ data: RelatedProduct[] }>('/products', {
  query: { excludeSlug: props.currentSlug },
})

const products = computed(() => res.value?.data ?? [])
const failedBg = reactive(new Set<number>())
const failedLogo = reactive(new Set<number>())
</script>

<template>
  <section v-if="products.length" class="related">
    <div class="container">
      <h2>Lihat Produk Pertamina Lainnya</h2>
      <p class="related-subtitle">Masih banyak yang bisa kamu temukan di MyPertamina. Yuk, cek produk lainnya di sini!</p>

      <div class="related-grid">
        <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="`/product/${product.category}/${product.slug}`"
          class="related-card"
          :style="{ '--brand-color': product.brand_color }"
        >
          <img
            v-if="product.hero_background_url && !failedBg.has(product.id)"
            :src="product.hero_background_url"
            alt=""
            class="related-bg"
            @error="failedBg.add(product.id)"
          />
          <div class="related-overlay" />
          <img
            v-if="product.logo_url && !failedLogo.has(product.id)"
            :src="product.logo_url"
            :alt="product.name"
            class="related-logo"
            @error="failedLogo.add(product.id)"
          />
          <p v-else class="related-name">{{ product.name }}</p>
          <span class="related-arrow" aria-hidden="true">&#8599;</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.related {
  padding: 3.5rem 0 4.5rem;
}
.related h2 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}
.related-subtitle {
  margin: 0 0 2rem;
  color: #6b7280;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}
.related-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(135deg, var(--brand-color), #111827);
  text-decoration: none;
}
.related-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.related-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}
.related-logo {
  position: relative;
  z-index: 1;
  max-width: 65%;
  max-height: 40%;
}
.related-name {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  text-align: center;
  padding: 0 1rem;
}
.related-arrow {
  position: absolute;
  z-index: 1;
  bottom: 0.9rem;
  right: 0.9rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
</style>
