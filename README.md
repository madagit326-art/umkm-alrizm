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

2. Salin file `.env.example` ke `.env.local` lalu isi nilai yang sesuai.

```bash
copy .env.example .env.local
```

Contoh konfigurasi:

```env
# Database PostgreSQL / Supabase
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
DB_SSL=true

# Admin auth
ADMIN_PASSWORD=admin123

# WhatsApp CTA
NEXT_PUBLIC_WHATSAPP_NUMBER=6288987405531

# Supabase storage (opsional untuk upload produk)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=products
```

3. Import database dari `database/schema.sql` ke Supabase SQL Editor.
4. Jalankan aplikasi:

```bash
npm run dev
```

5. Buka:
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
  - `DATABASE_URL`
  - `DB_SSL=true`
  - `ADMIN_PASSWORD`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_STORAGE_BUCKET`
- Untuk Supabase, ambil connection string dari `Project Settings > Database`.
- Database yang dipakai oleh Vercel haruslah database online yang bisa diakses dari internet, bukan `localhost`.
- Jika upload gambar atau admin panel belum bekerja, pastikan bucket storage `products` sudah dibuat di Supabase dan kebijakan storage sudah diatur agar dapat upload.
