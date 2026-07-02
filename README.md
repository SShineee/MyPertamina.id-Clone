# ⛽ MyPertamina Clone

MyPertamina Clone merupakan aplikasi web **full-stack** yang mengadopsi konsep utama aplikasi MyPertamina. Proyek ini terdiri dari **Main Application** untuk pengguna umum dan **Content Management System (CMS)** untuk administrator dalam mengelola konten, harga BBM, pengguna, serta hak akses.

Proyek dikembangkan menggunakan **Nuxt.js**, **Express.js**, dan **MySQL** dengan menerapkan metodologi **Agile**.

---

## 🚀 Fitur

### Main Application
- Halaman beranda (Homepage)
- Menampilkan harga BBM secara dinamis
- Menampilkan promo dan banner
- Menampilkan berita atau informasi terbaru
- Tampilan responsif

### Content Management System (CMS)
- Mengelola konten (promo, banner, berita, dan informasi lainnya)
- Mengubah harga BBM
- Manajemen pengguna (User Management)
- Manajemen peran (Role Management)
- Menambahkan dan mengelola role sesuai kebutuhan

---

## 🛠️ Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Frontend | Nuxt.js |
| Backend | Express.js |
| Database | MySQL |
| API | REST API |

---

## 📁 Struktur Proyek

```
.
├── frontend/      # Main Application
├── backend/       # REST API Express.js
├── cms/           # Dashboard CMS
└── docs/          # Dokumen Use Case & Solution Design
```

---

## 📚 Dokumentasi

Dokumen yang disertakan dalam proyek ini meliputi:

- Use Case Diagram
- Use Case Specification
- Solution Design
- Dokumentasi API (jika tersedia)

---

## ⚙️ Instalasi

### Clone Repository

```bash
git clone https://github.com/username/mypertamina-clone.git
cd mypertamina-clone
```

### Menjalankan Backend

```bash
cd backend
npm install
npm run dev
```

### Menjalankan Main Application

```bash
cd frontend
npm install
npm run dev
```

### Menjalankan CMS

```bash
cd cms
npm install
npm run dev
```

## 📄 Lisensi

Proyek ini dibuat hanya untuk keperluan pembelajaran dan tidak memiliki afiliasi resmi dengan Pertamina maupun aplikasi MyPertamina.
