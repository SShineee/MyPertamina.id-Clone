<script setup lang="ts">
import { fuelProductColumns, type ProvinceFuelPrice } from '~/composables/useFuelPriceMatrix'

const props = defineProps<{
  rows: ProvinceFuelPrice[]
  searching: boolean
}>()

function formatRupiah(value: number | null) {
  if (value == null) return '-'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
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
            :style="{ background: row.prices[col.key] != null ? col.bg : '#f9fafb', color: col.text }"
            :class="{ 'is-dash': row.prices[col.key] == null }"
          >
            {{ formatRupiah(row.prices[col.key] ?? null) }}
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
