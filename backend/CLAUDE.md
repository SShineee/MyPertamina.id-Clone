# CLAUDE.md (backend/)

Konteks khusus folder ini untuk Claude Code. Lihat juga `../CLAUDE.md` (root) untuk gambaran seluruh project.

## Peran folder ini

Ini adalah repo **Anggota 2 — Backend Web Integration**. Isinya dua hal yang berjalan di proses/port yang sama (Express, port `3001`):

1. **API CMS/admin yang sudah ada** — auth admin (RBAC), harga BBM, Bright Gas, produk, lokasi, konten, sustainability, FAQ, user & role management. Ini fondasi lama, dipakai oleh `cms/`.
2. **Layer proxy `/api/app/*`** — gateway ke **MyPertamina App Service Mock** (repo terpisah, selesai dikerjakan Anggota 1) lewat HTTP saja. Backend ini **tidak pernah** mengakses database App Service secara langsung dan tidak menyimpan data App Service — murni meneruskan request/response.

## Source of truth kontrak API

Anggota 1 sudah selesai. **Source code aslinya adalah satu-satunya sumber kebenaran** (bukan README/dokumentasi manapun, yang bisa saja basi):

**https://github.com/MaheswaraKaindra/mypertamina-clone-service**

Seluruh layer proxy di folder ini (`services/appServiceClient.js`, `controllers/appAuthController.js`, `controllers/userDataController.js`, `controllers/dashboardController.js`, dan routes-nya) sudah **diverifikasi baris-per-baris** terhadap source code repo tersebut (di-clone & dijalankan langsung, bukan cuma dibaca dokumentasinya) — lihat "Verifikasi terhadap source code App Service" di bawah.

File/kode lain di repo `MyPertamina.id-Clone` ini yang menyebut port `3002`, login berbasis email, atau skema "Subsidi Tepat" (`pertamina-apps/README.md` versi lama beserta kode di `pertamina-apps/src/`, dan `pertamina-apps/README (1).md`) adalah **draft awal yang sudah tidak berlaku** — jangan dijadikan acuan sama sekali.

## Arsitektur

### Sisi CMS/admin (lama, tidak berubah)
`routes/*Routes.js` → `controllers/*Controller.js` → `models/*Model.js` (raw SQL, `mysql2`). Auth pakai `middlewares/auth.js` (`requireAuth` + `requirePermission`, JWT milik backend sendiri, RBAC dinamis).

### Sisi proxy `/api/app/*` (gateway ke App Service)
`routes/appAuthRoutes.js` + `routes/dashboardRoutes.js` + `routes/userDataRoutes.js` → `controllers/appAuthController.js` / `dashboardController.js` / `userDataController.js` → `services/appServiceClient.js` (fetch wrapper ke `APP_SERVICE_BASE_URL`). **Tidak ada model/DB** di sisi ini — semua data datang dari App Service, backend hanya meneruskan.

- **Auth**: `middlewares/authMiddleware.js` (`requireAppToken`) cuma mengecek ada Bearer token lalu meneruskannya apa adanya — backend **tidak** memverifikasi JWT App Service sendiri (tidak pegang secret `JWT_SECRET` App Service). Validasi sesungguhnya dilakukan App Service (`src/middlewares/authMiddleware.js` di repo mereka, verify + lookup user by id); token tidak valid/expired/user tidak ditemukan muncul sebagai 401 yang diteruskan `appServiceClient` apa adanya.
- **Kenapa prefix `/api/app/*`, bukan path polos (`/api/auth/login`, `/api/me`, dst.)?** Karena `/api/auth/*` dan `/api/users/*` di backend ini sudah dipakai untuk login admin CMS (RBAC) — memakai path yang sama persis akan bentrok. Path upstream yang benar-benar dipanggil ke App Service (di dalam `appServiceClient`) tetap persis mengikuti kontrak resmi; hanya path yang diekspos backend ke frontend yang diberi prefix.
- **Error handling**: `appServiceClient` membongkar `{ success, message, data }` — kalau `success: false` atau status non-2xx, melempar `AppServiceError(status, message)` dengan status/pesan asli dari App Service; kalau App Service tidak bisa dihubungi sama sekali (network error/service mati), melempar `AppServiceError(503, ...)`. Tidak perlu middleware error baru — `middlewares/errorHandler.js` yang sudah ada otomatis menangani ini (baca `err.status`/`err.message`).
- **Konvensi response** `backend/` sendiri (ke frontend) tetap konsisten dengan sisi CMS: sukses → `{ data: ... }` atau `{ token, user }`; error → `{ message: ... }` — bukan format `{success,message,data}` App Service (itu dibongkar duluan di `appServiceClient`).

Detail lengkap & tabel mapping endpoint ada di `README.md` bagian "Integrasi MyPertamina App Service Mock".

## Verifikasi terhadap source code App Service (per 2026-07-08)

Repo `mypertamina-clone-service` di-clone dan dibaca langsung (`src/index.js`, tiap `controllers/*.js` & `routes/*.js`, `middlewares/authMiddleware.js`, `db/seed.js`), lalu dijalankan (`npm install && npm start`, port 4000) dan dites langsung lewat `backend/`.

