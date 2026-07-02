<script setup lang="ts">
const { hasPermission } = useAuth()
const { data: contentsRes, refresh } = await useApi<{ data: any[] }>('/contents')

const TYPE_LABEL: Record<string, string> = { promo: 'Promo', banner: 'Banner', berita: 'Berita' }

const showForm = ref(false)
const editingId = ref<number | null>(null)
const error = ref('')
const form = reactive({
  type: 'promo',
  title: '',
  description: '',
  imageUrl: '',
  isActive: true,
  startDate: '',
  endDate: '',
})

function resetForm() {
  form.type = 'promo'
  form.title = ''
  form.description = ''
  form.imageUrl = ''
  form.isActive = true
  form.startDate = ''
  form.endDate = ''
}

function openCreate() {
  editingId.value = null
  resetForm()
  showForm.value = true
}

function openEdit(item: any) {
  editingId.value = item.id
  form.type = item.type
  form.title = item.title
  form.description = item.description ?? ''
  form.imageUrl = item.image_url ?? ''
  form.isActive = !!item.is_active
  form.startDate = item.start_date ? item.start_date.slice(0, 10) : ''
  form.endDate = item.end_date ? item.end_date.slice(0, 10) : ''
  showForm.value = true
}

async function handleSubmit() {
  error.value = ''
  try {
    if (editingId.value) {
      await apiFetch(`/contents/${editingId.value}`, { method: 'PUT', body: form })
    } else {
      await apiFetch('/contents', { method: 'POST', body: form })
    }
    showForm.value = false
    await refresh()
  } catch (err: any) {
    error.value = err?.data?.message || 'Gagal menyimpan konten'
  }
}

async function handleDelete(id: number) {
  if (!confirm('Hapus konten ini?')) return
  await apiFetch(`/contents/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Konten</h1>
      <button v-if="hasPermission('content.manage')" @click="openCreate">+ Tambah Konten</button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Tipe</th>
          <th>Status</th>
          <th>Periode</th>
          <th v-if="hasPermission('content.manage')"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in contentsRes?.data ?? []" :key="item.id">
          <td>{{ item.title }}</td>
          <td><span class="badge">{{ TYPE_LABEL[item.type] }}</span></td>
          <td>{{ item.is_active ? 'Aktif' : 'Nonaktif' }}</td>
          <td>{{ item.start_date?.slice(0, 10) || '-' }} s/d {{ item.end_date?.slice(0, 10) || '-' }}</td>
          <td v-if="hasPermission('content.manage')" class="actions">
            <button class="link" @click="openEdit(item)">Ubah</button>
            <button class="link danger" @click="handleDelete(item.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showForm" class="modal-backdrop" @click.self="showForm = false">
      <form class="modal" @submit.prevent="handleSubmit">
        <h2>{{ editingId ? 'Ubah Konten' : 'Tambah Konten' }}</h2>
        <label>
          Tipe
          <select v-model="form.type">
            <option value="promo">Promo</option>
            <option value="banner">Banner</option>
            <option value="berita">Berita</option>
          </select>
        </label>
        <label>
          Judul
          <input v-model="form.title" required />
        </label>
        <label>
          Deskripsi
          <textarea v-model="form.description" rows="3"></textarea>
        </label>
        <label>
          URL Gambar
          <input v-model="form.imageUrl" type="url" placeholder="https://..." />
        </label>
        <label>
          Tanggal Mulai
          <input v-model="form.startDate" type="date" />
        </label>
        <label>
          Tanggal Selesai
          <input v-model="form.endDate" type="date" />
        </label>
        <label>
          <input v-model="form.isActive" type="checkbox" style="width: auto; display: inline-block" />
          Aktif
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
</style>
