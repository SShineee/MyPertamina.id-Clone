<script setup lang="ts">
interface StoryVideo {
  id: string
  videoId: string
  title: string
}

const videos: StoryVideo[] = [
  { id: 'pilihan-cerdas', videoId: 'EjvaKeq3aY8', title: 'Bright Gas, Pilihan Cerdas' },
  { id: '12kg', videoId: 'QWMApHTMy5c', title: 'Bright Gas 12Kg' },
  { id: '5-5kg', videoId: 'VOVHqdD1G_0', title: 'Bright Gas 5,5Kg' },
  { id: 'can-220gr', videoId: 'd1B9DljZYwI', title: 'Bright Gas Can 220Gr' },
]
</script>

<template>
  <section class="container video-showcase">
    <h2>Tonton <span class="highlight">Cerita Bright Gas</span> di Sini</h2>

    <div class="video-grid">
      <a
        v-for="video in videos"
        :key="video.id"
        class="video-card"
        :href="`https://youtu.be/${video.videoId}`"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Tonton video: ${video.title} (buka di YouTube)`"
      >
        <img :src="`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`" :alt="video.title" />
        <div class="video-overlay" />
        <span class="video-title">{{ video.title }}</span>
        <span class="play-badge" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 4l8 5-8 5z" fill="#fff" />
          </svg>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.video-showcase {
  padding: 2.5rem 1.5rem 3.5rem;
}
.video-showcase h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.video-showcase h2 .highlight {
  color: #db2777;
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.video-card {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #000;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.video-card:hover,
.video-card:focus-visible {
  transform: scale(1.04);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}
.video-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.7) 100%);
}
.video-title {
  position: absolute;
  left: 0.9rem;
  bottom: 1rem;
  right: 3.25rem;
  z-index: 1;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: left;
  line-height: 1.3;
}
.play-badge {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>
