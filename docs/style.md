# Style Guide — Frontend

Panduan visual dan konvensi styling untuk komponen di `frontend/app`. Dokumen ini merefleksikan style yang sudah dipakai di kode, bukan aturan baru — update dokumen ini kalau ada perubahan warna/spacing di kode.

## Warna

| Token | Hex | Penggunaan |
| --- | --- | --- |
| Primary (merah Pertamina) | `#b91c1c` | Brand/logo text, aksen hover link |
| Primary dark | `#7f1d1d` | Gradient hero lama, aksen gelap |
| Accent biru | `#1d4ed8` | Tombol CTA utama (mis. "Dapatkan Aplikasi") |
| Teks utama | `#111827` | Body text, brand text sekunder |
| Teks sekunder | `#374151` | Link nav, teks non-headline |
| Teks muted | `#6b7280` | Footer, caption, empty state |
| Border/garis | `#e5e7eb` | Border header, divider |
| Background halaman | `#f9fafb` | Background `body` |
| Putih | `#ffffff` / `#fff` | Background card, header, tombol sekunder |

## Tipografi

- Font family: `'Segoe UI', system-ui, sans-serif` (diset global di `body`).
- Headline besar (hero): `2.5rem`, `font-weight: 700`, `line-height: 1.2`.
- Judul section (`<h2>`): `1.35rem`.
- Body/deskripsi: `1.05rem`, `opacity: 0.9` di atas background gelap/foto.
- Brand text: `1.25rem`, `font-weight: 700`.

## Spacing & Layout

- Container utama: `max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;` (class `.container`).
- Section vertical padding: `2.5rem 0` (class `.section`).
- Gap antar elemen aksi (tombol, dsb): `1rem`–`1.5rem`.
- Border radius tombol: `999px` (pill).

## Komponen

- **Tombol primary**: background `#1d4ed8`, teks putih, padding `0.75rem 1.5rem`, rounded pill.
- **Tombol secondary**: background putih, teks `#111827`, rounded pill, biasanya untuk aksi sekunder (mis. "Pelajari Lebih Lanjut").
- **Hero section**: full-viewport (`height: 100vh`, `min-height: 480px`), video/gambar latar dengan overlay gradient gelap (`rgba(0,0,0,0.65)` → transparan) supaya teks tetap terbaca, konten rata kiri dengan `max-width: 640px`.
- **Header**: sticky di atas (`position: sticky; top: 0;`), border-bottom tipis, logo di kiri dan nav di kanan.

## Aksesibilitas

- Semua ikon dekoratif (panah, download, external-link) memakai `aria-hidden="true"`.
- Link eksternal (App Store, dsb.) wajib `target="_blank" rel="noopener noreferrer"`.
- Gambar statis (mis. tabel grading member) wajib punya `alt` deskriptif untuk SEO & aksesibilitas.
