"use client";

import { useEffect, useState, useRef, type ChangeEvent } from "react";
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

type ImageFieldKey = "image" | "image2" | "image3" | "image4" | "image5" | "image6";

interface PhotoSlotMeta {
  key: ImageFieldKey;
  label: string;
  isCover?: boolean;
}

const PHOTO_SLOTS: PhotoSlotMeta[] = [
  { key: "image", label: "Foto Cover (Utama)", isCover: true },
  { key: "image2", label: "Foto 2 (Detail)" },
  { key: "image3", label: "Foto 3 (Model/Pakai)" },
  { key: "image4", label: "Foto 4 (Sudut Lain)" },
  { key: "image5", label: "Foto 5 (Kemasan)" },
  { key: "image6", label: "Foto 6 (Ekstra)" },
];

const HIGHLIGHT_OPTIONS = ["", "Best Seller", "Top Sellers", "Featured", "Populer"];

export default function AdminConsole() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(createEmptyForm());
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<ImageFieldKey | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeUrlInputSlot, setActiveUrlInputSlot] = useState<ImageFieldKey | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

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

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    imageField: ImageFieldKey
  ) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setUploadingSlot(imageField);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let data: { error?: string; url?: string } | null = null;

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }
      }

      if (!response.ok || !data?.url) {
        setError(data?.error || "Gagal mengupload gambar.");
        return;
      }

      setForm((prev) => ({ ...prev, [imageField]: data.url }));
      setMessage(`Gambar untuk ${imageField === "image" ? "Foto Utama" : imageField} berhasil diunggah.`);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengupload gambar. Pastikan format valid (JPG/PNG/WebP)."
      );
    } finally {
      setUploadingSlot(null);
      if (input) {
        input.value = "";
      }
    }
  }

  async function saveProduct() {
    const trimmedName = (form.name ?? "").trim();
    const trimmedCategory = (form.category ?? "").trim();
    const trimmedDescription = (form.description ?? "").trim();
    const price = Number(form.price ?? 0);

    if (!trimmedName) {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (!trimmedCategory) {
      setError("Kategori produk wajib dipilih.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setError("Harga produk harus diisi dengan angka lebih dari 0.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const payload = {
      ...form,
      name: trimmedName,
      category: trimmedCategory,
      description: trimmedDescription,
      price,
      id: selectedId ?? undefined,
    };
    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: { error?: string; message?: string } | null = null;
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (jsonErr) {
          console.error("Failed to parse JSON response:", jsonErr);
        }
      }

      if (response.ok) {
        setMessage(
          selectedId
            ? "✅ Produk berhasil diperbarui!"
            : "✅ Produk baru berhasil ditambahkan ke katalog!"
        );
        setForm(createEmptyForm());
        setSelectedId(null);
        await loadProducts();
      } else {
        const serverMessage =
          data?.error || data?.message || response.statusText || "Terjadi kesalahan saat menyimpan produk.";
        setError(serverMessage);
      }
    } catch (err) {
      console.error("Save product error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan produk. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  function startEdit(product: Product) {
    setSelectedId(product.id ?? null);
    setForm(product);
    setMessage("");
    setError("");
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleCancelEdit() {
    setSelectedId(null);
    setForm(createEmptyForm());
    setMessage("");
    setError("");
    setActiveUrlInputSlot(null);
  }

  async function removeProduct(id?: number, name?: string) {
    if (!id) return;
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus produk "${name || id}" dari database toko?`
    );
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Gagal menghapus produk.");
      }

      setMessage("🗑️ Produk berhasil dihapus.");
      if (selectedId === id) {
        handleCancelEdit();
      }
      await loadProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      setError(err instanceof Error ? err.message : "Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
  }

  // Filter logic
  const CATEGORIES = ["Bracelet", "Necklace", "Ring", "Earrings"];

  const filteredProducts = products.filter((p) => {
    // Category filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Highlighted") {
        if (!p.highlight || p.highlight.trim() === "") return false;
      } else if (p.category !== selectedCategory) {
        return false;
      }
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (p.name || "").toLowerCase().includes(q);
      const matchDesc = (p.description || "").toLowerCase().includes(q);
      const matchHighlight = (p.highlight || "").toLowerCase().includes(q);
      return matchName || matchDesc || matchHighlight;
    }
    return true;
  });

  // Calculate statistics
  const totalProducts = products.length;
  const highlightedCount = products.filter((p) => p.highlight && p.highlight.trim() !== "").length;
  const withImagesCount = products.filter((p) => p.image && p.image.trim() !== "").length;

  return (
    <div className="admin-console-wrapper">
      {/* 1. Header Overview & Stats Row */}
      <section className="admin-dashboard-hero">
        <div className="admin-hero-text">
          <div className="admin-badge-eyebrow">DASHBOARD MANAJEMEN</div>
          <h1 className="admin-dashboard-title">Katalog & Produk Alrizm</h1>
          <p className="admin-dashboard-sub">
            Kelola data perhiasan batu alam nusantara, update harga, upload foto detail hingga 6 slot, dan atur produk unggulan.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-card-icon">💎</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Total Produk</span>
              <strong className="stat-card-value">{totalProducts}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-icon">🏷️</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Kategori Aktif</span>
              <strong className="stat-card-value">4 Kategori</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-icon">⭐</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Produk Unggulan</span>
              <strong className="stat-card-value">{highlightedCount}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-icon">📸</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Foto Terisi</span>
              <strong className="stat-card-value">{withImagesCount} / {totalProducts}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Layout */}
      <section className="admin-workspace-grid">
        {/* LEFT COLUMN: Form Tambah / Edit Produk */}
        <div className="admin-form-panel" ref={formRef}>
          <div className="admin-panel-header">
            <div className="panel-title-group">
              <h2 className="panel-title">
                {selectedId ? `Edit Produk #${selectedId}` : "Tambah Produk Baru"}
              </h2>
              <span className={`mode-pill ${selectedId ? "edit-mode" : "new-mode"}`}>
                {selectedId ? "✏️ Mode Edit" : "➕ Mode Tambah"}
              </span>
            </div>
            {selectedId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
                title="Batal edit dan kembali ke form tambah"
              >
                Batal Edit
              </button>
            )}
          </div>

          {/* Feedback messages */}
          {message && (
            <div className="admin-alert success">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="admin-alert error">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="admin-form-body">
            {/* Nama Produk */}
            <div className="admin-field-group">
              <label className="admin-field-label">
                Nama Produk <span className="req-star">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Contoh: Gelang Batu Tiger Eye Asli Bali"
                className="admin-field-input"
              />
            </div>

            {/* Kategori & Harga Grid */}
            <div className="admin-field-row-2">
              <div className="admin-field-group">
                <label className="admin-field-label">
                  Kategori <span className="req-star">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="admin-field-select"
                >
                  <option value="Bracelet">Bracelet (Gelang)</option>
                  <option value="Necklace">Necklace (Kalung)</option>
                  <option value="Ring">Ring (Cincin)</option>
                  <option value="Earrings">Earrings (Anting)</option>
                </select>
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">
                  Harga Satuan (Rp) <span className="req-star">*</span>
                </label>
                <div className="currency-input-wrap">
                  <span className="currency-prefix">Rp</span>
                  <input
                    type="number"
                    value={form.price || ""}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    placeholder="150000"
                    min="0"
                    step="5000"
                    className="admin-field-input has-prefix"
                  />
                </div>
              </div>
            </div>

            {/* Highlight Tag */}
            <div className="admin-field-group">
              <label className="admin-field-label">
                Label Highlight / Badge Unggulan
              </label>
              <div className="highlight-chips-row">
                {HIGHLIGHT_OPTIONS.map((opt) => (
                  <button
                    key={opt || "none"}
                    type="button"
                    className={`highlight-chip ${form.highlight === opt ? "active" : ""}`}
                    onClick={() => handleChange("highlight", opt)}
                  >
                    {opt ? `⭐ ${opt}` : "Tidak Ada"}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={form.highlight || ""}
                onChange={(e) => handleChange("highlight", e.target.value)}
                placeholder="Atau ketik custom highlight (cth: Limited Edition)"
                className="admin-field-input mt-2"
              />
            </div>

            {/* Deskripsi */}
            <div className="admin-field-group">
              <label className="admin-field-label">Deskripsi Lengkap & Bahan</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Tuliskan spesifikasi batu alam, makna filosofi, jenis tali/logam, dan keunggulan produk..."
                rows={4}
                className="admin-field-textarea"
              />
            </div>

            {/* GALERI FOTO PRODUK (6 SLOTS) */}
            <div className="admin-gallery-section">
              <div className="gallery-section-header">
                <div>
                  <h3 className="gallery-section-title">Galeri Foto Produk</h3>
                  <p className="gallery-section-desc">
                    Unggah hingga 6 foto dari berbagai sudut agar pembeli melihat keaslian detail batu alam.
                  </p>
                </div>
              </div>

              <div className="photo-slots-grid">
                {PHOTO_SLOTS.map((slot) => {
                  const currentValue = form[slot.key] as string;
                  const isUploading = uploadingSlot === slot.key;
                  const isShowUrlInput = activeUrlInputSlot === slot.key;

                  return (
                    <div
                      key={slot.key}
                      className={`photo-slot-card ${slot.isCover ? "is-cover" : ""} ${currentValue ? "has-image" : "is-empty"}`}
                    >
                      <div className="slot-badge-row">
                        <span className="slot-label">{slot.label}</span>
                        {slot.isCover && <span className="cover-tag">Utama</span>}
                      </div>

                      {/* Image Preview or Upload Dropzone */}
                      {currentValue ? (
                        <div className="slot-image-preview">
                          <img
                            src={currentValue}
                            alt={slot.label}
                            className="slot-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/200x200?text=Gambar+Rusak";
                            }}
                          />
                          <div className="slot-overlay-actions">
                            <label className="slot-change-btn" title="Ganti foto ini">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                              </svg>
                              <span>Ganti</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, slot.key)}
                                disabled={isUploading}
                                className="hidden-file-input"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => handleChange(slot.key, "")}
                              className="slot-delete-btn"
                              title="Hapus foto ini"
                            >
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="slot-empty-dropzone">
                          {isUploading ? (
                            <div className="slot-uploading-indicator">
                              <div className="spinner-micro" />
                              <span>Mengupload...</span>
                            </div>
                          ) : (
                            <>
                              <label className="slot-upload-target">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" className="dropzone-icon">
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span className="upload-btn-text">+ Unggah Foto</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, slot.key)}
                                  className="hidden-file-input"
                                />
                              </label>

                              <button
                                type="button"
                                className="slot-url-toggle-btn"
                                onClick={() => setActiveUrlInputSlot(isShowUrlInput ? null : slot.key)}
                              >
                                {isShowUrlInput ? "Tutup URL" : "atau tempel URL"}
                              </button>
                            </>
                          )}
                        </div>
                      )}

                      {/* Optional Direct URL Input Drawer */}
                      {isShowUrlInput && (
                        <div className="slot-url-input-popover">
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => handleChange(slot.key, e.target.value)}
                            placeholder="https://..."
                            className="admin-field-input mini"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="admin-form-action-bar">
              <button
                type="button"
                onClick={saveProduct}
                disabled={loading}
                className="admin-primary-save-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner-micro" />
                    <span>Menyimpan ke Database...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>{selectedId ? "Perbarui Produk" : "Simpan Produk Baru"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="admin-reset-form-btn"
                disabled={loading}
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Katalog & Manajemen Produk */}
        <div className="admin-catalog-panel">
          <div className="admin-panel-header">
            <div>
              <h2 className="panel-title">Katalog Produk</h2>
              <p className="panel-subtitle">
                Cari, periksa foto, dan kelola produk yang tayang di website toko.
              </p>
            </div>
            <button
              type="button"
              className="refresh-catalog-btn"
              onClick={loadProducts}
              disabled={loading}
              title="Muat ulang produk dari database"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" className={loading ? "spin" : ""}>
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="catalog-toolbar">
            <div className="catalog-search-wrap">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, bahan, deskripsi..."
                className="catalog-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="category-filter-chips">
              <button
                type="button"
                className={`filter-pill ${selectedCategory === "All" ? "active" : ""}`}
                onClick={() => setSelectedCategory("All")}
              >
                Semua ({products.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
              <button
                type="button"
                className={`filter-pill ${selectedCategory === "Highlighted" ? "active" : ""}`}
                onClick={() => setSelectedCategory("Highlighted")}
              >
                ⭐ Unggulan ({highlightedCount})
              </button>
            </div>
          </div>

          {/* Catalog Count */}
          <div className="catalog-count-bar">
            <span>Menampilkan <strong>{filteredProducts.length}</strong> produk</span>
            {selectedId && (
              <span className="editing-indicator-badge">
                Sedang mengedit ID #{selectedId}
              </span>
            )}
          </div>

          {/* Product Items List */}
          <div className="catalog-items-container">
            {loading && products.length === 0 ? (
              <div className="catalog-state-box">
                <div className="spinner-micro" />
                <p>Memuat katalog produk...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="catalog-state-box">
                <p>Tidak ada produk yang cocok dengan pencarian atau filter.</p>
                <button
                  type="button"
                  className="admin-link-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Filter & Pencarian
                </button>
              </div>
            ) : (
              <div className="product-cards-list">
                {filteredProducts.map((product) => {
                  const isSelected = selectedId === product.id;
                  const imagesCount = [
                    product.image,
                    product.image2,
                    product.image3,
                    product.image4,
                    product.image5,
                    product.image6,
                  ].filter(Boolean).length;

                  return (
                    <div
                      key={product.id}
                      className={`catalog-product-row ${isSelected ? "is-selected-for-edit" : ""}`}
                    >
                      {/* Product Thumbnail */}
                      <div className="catalog-thumb-frame">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="catalog-thumb-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/80x80?text=No+Img";
                            }}
                          />
                        ) : (
                          <div className="catalog-thumb-placeholder">
                            <span>No Img</span>
                          </div>
                        )}
                        <span className="thumb-count-badge" title={`${imagesCount} foto terpasang`}>
                          📷 {imagesCount}
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="catalog-info-col">
                        <div className="catalog-title-row">
                          <h4 className="catalog-product-name">{product.name}</h4>
                          <span className="catalog-category-tag">{product.category}</span>
                          {product.highlight && (
                            <span className="catalog-highlight-tag">
                              ⭐ {product.highlight}
                            </span>
                          )}
                        </div>

                        <div className="catalog-price-row">
                          <strong className="catalog-price-value">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                          </strong>
                          <span className="catalog-id-tag">ID: #{product.id}</span>
                        </div>

                        {product.description && (
                          <p className="catalog-desc-snippet">{product.description}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="catalog-actions-col">
                        <button
                          type="button"
                          className="catalog-btn-edit"
                          onClick={() => startEdit(product)}
                          title="Edit produk ini"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Edit</span>
                        </button>

                        <a
                          href={`/product/${product.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="catalog-btn-view"
                          title="Lihat halaman produk di web"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>

                        <button
                          type="button"
                          className="catalog-btn-delete"
                          onClick={() => removeProduct(product.id, product.name)}
                          title="Hapus produk"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
