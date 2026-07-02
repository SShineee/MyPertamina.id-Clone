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
