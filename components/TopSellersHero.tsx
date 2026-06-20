"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

export default function TopSellersHero() {
  const [products, setProducts] = useState<Product[]>([]);

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
        }
      })
      .catch((err) => {
        console.error("Error loading hero product:", err);
      });
  }, []);

  const topSellers = products
    .filter((product) => product.highlight && String(product.highlight).trim() !== "")
    .slice(0, 1);

  const heroProduct = topSellers.length > 0 ? topSellers[0] : products[0];
  const imageUrl = heroProduct?.image || "/placeholder.svg";

  return (
    <div className="hero-visual large-hero">
      <div className="hero-visual-inner">
        <div className="hero-arch hero-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      </div>
    </div>
  );
}
