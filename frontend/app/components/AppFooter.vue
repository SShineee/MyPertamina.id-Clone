<script setup lang="ts">
interface FooterLink {
  label: string
  to?: string
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const columns: FooterColumn[] = [
  {
    title: 'Tentang MyPertamina',
    links: [
      { label: 'Keuntungan MyPertamina', to: '/about/keuntungan-mypertamina' },
      { label: 'Informasi Harga BBM', to: '/about/product-price' },
      { label: 'Informasi Harga Bright Gas', to: '/about/bright-gas-price' },
      { label: 'MyPertamina Channel', to: '/about/mypertamina-channel' },
    ],
  },
  {
    title: 'Produk MyPertamina',
    links: [
      { label: 'Pertamax Turbo', to: '/product/gasoline/pertamax-turbo' },
      { label: 'Pertamax Green 95', to: '/product/gasoline/pertamax-green-95' },
      { label: 'Pertamax', to: '/product/gasoline/pertamax' },
      { label: 'Pertamina Dex', to: '/product/diesel/pertamina-dex' },
      { label: 'Dexlite', to: '/product/diesel/dexlite' },
      { label: 'Bright Gas', to: '/about/bright-gas-price' },
      { label: 'Pelumas', href: '#' },
      { label: 'E-Voucher MyPertamina', href: '#' },
    ],
  },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/mypertamina', icon: 'instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@mypertamina', icon: 'tiktok' },
  { label: 'Facebook', href: 'https://www.facebook.com/MyPertamina', icon: 'facebook' },
  { label: 'YouTube', href: 'https://www.youtube.com/@mypertamina', icon: 'youtube' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <NuxtLink to="/" class="logo" aria-label="MyPertamina">
          <span class="logo-mark">My</span>
          <span class="logo-word">PERTAMINA</span>
        </NuxtLink>

        <p class="tagline">
          <span class="tagline-word energi">Energi</span>
          <span class="tagline-word untuk">untuk</span>
          <span class="tagline-word negeri">Negeri</span>
        </p>

        <p class="address">
          Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga Kementerian Perdagangan RI
        </p>
      </div>

      <div class="footer-columns">
        <div v-for="column in columns" :key="column.title" class="footer-column">
          <h3>{{ column.title }}</h3>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <NuxtLink v-if="link.to" :to="link.to">{{ link.label }}</NuxtLink>
              <a v-else :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Informasi &amp; Bantuan</h3>
          <ul>
            <li><NuxtLink to="/contact">Hubungi Kami</NuxtLink></li>
            <li><a href="#">Kebijakan Privasi</a></li>
            <li><NuxtLink to="/contact">FAQ</NuxtLink></li>
          </ul>

          <h3 class="follow-title">Ikuti Kami</h3>
          <div class="social-row">
            <a
              v-for="social in socials"
              :key="social.label"
              class="social-icon"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
            >
              <svg v-if="social.icon === 'instagram'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
              <svg v-else-if="social.icon === 'tiktok'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 3v10.2a2.6 2.6 0 11-2-2.53V8.6a5.6 5.6 0 104.6 5.5V9.9a6.9 6.9 0 003.4 1V8a3.9 3.9 0 01-3-1.6A4 4 0 0116 3h-2z"
                  fill="currentColor"
                />
              </svg>
              <svg v-else-if="social.icon === 'facebook'" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V12H9v3h2v6h3v-6h2.2l.8-3H14v-1.5c0-.6.4-1 1-1z" fill="currentColor" />
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" stroke-width="1.6" />
                <path d="M10.5 9.3l5 2.7-5 2.7z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>&copy; MyPertamina {{ year }} I PT Pertamina Patra Niaga. All rights reserved.</p>

        <a href="tel:135" class="contact-pill">
          <span class="contact-badge">135</span>
          Pertamina Contact Center 135
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: linear-gradient(120deg, #fdf1f6 0%, #f3f0fa 50%, #eef2fb 100%);
}
.footer-top {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 3rem;
  padding: 4rem 1.5rem 3rem;
}
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  width: fit-content;
}
.logo-mark {
  background: linear-gradient(135deg, #ef4444, #1d4ed8);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.3rem 0.55rem;
  border-radius: 0.4rem;
  line-height: 1;
}
.logo-word {
  font-weight: 800;
  font-size: 1.05rem;
  color: #1e3a8a;
  letter-spacing: 0.02em;
}
.tagline {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: 'Brush Script MT', 'Segoe Script', cursive;
  font-size: 1.9rem;
  line-height: 1;
}
.tagline-word.energi {
  color: #e11d48;
}
.tagline-word.untuk {
  color: #16a34a;
  font-size: 1.1rem;
  font-family: inherit;
}
.tagline-word.negeri {
  color: #2563eb;
}
.address {
  margin: 0;
  color: #4b5563;
  font-size: 0.85rem;
  line-height: 1.6;
  max-width: 280px;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.footer-column h3 {
  margin: 0 0 1.1rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}
.footer-column ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.footer-column a {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
}
.footer-column a:hover {
  color: #b91c1c;
}
.follow-title {
  margin-top: 1.75rem;
}
.social-row {
  display: flex;
  gap: 0.75rem;
}
.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fff;
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.footer-bottom {
  border-top: 1px solid rgba(17, 24, 39, 0.08);
}
.footer-bottom-inner {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer-bottom-inner p {
  margin: 0;
  color: #374151;
  font-size: 0.85rem;
}
.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #fff;
  border-radius: 999px;
  padding: 0.5rem 1.1rem 0.5rem 0.5rem;
  text-decoration: none;
  color: #111827;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.contact-badge {
  background: #b91c1c;
  color: #fff;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.25rem 0.4rem;
  border-radius: 0.35rem;
  line-height: 1;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
  }
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .footer-columns {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
  .footer-bottom-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
