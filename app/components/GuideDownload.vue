<script setup lang="ts">
withDefaults(
  defineProps<{
    imageSrc?: string
    pdfUrl?: string
  }>(),
  {
    imageSrc: '/images/benefit/guide-book.png',
    pdfUrl: '/documents/panduan-mypertamina.pdf',
  },
)
</script>

<template>
  <section class="container section guide-section">
    <div class="guide-visual">
      <img :src="imageSrc" alt="Buku Panduan MyPertamina" />
    </div>
    <div class="guide-text">
      <h2>Unduh Panduan</h2>
      <p>Pelajari cara memaksimalkan seluruh fitur MyPertamina lewat buku panduan resmi.</p>
      <a class="btn btn-primary" :href="pdfUrl" target="_blank" rel="noopener noreferrer">
        Lihat Sekarang <span aria-hidden="true">&#8594;</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.guide-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.guide-visual img {
  width: 100%;
  display: block;
}
.guide-text h2 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.guide-text p {
  margin: 0 0 1.25rem;
  color: #374151;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1d4ed8;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
}
@media (max-width: 768px) {
  .guide-section {
    grid-template-columns: 1fr;
  }
  .guide-visual {
    order: -1;
  }
}
</style>
