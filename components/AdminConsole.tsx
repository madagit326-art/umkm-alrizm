"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "@/lib/types";

const createEmptyForm = (): Product => ({
  name: "",
  category: "Bracelet",
  price: 0,
  description: "",
  image: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
  image6: "",
  highlight: "",
});

export default function AdminConsole() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(createEmptyForm());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal memuat produk. Silakan cek koneksi dan refresh halaman.");
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof Product, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>, imageField: "image" | "image2" | "image3" | "image4" | "image5" | "image6" = "image") {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Gagal mengupload gambar.");
        return;
      }

      setForm((prev) => ({ ...prev, [imageField]: data.url }));
      setMessage("Gambar berhasil diupload. Silakan simpan produk untuk menyimpan perubahan.");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Gagal mengupload gambar. Pastikan file valid dan coba lagi.");
    } finally {
      setUploading(false);
      if (input) {
        input.value = "";
      }
    }
  }

  async function saveProduct() {
    const trimmedName = form.name.trim();
    const trimmedDescription = form.description.trim();
    const price = Number(form.price);

    if (!trimmedName || !trimmedDescription || Number.isNaN(price) || price <= 0) {
      setError("Nama, deskripsi, dan harga harus diisi dengan benar.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const endpoint = "/api/products";
    const payload = {
      ...form,
      name: trimmedName,
      description: trimmedDescription,
      price,
      id: selectedId ?? undefined,
    };
    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { error?: string; message?: string } | null = null;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.error("Failed to parse JSON response:", jsonErr);
      }

      if (response.ok) {
        setMessage(selectedId ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
        setForm(createEmptyForm());
        setSelectedId(null);
        await loadProducts();
      } else {
        const serverMessage = data?.error || data?.message || response.statusText || "Terjadi kesalahan saat menyimpan produk.";
        setError(serverMessage);
      }
    } catch (err) {
      console.error("Save product error:", err);
      setError(err instanceof Error ? err.message : "Gagal menyimpan produk. Pastikan semua data valid dan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  const ACTUAL_CATEGORIES = ["Bracelet", "Necklace", "Ring", "Earrings"];
  const FILTER_LABELS = ["Best Seller", "Top Sellers", "Featured", "Latest Produk", "Populer"];
  const ALL_FILTER_OPTIONS = ["All", ...ACTUAL_CATEGORIES, ...FILTER_LABELS];

  const filteredProducts = (() => {
    if (selectedCategory === "All") return products;
    
    // If it's a real category, filter by category
    if (ACTUAL_CATEGORIES.includes(selectedCategory)) {
      return products.filter((product) => product.category === selectedCategory);
    }
    
    // If it's "Latest Produk", show products without any highlight
    if (selectedCategory === "Latest Produk") {
      return products.filter((product) => !product.highlight || String(product.highlight).trim() === "");
    }
    
    // If it's a filter label, filter by highlight
    return products.filter((product) => product.highlight === selectedCategory);
  })();

  const groupedProducts = ACTUAL_CATEGORIES.reduce<Record<string, Product[]>>((acc, category) => {
    acc[category] = filteredProducts.filter((product) => product.category === category);
    return acc;
  }, {});

  function startEdit(product: Product) {
    setSelectedId(product.id ?? null);
    setForm(product);
    setMessage("");
  }

  async function removeProduct(id?: number) {
    if (!id) return;
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Gagal menghapus produk.");
      }

      setMessage("Produk berhasil dihapus.");
      setSelectedId(null);
      setForm(createEmptyForm());
      await loadProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      setError(err instanceof Error ? err.message : "Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-form">
        <h2>{selectedId ? "Edit Produk" : "Tambah Produk"}</h2>
        <div className="input-group">
          <label>Nama Produk</label>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Contoh: Macrame Bracelet"
          />
        </div>
        <div className="input-group">
          <label>Kategori</label>
          <select value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
            <option>Bracelet</option>
            <option>Necklace</option>
            <option>Ring</option>
            <option>Earrings</option>
          </select>
        </div>
        <div className="input-group">
          <label>Harga</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            placeholder="50000"
          />
        </div>
        <div className="input-group">
          <label>Deskripsi</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Deskripsi singkat produk"
          />
        </div>
        <div className="input-group">
          <label>URL Gambar</label>
          <input
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://..."
          />
          <small style={{ color: "#64748b" }}>
            Jika Anda sudah memiliki URL gambar, tempel di sini; jika ingin upload dari desktop, gunakan input di bawah.
          </small>
        </div>
        <div className="input-group">
          <label>Upload Gambar (Desktop)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading ? (
            <small style={{ color: "#2563eb" }}>Mengupload gambar...</small>
          ) : (
            <small style={{ color: "#64748b" }}>Pilih file gambar dari komputer Anda.</small>
          )}
        </div>
        {form.image ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 1</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image}
                alt="Preview Produk 1"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
          </div>
        ) : null}

        <hr style={{ margin: "1.5rem 0", border: "none", borderTop: "1px solid #e2e8f0" }} />

        <div className="input-group">
          <label>URL Gambar 2 (Opsional)</label>
          <input
            value={form.image2 || ""}
            onChange={(e) => handleChange("image2", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="input-group">
          <label>Upload Gambar 2</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image2")}
            disabled={uploading}
          />
        </div>
        {form.image2 ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 2</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image2}
                alt="Preview Produk 2"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
            <button 
              className="button secondary" 
              type="button" 
              onClick={() => handleChange("image2", "")}
              style={{ width: "fit-content" }}
            >
              Hapus Gambar 2
            </button>
          </div>
        ) : null}

        <div className="input-group">
          <label>URL Gambar 3 (Opsional)</label>
          <input
            value={form.image3 || ""}
            onChange={(e) => handleChange("image3", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="input-group">
          <label>Upload Gambar 3</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image3")}
            disabled={uploading}
          />
        </div>
        {form.image3 ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 3</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image3}
                alt="Preview Produk 3"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
            <button 
              className="button secondary" 
              type="button" 
              onClick={() => handleChange("image3", "")}
              style={{ width: "fit-content" }}
            >
              Hapus Gambar 3
            </button>
          </div>
        ) : null}

        <div className="input-group">
          <label>URL Gambar 4 (Opsional)</label>
          <input
            value={form.image4 || ""}
            onChange={(e) => handleChange("image4", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="input-group">
          <label>Upload Gambar 4</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image4")}
            disabled={uploading}
          />
        </div>
        {form.image4 ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 4</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image4}
                alt="Preview Produk 4"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
            <button 
              className="button secondary" 
              type="button" 
              onClick={() => handleChange("image4", "")}
              style={{ width: "fit-content" }}
            >
              Hapus Gambar 4
            </button>
          </div>
        ) : null}

        <div className="input-group">
          <label>URL Gambar 5 (Opsional)</label>
          <input
            value={form.image5 || ""}
            onChange={(e) => handleChange("image5", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="input-group">
          <label>Upload Gambar 5</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image5")}
            disabled={uploading}
          />
        </div>
        {form.image5 ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 5</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image5}
                alt="Preview Produk 5"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
            <button 
              className="button secondary" 
              type="button" 
              onClick={() => handleChange("image5", "")}
              style={{ width: "fit-content" }}
            >
              Hapus Gambar 5
            </button>
          </div>
        ) : null}

        <div className="input-group">
          <label>URL Gambar 6 (Opsional)</label>
          <input
            value={form.image6 || ""}
            onChange={(e) => handleChange("image6", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="input-group">
          <label>Upload Gambar 6</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image6")}
            disabled={uploading}
          />
        </div>
        {form.image6 ? (
          <div className="input-group" style={{ gap: "0.75rem" }}>
            <label>Preview Gambar 6</label>
            <div style={{ width: "100%", maxWidth: "320px", borderRadius: "1rem", overflow: "hidden", border: "1px solid #e2e8f0", background: "white" }}>
              <img
                src={form.image6}
                alt="Preview Produk 6"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x240?text=Gagal+memuat+gambar";
                }}
              />
            </div>
            <button 
              className="button secondary" 
              type="button" 
              onClick={() => handleChange("image6", "")}
              style={{ width: "fit-content" }}
            >
              Hapus Gambar 6
            </button>
          </div>
        ) : null}

        <div className="input-group">
          <label>Highlight</label>
          <input
            value={form.highlight}
            onChange={(e) => handleChange("highlight", e.target.value)}
            placeholder="Contoh: Best Seller"
          />
          <small style={{ color: "#64748b" }}>
            Isi field ini untuk menandai produk sebagai Top Seller dan tampil di hero.
          </small>
        </div>
        <div className="action-row">
          <button className="button primary" type="button" onClick={saveProduct} disabled={loading}>
            Simpan Produk
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => {
              setSelectedId(null);
              setForm(createEmptyForm());
              setMessage("");
              setError("");
            }}
          >
            Reset Form
          </button>
        </div>
        {message ? <p className="admin-message">{message}</p> : null}
        {error ? <p style={{ marginTop: "1rem", padding: "1rem 1.25rem", background: "#fee2e2", color: "#991b1b", borderLeft: "4px solid #f87171", borderRadius: "0.5rem", fontSize: "0.95rem", fontWeight: "500" }}>{error}</p> : null}
      </div>

      <div className="admin-list">
        <div className="admin-list-header">
          <div>
            <h2>Daftar Produk</h2>
            <p style={{ margin: 0, color: "#64748b" }}>
              Filter produk berdasarkan kategori untuk mempercepat pencarian.
            </p>
          </div>
          <div className="category-filter-row">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {ALL_FILTER_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button className="button secondary" type="button" onClick={loadProducts} disabled={loading}>
              🔄 Refresh
            </button>
          </div>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "2rem" }}>Memuat data...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#dc2626", padding: "2rem", background: "#fee2e2", borderRadius: "0.75rem" }}>{error}</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "2rem" }}>
            Belum ada produk. Silakan tambahkan produk menggunakan form di sebelah.
          </p>
        ) : (
          <div className="product-list">
            {selectedCategory === "All" ? (
              // Show grouped by actual categories
              ACTUAL_CATEGORIES.map((category: string) => {
                const categoryProducts = groupedProducts[category] || [];
                if (categoryProducts.length === 0) return null;
                return (
                  <div key={category} className="category-section">
                    <h3>{category}</h3>
                    {categoryProducts.map((product: Product) => (
                      <div key={product.id} className="product-item">
                        <div>
                          <strong>{product.name}</strong>
                          <span className="badge-sm">{product.category}</span>
                        </div>
                        <p>{product.description}</p>
                        <p style={{ fontSize: "0.9rem", color: "#1e5a96", fontWeight: "600", margin: "0.5rem 0 0" }}>
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </p>
                        <div className="row-buttons">
                          <button className="button secondary" type="button" onClick={() => startEdit(product)}>
                            Edit
                          </button>
                          <button className="button" type="button" onClick={() => removeProduct(product.id)}>
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              // Show filtered products without grouping
              filteredProducts.length === 0 ? (
                <p style={{ textAlign: "center", color: "#64748b", padding: "2rem" }}>
                  Tidak ada produk di "{selectedCategory}".
                </p>
              ) : (
                <div className="category-section">
                  <h3>{selectedCategory}</h3>
                  {filteredProducts.map((product: Product) => (
                    <div key={product.id} className="product-item">
                      <div>
                        <strong>{product.name}</strong>
                        <span className="badge-sm">{product.category}</span>
                      </div>
                      <p>{product.description}</p>
                      <p style={{ fontSize: "0.9rem", color: "#1e5a96", fontWeight: "600", margin: "0.5rem 0 0" }}>
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>
                      <div className="row-buttons">
                        <button className="button secondary" type="button" onClick={() => startEdit(product)}>
                          Edit
                        </button>
                        <button className="button" type="button" onClick={() => removeProduct(product.id)}>
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
