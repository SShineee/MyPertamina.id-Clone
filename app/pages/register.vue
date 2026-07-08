<script setup lang="ts">
definePageMeta({ layout: false })

const config = useRuntimeConfig()

const name = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(true)
const agreePromo = ref(true)
const loading = ref(false)
const error = ref('')

function onPhoneInput(e: Event) {
  phone.value = (e.target as HTMLInputElement).value.replace(/[^\d]/g, '')
}

const passwordMismatch = computed(
  () => confirmPassword.value.length > 0 && password.value !== confirmPassword.value,
)
const canSubmit = computed(
  () =>
    name.value.trim().length > 0 &&
    normalizePhone(phone.value).length >= 10 &&
    password.value.length >= 6 &&
    confirmPassword.value === password.value &&
    agreeTerms.value,
)

async function onSubmit() {
  if (!canSubmit.value || loading.value) return
  error.value = ''
  loading.value = true
  try {
    await $fetch('/app/auth/register', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        name: name.value.trim(),
        phone: normalizePhone(phone.value),
        password: password.value,
        agree_promo: agreePromo.value,
      },
    })
    await navigateTo('/login')
  } catch (err: any) {
    if (err?.statusCode === 404 || err?.response?.status === 404) {
      error.value = 'Registrasi lewat server belum tersedia. Hubungi admin untuk membuat akun.'
    } else {
      error.value = err?.data?.message || 'Registrasi gagal. Coba lagi.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-shell">
    <AuthBrandPanel class="auth-brand" />

    <main class="auth-main">
      <form class="auth-card" @submit.prevent="onSubmit">
        <header class="reg-header">
          <button type="button" class="back-btn" aria-label="Kembali" @click="$router.back()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <h1>Registrasi</h1>
        </header>

        <div class="reg-fields">
          <label class="field">
            <span class="field-label">Nama</span>
            <div class="input-shell">
              <input v-model="name" type="text" placeholder="Nama" autocomplete="name" />
            </div>
          </label>

          <label class="field">
            <span class="field-label">Nomor telepon</span>
            <div class="input-shell">
              <span class="phone-prefix">+62</span>
              <input :value="phone" type="tel" inputmode="numeric" placeholder="Nomor telepon" autocomplete="tel" @input="onPhoneInput" />
            </div>
          </label>

          <div class="field">
            <span class="field-label">Password</span>
            <div class="pin-row">
              <div class="input-shell">
                <input v-model="password" type="password" placeholder="Minimal 6 karakter" autocomplete="new-password" />
              </div>
              <div class="input-shell" :class="{ invalid: passwordMismatch }">
                <input v-model="confirmPassword" type="password" placeholder="Konfirmasi password" autocomplete="new-password" />
              </div>
            </div>
            <p v-if="passwordMismatch" class="error-text small">Konfirmasi password tidak cocok.</p>
          </div>

          <label class="check-row">
            <input v-model="agreeTerms" type="checkbox" />
            <span class="check-box" aria-hidden="true"></span>
            <span class="check-text">
              Saya telah menyetujui <a href="#" class="link-blue">Syarat dan Ketentuan</a> dan membaca
              <a href="#" class="link-blue">Kebijakan Privasi</a> yang berlaku.
            </span>
          </label>

          <label class="check-row">
            <input v-model="agreePromo" type="checkbox" />
            <span class="check-box" aria-hidden="true"></span>
            <span class="check-text">Saya telah menyetujui <a href="#" class="link-blue">Kebijakan Promosi</a></span>
          </label>
        </div>

        <p v-if="error" class="error-text">{{ error }}</p>

        <div class="reg-footer">
          <button type="submit" class="btn-primary" :class="{ active: canSubmit }" :disabled="!canSubmit || loading">
            {{ loading ? 'Memproses...' : 'Lanjut' }}
          </button>
          <p class="login-hint">Sudah punya akun? <NuxtLink to="/login" class="link-blue">Masuk</NuxtLink></p>
        </div>
      </form>
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
  min-height: 100vh;
  padding: 1.5rem;
}
.auth-card {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.reg-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.back-btn {
  border: none;
  background: none;
  cursor: pointer;
  color: #111827;
  display: inline-flex;
  padding: 0;
}
.reg-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
.reg-fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.field {
  display: flex;
  flex-direction: column;
}
.field-label {
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #111827;
}
.input-shell {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0 1rem;
  height: 56px;
  transition: border-color 0.15s ease;
}
.input-shell:focus-within {
  border-color: #1d4ed8;
}
.input-shell.invalid {
  border-color: #b91c1c;
}
.phone-prefix {
  font-weight: 700;
  color: #111827;
  margin-right: 0.7rem;
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
.pin-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.check-row {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 0.75rem;
  cursor: pointer;
}
.check-row input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.check-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  flex-shrink: 0;
  position: relative;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.check-row input:checked + .check-box {
  background: #1d4ed8;
  border-color: #1d4ed8;
}
.check-row input:checked + .check-box::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.check-text {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.45;
}
.link-blue {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}
.link-blue:hover {
  text-decoration: underline;
}
.error-text {
  margin: 1rem 0 0;
  color: #b91c1c;
  font-size: 0.9rem;
}
.error-text.small {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.reg-footer {
  margin-top: auto;
  padding-top: 1.75rem;
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
.login-hint {
  margin: 1rem 0 0;
  text-align: center;
  color: #4b5563;
  font-size: 0.95rem;
}

/* Desktop: split layout with brand panel */
@media (min-width: 900px) {
  .auth-shell {
    grid-template-columns: 1.1fr 1fr;
  }
  .auth-brand {
    display: block;
  }
  .auth-main {
    justify-content: center;
    padding: 2.5rem;
    overflow-y: auto;
  }
  .auth-card {
    flex: none;
  }
  .reg-footer {
    margin-top: 1.75rem;
  }
}
</style>