### Endpoint yang cocok (tidak perlu perubahan)

| Endpoint upstream (App Service) | Body/Response nyata | Status |
|---|---|---|
| `POST /api/auth/login` | body `{phone,password}`; sukses → `data:{token,user}`; error 400 (field kosong), 401 (salah), 403 (`status !== 'active'`), 500 | ✅ cocok |
| `GET /api/users/me` | Bearer token; `data:{user}` (dari `req.user` hasil authMiddleware) | ✅ cocok |
| `GET /api/balance` | Bearer token; `data:{balance}` (fallback `{user_id,balance:0,currency:'IDR'}` kalau belum ada baris) | ✅ cocok |
| `GET /api/points` | Bearer token; `data:{points}` (fallback `{user_id,total_points:0}`) | ✅ cocok |
| `GET /api/vehicles` | Bearer token; `data:{vehicles}` (array, sudah **READY**, bukan lagi IN PROGRESS) | ✅ cocok |
| `GET /api/transactions` | Bearer token; `data:{transactions}` (array, join ke vehicles, sudah **READY**) | ✅ cocok |
| `GET /api/vouchers` | Bearer token; `data:{vouchers}` (array, sudah **READY**, bukan lagi TODO) | ✅ cocok |
| `GET /api/notifications` | Bearer token; `data:{notifications}` (array, sudah **READY**, bukan lagi TODO) | ✅ cocok |
| Auth Bearer token | `Authorization: Bearer <token>`, App Service verify JWT + lookup user by id, 401 kalau token kosong/invalid/user tidak ada | ✅ cocok — backend memang sengaja tidak verify sendiri (tidak pegang secret), sudah benar |
| Status code & error format | `{success:false,message}` dengan 400/401/403/500 sesuai kasus | ✅ cocok — `appServiceClient` generik, forward apa adanya |

### Endpoint yang berbeda (ditemukan & diperbaiki)

| Yang lama (asumsi dari dokumentasi) | Kenyataan di source code | Perbaikan |
|---|---|---|
| `dashboardController.js` di backend ini melakukan agregasi sendiri lewat 5 request paralel (`users/me`+`balance`+`points`+`vehicles`+`transactions`) | App Service **sudah punya endpoint native `GET /api/dashboard`** yang melakukan agregasi di server (`user`, `balance`, `points`, `vehicles`, `recent_transactions`, `vouchers`, `notifications`, `unread_notifications` — 1 kali query gabungan) | `dashboardController.js` diubah jadi proxy langsung 1 panggilan ke `GET /api/dashboard`, drop agregasi manual di backend |

Tidak ada perbedaan lain — path, nama field response (`user`, `balance`, `points`, `vehicles`, `transactions`, `vouchers`, `notifications`), status code, dan format error semuanya persis sesuai yang sudah diimplementasikan di layer proxy sebelum verifikasi ini.

### Perubahan yang dilakukan sesi ini
- `controllers/dashboardController.js` — diganti dari agregasi manual (5 fetch paralel) menjadi proxy langsung ke `GET /api/dashboard` milik App Service.
- Tidak ada perubahan lain di `appServiceClient.js`, `appAuthController.js`, `userDataController.js`, routes, atau middleware — semuanya sudah cocok saat diverifikasi.

### Apakah backend sudah benar-benar siap integrasi end-to-end?
**Ya, untuk jalur kode.** Sudah dites langsung terhadap App Service asli yang berjalan (bukan simulasi):
- App Service mati → backend balas `503` dengan pesan jelas ✓
- App Service hidup, body kosong → backend meneruskan `400` "Nomor HP dan password wajib diisi" ✓
- App Service hidup, tanpa DB (MySQL tidak tersedia di sandbox ini) → backend meneruskan `500` "Terjadi kesalahan pada server" persis sama dengan respons App Service langsung ✓
- Token kosong ke endpoint manapun di `/api/app/*` → `401` sebelum sempat memanggil App Service ✓

Satu-satunya yang **belum** tervalidasi adalah *happy path* dengan data asli (login berhasil → dapat token → dashboard/vehicles/dll menampilkan data sungguhan), karena sandbox pengembangan ini tidak punya MySQL untuk menjalankan `npm run db:schema && npm run db:seed` di repo App Service. Ini murni keterbatasan lingkungan, bukan gap kode. Langkah berikutnya: jalankan App Service dengan MySQL asli (lihat `mypertamina-clone-service` README/`db/seed.js` — dummy login `081234567890` / `password123`), lalu ulangi tes di bawah.

## Menjalankan & testing

```bash
npm install
npm run dev     # http://localhost:3001, baca .env untuk APP_SERVICE_BASE_URL
```

Tes cepat tanpa Postman (butuh App Service asli jalan di `APP_SERVICE_BASE_URL`, default `http://localhost:4000/api`):
```bash
curl -X POST http://localhost:3001/api/app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"081234567890","password":"password123"}'
```

Tanpa App Service aktif, request di atas tetap membalas rapi (`503`, bukan hang/crash) — sudah tervalidasi terhadap App Service asli, bukan cuma asumsi dari dokumentasi.
