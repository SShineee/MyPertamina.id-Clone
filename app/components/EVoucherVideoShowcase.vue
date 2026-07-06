<script setup lang="ts">
withDefaults(
  defineProps<{
    videoId?: string
    title?: string
    channelName?: string
  }>(),
  {
    videoId: '8sMIGQd1XO8',
    title: 'Catat! Tutorial Penggunaan E-Voucher MyPertamina',
    channelName: 'MyPertamina',
  },
)

const isPlaying = ref(false)
</script>

<template>
  <section class="container video-showcase">
    <h2><span class="highlight">Tutorial</span> Penggunaan E-Voucher</h2>
    <p class="subtitle">Pelajari cara menggunakan E-Voucher MyPertamina dengan mudah</p>

    <div class="video-frame">
      <iframe
        v-if="isPlaying"
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <template v-else>
        <button type="button" class="video-facade" :aria-label="`Putar video: ${title}`" @click="isPlaying = true">
          <img :src="`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`" :alt="title" class="video-thumbnail" />
        </button>

        <div class="top-bar">
          <div class="channel-info">
            <span class="channel-logo">
              <span class="logo-mark">My</span>
            </span>
            <div class="channel-text">
              <p class="video-title">{{ title }}</p>
              <p class="channel-name">{{ channelName }}</p>
            </div>
          </div>
          <div class="top-actions">
            <span class="icon-btn" aria-hidden="true" title="Bagikan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .1 4.9L8.9 12.8a3 3 0 1 0 0 4.4l6.2 3.9a3 3 0 1 0 .8-1.7l-6.2-3.9a3 3 0 0 0 0-1.9l6.2-3.9c.3.1.6.2 1 .2"
                  stroke="#fff"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="icon-btn" aria-hidden="true" title="Riwayat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.6" />
                <path d="M12 7v5l3 2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        <button type="button" class="play-icon" :aria-label="`Putar video: ${title}`" @click="isPlaying = true">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="17" fill="#ff0000" />
            <path d="M14 11l10 6-10 6z" fill="#fff" />
          </svg>
        </button>

        <a
          class="watch-link"
          :href="`https://youtu.be/${videoId}`"
          target="_blank"
          rel="noopener noreferrer"
          @click.stop
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21.6 7.2s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4s-3.9 0-6.7.1c-.4.1-1.3.1-2.1.9-.6.7-.8 2.2-.8 2.2S2 9 2 10.7v1.5C2 14 2.2 15.7 2.2 15.7s.2 1.5.8 2.2c.8.9 1.9.8 2.4.9 1.7.2 7.6.2 7.6.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.4v-1.5c0-1.7-.2-3.4-.2-3.4z"
              fill="#fff"
            />
            <path d="M10 8.5v7l6-3.5z" fill="#ff0000" />
          </svg>
          Tonton di YouTube
        </a>
      </template>
    </div>
  </section>
</template>

<style scoped>
.video-showcase {
  padding: 3rem 1.5rem 4rem;
  text-align: center;
}
.video-showcase h2 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}
.video-showcase h2 .highlight {
  color: #1d4ed8;
}
.subtitle {
  margin: 0 0 2rem;
  color: #6b7280;
  font-size: 1rem;
}
.video-frame {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}
.video-facade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: #000;
}
.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.92;
}
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
}
.channel-info {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  text-align: left;
}
.channel-logo {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.channel-logo .logo-mark {
  color: #b91c1c;
  font-weight: 800;
  font-size: 0.7rem;
}
.video-title {
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.3;
}
.channel-name {
  margin: 0.15rem 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
}
.top-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
  pointer-events: auto;
}
.icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
}
.watch-link {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  backdrop-filter: blur(2px);
}
.watch-link:hover {
  background: rgba(0, 0, 0, 0.8);
}
.video-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 640px) {
  .video-title {
    font-size: 0.85rem;
  }
  .watch-link span {
    display: none;
  }
}
</style>
