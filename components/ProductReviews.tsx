"use client";

import { useState, useEffect } from "react";
import type { Review, ReviewStats } from "@/lib/types";

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

const RATING_LABELS: { [key: number]: string } = {
  1: "Sangat Kecewa (1 Bintang)",
  2: "Kurang Puas (2 Bintang)",
  3: "Cukup Bagus (3 Bintang)",
  4: "Puas & Bagus (4 Bintang)",
  5: "Sangat Puas & Rekomendasi (5 Bintang)",
};

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 5.0,
    totalReviews: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (!res.ok) throw new Error("Gagal mengambil ulasan");
      const data = await res.json();
      setReviews(data.reviews || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setFormError("Silakan masukkan nama lengkap Anda (minimal 2 karakter).");
      return;
    }

    if (!comment.trim() || comment.trim().length < 3) {
      setFormError("Silakan tulis ulasan Anda tentang produk ini (minimal 3 karakter).");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          customer_name: customerName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim ulasan.");
      }

      setFormSuccess("Terima kasih! Ulasan dan bintang Anda berhasil disimpan.");
      setCustomerName("");
      setComment("");
      setRating(5);
      setShowForm(false);
      // Refresh reviews list
      fetchReviews();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Terjadi kesalahan sistem saat mengirim ulasan.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Baru saja";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <section className="reviews-section" id="reviews-section" aria-label="Ulasan Pembeli">
      {/* Section Divider Header */}
      <div className="section-divider-header" style={{ marginTop: "3.5rem", marginBottom: "2.5rem" }}>
        <span className="divider-line" />
        <h2 className="section-divider-title">ULASAN &amp; PENILAIAN PEMBELI</h2>
        <span className="divider-line" />
      </div>

      <div className="reviews-container">
        {/* Rating Overview Box */}
        <div className="reviews-overview-card">
          <div className="reviews-score-block">
            <span className="reviews-big-number">
              {stats.totalReviews > 0 ? stats.averageRating.toFixed(1) : "5.0"}
            </span>
            <div className="reviews-stars-row" aria-label={`Rating ${stats.averageRating} dari 5`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-char ${
                    star <= Math.round(stats.totalReviews > 0 ? stats.averageRating : 5) ? "filled" : ""
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="reviews-count-text">
              {stats.totalReviews > 0
                ? `Berdasarkan ${stats.totalReviews} ulasan pembeli terverifikasi`
                : "Belum ada ulasan resmi (5.0 rating standar)"}
            </p>
          </div>

          {/* Rating Breakdown Bar Chart */}
          <div className="reviews-breakdown-block">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.ratingCounts[stars] || 0;
              const percent = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : stars === 5 ? 100 : 0;
              return (
                <div key={stars} className="breakdown-row">
                  <span className="breakdown-stars">{stars} ★</span>
                  <div className="breakdown-bar-track">
                    <div
                      className="breakdown-bar-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="breakdown-count">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Call to Action: Write Review */}
          <div className="reviews-cta-block">
            <p className="reviews-cta-desc">
              Punya pengalaman mengenakan <strong>{productName}</strong>? Bagikan ulasan Anda kepada pembeli lainnya!
            </p>
            <button
              type="button"
              className="write-review-btn"
              onClick={() => {
                setShowForm((prev) => !prev);
                setFormSuccess("");
                setFormError("");
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>{showForm ? "Tutup Form Ulasan" : "Tulis Ulasan & Beri Bintang"}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {formSuccess && (
          <div className="review-alert success-alert" role="alert">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>{formSuccess}</span>
          </div>
        )}

        {/* Interactive Review Form */}
        {showForm && (
          <form className="review-form-card" onSubmit={handleSubmitReview}>
            <h3 className="review-form-title">Tulis Ulasan untuk {productName}</h3>
            <p className="review-form-subtitle">
              Pilih jumlah bintang dan berikan ulasan jujur Anda untuk membantu calon pembeli lainnya.
            </p>

            {formError && (
              <div className="review-alert error-alert" role="alert">
                <span>⚠️ {formError}</span>
              </div>
            )}

            {/* Interactive Star Picker */}
            <div className="star-picker-group">
              <label className="picker-label">Penilaian Bintang *</label>
              <div
                className="interactive-stars"
                onMouseLeave={() => setHoverRating(0)}
                role="radiogroup"
                aria-label="Pilih jumlah bintang penilaian"
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`star-pick-btn ${s <= (hoverRating || rating) ? "active" : ""}`}
                    onMouseEnter={() => setHoverRating(s)}
                    onClick={() => setRating(s)}
                    aria-label={`${s} Bintang`}
                  >
                    ★
                  </button>
                ))}
                <span className="star-picker-caption">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Name Input */}
            <div className="review-input-group">
              <label htmlFor="customer-name" className="picker-label">
                Nama Lengkap / Panggilan *
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Contoh: Maya Indah"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="review-input"
                maxLength={100}
              />
            </div>

            {/* Review Comment Textarea */}
            <div className="review-input-group">
              <label htmlFor="review-comment" className="picker-label">
                Ulasan Produk *
              </label>
              <textarea
                id="review-comment"
                rows={4}
                placeholder="Bagikan pengalaman Anda mengenai kualitas batu, kerapian makrame, kecocokan ukuran, atau ketepatan pengiriman..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="review-textarea"
                maxLength={1000}
              />
              <span className="char-count">{comment.length}/1000 karakter</span>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="review-form-actions">
              <button
                type="submit"
                className="submit-review-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-micro" />
                    <span>Menyimpan Ulasan...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    <span>Kirim Ulasan Saya</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="cancel-review-btn"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="reviews-list-wrapper">
          <div className="reviews-list-header">
            <h3>Daftar Ulasan Pelanggan ({reviews.length})</h3>
          </div>

          {loading ? (
            <div className="reviews-loading">
              <div className="spinner-blue" />
              <p>Memuat ulasan pembeli...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="empty-reviews-box">
              <div className="empty-reviews-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h4>Belum Ada Ulasan untuk Produk Ini</h4>
              <p>
                Jadilah pembeli pertama yang memberikan ulasan dan rating bintang untuk <strong>{productName}</strong>.
              </p>
              <button
                type="button"
                className="write-review-btn"
                onClick={() => setShowForm(true)}
              >
                Tulis Ulasan Pertama
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((rev) => (
                <article key={rev.id || `${rev.customer_name}-${rev.created_at}`} className="review-card-item">
                  <div className="review-item-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {rev.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="reviewer-name-row">
                          <strong className="reviewer-name">{rev.customer_name}</strong>
                          <span className="verified-badge" title="Pembeli Terverifikasi">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span>Terverifikasi</span>
                          </span>
                        </div>
                        <time className="review-date">{formatDate(rev.created_at)}</time>
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="review-card-stars" aria-label={`Rating ${rev.rating} dari 5 bintang`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`star-char ${s <= rev.rating ? "filled" : ""}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="review-comment-body">{rev.comment}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

