"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
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
      });
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) => {
        const text = [
          product.name,
          product.category,
          product.description,
          product.highlight,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return text.includes(normalizedQuery);
      })
    : products;

  // Featured: prefer explicit highlight, else fallback to first matching items
  const highlighted = filteredProducts.filter((p) => p.highlight && String(p.highlight).trim() !== "");
  const featured = highlighted.length > 0 ? highlighted.slice(0, 4) : filteredProducts.slice(0, 4);

  // Latest: show newest products, preferring non-duplicate items but allowing overlap when there are few items
  const latestCandidates = filteredProducts.filter(
    (p) => !featured.some((featuredProduct) => featuredProduct.id === p.id)
  );
  const latest = latestCandidates.length > 0
    ? latestCandidates.slice(0, visibleCount)
    : filteredProducts.slice(0, visibleCount);

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappMessage = encodeURIComponent(
    "Halo Alrizm, saya ingin menanyakan tentang produk Anda."
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  function loadMore() {
    setVisibleCount((v) => v + 8);
  }

  return (
    <section id="products" className="product-section">
      <div className="search-bar">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari produk, kategori, atau deskripsi..."
          aria-label="Search products"
        />
        {searchQuery ? (
          <button type="button" className="button secondary clear-search" onClick={() => setSearchQuery("")}>Clear</button>
        ) : null}
      </div>
      <div className="featured-wrapper">
        <div className="featured-panel">
  <div className="featured-content">
    <p className="eyebrow">Featured Product</p>

    <h2>Selected Picks</h2>

    <div className="title-line"></div>

    <p className="featured-desc">
      Koleksi unggulan yang dipilih dengan detail, kualitas premium, dan desain elegan untuk mempercantik setiap momen Anda.
    </p>

    <div className="feature-list">
      <div className="feature-item">
        <div className="feature-icon">✓</div>
        <div>
          <strong>Kualitas Premium</strong>
          <span>Material berkualitas tinggi dan tahan lama.</span>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-icon">★</div>
        <div>
          <strong>Desain Eksklusif</strong>
          <span>Dirancang dengan detail dan elegan.</span>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-icon">📦</div>
        <div>
          <strong>Packaging Premium</strong>
          <span>Dilengkapi kemasan eksklusif yang menjaga kualitas produk hingga sampai ke tangan Anda.</span>
        </div>
      </div>
    </div>

    <a href={whatsappUrl} className="featured-btn" target="_blank" rel="noreferrer">
      ORDER NOW
    </a>
  </div>

  <div className="featured-showcase">
    <img
      src={featured[0]?.image || "/placeholder.jpg"}
      alt="Featured Product"
    />
  </div>
</div>
        <div className="small-feature-grid">
          {error ? (
            <p style={{ color: "#dc2626" }}>{error}</p>
          ) : featured.length > 0 ? (
            featured.map((item) => (
              <a key={item.id} href={`/product/${item.id}`} className="card small-card">
                {item.highlight ? <span className="card-tag">{item.highlight}</span> : null}
                <div className="card-media">
                  <img src={item.image || "https://via.placeholder.com/640x480"} alt={item.name} />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p className="product-price">Rp {Number(item.price).toLocaleString("id-ID")}</p>
                </div>
              </a>
            ))
          ) : (
            <p>Memuat produk terbaik...</p>
          )}
        </div>
      </div>

      <div className="section-title">
        <div>
          <p className="eyebrow">Latest Produk</p>
          <h2>Latest Produk</h2>
        </div>
      </div>

      <div className="product-grid">
        {error ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#dc2626" }}>{error}</p>
        ) : latest.length > 0 ? (
          latest.map((item) => (
            <a key={item.id} href={`/product/${item.id}`} className="card">
              {item.highlight ? <span className="card-tag">{item.highlight}</span> : null}
              <div className="card-media">
                <img src={item.image || "https://via.placeholder.com/640x480"} alt={item.name} />
              </div>
              <div>
                <span className="badge">{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="product-price">Rp {Number(item.price).toLocaleString("id-ID")}</p>
              </div>
            </a>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>Memuat produk...</p>
        )}
      </div>

      {visibleCount < filteredProducts.length ? (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button className="button secondary" onClick={loadMore}>Load more</button>
        </div>
      ) : null}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Tidak ada produk yang sesuai dengan pencarian.
        </p>
      ) : null}
    </section>
  );
}
