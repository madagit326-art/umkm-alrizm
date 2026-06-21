"use client";

import { useEffect, useState } from "react";
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

  return (
    <main className="page-shell">
      <Navbar />

      <section className="hero-section hero-section--clean">
        <div className="hero-copy hero-copy--centered">
          <p className="eyebrow">LET'S SHOP</p>
          <h1>Curated Sustainable Style</h1>
          <p className="lead">Where modern style meets organic beauty. Explore our curated collection of artisanal necklaces, rings, bracelets, and anklets.</p>
          <div className="hero-actions">
            <a href="https://wa.me/6288987405531?text=Halo%20Alrizm%2C%20saya%20ingin%20menanyakan%20tentang%20produk%20Anda" className="button primary" target="_blank" rel="noreferrer">Hubungi Kami</a>
          </div>
        </div>
      </section>

      <section className="collection-section">
        <h2 className="collection-title">OUR COLLECTION</h2>
        <div className="collection-row">
          <a href="/collection/Necklace" className="collection-item">NECKLACES</a>
          <a href="/collection/Bracelet" className="collection-item">BRACELET</a>
          <a href="/collection/Earrings" className="collection-item">EARRINGS</a>
          <a href="/collection/Ring" className="collection-item">RINGS</a>
        </div>
      </section>

      <ProductSection />

      <section className="handcrafted-section">
        <div className="handcrafted-left">
          <div className="arch-large" />
        </div>
        <div className="handcrafted-right">
          <h2>Handcrafted Pieces, Meticulously Designed</h2>
          <p>
            Produk perhiasan handmade kami dirancang dengan material pilihan dan dikerjakan
            dengan teliti oleh pengrajin lokal yang berpengalaman. Setiap piece adalah karya unik
            yang mencerminkan dedikasi dan passion kami terhadap keahlian tradisional.
          </p>
          <a className="button primary" href="#products">ORDER NOW</a>
        </div>
      </section>

      <section className="new-arrivals">
        <div className="new-arrivals-header">
          <p className="eyebrow">New Arrivals</p>
          <h2>Fresh picks for your collection</h2>
        </div>
        <div className="mosaic-grid">
          {arrivals.length > 0 ? (
            arrivals.map((product, index) => (
              <a
                key={product.id ?? index}
                href={`/product/${product.id}`}
                className={`mosaic-card ${
                  index === 0 ? "mosaic-card--large" : "mosaic-card--small"
                } ${
                  index === 1 ? "mosaic-card--top" : ""
                } ${index === 2 ? "mosaic-card--middle" : ""} ${
                  index === 3 ? "mosaic-card--bottom" : ""
                }`}
                style={{
                  backgroundImage: `url(${product.image || "/placeholder.svg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className={index === 0 ? "mosaic-overlay" : "mosaic-overlay mosaic-overlay--compact"}>
                  <span>{product.highlight || "New Arrival"}</span>
                  <h3>{product.name}</h3>
                  {index === 0 ? (
                    <p>{product.description || "Temukan koleksi terbaru yang siap mempercantik penampilan Anda."}</p>
                  ) : null}
                </div>
              </a>
            ))
          ) : (
            [0, 1, 2, 3].map((index) => (
              <a
                key={index}
                href="#products"
                className={`mosaic-card ${
                  index === 0 ? "mosaic-card--large" : "mosaic-card--small"
                } ${index === 1 ? "mosaic-card--top" : ""} ${
                  index === 2 ? "mosaic-card--middle" : ""
                } ${index === 3 ? "mosaic-card--bottom" : ""}`}
              >
                <div className={index === 0 ? "mosaic-overlay" : "mosaic-overlay mosaic-overlay--compact"}>
                  <span>New Arrival</span>
                  <h3>Loading product...</h3>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-content">
          <div>
            <p className="eyebrow">About Us</p>
            <h2>About our craft</h2>
            <p>
              Kami mengutamakan kualitas dan desain yang timeless untuk setiap produk. 
              Dengan menggunakan bahan-bahan premium dan proses crafting yang teliti, 
              kami menciptakan perhiasan yang tidak hanya indah tetapi juga tahan lama.
            </p>
          </div>
          <div className="about-grid">
            <div className="feature-card">
              <h3>Eco Friendly</h3>
              <p>Material yang bertanggung jawab lingkungan dan proses produksi berkelanjutan.</p>
            </div>
            <div className="feature-card">
              <h3>Premium Quality</h3>
              <p>Kontrol kualitas ketat pada setiap produk untuk kepuasan pelanggan maksimal.</p>
            </div>
            <div className="feature-card">
              <h3>Handmade</h3>
              <p>Dibuat dengan tangan oleh pengrajin terampil dengan pengalaman bertahun-tahun.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
