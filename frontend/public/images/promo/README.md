Taruh gambar cover promo di sini dengan nama sesuai `slug` masing-masing promo (lihat `backend/src/db/seed.js`), misalnya:

- `promocashback-gopaycoins.jpg`
- `ovo-cashback-points.jpg`
- `pesta-bola-mypertamina.jpg`

Format JPG/WebP, rasio 16:9, dikompres agar ringan.

Selama file belum ada, `PromoCard.vue` dan halaman detail promo akan otomatis menampilkan fallback berwarna berlabel kategori (bukan ikon broken-image).
