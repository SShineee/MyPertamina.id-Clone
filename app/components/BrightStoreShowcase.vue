<script setup lang="ts">
withDefaults(
  defineProps<{
    videoId?: string
  }>(),
  {
    videoId: 'dQw4w9WgXcQ',
  },
)
</script>

<template>
  <section class="container section showcase">
    <div class="text">
      <h2>Destinasi One-Stop Shopping, Belanja Jadi Lebih Praktis</h2>
      <p>
        Bright Store menghadirkan pengalaman belanja praktis di setiap kunjungan Anda ke SPBU
        Pertamina &mdash; mulai dari kebutuhan harian, jajanan, hingga kopi segar, semua tersedia
        dalam satu tempat yang nyaman.
      </p>
    </div>
    <div class="video">
      <YoutubeEmbed :video-id="videoId" title="Profil Bright Store" />
    </div>
  </section>
</template>

<style scoped>
.showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
}
.text h2 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.text p {
  margin: 0;
  color: #374151;
}
@media (max-width: 768px) {
  .showcase {
    grid-template-columns: 1fr;
  }
}
</style>
