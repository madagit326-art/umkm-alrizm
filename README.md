# UMKM Alrizm

Aplikasi Next.js untuk toko online kerajinan yang bisa dikelola oleh admin.

## Fitur
- Halaman utama menampilkan produk
- Dashboard admin untuk tambah, edit, dan hapus produk
- Tersambung ke database MySQL (XAMPP)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Salin file `.env.example` menjadi `.env.local` dan sesuaikan konfigurasi MySQL:

```env
MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=umkm_alrizm
```

3. Jalankan XAMPP dan aktifkan MySQL.
4. Import database dari `database/schema.sql` di phpMyAdmin.
5. Jalankan aplikasi:

```bash
npm run dev
```

6. Buka:
- `http://localhost:3000` untuk halaman utama
- `http://localhost:3000/admin` untuk panel admin

## Struktur modular
- `app/page.tsx` : halaman utama
- `app/admin/page.tsx` : dashboard admin
- `app/api/products/route.ts` : API endpoint CRUD
- `lib/db.ts` : helper koneksi MySQL
- `components/` : UI modular untuk halaman dan admin

## Catatan
- Saat ini belum ada autentikasi admin.
- Untuk gambar produk, gunakan URL gambar eksternal atau hosting sendiri.
