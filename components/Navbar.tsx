"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Alrizm, saya ingin berkonsultasi atau memesan perhiasan handmade Anda."
  )}`;

  return (
    <header className="site-header">
      {/* 1. Top Announcement Bar (Clean Single-Color Text) */}
      <div className="top-announcement-bar">
        <div className="announcement-content">
          <span>GRATIS KONSULTASI MODEL &amp; UKURAN</span>
          <span className="announcement-dot">•</span>
          <span>100% HANDMADE BATU ALAM NUSANTARA</span>
          <span className="announcement-dot">•</span>
          <span>PENGIRIMAN AMAN SELURUH INDONESIA</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`navbar-main ${scrolled ? "navbar-main--scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Mobile menu hamburger toggle */}
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

          {/* Brand Logo (Left - Filtered to Royal Navy Blue for 100% visibility on white) */}
          <div className="brand-wrapper">
            <Link href="/" className="brand-link" aria-label="Beranda UMKM Alrizm">
              <div className="brand-logo-container">
                <Image
                  src="/uploads/logo.png"
                  alt="Alrizm Handmade Of Bali"
                  width={150}
                  height={44}
                  priority
                  className="brand-logo"
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="nav-center-links" aria-label="Navigasi Utama">
            <Link href="/" className="nav-link active">
              HOME
            </Link>
            <a href="/#products" className="nav-link">
              SHOP
            </a>
            <Link href="/collection/Bracelet" className="nav-link">
              GELANG
            </Link>
            <Link href="/collection/Necklace" className="nav-link">
              KALUNG
            </Link>
            <Link href="/collection/Ring" className="nav-link">
              CINCIN
            </Link>
            <a href="/#story" className="nav-link">
              ABOUT US
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="nav-link">
              CONTACT
            </a>
          </div>

          {/* Right Action Icons (Search, Admin, WhatsApp) */}
          <div className="nav-right-actions">
            {/* Search Icon */}
            <a
              href="#products"
              className="action-icon-btn"
              title="Cari Produk"
              aria-label="Cari Produk"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </a>

            {/* Admin / Account Icon */}
            <Link
              href="/login"
              className="action-icon-btn"
              title="Portal Admin"
              aria-label="Portal Admin"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="action-wa-pill"
              aria-label="Chat WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Chat WA</span>
              <span className="wa-online-dot" />
            </a>
          </div>
        </div>

        {/* Mobile menu backdrop */}
        {menuOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Panel with Single-Color Line Icons */}
        <div id="mobile-menu-panel" className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
          <div className="mobile-drawer-links">
            <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-drawer-item active">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Home</span>
            </Link>
            <a href="/#category-section" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/></svg>
              <span>Kategori Perhiasan</span>
            </a>
            <a href="/#products" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Katalog Produk</span>
            </a>
            <Link href="/collection/Bracelet" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="4" r="1.5"/></svg>
              <span>Gelang (Bracelet)</span>
            </Link>
            <Link href="/collection/Necklace" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3c0 6 3 13 6 13s6-7 6-13"/><circle cx="12" cy="19" r="2.5"/></svg>
              <span>Kalung (Necklace)</span>
            </Link>
            <Link href="/collection/Ring" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="14" r="7"/><path d="M9 5h6l2 2-5 3-5-3 2-2z"/></svg>
              <span>Cincin (Ring)</span>
            </Link>
            <a href="/#story" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              <span>About Us (Tentang Kami)</span>
            </a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="mobile-drawer-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="mobile-drawer-cta">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="button primary mobile-wa-button"
            >
              <span>Chat WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
