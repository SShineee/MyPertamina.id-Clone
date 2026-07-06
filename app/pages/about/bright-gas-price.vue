<script setup lang="ts">
interface BrightGasPrice {
  id: number
  province: string
  price_5_5kg: number | null
  price_12kg: number | null
  updated_at: string
}

const { data: res, pending } = await useApi<{ data: BrightGasPrice[]; lastUpdatedAt: string | null }>(
  '/bright-gas-prices'
)

const search = ref('')

const filteredPrices = computed(() => {
  const prices = res.value?.data ?? []
  const query = search.value.trim().toLowerCase()
  if (!query) return prices
  return prices.filter((item) => item.province.toLowerCase().includes(query))
})

const updatedAtLabel = computed(() => {
  const value = res.value?.lastUpdatedAt
  if (!value) return null
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
})

function formatRupiah(value: number | null) {
  if (value === null) return '-'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <div>
    <AppHeader />

    <section class="intro">
      <div class="container">
        <h1 class="title">
          Informasi <span class="pink">Harga Jual Bright Gas</span>
        </h1>
        <p class="description">
          Temukan informasi harga Bright Gas terbaru dari Pertamina untuk memenuhi kebutuhan energi rumah tangga
          Anda.
        </p>
        <p class="footnote">
          *) Tidak tersedia SPBE di wilayah tersebut.<br />
          * Harga Jual ex-Agen (Rp/Tabung) berlaku untuk wilayah dengan radius 60km dari SPBE, untuk harga jual di
          lokasi di luar radius 60km ditambah dengan biaya distribusi dengan tarif yang wajar.<br />
          * Harga jual ex-Agen sudah termasuk margin Agen, PPN, dan PPh sesuai ketentuan yang berlaku.
        </p>

        <div class="toolbar">
          <span v-if="updatedAtLabel" class="badge">Diperbarui pada {{ updatedAtLabel }}</span>
          <span v-else class="badge" />

          <label class="search">
            <input v-model="search" type="search" placeholder="Cari provinsi" aria-label="Cari provinsi" />
            <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M11.5 11.5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </label>
        </div>
      </div>
    </section>

    <section class="container table-section">
      <p v-if="pending">Memuat data harga...</p>
      <template v-else>
        <table v-if="filteredPrices.length" class="price-table">
          <thead>
            <tr>
              <th>Provinsi</th>
              <th>Bright Gas 5,5Kg</th>
              <th>Bright Gas 12Kg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredPrices" :key="item.id">
              <td class="province">{{ item.province }}</td>
              <td class="price">{{ formatRupiah(item.price_5_5kg) }}</td>
              <td class="price">{{ formatRupiah(item.price_12kg) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">
          Provinsi "{{ search }}" tidak ditemukan. Coba kata kunci lain, mis. nama pulau atau provinsi terdekat.
        </p>
      </template>
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
.title .pink {
  color: #ec4899;
}
.description {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  color: #374151;
  max-width: 720px;
}
.footnote {
  margin: 0 0 2rem;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.6;
  max-width: 900px;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.badge {
  display: inline-flex;
  align-items: center;
  background: #fff;
  border-radius: 999px;
  padding: 0.55rem 1.25rem;
  font-size: 0.9rem;
  color: #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.search {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.search input {
  width: 260px;
  padding: 0.6rem 2.5rem 0.6rem 1.1rem;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 0.9rem;
}
.search input::placeholder {
  color: #9ca3af;
}
.search-icon {
  position: absolute;
  right: 0.9rem;
  color: #9ca3af;
  pointer-events: none;
}

.table-section {
  padding: 2rem 0 3rem;
}
.price-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.price-table thead tr {
  background: #ec4899;
}
.price-table th {
  color: #fff;
  text-align: left;
  padding: 0.9rem 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}
.price-table th:not(:first-child) {
  text-align: center;
}
.price-table td {
  padding: 0.9rem 1.5rem;
  font-size: 0.95rem;
  color: #111827;
}
.price-table tbody tr:nth-child(odd) {
  background: #fff;
}
.price-table tbody tr:nth-child(even) {
  background: #fdf2f8;
}
.price-table .province {
  text-align: left;
}
.price-table .price {
  text-align: center;
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
