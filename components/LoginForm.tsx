"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Silakan masukkan password admin.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Password salah. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan. Cek koneksi Anda.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-brand">
          <Link href="/">
            <Image
              src="/images/logo/logo-alrizm.png"
              alt="UMKM Alrizm Logo"
              width={140}
              height={44}
              priority
              className="brand-logo"
            />
          </Link>
          <div className="portal-badge">PORTAL ADMINISTRASI</div>
          <p className="admin-login-subtitle">
            Masuk untuk mengelola katalog, stok, dan produk perhiasan batu alam
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-field-group">
            <label htmlFor="admin-pass-input" className="admin-field-label">
              Password Admin
            </label>
            <div className="admin-password-input-wrapper">
              <input
                id="admin-pass-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                disabled={loading}
                autoFocus
                className="admin-field-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye slash icon
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-alert error">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="admin-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-micro" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          <div className="admin-login-footer">
            <Link href="/" className="back-to-shop-link">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Kembali ke Beranda Toko</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
