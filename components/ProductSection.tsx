"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
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

  // Latest: exclude highlighted items to avoid duplication
  const latestAll = filteredProducts.filter((p) => !(p.highlight && String(p.highlight).trim() !== ""));
  const latest = latestAll.slice(0, visibleCount);

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
          <p className="eyebrow">Featured Product</p>
          <h2>Selected Picks</h2>
          <p>Produk pilihan yang direkomendasikan oleh tim kami.</p>
        </div>
        <div className="small-feature-grid">
          {featured.length > 0 ? (
            featured.map((item) => (
              <a key={item.id} href={`/product/${item.id}`} className="card small-card">
                {item.highlight ? <span className="card-tag">{item.highlight}</span> : null}
                <img src={item.image || "https://via.placeholder.com/640x480"} alt={item.name} />
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
        {latest.length > 0 ? (
          latest.map((item) => (
            <a key={item.id} href={`/product/${item.id}`} className="card">
              {item.highlight ? <span className="card-tag">{item.highlight}</span> : null}
              <img src={item.image || "https://via.placeholder.com/640x480"} alt={item.name} />
              <div>
                <span className="badge">{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="product-price">Rp {Number(item.price).toLocaleString("id-ID")}</p>
              </div>
            </a>
          ))
        ) : (
          <p>Memuat produk...</p>
        )}
      </div>

      {visibleCount < latestAll.length ? (
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
