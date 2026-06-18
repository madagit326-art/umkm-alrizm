"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

export default function TopSellersHero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Error loading top sellers:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const topSellers = products
    .filter((product) => product.highlight && String(product.highlight).trim() !== "")
    .slice(0, 1);

  const heroProduct = topSellers.length > 0 ? topSellers[0] : products[0];
  const imageUrl = heroProduct?.image || "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="hero-visual large-hero">
      <div className="hero-visual-inner">
        <div className="hero-arch hero-image" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="hero-bestseller">
          <h3>TOP SELLERS</h3>
          <p>Produk paling populer pilihan pelanggan kami.</p>
          {loading ? (
            <p>Memuat top sellers...</p>
          ) : heroProduct ? (
            <div className="hero-seller-details">
              <strong>{heroProduct.name}</strong>
              <span>{heroProduct.category}</span>
              <p>{heroProduct.description}</p>
              <p className="product-price">Rp {Number(heroProduct.price).toLocaleString("id-ID")}</p>
            </div>
          ) : (
            <p>Tidak ada produk top seller saat ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}
