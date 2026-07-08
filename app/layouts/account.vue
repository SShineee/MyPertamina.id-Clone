<template>
  <div class="account-layout">
    <AppHeader />
    <div class="account-shell">
      <AccountSidebar class="account-side" />
      <main class="account-content">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.account-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.75rem 1.5rem 3rem;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  align-items: start;
}
.account-content {
  min-width: 0;
}

@media (max-width: 860px) {
  .account-shell {
    grid-template-columns: 1fr;
  }
}
</style>
