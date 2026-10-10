"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-left" aria-label="Navigasi utama">
          <a href="/">Beranda</a>
          <a href="/#about">Tentang</a>
          <a href="/#products">Produk</a>
          <a href="/login">Admin</a>
        </nav>

        <div className="brand">
          <Image src="/uploads/logo.png" alt="Alrizm" width={180} height={52} className="brand-logo" />
        </div>

        <div className="nav-right">
          <a href="/#products" className="nav-link">New Arrivals</a>
          <a href="https://wa.me/6288987405531?text=Halo%20Alrizm%2C%20saya%20ingin%20bertanya%20tentang%20produk" className="nav-link" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div id="mobile-menu-panel" className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Beranda</a>
        <a href="/#about" onClick={() => setMenuOpen(false)}>Tentang</a>
        <a href="/#products" onClick={() => setMenuOpen(false)}>Produk</a>
        <a href="/login" onClick={() => setMenuOpen(false)}>Admin</a>
      </div>
    </header>
  );
}
