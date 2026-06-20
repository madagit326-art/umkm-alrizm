import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        "SELECT * FROM products WHERE LOWER(category) = LOWER(?) AND id != ? ORDER BY id DESC LIMIT 3",
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
        .slice(0, 3);
    }
  }

  if (!product) {
    return notFound();
  }

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6288987405531";
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan produk ${product.name} (${product.category}). Apakah masih tersedia?`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <main className="page-shell product-detail-page">
      <Navbar />

      <section className="detail-hero" style={{ padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <nav className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href={`/collection/${encodeURIComponent(product.category)}`}>{product.category}</a>
            <span>›</span>
            <span>{product.name}</span>
          </nav>

          <div className="detail-grid">
            <div className="detail-images">
              <div className="detail-main-image">
                <img src={product.image || "https://via.placeholder.com/640x640"} alt={product.name} />
              </div>
              {(product.image2 || product.image3 || product.image4 || product.image5 || product.image6) && (
                <div className="detail-thumb-row">
                  {product.image2 && <img src={product.image2} alt={`${product.name} 2`} />}
                  {product.image3 && <img src={product.image3} alt={`${product.name} 3`} />}
                  {product.image4 && <img src={product.image4} alt={`${product.name} 4`} />}
                  {product.image5 && <img src={product.image5} alt={`${product.name} 5`} />}
                  {product.image6 && <img src={product.image6} alt={`${product.name} 6`} />}
                </div>
              )}
            </div>

            <div className="detail-info">
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="detail-price">Rp {Number(product.price).toLocaleString("id-ID")}</p>
              <p className="detail-description">{product.description}</p>
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                ORDER NOW
              </a>

              <div className="detail-advantages">
                <div>
                  <h4>Eco Friendly</h4>
                  <p>Bahan ramah lingkungan untuk kenyamanan penggunaan.</p>
                </div>
                <div>
                  <h4>Premium Quality</h4>
                  <p>Dirancang dengan teliti untuk hasil yang tahan lama.</p>
                </div>
                <div>
                  <h4>Handmade</h4>
                  <p>Dibuat dengan tangan oleh pengrajin berpengalaman.</p>
                </div>
              </div>
            </div>
          </div>

          {Array.isArray(related) && related.length > 0 && (
            <div className="related-section">
              <h2>You May Also Like</h2>
              <div className="related-grid">
                {related.map((item) => (
                  <a key={item.id} href={`/product/${item.id}`} className="related-card">
                    <img src={item.image || "https://via.placeholder.com/320x240"} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>Rp {Number(item.price).toLocaleString("id-ID")}</p>
                    </div>
                  </a>
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
