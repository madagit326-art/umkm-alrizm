import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { query } from "@/lib/db";

type Props = {
  params: { category: string };
};

export default async function CategoryPage({ params }: Props) {
  const raw = params.category || "";
  const category = decodeURIComponent(raw);

  const products = await query(
    "SELECT * FROM products WHERE LOWER(category) = LOWER(?) ORDER BY id DESC",
    [category]
  );

  // Separate featured and latest products
  const productArray = Array.isArray(products) ? (products as any[]) : [];
  const featured = productArray.filter((p) => p.highlight && String(p.highlight).trim() !== "").slice(0, 4);
  const latest = productArray.filter((p) => !(p.highlight && String(p.highlight).trim() !== ""));

  return (
    <main className="page-shell">
      <Navbar />

      <section style={{ padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ textTransform: "capitalize", fontSize: "2rem", marginBottom: "0.5rem" }}>{category}</h2>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>Menampilkan produk pada kategori {category}.</p>

          {/* Featured Products */}
          {featured.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ color: "#1e5a96", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, marginBottom: "0.5rem" }}>Featured Product</p>
                <h3 style={{ fontSize: "1.8rem", margin: 0, color: "#0f172a" }}>Selected Picks</h3>
              </div>
              <div className="small-feature-grid">
                {featured.map((p) => (
                  <a key={p.id} href={`/product/${p.id}`} className="card small-card">
                    {p.highlight ? <span className="card-tag">{p.highlight}</span> : null}
                    <img src={p.image || "https://via.placeholder.com/640x480"} alt={p.name} />
                    <div>
                      <h4>{p.name}</h4>
                      <p className="product-price">Rp {Number(p.price).toLocaleString("id-ID")}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Latest Products */}
          {latest.length > 0 && (
            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ color: "#1e5a96", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, marginBottom: "0.5rem" }}>Latest Product</p>
                <h3 style={{ fontSize: "1.8rem", margin: 0, color: "#0f172a" }}>Produk Terbaru</h3>
              </div>
              <div className="product-grid">
                {latest.map((p) => (
                  <a key={p.id} href={`/product/${p.id}`} className="card">
                    {p.highlight ? <span className="card-tag">{p.highlight}</span> : null}
                    <img src={p.image || "https://via.placeholder.com/640x480"} alt={p.name} />
                    <div>
                      <span className="badge">{p.category}</span>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                      <p className="product-price">Rp {Number(p.price).toLocaleString("id-ID")}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {productArray.length === 0 && (
            <p>Tidak ada produk untuk kategori ini.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
