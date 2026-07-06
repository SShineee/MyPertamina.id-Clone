<script setup lang="ts">
import { fuelProductColumns } from '~/composables/useFuelPriceMatrix'

// Tipe data diubah menjadi any[] agar fleksibel menerima data dinamis dari backend
const props = defineProps<{
  rows: any[]
  searching: boolean
}>()

function formatRupiah(value: number | null | undefined) {
  if (value == null) return '-'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

// Fungsi pembantu untuk mencari harga berdasarkan nama kolom (kebal huruf besar/kecil & beda istilah)
function getPrice(row: any, colName: string) {
  let searchKey = colName.toLowerCase()
  
  // Penyesuaian jika di UI bernama "Biosolar" tapi di database "Solar"
  if (searchKey.includes('biosolar')) {
    searchKey = 'solar'
  }

  // Cari data di objek row yang namanya cocok
  const foundKey = Object.keys(row).find(key => key.toLowerCase() === searchKey)
  
  return foundKey ? row[foundKey] : null
}
</script>

<template>
  <div class="table-wrapper">
    <p v-if="!rows.length" class="empty-state">
      {{ searching ? 'Provinsi tidak ditemukan.' : 'Belum ada data harga BBM.' }}
    </p>

    <table v-else class="fuel-table">
      <thead>
        <tr>
          <th class="col-province">Provinsi</th>
          <th v-for="col in fuelProductColumns" :key="col.key" :style="{ background: col.text }">
            <span class="product-name">{{ col.name }}</span>
            <span v-if="col.tag" class="product-tag" :style="{ background: col.bg, color: col.text }">{{ col.tag }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.province">
          <td class="col-province">
            {{ row.province }}
            <span v-if="row.ftz" class="ftz-label">FTZ</span>
          </td>
          
          <td
            v-for="col in fuelProductColumns"
            :key="col.key"
            :style="{ background: getPrice(row, col.name) != null ? col.bg : '#f9fafb', color: col.text }"
            :class="{ 'is-dash': getPrice(row, col.name) == null }"
          >
            {{ formatRupiah(getPrice(row, col.name)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}
.empty-state {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}
.fuel-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  min-width: 720px;
}
.fuel-table th,
.fuel-table td {
  padding: 0.85rem 1rem;
  text-align: center;
  white-space: nowrap;
  font-size: 0.9rem;
}
.fuel-table thead th {
  color: #fff;
  font-weight: 700;
}
.product-name {
  display: block;
}
.product-tag {
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
}
.col-province {
  position: sticky;
  left: 0;
  z-index: 1;
  text-align: left;
  font-weight: 600;
  background: #1e3a8a;
  color: #fff;
}
tbody .col-province {
  background: #fff;
  color: #111827;
  font-weight: 500;
  border-right: 1px solid #e5e7eb;
}
.ftz-label {
  margin-left: 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
}
.fuel-table tbody tr:nth-child(even) td:not(.col-province) {
  filter: brightness(0.97);
}
td.is-dash {
  color: #9ca3af;
  font-weight: 600;
}
</style>