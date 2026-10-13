"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductSection from "@/components/ProductSection";
import Navbar from "@/components/Navbar";
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

  const arrivals = products.slice(0, 4);
  const featuredImage = products.find((product) => product.image)?.image || "/placeholder.svg";
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Halo Alrizm, saya ingin berkonsultasi mengenai produk perhiasan handmade Anda."
  )}`;

  return (
    <main className="page-shell">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section hero-section--clean">
        <div className="hero-copy hero-copy--centered">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            <span>KERAJINAN TANGAN ASLI NUSANTARA</span>
          </div>

          <h1>Curated Sustainable Style</h1>

          <p className="lead">
            Perpaduan keindahan estetika modern dan material alami nusantara. Temukan ragam koleksi
            gelang makrame, batu alam, kalung, dan cincin buatan tangan pengrajin lokal.
          </p>

          <div className="hero-actions">
            <a
              href={whatsappUrl}
              className="button primary hero-wa-btn"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Chat &amp; Pesan via WA</span>
            </a>
            <a href="#products" className="button secondary hero-explore-btn">
              Jelajahi Produk
            </a>
          </div>
        </div>

        {/* Value Highlights Strip */}
        <div className="hero-trust-strip">
          <div className="trust-card">
            <span className="trust-icon">🌿</span>
            <div className="trust-text">
              <strong>Ramah Lingkungan</strong>
              <span>Material ramah alam</span>
            </div>
          </div>
          <div className="trust-card">
            <span className="trust-icon">✋</span>
            <div className="trust-text">
              <strong>100% Handmade</strong>
              <span>Ditenun dengan cinta</span>
            </div>
          </div>
          <div className="trust-card">
            <span className="trust-icon">🚚</span>
            <div className="trust-text">
              <strong>Pengiriman Cepat</strong>
              <span>Ke seluruh Indonesia</span>
            </div>
          </div>
          <div className="trust-card">
            <span className="trust-icon">⭐</span>
            <div className="trust-text">
              <strong>Bisa Custom</strong>
              <span>Ukuran pas di tangan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Collection Section */}
      <section id="collection" className="collection-section">
        <div className="collection-header">
          <span className="eyebrow">Kategori Koleksi</span>
          <h2 className="collection-title">Eksplorasi Berdasarkan Kategori</h2>
          <p className="collection-subtitle">Pilih jenis perhiasan yang sesuai dengan karakter gaya Anda</p>
        </div>

        <div className="collection-row">
          <Link href="/collection/Necklace" className="collection-item">
            <div className="collection-item-inner">
              <span className="collection-icon">📿</span>
              <h3>NECKLACES</h3>
              <p>Kalung Elegan &amp; Etnik</p>
              <span className="collection-arrow">Lihat Koleksi →</span>
            </div>
          </Link>

          <Link href="/collection/Bracelet" className="collection-item">
            <div className="collection-item-inner">
              <span className="collection-icon">🧿</span>
              <h3>BRACELETS</h3>
              <p>Gelang Makrame Batu Alam</p>
              <span className="collection-arrow">Lihat Koleksi →</span>
            </div>
          </Link>

          <Link href="/collection/Earrings" className="collection-item">
            <div className="collection-item-inner">
              <span className="collection-icon">✨</span>
              <h3>EARRINGS</h3>
              <p>Anting Cantik Eksklusif</p>
              <span className="collection-arrow">Lihat Koleksi →</span>
            </div>
          </Link>

          <Link href="/collection/Ring" className="collection-item">
            <div className="collection-item-inner">
              <span className="collection-icon">💍</span>
              <h3>RINGS</h3>
              <p>Cincin Unik &amp; Berkarakter</p>
              <span className="collection-arrow">Lihat Koleksi →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Product Catalog Section */}
      <ProductSection />

      {/* Handcrafted Story Section */}
      <section className="handcrafted-section">
        <div className="handcrafted-left">
          <div className="handcrafted-media">
            <img src={featuredImage} alt="Handcrafted jewelry piece" loading="lazy" />
            <div className="handcrafted-media-caption">
              <span>✨ Signature Handmade Craft</span>
            </div>
          </div>
        </div>
        <div className="handcrafted-right">
          <span className="handcrafted-badge">Keahlian Tangan Pengrajin</span>
          <h2>Karya Autentik, Dibuat dengan Presisi</h2>
          <p>
            Setiap untaian perhiasan kami dirancang menggunakan bahan alami dan batu alam pilihan.
            Dikerjakan satu per satu dengan ketelitian tinggi oleh pengrajin lokal berbakat,
            menghasilkan karya yang tidak hanya memikat mata namun juga bernilai seni tinggi.
          </p>
          <div className="handcrafted-points">
            <div className="point-item">
              <strong>✓ Benang Kuat &amp; Tahan Air:</strong> Tidak mudah lapuk untuk pemakaian sehari-hari.
            </div>
            <div className="point-item">
              <strong>✓ Batu Alam Asli:</strong> Memancarkan kilau dan energi positif alami.
            </div>
          </div>
          <a className="button primary crafted-button" href="#products">
            Pilih Karya Favorit Anda
          </a>
        </div>
      </section>

      {/* New Arrivals (Mosaic Showcase) */}
      <section className="new-arrivals">
        <div className="new-arrivals-header">
          <span className="eyebrow">Rilisan Terbaru</span>
          <h2>Fresh Picks For Your Collection</h2>
          <p className="new-arrivals-subtitle">
            Koleksi terbaru minggu ini yang paling banyak diminati pelanggan setia kami.
          </p>
        </div>

        <div className="mosaic-grid">
          {arrivals.length > 0 ? (
            arrivals.map((product, index) => (
              <Link
                key={product.id ?? index}
                href={`/product/${product.id}`}
                className={`mosaic-card ${
                  index === 0 ? "mosaic-card--large" : "mosaic-card--small"
                }`}
                style={{
                  backgroundImage: `url(${product.image || "/placeholder.svg"})`,
                }}
              >
                <div className={`mosaic-overlay ${index === 0 ? "" : "mosaic-overlay--compact"}`}>
                  <span className="mosaic-tag">{product.highlight || "Koleksi Baru"}</span>
                  <h3>{product.name}</h3>
                  <p className="mosaic-price">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </p>
                  {index === 0 && (
                    <p className="mosaic-desc">
                      {product.description || "Temukan perhiasan eksklusif untuk menyempurnakan penampilan Anda."}
                    </p>
                  )}
                  <span className="mosaic-action">Lihat Produk →</span>
                </div>
              </Link>
            ))
          ) : (
            [0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`mosaic-card ${
                  index === 0 ? "mosaic-card--large" : "mosaic-card--small"
                }`}
              >
                <div className="mosaic-overlay">
                  <span>Memuat Koleksi...</span>
                  <h3>Produk Alrizm</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-intro">
            <span className="eyebrow">Tentang Kami</span>
            <h2>Dedikasi Kami Untuk Keindahan Alam</h2>
            <p>
              UMKM Alrizm berdedikasi melestarikan seni kerajinan tangan lokal dengan sentuhan desain
              yang relevan untuk generasi masa kini. Kami percaya perhiasan yang bermakna lahir dari
              kejujuran material dan cinta pada proses pengerjaannya.
            </p>
          </div>

          <div className="about-grid">
            <div className="feature-card">
              <div className="feature-card-icon">🌿</div>
              <h3>Eco-Friendly</h3>
              <p>
                Menggunakan bahan baku alami yang ramah lingkungan dan proses pembuatan berprinsip
                berkelanjutan tanpa limbah berlebih.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">💎</div>
              <h3>Kualitas Terjamin</h3>
              <p>
                Setiap item melewati pengecekan teliti sebelum dikemas agar tahan lama dan nyaman
                dikenakan setiap hari.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon">👐</div>
              <h3>Pemberdayaan Pengrajin</h3>
              <p>
                Setiap pembelian Anda secara langsung mendukung mata pencaharian pengrajin lokal dan
                keluarganya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
