<script setup lang="ts">
const props = defineProps<{
  videoId: string
  title: string
}>()

const isPlaying = ref(false)
</script>

<template>
  <div class="video-frame">
    <iframe
      v-if="isPlaying"
      :src="`https://www.youtube.com/embed/${props.videoId}?autoplay=1`"
      :title="title"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <button v-else class="thumbnail" type="button" :aria-label="`Putar video: ${title}`" @click="isPlaying = true">
      <img :src="`https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`" :alt="title" />
      <span class="play-icon" aria-hidden="true">&#9658;</span>
    </button>
  </div>
</template>

<style scoped>
.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  background: #111827;
}
.video-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.thumbnail {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}
</style>
