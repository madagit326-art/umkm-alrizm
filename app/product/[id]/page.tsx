import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import { query } from "@/lib/db";
import type { Product } from "@/lib/types";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Macrame Bracelet Tiger Eyes Stone",
    category: "Bracelet",
    price: 150000,
    description: "Gelangan tangan makrame dengan batu tiger eyes, cocok untuk gaya boho.",
    image: "/placeholder.svg",
    highlight: "Best Seller",
  },
  {
    id: 2,
    name: "Handcrafted Necklace",
    category: "Necklace",
    price: 175000,
    description: "Kalung handmade dengan desain minimalis, ideal untuk sehari-hari.",
    image: "/placeholder.svg",
    highlight: "Populer",
  },
  {
    id: 3,
    name: "Beaded Bracelet - Ocean",
    category: "Bracelet",
    price: 95000,
    description: "Gelang manik-manik tema laut.",
    image: "/placeholder.svg",
    highlight: "Featured",
  },
  {
    id: 4,
    name: "Silver Minimal Necklace",
    category: "Necklace",
    price: 125000,
    description: "Kalung silver sederhana untuk daily wear.",
    image: "/placeholder.svg",
  },
];

export default async function ProductDetailPage({ params }: Props) {
  const productId = Number(params.id);
  let product: Product | null = null;
  let related: Product[] = [];

  try {
    const products = await query<Product>("SELECT * FROM products WHERE id = ?", [productId]);
    product = products[0] ?? null;

    if (product) {
      related = await query<Product>(
        "SELECT * FROM products WHERE LOWER(category) = LOWER(?) AND id != ? ORDER BY id DESC LIMIT 4",
        [product.category, productId]
      );
    }
  } catch (error) {
    product = fallbackProducts.find((item) => item.id === productId) ?? null;
    if (product) {
      const productCategory = product.category;
      related = fallbackProducts
        .filter(
          (item) => item.category === productCategory && item.id !== productId
        )
        .slice(0, 4);
    }
  }

  if (!product) {
    return notFound();
  }

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappMessage = encodeURIComponent(
    `Halo Alrizm, saya tertarik dengan produk ${product.name} seharga Rp ${Number(product.price).toLocaleString("id-ID")} (${product.category}). Apakah produk ini masih tersedia dan bisa dipesan?`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const allImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
    product.image6,
  ].filter((img): img is string => Boolean(img && img.trim() !== ""));

  return (
    <main className="page-shell product-detail-page">
      <Navbar />

      <section className="detail-hero">
        <div className="detail-container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href={`/collection/${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          <div className="detail-grid">
            {/* Interactive Image Gallery */}
            <ProductGallery name={product.name} images={allImages} />

            {/* Product Details Info */}
            <div className="detail-info">
              <div className="detail-badge-row">
                <span className="badge">{product.category}</span>
                {product.highlight && (
                  <span className="card-tag-inline">{product.highlight}</span>
                )}
              </div>

              <h1 className="detail-title">{product.name}</h1>

              <div className="detail-price-box">
                <span className="price-label">Harga Produk</span>
                <p className="detail-price">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
                <span className="stock-status">✓ Siap Dipesan (Made to Order / Ready Stock)</span>
              </div>

              <div className="detail-description-box">
                <h3>Deskripsi Produk</h3>
                <p className="detail-description">{product.description}</p>
              </div>

              {/* Order Actions */}
              <div className="detail-actions">
                <a
                  className="button primary detail-order-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Pesan Sekarang via WhatsApp</span>
                </a>
                <Link href="/#products" className="button secondary">
                  Kembali ke Katalog
                </Link>
              </div>

              {/* Product Key Advantages */}
              <div className="detail-advantages">
                <div className="advantage-item">
                  <div className="advantage-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>
                  <div>
                    <h4>Eco-Friendly Materials</h4>
                    <p>Bahan ramah lingkungan dan nyaman di kulit.</p>
                  </div>
                </div>
                <div className="advantage-item">
                  <div className="advantage-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 13L2 9z" />
                      <path d="M11 3 8 9l4 13 4-13-3-6" />
                      <path d="M2 9h20" />
                    </svg>
                  </div>
                  <div>
                    <h4>Kualitas Premium</h4>
                    <p>Finishing rapi, tali kuat dan tahan lama.</p>
                  </div>
                </div>
                <div className="advantage-item">
                  <div className="advantage-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                  </div>
                  <div>
                    <h4>100% Buatan Tangan</h4>
                    <p>Setiap detail dibuat oleh pengrajin lokal berbakat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Grid */}
          {Array.isArray(related) && related.length > 0 && (
            <div className="related-section">
              <div className="section-divider-header" style={{ marginTop: "3.5rem", marginBottom: "2rem" }}>
                <span className="divider-line" />
                <h2 className="section-divider-title">KOLEKSI TERKAIT</h2>
                <span className="divider-line" />
              </div>

              <div className="bestseller-grid">
                {related.map((item) => (
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

                      <div className="bestseller-rating" aria-label="Rating 5 dari 5 bintang">
                        <span className="star-filled">★</span>
                        <span className="star-filled">★</span>
                        <span className="star-filled">★</span>
                        <span className="star-filled">★</span>
                        <span className="star-filled">★</span>
                      </div>

                      <Link
                        href={`/product/${item.id}`}
                        className="bestseller-cart-btn"
                        style={{ textAlign: "center", textDecoration: "none" }}
                      >
                        LIHAT DETAIL
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
