<script setup lang="ts">
const { hasPermission } = useAuth()
const { data: pricesRes, refresh } = await useApi<{ data: any[] }>('/prices')

const showForm = ref(false)
const editingId = ref<number | null>(null)
const form = reactive({ province: '', fuelType: '', price: 0, unit: 'liter' })
const error = ref('')

// Daftar lengkap provinsi untuk pilihan di form agar seragam
const provincesList = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi',
  'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung',
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten',
  'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat',
  'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
  'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara',
  'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat',
  'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'
]

function openCreate() {
  editingId.value = null
  form.province = ''
  form.fuelType = ''
  form.price = 0
  form.unit = 'liter'
  showForm.value = true
}

function openEdit(item: any) {
  editingId.value = item.id
  form.province = item.province
  form.fuelType = item.fuel_type
  form.price = item.price
  form.unit = item.unit
  showForm.value = true
}

async function handleSubmit() {
  error.value = ''
  try {
    if (editingId.value) {
      await apiFetch(`/prices/${editingId.value}`, { method: 'PUT', body: { price: form.price, unit: form.unit } })
    } else {
      await apiFetch('/prices', { method: 'POST', body: form })
    }
    showForm.value = false
    await refresh()
  } catch (err: any) {
    error.value = err?.data?.message || 'Gagal menyimpan harga BBM'
  }
}

async function handleDelete(id: number) {
  if (!confirm('Hapus jenis BBM ini?')) return
  await apiFetch(`/prices/${id}`, { method: 'DELETE' })
  await refresh()
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Harga BBM</h1>
      <button v-if="hasPermission('price.update')" @click="openCreate">+ Tambah Jenis BBM</button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Provinsi</th>
          <th>Jenis BBM</th>
          <th>Harga</th>
          <th>Satuan</th>
          <th>Diperbarui</th>
          <th v-if="hasPermission('price.update')"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pricesRes?.data ?? []" :key="item.id">
          <td>{{ item.province }}</td>
          <td>{{ item.fuel_type }}</td>
          <td>{{ formatRupiah(item.price) }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ new Date(item.updated_at).toLocaleString('id-ID') }}</td>
          <td v-if="hasPermission('price.update')" class="actions">
            <button class="link" @click="openEdit(item)">Ubah</button>
            <button class="link danger" @click="handleDelete(item.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
      <form class="modal" @submit.prevent="handleSubmit">
        <h2>{{ editingId ? 'Ubah Harga' : 'Tambah Jenis BBM' }}</h2>
        
        <label>
          Provinsi
          <select v-model="form.province" required :disabled="!!editingId">
            <option value="" disabled>Pilih Provinsi</option>
            <option v-for="prov in provincesList" :key="prov" :value="prov">
              {{ prov }}
            </option>
          </select>
        </label>

        <label>
          Jenis BBM
          <input v-model="form.fuelType" required :disabled="!!editingId" placeholder="Cth: Pertamax" />
        </label>
        
        <label>
          Harga (Rp)
          <input v-model.number="form.price" type="number" min="0" required />
        </label>
        
        <label>
          Satuan
          <input v-model="form.unit" required />
        </label>
        
        <p v-if="error" class="error">{{ error }}</p>
        <div class="modal-actions">
          <button type="button" class="secondary" @click="showForm = false">Batal</button>
          <button type="submit">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.modal select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>