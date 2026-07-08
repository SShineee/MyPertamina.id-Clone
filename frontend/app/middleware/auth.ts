export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>('mp_token')
  if (!token.value) {
    return navigateTo('/login')
  }
})
