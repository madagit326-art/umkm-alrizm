# UMKM Alrizm

Aplikasi Next.js untuk toko online kerajinan yang bisa dikelola oleh admin.

## Fitur
- Halaman utama menampilkan produk dan kategori
- Dashboard admin untuk tambah, edit, dan hapus produk
- Upload gambar produk ke folder publik
- Login admin dengan password yang bisa diatur lewat variabel lingkungan
- Koneksi ke database MySQL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Buat file `.env.local` dari contoh dan sesuaikan konfigurasi:

```env
MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=umkm_alrizm
ADMIN_PASSWORD=admin123
```

3. Jalankan XAMPP dan aktifkan MySQL.
4. Import database dari `database/schema.sql` melalui phpMyAdmin atau client MySQL.
5. Jalankan aplikasi:

```bash
npm run dev
```

6. Buka:
- `http://localhost:3000` untuk halaman utama
- `http://localhost:3000/login` untuk login admin
- `http://localhost:3000/admin` untuk panel admin

## Struktur proyek
- `app/` : halaman utama, login, admin, dan API route
- `components/` : komponen UI
- `lib/` : konfigurasi database dan tipe data
- `database/schema.sql` : skema tabel MySQL
- `public/uploads` : hasil upload gambar produk

## Catatan
- Gunakan password admin sesuai nilai `ADMIN_PASSWORD` di `.env.local`.
- Untuk produksi, pastikan nilai `ADMIN_PASSWORD` diubah dari default.
- Untuk deployment, gunakan layanan yang mendukung Next.js seperti Vercel, Railway, atau VPS.
