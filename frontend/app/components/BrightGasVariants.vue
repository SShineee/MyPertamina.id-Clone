<script setup lang="ts">
interface Variant {
  key: string
  tags: string[]
  name: string
  weight: string
  description: string
  image: string | null
}

const variants: Variant[] = [
  {
    key: '12kg',
    tags: ['UMKM', 'Keluarga Besar'],
    name: 'Bright Gas',
    weight: '12Kg',
    description:
      'Pilihan tepat untuk keperluan masak besar dengan api stabil, kapasitas lebih banyak, dan keamanan ekstra.',
    image: null,
  },
  {
    key: '5-5kg',
    tags: ['Apartemen', 'Keluarga Kecil'],
    name: 'Bright Gas',
    weight: '5,5Kg',
    description:
      'Pilihan ideal untuk keluarga kecil atau penghuni apartemen, dengan desain compact, aman, dan praktis untuk memasak harian.',
    image: null,
  },
  {
    key: 'can-220gr',
    tags: ['Anak Kost', 'Traveler'],
    name: 'Bright Gas Can',
    weight: '220Gr',
    description:
      'Solusi praktis, ringkas, dan umum untuk dipakai kapan dan dimana saja. Cocok untuk anak kost, traveler, dan aktivitas outdoor.',
    image: null,
  },
]
</script>

<template>
  <section class="container variants-section">
    <h2>Temukan <span class="highlight">Varian Bright Gas</span> Sesuai Kebutuhan Anda</h2>

    <div class="variants-grid">
      <article v-for="variant in variants" :key="variant.key" class="variant-card">
        <div class="variant-tags">
          <span v-for="tag in variant.tags" :key="tag" class="variant-tag">{{ tag }}</span>
        </div>

        <h3 class="variant-name">{{ variant.name }}</h3>
        <p class="variant-weight">{{ variant.weight }}</p>
        <p class="variant-description">{{ variant.description }}</p>

        <div class="variant-image">
          <img v-if="variant.image" :src="variant.image" :alt="`${variant.name} ${variant.weight}`" />
          <ImagePlaceholder v-else :label="`Gambar ${variant.name} ${variant.weight}`" ratio="1 / 1" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.variants-section {
  padding: 2.5rem 1.5rem 3.5rem;
}
.variants-section h2 {
  margin: 0 0 1.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.variants-section h2 .highlight {
  color: #db2777;
}
.variants-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.variant-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: hidden;
}
.variant-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.variant-tag {
  background: #fce7f3;
  color: #db2777;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
}
.variant-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
}
.variant-weight {
  margin: 0.15rem 0 0.85rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #db2777;
}
.variant-description {
  margin: 0 0 1.5rem;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.5;
}
.variant-image {
  margin-top: auto;
  border-radius: 0.75rem;
  overflow: hidden;
  background: linear-gradient(160deg, #fbcfe8 0%, #fdf2f8 70%);
}
.variant-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@media (max-width: 900px) {
  .variants-grid {
    grid-template-columns: 1fr;
  }
}
</style>
