<script setup lang="ts">
const props = defineProps<{
  prices: Array<{ id: number; fuel_type: string; price: number; unit: string }>
  pending: boolean
}>()

const PRODUCT_ROUTES: Record<string, string> = {
  Pertamax: '/product/gasoline/pertamax',
  'Pertamax Turbo': '/product/gasoline/pertamax-turbo',
  'Pertamax Green 95': '/product/gasoline/pertamax-green-95',
  'Pertamina Dex': '/product/diesel/pertamina-dex',
  Dexlite: '/product/diesel/dexlite',
}
const FALLBACK_ROUTE = '/about/product-price'

interface FuelPriceRange {
  fuelType: string
  minPrice: number
  maxPrice: number
  unit: string
  to: string
}

const groupedPrices = computed<FuelPriceRange[]>(() => {
  const groups = new Map<string, FuelPriceRange>()

  for (const item of props.prices) {
    const existing = groups.get(item.fuel_type)
    if (!existing) {
      groups.set(item.fuel_type, {
        fuelType: item.fuel_type,
        minPrice: item.price,
        maxPrice: item.price,
        unit: item.unit,
        to: PRODUCT_ROUTES[item.fuel_type] ?? FALLBACK_ROUTE,
      })
    } else {
      existing.minPrice = Math.min(existing.minPrice, item.price)
      existing.maxPrice = Math.max(existing.maxPrice, item.price)
    }
  }

  return Array.from(groups.values())
})

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

function formatRange(item: FuelPriceRange) {
  if (item.minPrice === item.maxPrice) return formatRupiah(item.minPrice)
  return `${formatRupiah(item.minPrice)} - ${formatRupiah(item.maxPrice)}`
}
</script>

<template>
  <div class="price-table">
    <p v-if="pending">Memuat harga BBM...</p>
    <p v-else-if="!groupedPrices.length">Belum ada data harga BBM.</p>
    <div v-else class="price-grid">
      <NuxtLink v-for="item in groupedPrices" :key="item.fuelType" :to="item.to" class="price-card">
        <h3>{{ item.fuelType }}</h3>
        <p class="price">{{ formatRange(item) }}</p>
        <p class="unit">/ {{ item.unit }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}
.price-card {
  display: block;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;
  text-decoration: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.price-card:hover {
  border-color: #b91c1c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.price-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #374151;
}
.price {
  font-size: 1.35rem;
  font-weight: 700;
  color: #b91c1c;
  margin: 0;
}
.unit {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.85rem;
}
</style>
