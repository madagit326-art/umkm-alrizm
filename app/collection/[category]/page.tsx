import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import type { Product } from "@/lib/types";

type Props = {
  params: { category: string };
};

const ALL_CATEGORIES = [
  { id: "Bracelet", label: "Gelang (Bracelet)" },
  { id: "Necklace", label: "Kalung (Necklace)" },
  { id: "Earrings", label: "Anting (Earrings)" },
  { id: "Ring", label: "Cincin (Ring)" },
];

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

export default async function CategoryPage({ params }: Props) {
  const raw = params.category || "";
  const category = decodeURIComponent(raw);

  let products: Product[] = [];

  try {
    products = await query<Product>(
      "SELECT * FROM products WHERE LOWER(category) = LOWER(?) ORDER BY id DESC",
      [category]
    );
  } catch (error) {
    products = fallbackProducts.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";

  function getWaLink(productName: string, price: number) {
    const text = `Halo Alrizm, saya tertarik memesan produk kategori ${category}: ${productName} (Rp ${Number(price).toLocaleString("id-ID")}). Apakah masih ada?`;
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  }

  return (
    <main className="page-shell">
      <Navbar />

      <section className="category-page-hero">
        <div className="category-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Beranda</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/#collection">Koleksi</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{category}</span>
          </nav>

          <div className="category-title-row">
            <div>
              <span className="eyebrow">Katalog Kategori</span>
              <h1 className="category-heading">{category} Collection</h1>
              <p className="category-desc">
                Menampilkan koleksi perhiasan handmade terbaik untuk kategori {category}.
              </p>
            </div>
            <span className="category-count-badge">
              {safeProducts.length} Produk
            </span>
          </div>

          {/* Quick Switch Category Pills */}
          <div className="category-switch-pills">
            <Link href="/#products" className="category-pill">
              Semua Koleksi
            </Link>
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/collection/${cat.id}`}
                className={`category-pill ${
                  cat.id.toLowerCase() === category.toLowerCase() ? "active" : ""
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="category-products-container">
        {safeProducts.length > 0 ? (
          <div className="bestseller-grid">
            {safeProducts.map((item) => (
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

                  <a
                    href={getWaLink(item.name, item.price)}
                    target="_blank"
                    rel="noreferrer"
                    className="bestseller-cart-btn"
                    title="Pesan via WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>PESAN VIA WA</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 13L2 9z" />
                <path d="M11 3 8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
              </svg>
            </div>
            <h3>Belum Ada Produk di Kategori Ini</h3>
            <p>
              Saat ini belum ada produk yang tersedia untuk kategori {category}.
              Silakan cek kategori lainnya atau hubungi kami langsung via WhatsApp untuk pesanan custom.
            </p>
            <Link href="/#products" className="button primary">
              Kembali ke Semua Produk
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
