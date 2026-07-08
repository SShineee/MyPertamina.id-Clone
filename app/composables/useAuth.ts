export interface AuthUser {
  id: number
  name: string
  email?: string
  phone: string
  status: string
}

/**
 * Ubah input nomor telepon (mis. "81234567890", "081234567890", "+62 812-3456-7890")
 * menjadi format lokal "0xxxxxxxxxx" yang dipakai App Service.
 */
export function normalizePhone(input: string): string {
  let digits = (input || '').replace(/\D/g, '')
  if (digits.startsWith('62')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = digits.slice(1)
  return digits ? '0' + digits : ''
}

export function useAuth() {
  const cookieOpts = { maxAge: 60 * 60 * 24, sameSite: 'lax' as const }
  const token = useCookie<string | null>('mp_token', cookieOpts)
  const user = useCookie<AuthUser | null>('mp_user', cookieOpts)
  const isLoggedIn = computed(() => !!token.value)

  async function login(phone: string, password: string) {
    const config = useRuntimeConfig()
    const res = await $fetch<{ token: string; user: AuthUser }>('/app/auth/login', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { phone: normalizePhone(phone), password },
    })
    token.value = res.token
    user.value = res.user
    return res
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return { token, user, isLoggedIn, login, logout }
}
