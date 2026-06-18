import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const productId = Number(params.id);
  const products = await query("SELECT * FROM products WHERE id = ?", [productId]);
  const product = Array.isArray(products) ? (products as any[])[0] : null;

  if (!product) {
    notFound();
  }

  const related = await query(
    "SELECT * FROM products WHERE LOWER(category) = LOWER(?) AND id != ? ORDER BY id DESC LIMIT 3",
    [product.category, productId]
  );

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
                {related.map((item: any) => (
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
