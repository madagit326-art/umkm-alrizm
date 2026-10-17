"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "Semua Produk" },
  { id: "Bracelet", label: "Gelang" },
  { id: "Necklace", label: "Kalung" },
  { id: "Ring", label: "Cincin" },
  { id: "Earrings", label: "Anting" },
];

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
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

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

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

  const latest = filteredProducts.slice(0, visibleCount);

  function getWaLink(productName: string, price: number) {
    const text = `Halo Alrizm, saya ingin memesan ${productName} (Rp ${Number(price).toLocaleString("id-ID")}). Apakah masih tersedia?`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  }

  function loadMore() {
    setVisibleCount((v) => v + 10);
  }

  return (
    <section id="products" className="best-sellers-section">
      {/* Reference Header with Centered Line Divider */}
      <div className="section-divider-header">
        <div className="divider-line" />
        <h2 className="section-divider-title">BEST SELLERS</h2>
        <div className="divider-line" />
        <a
          href="#products"
          onClick={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
          className="view-all-link"
        >
          VIEW ALL PRODUCTS →
        </a>
      </div>

      {/* Search & Filter Pill Controls */}
      <div className="catalog-controls">
        <div className="search-pill-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari perhiasan, batu alam, cincin..."
            aria-label="Cari produk"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filter-tabs" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`filter-tab ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(10);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Error Messages */}
      {loading && (
        <div className="loading-box">
          <div className="spinner-blue" />
          <p>Memuat koleksi terbaik...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {/* Reference Card Grid (5/4 cols on PC, 3 on Tab, 2 on Mobile) */}
      {!loading && !error && (
        <div className="bestseller-grid">
          {latest.map((item) => (
            <div key={item.id} className="bestseller-card">
              {item.highlight && (
                <span className="card-badge-pill">{item.highlight}</span>
              )}

              <Link href={`/product/${item.id}`} className="bestseller-image-wrapper">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  loading="lazy"
                  className="bestseller-image"
                />
              </Link>

              <div className="bestseller-content">
                <span className="bestseller-category">{item.category}</span>
                <h3 className="bestseller-name">
                  <Link href={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <p className="bestseller-price">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </p>

                {/* Star Rating from Reference Image */}
                <div className="bestseller-rating" aria-label="Rating 5 dari 5 bintang">
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                </div>

                {/* Add to Cart / Order Button from Reference Image */}
                <a
                  href={getWaLink(item.name, item.price)}
                  target="_blank"
                  rel="noreferrer"
                  className="bestseller-cart-btn"
                  title="Pesan via WhatsApp"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>PESAN VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-catalog">
          <p>Tidak ada produk yang cocok dengan pencarian Anda.</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Load More */}
      {!loading && visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button type="button" className="load-more-blue-btn" onClick={loadMore}>
            Muat Lebih Banyak ({filteredProducts.length - visibleCount} lagi)
          </button>
        </div>
      )}
    </section>
  );
}
