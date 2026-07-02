<script setup lang="ts">
defineProps<{
  updatedAt: string
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="price-info-header">
    <div class="price-info-top">
      <div class="price-info-heading">
        <h1>Informasi <span class="accent-blue">Harga BBM</span></h1>
        <p>
          Informasi harga Bahan Bakar Minyak (BBM) berikut ini akurat dan diperbarui secara
          real-time berdasarkan provinsi, sesuai dengan ketetapan resmi Pertamina.
        </p>
      </div>

      <span class="badge">Berlaku per tanggal {{ updatedAt }}</span>
    </div>

    <label class="search-bar">
      <span class="icon-search" aria-hidden="true">&#128269;</span>
      <input
        type="text"
        placeholder="Cari nama provinsi"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </label>
  </div>
</template>

<style scoped>
.price-info-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.price-info-top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.price-info-heading h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}
.accent-blue {
  color: #1d4ed8;
}
.price-info-heading p {
  margin: 0;
  max-width: 640px;
  color: #374151;
}
.badge {
  flex-shrink: 0;
  background: #f3f4f6;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  white-space: nowrap;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-end;
  width: 100%;
  max-width: 280px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 0.5rem 1rem;
}
.icon-search {
  font-size: 0.9rem;
}
.search-bar input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.9rem;
  font-family: inherit;
  color: #111827;
}
</style>
