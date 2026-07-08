<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })

interface Vehicle {
  id: number
  plate_number: string
  vehicle_type?: string
  fuel_type?: string
  is_subsidized: boolean | number
  qr_code?: string
  status: string
}

const { data, pending, error } = useAppFetch<Vehicle[]>('/vehicles')
const vehicles = computed(() => data.value?.data ?? [])
</script>

<template>
  <div>
    <h1 class="page-title">Kendaraan Anda</h1>

    <DataState
      :pending="pending"
      :error="error"
      :empty="!vehicles.length"
      loading-text="Memuat kendaraan..."
      empty-text="Belum ada kendaraan terdaftar."
      empty-icon="🚗"
    >
      <div class="veh-grid">
        <article v-for="v in vehicles" :key="v.id" class="veh-card">
          <div class="veh-head">
            <span class="veh-emoji">🚗</span>
            <div>
              <p class="veh-plate">{{ v.plate_number }}</p>
              <p class="veh-type">{{ v.vehicle_type || 'Kendaraan' }}</p>
            </div>
            <span class="veh-status" :class="v.status">{{ v.status === 'active' ? 'Aktif' : v.status }}</span>
          </div>
          <div class="veh-body">
            <div class="veh-attr"><span>Jenis BBM</span><b>{{ v.fuel_type || '-' }}</b></div>
            <div class="veh-attr">
              <span>Subsidi Tepat</span>
              <b :class="{ sub: v.is_subsidized }">{{ v.is_subsidized ? 'Terdaftar' : 'Tidak' }}</b>
            </div>
          </div>
          <div v-if="v.qr_code" class="veh-qr">
            <span class="qr-mark">▤</span>
            <span class="qr-code">{{ v.qr_code }}</span>
          </div>
        </article>
      </div>
    </DataState>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 1.25rem;
  font-size: 1.5rem;
}
.veh-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.veh-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.25rem;
}
.veh-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}
.veh-emoji {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.veh-plate {
  margin: 0;
  font-weight: 800;
  font-size: 1.1rem;
  color: #111827;
  letter-spacing: 0.03em;
}
.veh-type {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
.veh-status {
  margin-left: auto;
  align-self: flex-start;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
}
.veh-status.inactive {
  background: #f3f4f6;
  color: #6b7280;
}
.veh-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 0;
}
.veh-attr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
}
.veh-attr span {
  color: #6b7280;
}
.veh-attr b {
  color: #111827;
}
.veh-attr b.sub {
  color: #16a34a;
}
.veh-qr {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 0.7rem;
  padding: 0.7rem 0.9rem;
  font-size: 0.8rem;
  color: #4b5563;
}
.qr-mark {
  font-size: 1.2rem;
}
.qr-code {
  font-family: monospace;
  word-break: break-all;
}
</style>
