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

  // Find a good hero image or fallback
  const heroImage = products[0]?.image || "/uploads/1780541196550-bracelet2.jpg";
  const featureImage = products[1]?.image || "/uploads/1780539537086-bracelet3.jpg";

  return (
    <main className="page-shell-belora">
      <Navbar />

      {/* 1. HERO SECTION (Mirroring Reference Image Layout) */}
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

            {/* 3 Icons below CTA (Exact match to reference) */}
            <div className="hero-badges-row">
              <div className="hero-badge-item">
                <span className="badge-icon-svg">🌿</span>
                <span className="badge-text">MATERIAL ALAMI</span>
              </div>
              <div className="hero-badge-item">
                <span className="badge-icon-svg">✋</span>
                <span className="badge-text">100% HANDMADE</span>
              </div>
              <div className="hero-badge-item">
                <span className="badge-icon-svg">💎</span>
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
                <span className="floating-card-tag">✨ Signature Piece</span>
                <p className="floating-card-title">Macrame Tiger Eye Bracelet</p>
                <a href="#products" className="floating-card-link">Lihat Detail →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / FEATURE BAR (4 Items Horizontal Strip) */}
      <section className="trust-bar-section">
        <div className="trust-bar-container">
          <div className="trust-bar-item">
            <div className="trust-bar-icon">🌿</div>
            <div className="trust-bar-info">
              <h4>Alami &amp; Aman</h4>
              <p>Batu alam pilihan asli dengan tali berkualitas.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-bar-icon">🔬</div>
            <div className="trust-bar-info">
              <h4>Kualitas Teruji</h4>
              <p>Ditenun teliti dengan benang kuat tahan air.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-bar-icon">🛡️</div>
            <div className="trust-bar-info">
              <h4>Garansi Kepuasan</h4>
              <p>Bisa pesan custom ukuran pas di pergelangan.</p>
            </div>
          </div>

          <div className="trust-bar-item">
            <div className="trust-bar-icon">📦</div>
            <div className="trust-bar-info">
              <h4>Kemasan Eksklusif</h4>
              <p>Aman dikirim ke seluruh nusantara &amp; siap kado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (Circular Icons with Line Divider) */}
      <section id="category-section" className="category-circular-section">
        <div className="section-divider-header">
          <div className="divider-line" />
          <h2 className="section-divider-title">SHOP BY CATEGORY</h2>
          <div className="divider-line" />
        </div>

        <div className="category-circular-grid">
          <Link href="/collection/Bracelet" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">🧿</span>
            </div>
            <span className="circle-label">Gelang</span>
          </Link>

          <Link href="/collection/Necklace" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">📿</span>
            </div>
            <span className="circle-label">Kalung</span>
          </Link>

          <Link href="/collection/Ring" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">💍</span>
            </div>
            <span className="circle-label">Cincin</span>
          </Link>

          <Link href="/collection/Earrings" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">✨</span>
            </div>
            <span className="circle-label">Anting</span>
          </Link>

          <a href="#products" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">🎁</span>
            </div>
            <span className="circle-label">Gift Sets</span>
          </a>

          <a href="#products" className="circular-category-item">
            <div className="circle-icon-frame">
              <span className="circle-emoji">🛍️</span>
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

      {/* 6. OUR STORY / STATS BANNER (Deep Sapphire Blue) */}
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
              <span className="stat-icon">✋</span>
              <strong className="stat-number">100%</strong>
              <span className="stat-label">Buatan Tangan</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon">💎</span>
              <strong className="stat-number">50+</strong>
              <span className="stat-label">Model Eksklusif</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <strong className="stat-number">1.000+</strong>
              <span className="stat-label">Pelanggan Puas</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🚚</span>
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
