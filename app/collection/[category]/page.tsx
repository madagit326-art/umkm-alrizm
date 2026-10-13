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
          <div className="product-grid">
            {safeProducts.map((item) => (
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
                  <span className="badge">{item.category}</span>
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
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💎</div>
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
