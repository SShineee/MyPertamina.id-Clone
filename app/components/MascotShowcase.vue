<script setup lang="ts">
withDefaults(
  defineProps<{
    jiffyImageSrc?: string
    campaignImageSrc?: string
    videoId?: string
  }>(),
  {
    jiffyImageSrc: '/images/benefit/jiffy-mascot.png',
    campaignImageSrc: '/images/benefit/energi-untuk-negeri.png',
    videoId: 'dQw4w9WgXcQ',
  },
)

const isVideoOpen = ref(false)
</script>

<template>
  <section class="container section">
    <div class="showcase-row">
      <div class="text">
        <h2>Kenalan Sama Jiffy</h2>
        <p>
          Jiffy adalah maskot resmi MyPertamina yang menemani setiap perjalanan energi Anda
          &mdash; ramah, ceria, dan selalu siap membantu.
        </p>
        <button class="btn btn-outline" type="button" @click="isVideoOpen = true">
          Tonton Video JIFFY MyPertamina!
        </button>
      </div>
      <div class="image">
        <img :src="jiffyImageSrc" alt="Maskot Jiffy MyPertamina" />
      </div>
    </div>

    <div class="showcase-row reverse">
      <div class="image">
        <img :src="campaignImageSrc" alt="Kampanye Energi Untuk Negeri" />
      </div>
      <div class="text">
        <h2>#EnergiUntukNegeri</h2>
        <p>
          Kampanye Energi Untuk Negeri adalah wujud komitmen Pertamina dalam menghadirkan
          energi berkelanjutan bagi seluruh lapisan masyarakat Indonesia.
        </p>
      </div>
    </div>

    <div v-if="isVideoOpen" class="modal-overlay" @click.self="isVideoOpen = false">
      <div class="modal-content">
        <button class="modal-close" type="button" aria-label="Tutup video" @click="isVideoOpen = false">&times;</button>
        <YoutubeEmbed :video-id="videoId" title="Video JIFFY MyPertamina" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 3rem;
}
.showcase-row.reverse {
  margin-bottom: 0;
}
.text h2 {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}
.text p {
  margin: 0 0 1.25rem;
  color: #374151;
}
.image img {
  width: 100%;
  border-radius: 1rem;
  display: block;
}
.btn-outline {
  border: 2px solid #1d4ed8;
  background: #fff;
  color: #1d4ed8;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1.5rem;
}
.modal-content {
  position: relative;
  width: 100%;
  max-width: 720px;
}
.modal-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.75rem;
  cursor: pointer;
  line-height: 1;
}
@media (max-width: 768px) {
  .showcase-row,
  .showcase-row.reverse {
    grid-template-columns: 1fr;
  }
  .showcase-row.reverse .image {
    order: -1;
  }
}
</style>
