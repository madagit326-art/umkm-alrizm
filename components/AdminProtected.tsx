"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminConsole from "./AdminConsole";
import Navbar from "./Navbar";

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
      <main className="page-shell">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <p>Loading...</p>
        </div>
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
    <main className="page-shell admin-shell">
      <Navbar />
      <section className="admin-header">
        <div>
          <p className="eyebrow">ADMIN</p>
          <h1>Kelola Produk</h1>
          <p>Tambah, edit, dan hapus produk langsung dari dashboard ini.</p>
        </div>
        <button
          onClick={handleLogout}
          className="button secondary"
          style={{ marginLeft: "auto" }}
        >
          Logout
        </button>
      </section>
      <AdminConsole />
    </main>
  );
}
