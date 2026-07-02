<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand">⛽ MyPertamina <span>Clone</span></NuxtLink>
      <nav class="nav">
        <a href="#harga">Harga BBM</a>
        <a href="#promo">Promo</a>
        <a href="#berita">Berita</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}
.brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: #b91c1c;
  text-decoration: none;
}
.brand span {
  color: #111827;
  font-weight: 500;
}
.nav {
  display: flex;
  gap: 1.5rem;
}
.nav a {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
}
.nav a:hover {
  color: #b91c1c;
}
</style>
