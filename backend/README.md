# Backend — REST API

REST API menggunakan Express.js dengan database MySQL, dengan role-based access control (RBAC) dinamis.

Menyediakan endpoint untuk:
- Konten (promo, banner, berita, informasi)
- Harga BBM
- Manajemen pengguna (User Management)
- Manajemen peran & hak akses (Role Management)

## Struktur

```
src/
├── config/       # koneksi database
├── db/           # schema.sql & seed.js
├── routes/       # definisi endpoint per resource
├── controllers/  # request handler
├── models/       # query ke MySQL
├── middlewares/  # auth (JWT) & error handler
└── index.js
```

## Setup

1. Buat database MySQL sesuai `DB_NAME` di `.env` (default: `mypertamina_clone`), lalu import schema:
   ```bash
   mysql -u root -p mypertamina_clone < src/db/schema.sql
   ```
2. Copy `.env.example` menjadi `.env` dan sesuaikan kredensial database serta `JWT_SECRET`.
3. Install dependency & jalankan seed (membuat role, permission, dan akun Super Admin):
   ```bash
   npm install
   npm run seed
   ```
   Login default setelah seed: `admin@mypertamina.local` / `Admin123!`
4. Jalankan server:
   ```bash
   npm run dev
   ```

## Endpoint utama

| Method | Endpoint | Akses |
|--------|----------|-------|
| POST | `/api/auth/login` | Publik |
| GET | `/api/auth/me` | Login |
| GET | `/api/prices` | Publik |
| POST/PUT/DELETE | `/api/prices` | `price.update` |
| GET | `/api/contents` | Publik |
| POST/PUT/DELETE | `/api/contents` | `content.manage` |
| GET/POST/PUT/DELETE | `/api/users` | `user.manage` |
| GET/POST/PUT/DELETE | `/api/roles` | `role.manage` |
| GET | `/api/roles/permissions` | `role.manage` |

Role bersifat dinamis — role baru beserta kombinasi permission-nya dapat dibuat langsung dari menu **Role & Permission** di CMS, tanpa perlu mengubah kode backend.

## Integrasi MyPertamina App Service Mock (`/api/app/*`)

Sumber kebenaran untuk kontrak API App Service adalah **source code aslinya**: [github.com/MaheswaraKaindra/mypertamina-clone-service](https://github.com/MaheswaraKaindra/mypertamina-clone-service) (Anggota 1), sudah selesai — bukan lagi dokumentasi/README yang mungkin basi. Dokumen/kode lain yang menyebut port `3002`, login berbasis email, atau skema "Subsidi Tepat" adalah draft awal yang **sudah tidak berlaku** — abaikan.

### Arsitektur integrasi

```text
Frontend Web MyPertamina
        ↓
Backend Web (folder ini) — gateway/proxy, TIDAK menyimpan/mengakses data App Service
        ↓ HTTP API (fetch, via services/appServiceClient.js)
MyPertamina App Service Mock  (APP_SERVICE_BASE_URL, default http://localhost:4000/api)
        ↓
Database App Service (terpisah, tidak pernah diakses langsung dari backend ini)
```

Backend ini murni **gateway/proxy**: tidak ada model atau tabel lokal untuk data App Service (profil, saldo, poin, kendaraan, transaksi, voucher, notifikasi) — semua diteruskan lewat HTTP ke `services/appServiceClient.js`, dan backend tidak memverifikasi JWT App Service sendiri (token konsumen diteruskan apa adanya, divalidasi oleh App Service). Set `APP_SERVICE_BASE_URL` di `.env` (default `http://localhost:4000/api`). Kalau App Service mati, endpoint di bawah membalas `503` dengan pesan yang jelas, bukan hang/crash.

Response App Service dibungkus `{ success, message, data }` — `appServiceClient` membuka bungkus `data` dan melempar error kalau `success: false` atau status non-2xx. Login memakai `phone` + `password` (bukan email), sesuai kontrak App Service.

### Endpoint yang di-proxy

Path yang benar-benar dipanggil ke App Service (lihat `services/appServiceClient.js`) persis mengikuti kontrak resmi:

```text
POST /api/auth/login
GET  /api/users/me
GET  /api/balance
GET  /api/points
GET  /api/vehicles
GET  /api/transactions
GET  /api/vouchers
GET  /api/notifications
```

Backend web sendiri mengekspos endpoint-endpoint ini di bawah prefix `/api/app/*` (bukan langsung di `/api/auth`, `/api/me`, dst.) — karena `/api/auth/*` dan `/api/users/*` di backend ini sudah dipakai untuk login admin CMS (RBAC), jadi harus dibedakan supaya tidak bentrok:

| Method | Endpoint Backend Web | Diteruskan ke App Service | Akses | Status upstream |
|--------|----------------------|---------------------------|-------|------------------|
| POST | `/api/app/auth/login` | `POST /api/auth/login` | Publik | READY |
| GET | `/api/app/me` | `GET /api/users/me` | Bearer token | READY |
| GET | `/api/app/balance` | `GET /api/balance` | Bearer token | READY |
| GET | `/api/app/points` | `GET /api/points` | Bearer token | READY |
| GET | `/api/app/vehicles` | `GET /api/vehicles` | Bearer token | READY |
| GET | `/api/app/transactions` | `GET /api/transactions` | Bearer token | READY |
| GET | `/api/app/vouchers` | `GET /api/vouchers` | Bearer token | READY |
| GET | `/api/app/notifications` | `GET /api/notifications` | Bearer token | READY |
| GET | `/api/app/dashboard` | `GET /api/dashboard` (App Service punya endpoint dashboard sendiri — bukan hasil agregasi di backend ini) | Bearer token | READY |

Semua endpoint di atas sudah diverifikasi langsung terhadap source code App Service (bukan cuma dokumentasi) — lihat bagian "Verifikasi terhadap source code App Service" di `CLAUDE.md` untuk detail per-endpoint.
