Taruh 8 screenshot alur "Beli E-Voucher" di sini (sudah termasuk bingkai HP di dalam gambarnya, jadi tidak perlu dibingkai lagi oleh CSS). Nama file dipakai oleh `EVoucherStepsGuide.vue`:

- `beli-e-voucher-1.png` — Beranda MyPertamina, ikon E-Voucher disorot
- `beli-e-voucher-2.png` — Halaman E-Voucher, daftar nominal (mis. Rp100.000 disorot)
- `beli-e-voucher-3.png` — Detail Voucher, tombol "Beli Sekarang" disorot
- `beli-e-voucher-4.png` — Konfirmasi Pesanan (ringkasan pembayaran)
- `beli-e-voucher-5.png` — Konfirmasi Pesanan, tombol "Lanjut" disorot
- `beli-e-voucher-6.png` — Payment Confirmation, input PIN LinkAja
- `beli-e-voucher-7.png` — Payment Confirmation, tombol "Pay" disorot
- `beli-e-voucher-8.png` — Halaman "Pembelian Anda Berhasil"

Selama file belum ada, langkah terkait menampilkan placeholder abu-abu bergaris putus-putus (`ImagePlaceholder.vue`). Poin "Gunakan E-Voucher", "Kirim ke Teman", dan "Beli untuk Teman" belum punya screenshot — tambahkan `imageUrl` per langkah di `EVoucherStepsGuide.vue` kalau sudah tersedia.
