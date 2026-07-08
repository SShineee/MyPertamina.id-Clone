/**
 * Fetch ke Backend Web (proxy ke MyPertamina App Service) dengan Bearer token
 * dari cookie login. Semua endpoint app berada di bawah prefix `/app`.
 * Response backend berbentuk `{ data: ... }`.
 */
export function useAppFetch<T>(path: string, opts: Record<string, any> = {}) {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('mp_token')

  return useFetch<{ data: T }>(`/app${path}`, {
    baseURL: config.public.apiBase,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    ...opts,
  })
}
