<script setup lang="ts">
definePageMeta({ layout: false })

const { login } = useAuth()

const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const logoFailed = ref(false)

const canSubmit = computed(() => normalizePhone(phone.value).length >= 10 && password.value.length >= 6)

function onPhoneInput(e: Event) {
  phone.value = (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
}

async function onSubmit() {
  if (!canSubmit.value || loading.value) return
  error.value = ''
  loading.value = true
  try {
    await login(phone.value, password.value)
    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.message || 'Nomor telepon atau PIN salah.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-shell">
    <AuthBrandPanel class="auth-brand" />

    <main class="auth-main">
      <div class="auth-topbar">
        <NuxtLink to="/" class="topbar-logo" aria-label="MyPertamina">
          <img
            v-if="!logoFailed"
            src="/images/branding/mypertamina-logo.png"
            alt="MyPertamina"
            @error="logoFailed = true"
          />
          <span v-else class="topbar-logo-fallback"><b>My</b>PERTAMINA</span>
        </NuxtLink>
        <a href="https://www.pertamina.com/id/hubungi-kami" target="_blank" rel="noopener noreferrer" class="support-btn" aria-label="Bantuan">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <rect x="3" y="13" width="4" height="7" rx="2" fill="currentColor" />
            <rect x="17" y="13" width="4" height="7" rx="2" fill="currentColor" />
            <path d="M20 19v1a3 3 0 0 1-3 3h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </a>
      </div>

      <div class="auth-card">
        <h1 class="auth-title">Halo, Selamat Datang.</h1>
        <p class="auth-subtitle">Mulai gunakan dengan masuk atau registrasi</p>

        <form @submit.prevent="onSubmit">
          <p class="field-label">Masukkan nomor telepon dan password</p>

          <div class="input-shell">
            <span class="phone-prefix">+62</span>
            <input
              :value="phone"
              type="tel"
              inputmode="numeric"
              placeholder="Nomor telepon"
              autocomplete="tel"
              @input="onPhoneInput"
            />
          </div>

          <div class="input-shell">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukkan password"
              autocomplete="current-password"
            />
            <button type="button" class="eye-btn" :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'" @click="showPassword = !showPassword">
              <svg v-if="showPassword" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="1.7" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7" />
              </svg>
              <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="1.7" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7" />
                <path d="M3 3l18 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="forgot-row">
            <NuxtLink to="/login" class="link-blue">Lupa password?</NuxtLink>
          </div>

          <p v-if="error" class="error-text">{{ error }}</p>

          <button type="submit" class="btn-primary" :class="{ active: canSubmit }" :disabled="!canSubmit || loading">
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>

        <div class="divider"><span>atau</span></div>

        <NuxtLink to="/register" class="btn-outline">Registrasi</NuxtLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background: #ffffff;
}
.auth-brand {
  display: none;
}
.auth-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  min-height: 100vh;
}
.auth-topbar {
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.topbar-logo img {
  height: 32px;
  width: auto;
  display: block;
}
.topbar-logo-fallback {
  font-weight: 800;
  font-size: 1.05rem;
  color: #1d4ed8;
}
.topbar-logo-fallback b {
  color: #b91c1c;
}
.support-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #111827;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  flex-shrink: 0;
}
.auth-card {
  width: 100%;
  max-width: 420px;
}
.auth-title {
  margin: 0;
  font-size: clamp(1.9rem, 5vw, 2.4rem);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #111827;
}
.auth-subtitle {
  margin: 0.6rem 0 2rem;
  color: #4b5563;
  font-size: 1rem;
}
.field-label {
  margin: 0 0 0.85rem;
  font-weight: 700;
  color: #111827;
}
.input-shell {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.9rem;
  padding: 0 1.1rem;
  height: 58px;
  margin-bottom: 1rem;
  transition: border-color 0.15s ease;
}
.input-shell:focus-within {
  border-color: #1d4ed8;
}
.phone-prefix {
  font-weight: 700;
  color: #111827;
  margin-right: 0.75rem;
}
.input-shell input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  color: #111827;
  height: 100%;
  font-family: inherit;
}
.input-shell input::placeholder {
  color: #9ca3af;
}
.eye-btn {
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  display: inline-flex;
  padding: 0.25rem;
}
.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.75rem;
}
.link-blue {
  color: #1d4ed8;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
}
.link-blue:hover {
  text-decoration: underline;
}
.error-text {
  margin: -0.75rem 0 1rem;
  color: #b91c1c;
  font-size: 0.9rem;
}
.btn-primary {
  width: 100%;
  height: 58px;
  border: none;
  border-radius: 999px;
  background: #e5e7eb;
  color: #9ca3af;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: not-allowed;
  font-family: inherit;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.btn-primary.active {
  background: #1d4ed8;
  color: #fff;
  cursor: pointer;
}
.btn-primary.active:hover {
  background: #1e40af;
}
.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.75rem 0;
  color: #6b7280;
  font-weight: 700;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
}
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 58px;
  border: 1.5px solid #1d4ed8;
  border-radius: 999px;
  background: #fff;
  color: #1d4ed8;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.15s ease;
}
.btn-outline:hover {
  background: #eff6ff;
}

/* Desktop: split layout with brand panel */
@media (min-width: 900px) {
  .auth-shell {
    grid-template-columns: 1.1fr 1fr;
  }
  .auth-brand {
    display: block;
  }
  .auth-topbar {
    display: none;
  }
  .auth-main {
    padding: 2rem;
  }
}
</style>
