<template>
  <section class="container section">
    <h2>Galeri Bright Store</h2>
    <div class="gallery-grid">
      <ImagePlaceholder label="Foto area kasir Bright Store" ratio="4 / 3" />
      <ImagePlaceholder label="Foto rak makanan &amp; minuman" ratio="4 / 3" />
      <ImagePlaceholder label="Foto suasana interior toko" ratio="4 / 3" />
    </div>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
