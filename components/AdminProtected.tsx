"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AdminConsole from "./AdminConsole";

export default function AdminProtected() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Memuat Portal Admin Alrizm...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    router.push("/login");
  }

  return (
    <div className="admin-root-layout">
      {/* Dedicated Professional Admin Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-topbar-left">
            <Link href="/admin" className="admin-brand-link">
              <Image
                src="/images/logo/logo-alrizm.png"
                alt="UMKM Alrizm Logo"
                width={125}
                height={40}
                priority
                className="brand-logo admin-logo"
              />
              <span className="admin-portal-badge">PORTAL ADMIN</span>
            </Link>
          </div>

          <div className="admin-topbar-right">
            <Link href="/" target="_blank" className="admin-nav-action-btn view-shop-btn" title="Buka Toko Online di tab baru">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Lihat Toko Online</span>
            </Link>

            <div className="admin-user-pill">
              <span className="admin-status-dot" />
              <span className="admin-user-role">Administrator</span>
            </div>

            <button
              onClick={handleLogout}
              type="button"
              className="admin-logout-btn"
              title="Keluar dari sesi admin"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="admin-main-viewport">
        <AdminConsole />
      </main>
    </div>
  );
}
