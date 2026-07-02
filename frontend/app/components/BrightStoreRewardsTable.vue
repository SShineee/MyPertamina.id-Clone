<script setup lang="ts">
const rewards = [
  { product: 'Kopi Bright Cafe', points: 5, note: 'Berlaku semua varian ukuran' },
  { product: 'Roti & Pastry', points: 3, note: 'Kecuali produk musiman' },
  { product: 'Minuman Kemasan', points: 2, note: 'Min. pembelian Rp10.000' },
  { product: 'Snack & Keripik', points: 2, note: 'Semua merek terdaftar' },
  { product: 'Mi Instan Cup', points: 3, note: '-' },
  { product: 'Es Krim', points: 4, note: 'Berlaku produk kemasan cup & stick' },
  { product: 'Produk Perawatan Diri', points: 6, note: 'Min. pembelian Rp25.000' },
  { product: 'Rokok', points: 1, note: 'Poin tidak berlaku kelipatan' },
  { product: 'Air Mineral', points: 1, note: '-' },
  { product: 'Susu & Dairy', points: 3, note: 'Kecuali produk diskon' },
  { product: 'Bumbu Dapur', points: 2, note: 'Min. pembelian Rp15.000' },
  { product: 'Voucher Pulsa & Data', points: 5, note: 'Berlaku semua nominal' },
]

const page = ref(1)
const pageSize = 8

const paginatedRewards = computed(() => {
  const start = (page.value - 1) * pageSize
  return rewards.slice(start, start + pageSize)
})
</script>

<template>
  <section class="container section">
    <h2>Jajan di Bright Store Berlimpah Poin</h2>
    <p class="description">Kumpulkan poin MyPertamina dari setiap pembelian produk di Bright Store.</p>

    <div class="table-wrapper">
      <table class="rewards-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Poin Rewards</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in paginatedRewards" :key="item.product">
            <td>{{ (page - 1) * pageSize + i + 1 }}</td>
            <td>{{ item.product }}</td>
            <td>{{ item.points }} poin</td>
            <td>{{ item.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <LocationPagination v-model:page="page" :page-size="pageSize" :total="rewards.length" accent-color="#1d4ed8" />
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.description {
  margin: 0 0 1.5rem;
  color: #374151;
}
.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}
.rewards-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
}
.rewards-table th,
.rewards-table td {
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-size: 0.9rem;
}
.rewards-table thead tr {
  background: #1d4ed8;
}
.rewards-table thead th {
  color: #fff;
  font-weight: 700;
}
.rewards-table tbody tr {
  border-top: 1px solid #f3f4f6;
}
</style>
