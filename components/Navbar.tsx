"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Alrizm, saya ingin menanyakan tentang produk Anda."
  )}`;

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Mobile menu button */}
        <button
          type="button"
          className={`mobile-menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>

        {/* Desktop Left Nav */}
        <nav className="nav-left" aria-label="Navigasi utama">
          <Link href="/">Beranda</Link>
          <a href="/#collection">Koleksi</a>
          <a href="/#products">Produk</a>
          <a href="/#about">Tentang</a>
        </nav>

        {/* Brand Logo (Center on mobile & desktop) */}
        <div className="brand">
          <Link href="/" className="brand-link" aria-label="Beranda UMKM Alrizm">
            <Image
              src="/uploads/logo.png"
              alt="UMKM Alrizm"
              width={160}
              height={46}
              priority
              className="brand-logo"
            />
          </Link>
        </div>

        {/* Desktop Right Nav & Mobile Quick WA */}
        <div className="nav-right">
          <Link href="/login" className="nav-link nav-link--subtle">
            Admin
          </Link>
          <a
            href={whatsappUrl}
            className="nav-link nav-link--cta"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat WhatsApp Alrizm"
          >
            <svg
              className="nav-wa-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Quick WA Icon on Right */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mobile-wa-icon"
          aria-label="Hubungi via WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div id="mobile-menu-panel" className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-links">
            <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-link">
              <span>🏠</span> Beranda
            </Link>
            <a href="/#collection" onClick={() => setMenuOpen(false)} className="mobile-link">
              <span>💎</span> Koleksi
            </a>
            <a href="/#products" onClick={() => setMenuOpen(false)} className="mobile-link">
              <span>✨</span> Produk & Katalog
            </a>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="mobile-link">
              <span>🌿</span> Tentang Kami
            </a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="mobile-link">
              <span>🔐</span> Admin Login
            </Link>
          </div>

          <div className="mobile-menu-footer">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button primary mobile-wa-action"
            >
              <span>Chat WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
