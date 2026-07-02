<script setup lang="ts">
const props = defineProps<{
  videoUrl: string
  videoTitle: string | null
}>()

const isPlaying = ref(false)

const videoId = computed(() => props.videoUrl.split('/').pop() ?? '')
const thumbnailUrl = computed(() => `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg`)
const embedSrc = computed(() => `${props.videoUrl}?autoplay=1`)
</script>

<template>
  <section class="video-section">
    <div class="container">
      <div class="video-frame">
        <iframe
          v-if="isPlaying"
          :src="embedSrc"
          title="Video showcase produk"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <button v-else type="button" class="video-facade" @click="isPlaying = true">
          <div v-if="videoTitle" class="video-title-bar">{{ videoTitle }}</div>
          <img :src="thumbnailUrl" alt="" class="video-thumbnail" />
          <span class="play-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#dc2626" />
              <path d="M13 10l10 6-10 6z" fill="#fff" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  padding: 3.5rem 0;
}
.video-frame {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
.video-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.video-facade {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #000;
}
.video-title-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-weight: 700;
  text-align: left;
  font-size: 0.95rem;
}
.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.9;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
