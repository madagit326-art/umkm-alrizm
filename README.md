# UMKM Alrizm

Aplikasi Next.js untuk toko online kerajinan yang bisa dikelola oleh admin.

## Fitur
- Halaman utama menampilkan produk dan kategori
- Dashboard admin untuk tambah, edit, dan hapus produk
- Upload gambar produk ke folder publik
- Login admin dengan password yang bisa diatur lewat variabel lingkungan
- Koneksi ke database PostgreSQL (Supabase)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Buat file `.env.local` dari contoh dan sesuaikan konfigurasi:

```env
# Supabase / PostgreSQL connection string
# Ambil dari Supabase > Project Settings > Database > Connection string
# Format yang benar:
# DATABASE_URL=postgres://postgres:YOUR_REAL_PASSWORD@db.xxxxx.supabase.co:5432/postgres
DATABASE_URL=postgres://postgres:YOUR_REAL_PASSWORD@db.xxxxx.supabase.co:5432/postgres
DB_SSL=true

ADMIN_PASSWORD=admin123
NEXT_PUBLIC_WHATSAPP_NUMBER=6288987405531
```

3. Import database dari `database/schema.sql` ke Supabase SQL Editor.
4. Jalankan aplikasi:

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
- `database/schema.sql` : skema tabel PostgreSQL
- `public/uploads` : hasil upload gambar produk

## Catatan
- Gunakan password admin sesuai nilai `ADMIN_PASSWORD` di `.env.local`.
- Untuk produksi, pastikan nilai `ADMIN_PASSWORD` diubah dari default.
- Untuk deployment ke Vercel, tambahkan variabel lingkungan berikut di dashboard Vercel:
  - `DATABASE_URL` (wajib untuk Supabase)
  - `DB_SSL=true`
  - `ADMIN_PASSWORD`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`
- Untuk Supabase, ambil connection string dari Project Settings > Database.
- Database yang dipakai oleh Vercel haruslah database online yang bisa diakses dari internet, bukan `localhost`.
