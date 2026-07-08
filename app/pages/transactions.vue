<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface Transaction {
  id: number
  transaction_code: string
  spbu_name?: string
  fuel_type?: string
  liters?: number | string
  amount: number | string
  payment_method?: string
  transaction_date: string
  plate_number?: string
  vehicle_type?: string
}

const { data, pending, error } = useAppFetch<Transaction[]>('/transactions')
const transactions = computed(() => data.value?.data ?? [])
const total = computed(() => transactions.value.reduce((sum, t) => sum + Number(t.amount ?? 0), 0))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-title">Riwayat Transaksi</h1>
      <span v-if="transactions.length" class="total-badge">Total: {{ formatRupiah(total) }}</span>
    </div>

    <DataState
      :pending="pending"
      :error="error"
      :empty="!transactions.length"
      loading-text="Memuat transaksi..."
      empty-text="Belum ada transaksi. Yuk isi BBM pertamamu!"
      empty-icon="🧾"
    >
      <ul class="trx-list">
        <li v-for="t in transactions" :key="t.id" class="trx-card">
          <span class="trx-ic">⛽</span>
          <div class="trx-main">
            <div class="trx-top">
              <p class="trx-title">{{ t.fuel_type || 'Pembelian BBM' }}</p>
              <p class="trx-amount">{{ formatRupiah(t.amount) }}</p>
            </div>
            <p class="trx-sub">{{ t.spbu_name || 'SPBU Pertamina' }}</p>
            <div class="trx-tags">
              <span v-if="t.liters" class="tag">{{ t.liters }} Liter</span>
              <span v-if="t.plate_number" class="tag">{{ t.plate_number }}</span>
              <span v-if="t.payment_method" class="tag">{{ t.payment_method }}</span>
            </div>
            <div class="trx-foot">
              <span>{{ formatDateTime(t.transaction_date) }}</span>
              <span class="trx-code">{{ t.transaction_code }}</span>
            </div>
          </div>
        </li>
      </ul>
    </DataState>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.page-title {
  margin: 0;
  font-size: 1.5rem;
}
.total-badge {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
}
.trx-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.trx-card {
  display: flex;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.1rem 1.25rem;
}
.trx-ic {
  width: 46px;
  height: 46px;
  border-radius: 0.75rem;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
}
.trx-main {
  flex: 1;
  min-width: 0;
}
.trx-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.trx-title {
  margin: 0;
  font-weight: 700;
  color: #111827;
}
.trx-amount {
  margin: 0;
  font-weight: 800;
  color: #111827;
  white-space: nowrap;
}
.trx-sub {
  margin: 0.15rem 0 0.6rem;
  font-size: 0.88rem;
  color: #6b7280;
}
.trx-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}
.tag {
  background: #f3f4f6;
  color: #374151;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.trx-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8rem;
  color: #9ca3af;
  border-top: 1px solid #f3f4f6;
  padding-top: 0.6rem;
}
.trx-code {
  font-family: monospace;
}
</style>
