Taruh gambar produk E-Voucher di sini, contoh nama file:

- `hero-mascot.png` — ilustrasi maskot MyPertamina dengan e-voucher, dipakai di `EVoucherHero.vue` (prop `imageUrl`)
- `about-car.png` — ilustrasi maskot naik mobil dengan e-voucher, dipakai di `EVoucherAboutSection.vue` (prop `carImageUrl`)
- `about-phone.png` — ilustrasi maskot menunjukkan e-voucher di HP, dipakai di `EVoucherAboutSection.vue` (prop `phoneImageUrl`)
- gambar maskot per kartu di `EVoucherBenefitsCarousel.vue` (prop `imageUrl` masing-masing card, isi manual di `<script setup>` komponen tsb)

Selama file belum ada, komponen terkait akan menampilkan placeholder abu-abu bergaris putus-putus (`ImagePlaceholder.vue`).
