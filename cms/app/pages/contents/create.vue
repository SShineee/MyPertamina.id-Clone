<template>
  <div class="form-container">
    <h2>Tambah Konten Baru</h2>
    
    <form @submit.prevent="submitForm" class="content-form">
      
      <div class="form-group">
        <label for="type">Tipe Konten *</label>
        <select id="type" v-model="formData.type" required>
          <option value="" disabled>Pilih Tipe</option>
          <option value="promo">Promo</option>
          <option value="banner">Banner</option>
          <option value="berita">Berita</option>
        </select>
      </div>

      <div class="form-group">
        <label for="title">Judul *</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>

      <div class="form-group">
        <label for="category">Kategori</label>
        <input type="text" id="category" v-model="formData.category" />
      </div>

      <div class="form-group">
        <label for="slug">Slug (URL)</label>
        <input type="text" id="slug" v-model="formData.slug" placeholder="contoh-judul-promo" />
      </div>

      <div class="form-group">
        <label for="description">Deskripsi Singkat</label>
        <textarea id="description" v-model="formData.description" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label for="bodyHtml">Isi Konten (HTML)</label>
        <textarea id="bodyHtml" v-model="formData.bodyHtml" rows="5"></textarea>
      </div>

      <div class="form-group">
        <label for="image">Upload Gambar Banner</label>
        <input type="file" id="image" accept="image/*" @change="handleFileChange" />
      </div>

      <div class="form-group">
        <label for="startDate">Tanggal Mulai</label>
        <input type="date" id="startDate" v-model="formData.startDate" />
      </div>

      <div class="form-group">
        <label for="endDate">Tanggal Berakhir</label>
        <input type="date" id="endDate" v-model="formData.endDate" />
      </div>

      <div class="form-group checkbox-group">
        <input type="checkbox" id="isActive" v-model="formData.isActive" />
        <label for="isActive">Aktifkan Konten Ini</label>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Menyimpan...' : 'Simpan Konten' }}
      </button>

      <p v-if="message" :class="isError ? 'error-msg' : 'success-msg'">
        {{ message }}
      </p>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// State untuk menyimpan data inputan form (kecuali file)
const formData = ref({
  type: '',
  title: '',
  category: '',
  slug: '',
  description: '',
  bodyHtml: '',
  isActive: true,
  startDate: '',
  endDate: ''
});

// State untuk menyimpan objek file gambar
const selectedFile = ref(null);

// State untuk UI feedback
const isLoading = ref(false);
const message = ref('');
const isError = ref(false);

// Fungsi untuk menangkap file dari input type="file"
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

// Fungsi untuk mengirim data ke Backend
const submitForm = async () => {
  isLoading.value = true;
  message.value = '';
  isError.value = false;

  try {
    // Karena kita mengirim file, kita WAJIB menggunakan FormData (bukan JSON)
    const dataToSend = new FormData();
    
    // Masukkan data teks ke dalam FormData
    dataToSend.append('type', formData.value.type);
    dataToSend.append('title', formData.value.title);
    dataToSend.append('category', formData.value.category);
    dataToSend.append('slug', formData.value.slug);
    dataToSend.append('description', formData.value.description);
    dataToSend.append('bodyHtml', formData.value.bodyHtml);
    dataToSend.append('isActive', formData.value.isActive);
    
    if (formData.value.startDate) dataToSend.append('startDate', formData.value.startDate);
    if (formData.value.endDate) dataToSend.append('endDate', formData.value.endDate);

    // Masukkan file gambar ke FormData JIKA ADA
    // Nama 'image' harus sama dengan yang di uploadPromo.single('image') di backend
    if (selectedFile.value) {
      dataToSend.append('image', selectedFile.value);
    }

    // Ambil token dari localStorage (sesuaikan jika kamu menyimpannya di tempat lain, misal cookies)
    const token = localStorage.getItem('token') || '';

    // Lakukan HTTP Request ke Backend menggunakan $fetch bawaan Nuxt
    const response = await $fetch('http://localhost:3001/api/contents', {
      method: 'POST',
      body: dataToSend,
      headers: {
        // Jangan set 'Content-Type': 'multipart/form-data' secara manual di $fetch.
        // Browser akan otomatis mengaturnya berserta 'boundary'-nya jika mendeteksi FormData.
        'Authorization': `Bearer ${token}`
      }
    });

    message.value = 'Konten berhasil disimpan!';
    
    // (Opsional) Reset form setelah sukses
    // formData.value.title = ''; dsb...

  } catch (error) {
    console.error("Error submit:", error);
    isError.value = true;
    message.value = error.data?.message || 'Gagal menyimpan konten. Coba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* CSS murni agar form rapi dan mudah dibaca */
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

.content-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

button {
  padding: 12px;
  background-color: #0056b3; /* Warna biru Pertamina (pendekatan) */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.success-msg {
  color: green;
  font-weight: bold;
}

.error-msg {
  color: red;
  font-weight: bold;
}
</style>