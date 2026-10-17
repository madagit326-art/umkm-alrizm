"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import type { Product } from "@/lib/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Halo Alrizm, saya ingin berkonsultasi mengenai koleksi perhiasan handmade Anda."
  )}`;

  const heroImage = products[0]?.image || "/uploads/1780541196550-bracelet2.jpg";
  const featureImage = products[1]?.image || "/uploads/1780539537086-bracelet3.jpg";

  return (
    <main className="page-shell-belora">
      <Navbar />

      {/* 1. HERO SECTION (Clean Minimalist Vector Icons) */}
      <section className="belora-hero-section">
        <div className="belora-hero-inner">
          {/* Left Column: Copy & CTAs */}
          <div className="belora-hero-copy">
            <span className="hero-eyebrow-accent">NATURAL BEAUTY, RADIANT YOU</span>
            <h1 className="hero-serif-title">
              Pure Stones,<br />Powerful Results
            </h1>
            <p className="hero-lead-text">
              Temukan perpaduan estetika modern dan pesona batu alam asli nusantara. Koleksi
              artisanal kalung, gelang makrame, dan cincin buatan tangan pengrajin lokal untuk
              menyempurnakan gaya harian Anda.
            </p>

            <div className="hero-cta-row">
              <a href="#products" className="belora-primary-pill-btn">
                <span>SHOP NOW</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>

            {/* 3 Single-Color Minimalist Line Icons below CTA */}
            <div className="hero-badges-row">
              <div className="hero-badge-item">
                <span className="badge-vector-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 8-9 1 3 1 6 0 9" />
                    <path d="M12 4c3 1 6 4 6 9a7 7 0 0 1-7 7" />
                    <path d="M12 4v16" />
                  </svg>
                </span>
                <span className="badge-text">MATERIAL ALAMI</span>
              </div>

              <div className="hero-badge-item">
                <span className="badge-vector-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                    <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                    <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                    <path d="M6 14v1a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0" />
                  </svg>
                </span>
                <span className="badge-text">100% HANDMADE</span>
              </div>

              <div className="hero-badge-item">
                <span className="badge-vector-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
                  </svg>
                </span>
                <span className="badge-text">KUALITAS TERJAMIN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Composition Image */}
          <div className="belora-hero-showcase">
            <div className="showcase-composition-frame">
              <img
                src={heroImage}
                alt="Alrizm Handcrafted Jewelry"
                className="showcase-main-img"
              />
              <div className="showcase-floating-card">
                <span className="floating-card-tag">Signature Piece</span>
                <p className="floating-card-title">Macrame Tiger Eye Bracelet</p>
                <a href="#products" className="floating-card-link">Lihat Detail →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / FEATURE BAR (Single-Color Clean Vector Icons) */}
      <section className="trust-bar-section">
        <div className="trust-bar-container">
          <div className="trust-bar-item">
            <div className="trust-vector-icon">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
              </svg>
            </div>
            <div className="trust-bar-info">
              <h4>Alami &amp; Aman</h4>
              <p>Batu alam pilihan asli dengan tali berkualitas.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-vector-icon">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="m9 8 2 2 4-4" />
                <path d="m15.5 13.5 2 7.5-5.5-3-5.5 3 2-7.5" />
              </svg>
            </div>
            <div className="trust-bar-info">
              <h4>Kualitas Teruji</h4>
              <p>Ditenun teliti dengan benang kuat tahan air.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-vector-icon">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="trust-bar-info">
              <h4>Garansi Kepuasan</h4>
              <p>Bisa pesan custom ukuran pas di pergelangan.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-vector-icon">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect width="20" height="5" x="2" y="7" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <div className="trust-bar-info">
              <h4>Kemasan Eksklusif</h4>
              <p>Aman dikirim ke seluruh nusantara &amp; siap kado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (Minimalist 1-Color Jewelry Vector Icons) */}
      <section id="category-section" className="category-circular-section">
        <div className="section-divider-header">
          <div className="divider-line" />
          <h2 className="section-divider-title">SHOP BY CATEGORY</h2>
          <div className="divider-line" />
        </div>

        <div className="category-circular-grid">
          {/* Gelang / Bracelet Vector */}
          <Link href="/collection/Bracelet" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                <circle cx="17.6" cy="6.4" r="1.5" fill="currentColor" />
                <circle cx="20" cy="12" r="1.5" fill="currentColor" />
                <circle cx="17.6" cy="17.6" r="1.5" fill="currentColor" />
                <circle cx="12" cy="20" r="1.5" fill="currentColor" />
                <circle cx="6.4" cy="17.6" r="1.5" fill="currentColor" />
                <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                <circle cx="6.4" cy="6.4" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="circle-label">Gelang</span>
          </Link>

          {/* Kalung / Necklace Vector */}
          <Link href="/collection/Necklace" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <path d="M6 3c0 6 3 13 6 13s6-7 6-13" />
                <circle cx="12" cy="19" r="2.5" />
                <path d="M12 16v0.5" />
              </svg>
            </div>
            <span className="circle-label">Kalung</span>
          </Link>

          {/* Cincin / Ring Vector */}
          <Link href="/collection/Ring" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <circle cx="12" cy="14" r="7" />
                <path d="M9 5h6l2 2-5 3-5-3 2-2z" />
              </svg>
            </div>
            <span className="circle-label">Cincin</span>
          </Link>

          {/* Anting / Earrings Vector */}
          <Link href="/collection/Earrings" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <circle cx="8" cy="5" r="2" />
                <path d="M8 7v7" />
                <circle cx="8" cy="17" r="3" />
                <circle cx="16" cy="5" r="2" />
                <path d="M16 7v7" />
                <circle cx="16" cy="17" r="3" />
              </svg>
            </div>
            <span className="circle-label">Anting</span>
          </Link>

          {/* Kado / Gift Sets Vector */}
          <a href="#products" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M12 8v13" />
                <path d="M3 12h18" />
                <path d="M12 8a3 3 0 0 0-3-3 2 2 0 0 0-2 2c0 2 5 1 5 1z" />
                <path d="M12 8a3 3 0 0 1 3-3 2 2 0 0 1 2 2c0 2-5 1-5 1z" />
              </svg>
            </div>
            <span className="circle-label">Gift Sets</span>
          </a>

          {/* Semua Produk / All Products Vector */}
          <a href="#products" className="circular-category-item">
            <div className="circle-icon-frame">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="circle-vector-svg">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <span className="circle-label">Semua Produk</span>
          </a>
        </div>
      </section>

      {/* 4. SPLIT FEATURE BANNER ("Indulge in Everyday Self Care") */}
      <section className="indulge-story-section">
        <div className="indulge-story-container">
          <div className="indulge-story-copy">
            <span className="hero-eyebrow-accent">SELF CARE ISN'T SELFISH</span>
            <h2 className="hero-serif-title">
              Indulge in Everyday<br />Natural Style
            </h2>
            <p className="indulge-desc">
              Hadirkan keindahan yang tenang dan otentik dalam keseharian Anda. Setiap batu alam
              dipilih secara seksama, dirangkai helai demi helai dengan teknik makrame tradisional
              yang kuat, menghasilkan perhiasan bermakna yang tahan lama.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="belora-primary-pill-btn">
              <span>DISCOVER MORE</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>

          <div className="indulge-story-media">
            <div className="story-media-frame">
              <img
                src={featureImage}
                alt="Natural Jewelry Composition"
                className="story-main-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS & FULL CATALOG SECTION */}
      <ProductSection />

      {/* 6. OUR STORY / STATS BANNER (Deep Sapphire Blue with Clean Vector Icons) */}
      <section id="story" className="story-stats-banner">
        <div className="story-stats-container">
          <div className="story-stats-copy">
            <span className="story-eyebrow">OUR STORY</span>
            <h2 className="story-title">Beauty That Cares</h2>
            <p className="story-desc">
              Di UMKM Alrizm, kami percaya perhiasan bernilai lahir dari ketulusan tangan pengrajin,
              kejujuran material alami, dan rasa cinta pada kelestarian budaya nusantara.
            </p>
          </div>

          <div className="story-stats-grid">
            <div className="stat-card">
              <span className="stat-vector-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-4 0v5" />
                  <path d="M14 10V4a2 2 0 0 0-4 0v6" />
                  <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                  <path d="M6 14v1a6 6 0 0 0 6 6h1a6 6 0 0 0 6-6v-3a2 2 0 0 0-4 0" />
                </svg>
              </span>
              <strong className="stat-number">100%</strong>
              <span className="stat-label">Buatan Tangan</span>
            </div>

            <div className="stat-card">
              <span className="stat-vector-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                  <path d="M2 9h20" />
                  <path d="m10 21 2-12 2 12" />
                </svg>
              </span>
              <strong className="stat-number">50+</strong>
              <span className="stat-label">Model Eksklusif</span>
            </div>

            <div className="stat-card">
              <span className="stat-vector-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
              <strong className="stat-number">1.000+</strong>
              <span className="stat-label">Pelanggan Puas</span>
            </div>

            <div className="stat-card">
              <span className="stat-vector-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              <strong className="stat-number">34</strong>
              <span className="stat-label">Provinsi Terjangkau</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLEAN LIGHT FOOTER */}
      <Footer />
    </main>
  );
}
