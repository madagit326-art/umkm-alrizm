"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "Semua Koleksi" },
  { id: "Bracelet", label: "Gelang (Bracelet)" },
  { id: "Necklace", label: "Kalung (Necklace)" },
  { id: "Earrings", label: "Anting (Earrings)" },
  { id: "Ring", label: "Cincin (Ring)" },
];

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Gagal memuat produk.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setError("");
        } else {
          setProducts([]);
          setError("Data produk tidak valid.");
        }
      })
      .catch((err) => {
        setProducts([]);
        setError(
          err instanceof Error
            ? err.message
            : "Tidak dapat memuat produk saat ini. Silakan coba lagi nanti."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((product) => {
        const text = [
          product.name,
          product.category,
          product.description,
          product.highlight,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return text.includes(query);
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  // Featured candidates
  const highlighted = filteredProducts.filter(
    (p) => p.highlight && String(p.highlight).trim() !== ""
  );
  const featured = highlighted.length > 0 ? highlighted.slice(0, 4) : filteredProducts.slice(0, 4);

  // Latest products
  const latest = filteredProducts.slice(0, visibleCount);

  function getWaLink(productName: string, price: number) {
    const text = `Halo Alrizm, saya ingin memesan ${productName} (Rp ${Number(price).toLocaleString("id-ID")}). Apakah produk ini masih tersedia?`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  }

  function loadMore() {
    setVisibleCount((v) => v + 8);
  }

  return (
    <section id="products" className="product-section">
      {/* Search & Category Filter */}
      <div className="product-filter-container">
        <div className="search-bar">
          <div className="search-icon-wrapper">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setVisibleCount(8);
            }}
            placeholder="Cari perhiasan, batu alam, gelang..."
            aria-label="Cari produk"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="category-pills" role="tablist" aria-label="Filter Kategori">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`category-pill ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(8);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section (Shown when no search query or in full catalog mode) */}
      {!searchQuery && selectedCategory === "all" && featured.length > 0 && (
        <div className="featured-wrapper">
          <div className="featured-panel">
            <div className="featured-content">
              <span className="eyebrow eyebrow--gold">Koleksi Terpilih</span>
              <h2>Selected Artisan Picks</h2>
              <div className="title-line" />
              <p className="featured-desc">
                Koleksi perhiasan handmade unggulan dengan material batu alam pilihan,
                ditenun dengan teliti untuk sentuhan gaya alami yang mempesona.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✨</div>
                  <div>
                    <strong>Material Pilihan</strong>
                    <span>Batu alam alami & tali berkualitas tinggi tahan air.</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">✋</div>
                  <div>
                    <strong>100% Buatan Tangan</strong>
                    <span>Dikerjakan dengan dedikasi pengrajin berpengalaman.</span>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">🎁</div>
                  <div>
                    <strong>Kemasan Eksklusif</strong>
                    <span>Aman dan siap dijadikan hadiah berkesan untuk yang tersayang.</span>
                  </div>
                </div>
              </div>

              {featured[0] && (
                <div className="featured-actions">
                  <a
                    href={getWaLink(featured[0].name, featured[0].price)}
                    className="button primary featured-btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Pesan via WhatsApp</span>
                  </a>
                  <Link href={`/product/${featured[0].id}`} className="button secondary">
                    Lihat Detail
                  </Link>
                </div>
              )}
            </div>

            <div className="featured-showcase">
              <div className="showcase-card">
                <img
                  src={featured[0]?.image || "/placeholder.svg"}
                  alt={featured[0]?.name || "Featured Product"}
                />
                {featured[0] && (
                  <div className="showcase-badge">
                    <span className="badge-tag">{featured[0].highlight || "Featured"}</span>
                    <h4>{featured[0].name}</h4>
                    <p className="showcase-price">
                      Rp {Number(featured[0].price).toLocaleString("id-ID")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Small Feature Grid */}
          {featured.slice(1, 3).length > 0 && (
            <div className="small-feature-grid">
              {featured.slice(1, 3).map((item) => (
                <div key={item.id} className="card small-card">
                  {item.highlight && <span className="card-tag">{item.highlight}</span>}
                  <Link href={`/product/${item.id}`} className="card-media">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </Link>
                  <div className="card-body">
                    <span className="badge">{item.category}</span>
                    <h4>
                      <Link href={`/product/${item.id}`}>{item.name}</Link>
                    </h4>
                    <p className="product-price">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>
                    <div className="card-actions">
                      <a
                        href={getWaLink(item.name, item.price)}
                        target="_blank"
                        rel="noreferrer"
                        className="button-sm button-wa"
                      >
                        Pesan
                      </a>
                      <Link href={`/product/${item.id}`} className="button-sm button-ghost">
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Latest Products Heading */}
      <div className="section-title">
        <div>
          <span className="eyebrow">
            {selectedCategory === "all" ? "Katalog Toko" : selectedCategory}
          </span>
          <h2>
            {selectedCategory === "all" ? "Semua Koleksi Perhiasan" : `Koleksi ${selectedCategory}`}
          </h2>
          <p className="section-subtitle">
            Daftar lengkap karya kerajinan tangan kami yang siap dipesan.
          </p>
        </div>
        <span className="product-count-badge">
          {filteredProducts.length} Produk Tersedia
        </span>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="loading-state">
          <div className="spinner" />
          <p>Memuat koleksi produk terbaik...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="product-grid">
          {latest.map((item) => (
            <div key={item.id} className="card">
              {item.highlight && <span className="card-tag">{item.highlight}</span>}
              <Link href={`/product/${item.id}`} className="card-media">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  loading="lazy"
                />
              </Link>
              <div className="card-body">
                <div className="card-header-row">
                  <span className="badge">{item.category}</span>
                </div>
                <h3 className="card-title">
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <p className="card-description">{item.description}</p>
                <div className="card-bottom">
                  <p className="product-price">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                  <div className="card-actions">
                    <a
                      href={getWaLink(item.name, item.price)}
                      target="_blank"
                      rel="noreferrer"
                      className="button-sm button-wa"
                      title="Pesan via WhatsApp"
                    >
                      Pesan via WA
                    </a>
                    <Link
                      href={`/product/${item.id}`}
                      className="button-sm button-ghost"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Tidak Ada Produk Ditemukan</h3>
          <p>
            Coba kata kunci lain atau pilih kategori yang berbeda untuk menemukan produk impian Anda.
          </p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Reset Filter & Pencarian
          </button>
        </div>
      )}

      {/* Load More Button */}
      {!loading && visibleCount < filteredProducts.length && (
        <div className="load-more-wrapper">
          <button type="button" className="button secondary load-more-btn" onClick={loadMore}>
            Tampilkan Lebih Banyak ({filteredProducts.length - visibleCount} tersisa)
          </button>
        </div>
      )}
    </section>
  );
}
